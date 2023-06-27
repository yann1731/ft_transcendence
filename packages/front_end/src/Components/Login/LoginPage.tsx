import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { getDesignTokens } from '../../Theme';
import { useTheme } from '@mui/material/styles';

/* interface SubmittedData {
  email: string | null;
  password: string | null;
}
 */
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
    window.location.assign('https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-47600cc08a77769cea8bec6cacdd6ef77df4be8fbb4984a8b9435f3cdddee480&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fwait&response_type=code');
  };
  const theme = useTheme();
  return (
    <Container component="main" maxWidth="xs" id="container" className="loginBox">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        <br />
    </Container>
    );
}