import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PokeBallIcon from '@mui/icons-material/CatchingPokemonTwoTone'
import { keyframes } from "@emotion/react";
import axios from 'axios';
import { UserContext } from "Contexts/userContext";
import { useContext, useEffect } from "react";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export default function GetToken() {
  const {user, setUser} = useContext(UserContext);
  
  useEffect(() => {
    let urlParams = new URLSearchParams(window.location.search);
    let authorizationCode = urlParams.get("code");
    const fetchTokenAndUser = async () => {
      try {
        const response = await axios.post("http://localhost:4242/oauth", {
          code: authorizationCode,
        });
        console.log("here's the access token");
        console.log(response);
        
        const newUser = await axios.post("http://localhost:4242/user", {
          code: response.data.access_token,
          refresh_token: response.data.refresh_token,
          created_at: response.data.created_at,
          expires_in: response.data.expires_in
        });
        console.log(newUser);

        setUser(newUser.data);
        window.location.assign("http://localhost:3000/home");
      } catch (error) {
        console.log("hit error");
        console.error(error);
      }
    };

    fetchTokenAndUser(); // Call the async function.
  }, []);

    return (
        <Container maxWidth={false} sx={{ backgroundColor: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', width: "100%" }}>
            <PokeBallIcon sx={{ fontSize: 200, position: 'relative', color: 'white', animation: `${spin} 2s linear infinite` }} />
            <Typography variant="h6" color='white'>
            Verifying... {user?.nickname}
            </Typography>
        </Container>
        );
}