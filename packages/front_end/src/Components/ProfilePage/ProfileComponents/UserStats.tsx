import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import { experimentalStyled as styled } from '@mui/material/styles';
import Handler2FA from "./2FAActivation";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { theme } from '../../../Theme';
import { useEffect, useState } from "react";
import UserNameHandler from "./UsernameHandler";
import PassWordHandler from "./PasswordHandler";
import { User } from "Components/Interfaces";
//import axios from 'axios'

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
  }));

  const MyStats = ({ userStatistics }: { userStatistics: User | null }) => {

    const winRatio = userStatistics && userStatistics.gamesPlayed > 0 ? (userStatistics.win / userStatistics.gamesPlayed) * 100 : 0;

    return (
        <Box sx={{ width: '95%', mt: 3, boxShadow: 10, bgcolor: theme.palette.secondary.main,}}>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item sx={{width: '99%'}}>
                <Item sx={{bgcolor: 'white', color: 'grey'}}>Nb Games Played: {userStatistics?.gamesPlayed} </Item>
            </Grid>
            <Grid item sx={{width: '99%'}}>
                <Item sx={{bgcolor: 'white', color: 'grey'}}>Wins: {userStatistics?.win}</Item>
            </Grid>
            <Grid item sx={{width: '99%'}}>
                <Item sx={{bgcolor: 'white', color: 'grey'}}>Losses: {userStatistics?.loss}</Item>
            </Grid>
            <Grid item sx={{width: '99%'}}>
                <Item sx={{bgcolor: 'white', color: 'grey'}}>Win Ratio: {winRatio.toFixed(2)}%</Item>
            </Grid>
            <Grid item xs={13}>
            <Handler2FA userStatistics={userStatistics}></Handler2FA>
            </Grid>
            <Grid item xs={13}>
                <UserNameHandler userStatistics={userStatistics} ></UserNameHandler>
            </Grid>
            <Grid item xs={13}>
                <PassWordHandler userStatistics={userStatistics}></PassWordHandler>
            </Grid>
        </Grid>
    </Box>
    );
};

export default MyStats;