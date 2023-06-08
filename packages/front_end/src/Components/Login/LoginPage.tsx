import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../Theme';

interface SubmittedData {
  email: string | null;
  password: string | null;
}

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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submittedData, setSubmittedData] = useState<SubmittedData[]>([]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (email !== "" && password !== "") {
      const newSubmittedData: SubmittedData = {
        email: data.get("email") as string,
        password: data.get("password") as string,
      };
  
      setSubmittedData((prevState) => [...prevState, newSubmittedData]);
      
      setEmail("");
      setPassword("");
      alert(`Email: ${newSubmittedData.email}\nPassword: ${newSubmittedData.password}`);
    }
  };
  

  return (
    <Container component="main" maxWidth="xs" id="container" className="loginBox">
        <br></br>
        <Typography component="h1" variant="h5" className="signInStyle">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            className="loginTextField"
            required
            fullWidth
            id="email"
            InputLabelProps={{
              className: 'loginTextField',
            }}
            label={
              <Typography>
                 Login  
                </Typography>
            }
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              className:'loginTextFieldText',
            }}
          />
          <TextField
            margin="normal"
            className="loginTextField"
            required
            fullWidth
            name="password"
            InputLabelProps={{
              className: 'loginTextField',
            }}
            label={
              <Typography>
                  Password
                </Typography>
            }
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              className:'loginTextFieldText',
            }}
          />
          <ThemeProvider theme={ theme }>  
          <FormControlLabel
            control={<Checkbox value="remember" style={{ color: theme.palette.secondary.main }} />}
            label={
              <Typography
                style={{ color: theme.palette.secondary.main }} >
                  Remember me
              </Typography>
            }
            />
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