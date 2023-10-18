import * as React from 'react'
import { Grid, Box, Paper } from "@mui/material";
import { experimentalStyled as styled } from '@mui/material/styles';
import Handler2FA from "./2FAActivation";
import UserNameHandler from "./UsernameHandler";
import { useContext } from "react";
import { UserContext } from "Contexts/userContext";
import MatchHistory from './MatchHistory';
import { SelectChangeEvent } from '@mui/material/Select';
import { statsProps } from '../../Interfaces'

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
    backgroundColor: theme.palette.mode === 'dark' ? '#2B375E' : '#D4DEFF',
  }));

  const MyStats = () => {
      const { user } = useContext(UserContext);
      const winRatio = user && user.gamesPlayed > 0 ? (user.win / user.gamesPlayed) * 100 : 0;

    let userid: string;
    let nickName: string;

    if (user){
        userid = user?.id
        nickName = user?.nickname
    }
    else{
        userid = "error"
        nickName = "error"
    }
    
    return (
        <Box sx={{ width: '95%' }} className="profileButtonBox">
            <Grid container rowSpacing={3}>
                <Grid item sx={{width: '99%' }}>
                    <Item>Nb Games Played: {user?.gamesPlayed} </Item>
                </Grid>
                <Grid item sx={{width: '99%'}}>
                    <Item>Wins: {user?.win}</Item>
                </Grid>
                <Grid item sx={{width: '99%'}}>
                    <Item>Losses: {user?.loss}</Item>
                </Grid>
                <Grid item sx={{width: '99%'}}>
                    <Item>Win Ratio: {winRatio.toFixed(2)}</Item>
                </Grid>
                <MatchHistory userId={userid} userAvatar={user?.avatar} nickname={nickName}/>
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

export function LimitedStats({ userId, nickname, win, loss, gamesPlayed, avatar }: statsProps) {
    let ratio: number;
    if (gamesPlayed && win)
        ratio = gamesPlayed > 0 ? (win / gamesPlayed) * 100 : 0;
    else
        ratio = 0;
    const winRatio = ratio
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
      }

      const handleClickClose = () => {
        setOpen(false);
      }
    const [matchType, setMatchType] = React.useState('');

    const handleMatchType = (event: SelectChangeEvent) => {
        setMatchType(event.target.value as string);
    }
    
    return (
        <Box sx={{ width: '95%', marginTop: '15px', marginBottom: '15px' }} className="profileButtonBox">
            <Grid container rowSpacing={3}>
                <Grid item sx={{width: '99%' }}>
                    <Item>Nb Games Played: {gamesPlayed} </Item>
                </Grid>
                <Grid item sx={{width: '99%'}}>
                    <Item>Wins: {win}</Item>
                </Grid>
                <Grid item sx={{width: '99%'}}>
                    <Item>Losses: {loss}</Item>
                </Grid>
                <Grid item sx={{width: '99%'}}>
                    <Item>Win Ratio: {winRatio.toFixed(2)}</Item>
                </Grid>
            </Grid>
            <MatchHistory userId={userId} userAvatar={avatar} nickname={nickname}/>
        </Box>
    )
}