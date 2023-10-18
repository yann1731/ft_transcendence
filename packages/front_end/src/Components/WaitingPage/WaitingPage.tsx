import { Typography, Container } from "@mui/material/";
import PokeBallIcon from '@mui/icons-material/CatchingPokemonTwoTone'
import { keyframes } from "@emotion/react";
import axios from 'axios'
import { User, UserContext } from "Contexts/userContext";
import { useContext, useEffect } from "react";
import Cookies from 'universal-cookie'
import { useNavigate } from "react-router-dom";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export default function GetToken() {
  const {user, setUser, updateUser} = useContext(UserContext);
  const cookies = new Cookies()
  const navigate = useNavigate();


  useEffect(() => {
    let urlParams = new URLSearchParams(window.location.search);
    let authorizationCode = urlParams.get("code");
    const fetchTokenAndUser = async () => {
      try {
        const newUser = await axios.post("/api/user", {
          code: authorizationCode,
        });
        sessionStorage.setItem("id", newUser.data.id)
        sessionStorage.setItem("at", newUser.data.token)
        cookies.set("rt", newUser.data.refresh_token)
        setUser(newUser.data);
        const updatedUser: Partial<User> = {...user, host: false, isInvited: false, button: true};
        updateUser(updatedUser)
        if (newUser.data.twoFaEnabled === true) {
          navigate("/otp"); //changetoip
        }
        else
          navigate("/home"); //changetoip
      } catch (error) {
        console.error(error);
        navigate("/"); //changetoip
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
