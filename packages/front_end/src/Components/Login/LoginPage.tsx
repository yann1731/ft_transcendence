import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "../../Theme";

export default function SignIn() {

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
    window.location.assign('https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-47600cc08a77769cea8bec6cacdd6ef77df4be8fbb4984a8b9435f3cdddee480&redirect_uri=http%3A%2F%2F192.168.191.236%3A3000%2Fwait&response_type=code');
  };
  

  return (
    <Container component="main" maxWidth="xs" id="container" className="loginBox">
        <br></br>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <ThemeProvider theme={ theme }>  
          </ThemeProvider>
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