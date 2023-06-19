import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import PokeBallIcon from '@mui/icons-material/CatchingPokemonTwoTone'
import { css, keyframes } from "@emotion/react";
import axios, { AxiosResponse } from 'axios';
import { error } from "console";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export default function GetToken() {

    let urlParams: URLSearchParams = new URLSearchParams(window.location.search);
    let authorizationCode: string | null = urlParams.get('code');

    axios.post('http://localhost:4242/oauth', {code: authorizationCode}).then((response: AxiosResponse) => {
        console.log('here\'s the access token');
        console.log(response);
    }).catch (error => {
        console.log('hit error');
        console.error(error);
    });

    
    
    return (
        <Container maxWidth={false} sx={{ backgroundColor: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', width: "100%" }}>
            <PokeBallIcon sx={{ fontSize: 200, position: 'relative', color: 'white', animation: `${spin} 2s linear infinite` }} />
            <Typography variant="h6" color='white'>
            Verifying...
            </Typography>
        </Container>
        );
}

// return (
//     <Container component="main" maxWidth="xs" id="container" className="loginBox">
//         <br></br>
//         <Typography component="h1" variant="h5" className="signInStyle">
//           Sign in
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//           <TextField
//             margin="normal"
//             className="loginTextField"
//             required
//             fullWidth
//             id="email"
//             InputLabelProps={{
//               className: 'loginTextField',
//             }}
//             label={
//               <Typography>
//                  Login  
//                 </Typography>
//             }
//             name="email"
//             autoComplete="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             InputProps={{
//               className:'loginTextFieldText',
//             }}
//           />
//           <TextField
//             margin="normal"
//             className="loginTextField"
//             required
//             fullWidth
//             name="password"
//             InputLabelProps={{
//               className: 'loginTextField',
//             }}
//             label={
//               <Typography>
//                   Password
//                 </Typography>
//             }
//             type="password"
//             id="password"
//             autoComplete="current-password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             InputProps={{
//               className:'loginTextFieldText',
//             }}
//           />
//           <ThemeProvider theme={ theme }>  
//           <FormControlLabel
//             control={<Checkbox value="remember" style={{ color: theme.palette.secondary.main }} />}
//             label={
//               <Typography
//                 style={{ color: theme.palette.secondary.main }} >
//                   Remember me
//               </Typography>
//             }
//             />
//           </ThemeProvider>
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{ mt: 3, mb: 2 }}
//           >
//             Sign In
//           </Button>
//         </Box>
//         <br />
//     </Container>
//     );

