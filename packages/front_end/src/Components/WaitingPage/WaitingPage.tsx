import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PokeBallIcon from '@mui/icons-material/CatchingPokemonTwoTone'
import { css, keyframes } from "@emotion/react";
import axios, { AxiosResponse } from 'axios';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export default async function GetToken() {

    let urlParams: URLSearchParams = new URLSearchParams(window.location.search);
    let authorizationCode: string | null = urlParams.get('code');

    try {
        const response = await axios.post('http://localhost:4242/oauth', {code: authorizationCode});
        console.log('here\'s the access token');
        console.log(response);
        const newUser = await axios.post('http://localhost:4242/user', {code: response.data.access_token, refresh_token: response.data.refresh_token});
        console.log(newUser);
        window.location.assign('http://localhost:3000/home');
    }
    catch(error) {
        console.log('hit error');
        console.error(error);

    }

    return (
        <Container maxWidth={false} sx={{ backgroundColor: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', width: "100%" }}>
            <PokeBallIcon sx={{ fontSize: 200, position: 'relative', color: 'white', animation: `${spin} 2s linear infinite` }} />
            <Typography variant="h6" color='white'>
            Verifying...
            </Typography>
        </Container>
        );
}
