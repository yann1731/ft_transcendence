import { useEffect } from "react";
import { ThemeProvider, Container, Box, Button } from '@mui/material/';
import { theme } from "../../Theme";


export default function SignIn() {
  const port = process.env.REACT_APP_FRONTEND_PORT;
  const ip = process.env.REACT_APP_IP;
  const uid = process.env.REACT_APP_UID;
  
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
    window.location.assign(`https://api.intra.42.fr/oauth/authorize?client_id=${uid}&redirect_uri=http%3A%2F%2F${ip}%3A${port}%2Fwait&response_type=code&scope=public`);
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