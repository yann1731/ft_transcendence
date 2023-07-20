import { Grid, Box, Paper } from "@mui/material";
import { experimentalStyled as styled } from '@mui/material/styles';
import Handler2FA from "./2FAActivation";
import UserNameHandler from "./UsernameHandler";
import { useContext } from "react";
import { UserContext } from "Contexts/userContext";

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
    backgroundColor: theme.palette.mode === 'dark' ? '#2B375E' : '#D4DEFF',
  }));
    
const MyStats = () => {
    const { user } = useContext(UserContext);
    const winRatio = user && user.gamesPlayed > 0 ? (user.win / user.gamesPlayed) * 100 : 0;
    
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