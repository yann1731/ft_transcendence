import { Typography, Container } from "@mui/material/";
import PokeBallIcon from '@mui/icons-material/CatchingPokemonTwoTone'
import { keyframes } from "@emotion/react";
import axios from 'axios';
import { User, UserContext } from "Contexts/userContext";
import { useContext, useEffect } from "react";
import { gameSocketContext } from "../../Contexts/gameSocketContext";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export default function GetToken() {
  const {user, setUser, updateUser} = useContext(UserContext);
  const socket = useContext(gameSocketContext);


  useEffect(() => {
    let urlParams = new URLSearchParams(window.location.search);
    let authorizationCode = urlParams.get("code");
    const fetchTokenAndUser = async () => {
      try {
        const response = await axios.post("/api/oauth", {
          code: authorizationCode,
        });
        console.log("here's the access token");
        console.log(response);
        
        const newUser = await axios.post("/api/user", {
          code: response.data.access_token,
          refresh_token: response.data.refresh_token,
          created_at: response.data.created_at,
          expires_in: response.data.expires_in
        });
        console.log(newUser);
        setUser(newUser.data);
        const updatedUser: Partial<User> = {...user, host: false, isInvited: false, button: true};
        updateUser(updatedUser)
        if (newUser.data.twoFaEnabled === true) {
          window.location.assign("/otp"); //changetoip
        }
        else
          window.location.assign("/home"); //changetoip
      } catch (error) {
        alert('Something went wrong, please try again later');
        console.error(error);
        window.location.assign("/"); //changetoip
      }
    };

    fetchTokenAndUser();
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
