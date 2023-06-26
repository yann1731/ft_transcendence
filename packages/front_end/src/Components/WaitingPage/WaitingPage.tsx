import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PokeBallIcon from '@mui/icons-material/CatchingPokemonTwoTone'
import { css, keyframes } from "@emotion/react";
import axios, { AxiosResponse } from 'axios';
import UserProvider, { UserContext, User } from "Contexts/userContext";
import { useContext, useEffect } from "react";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export default function GetToken() {
    let urlParams: URLSearchParams = new URLSearchParams(window.location.search);
    let authorizationCode: string | null = urlParams.get('code');
    const { user, setUser }= useContext(UserContext);
    const fetchUserData = async () => {
      try {
        const oauthResponse: AxiosResponse = await axios.post('http://localhost:4242/oauth', { code: authorizationCode });
        console.log('here\'s the access token');
        console.log(oauthResponse);
        const access_token: string = oauthResponse.data.access_token;
        const refresh_token: string = oauthResponse.data.refresh_token;
        
        const userResponse: AxiosResponse<User> = await axios.post('http://localhost:4242/user', { code: access_token, refresh_token });
        const newUser: User = userResponse.data;
        if (newUser)
         setUser(newUser);
        console.log(newUser);
        window.location.assign('http://localhost:3000/home');
      } catch (error) {
        console.log('hit error');
        console.error(error);
      }
    };
    useEffect(() => {
       fetchUserData();
    }, []);
    return (
        <Container maxWidth={false} sx={{ backgroundColor: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', width: "100%" }}>
            <PokeBallIcon sx={{ fontSize: 200, position: 'relative', color: 'white', animation: `${spin} 2s linear infinite` }} />
            <Typography variant="h6" color='white'>
            Verifying... {user?.username}
            </Typography>
        </Container>
        );
}
