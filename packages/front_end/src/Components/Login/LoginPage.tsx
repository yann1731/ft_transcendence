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
import { makeStyles } from "@mui/styles";

export default function SignIn() {
  
  const useStyles = makeStyles({
      focusedTextField: {
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
          borderColor: 'grey',
          borderWidth: 1,
        },
        '& .MuiInputLabel-root': {
          color: 'grey',
          borderWidth: 1,
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.secondary.main, // Replace 'hover-color' with the desired hover color
          borderWidth: 2,
        },
      },
  });
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
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
    const data = new FormData(event.currentTarget);
    if (email !== "" && password !== "")
    {
      alert({
       email: data.get("email"),
       password: data.get("password"),
      });
      setEmail("");
      setPassword("");
    }
  };

  return (
    
    <Container component="main" maxWidth="xs" id="container" sx={{bgcolor: 'white', borderRadius: 2.5, boxShadow: 13}}>
        <br></br>
        <Typography component="h1" variant="h5" sx={{ mt: 1, textAlign: 'center', color: theme.palette.secondary.main }}>
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            className={classes.focusedTextField}
            margin="normal"
            fullWidth
            id="email"
            label={
              <Typography
                style={{ color: 'grey'}} >
                  Login
                </Typography>
            }
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{style: {color: 'black'}}}
            />
          <TextField
            className={classes.focusedTextField}
            margin="normal"
            fullWidth
            name="password"
            label={
              <Typography
              style={{ color: 'grey' }} >
                  Password
                </Typography>
            }
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{style: {color: 'black'}}}
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