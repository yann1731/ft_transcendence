import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import { experimentalStyled as styled } from '@mui/material/styles';
import Handler2FA from "./2FAActivation";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { theme } from '../../../Theme';
import { useEffect, useState } from "react";
import UserNameHandler from "./UsernameHandler";
import { useContext } from "react";
import { UserContext, User } from "Contexts/userContext";
//import axios from 'axios'

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
  }));

  const MyStats = () => {
    const { user } = useContext(UserContext);
    const winRatio = user && user.gamesPlayed > 0 ? (user.win / user.gamesPlayed) * 100 : 0;

    return (
        <Box sx={{ width: '95%', mt: 3, boxShadow: 10, bgcolor: theme.palette.secondary.main,}}>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item sx={{width: '99%'}}>
                <Item sx={{bgcolor: 'white', color: 'grey'}}>Nb Games Played: {user?.gamesPlayed} </Item>
            </Grid>
            <Grid item sx={{width: '99%'}}>
                <Item sx={{bgcolor: 'white', color: 'grey'}}>Wins: {user?.win}</Item>
            </Grid>
            <Grid item sx={{width: '99%'}}>
                <Item sx={{bgcolor: 'white', color: 'grey'}}>Losses: {user?.loss}</Item>
            </Grid>
            <Grid item sx={{width: '99%'}}>
                <Item sx={{bgcolor: 'white', color: 'grey'}}>Win Ratio: {winRatio.toFixed(2)}%</Item>
            </Grid>
            <Grid item xs={13}>
            <Handler2FA></Handler2FA>
            </Grid>
            <Grid item xs={13}>
                <UserNameHandler></UserNameHandler>
            </Grid>
        </Grid>
    </Box>
    );
};

export default MyStats;