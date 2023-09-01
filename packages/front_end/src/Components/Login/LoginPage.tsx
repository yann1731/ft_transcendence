import { useEffect } from "react";
import { ThemeProvider, Container, Box, Button } from '@mui/material/';
import { theme } from "../../Theme";


const REDIRECT_URI = process.env.REACT_APP_BACKEND_HOST;
//const CLIENTID = process.env.REACT_APP_FORTYTWO_CLIENT_ID;
const CLIENTID = "u-s4t2ud-593e8e7097b7ce6a6f61d118e967747a75529825346ea1cde2aea002f7b3e4f7";
const loginURL: string = `https://api.intra.42.fr/oauth/authorize?client_id=${CLIENTID}&redirect_uri=http%3A%2F%2F10.11.2.8%3A8080%2Fwait&response_type=code&scope=public`;

export default function SignIn() {

  console.log(CLIENTID)

  useEffect(() => {
    const handleResize = () => {
      const root = document.documentElement;
      const container = document.getElementById("container");
      if (container && root.clientWidth < container.offsetWidth) {
        root.style.minWidth = `${container.offsetWidth}px`;
      }
      if (container && root.clientHeight < container.offsetHeight) {
        root.style.minHeight = `${container.offsetHeight}px`;
      }
    };
    
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.assign(loginURL);
  };
  

  return (
    <Container component="main" maxWidth="xs" id="container" className="loginBox">
      <br />
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <ThemeProvider theme={ theme } />  
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
      <br />
    </Container>
  );
}