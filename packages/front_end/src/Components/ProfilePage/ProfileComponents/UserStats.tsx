import * as React from 'react'
import { Grid, Box, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, Popover } from "@mui/material";
import { experimentalStyled as styled } from '@mui/material/styles';
import Handler2FA from "./2FAActivation";
import UserNameHandler from "./UsernameHandler";
import { useContext } from "react";
import { UserContext } from "Contexts/userContext";
import MatchHistory from './MatchHistory';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

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
                <MatchHistory />
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

export function LimitedStats() {
    const { user } = useContext(UserContext);
    const winRatio = user && user.gamesPlayed > 0 ? (user.win / user.gamesPlayed) * 100 : 0;
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
            </Grid>
            <Button 
                className="profilePageButtons"
                sx={{ marginTop: '20px' }}
                onClick={handleClickOpen}
                >
                    MATCH HISTORY
            </Button>
            <Dialog open={open} onClose={handleClickClose}>
                <DialogTitle>Match History</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel id="match-types">Match type</InputLabel>
                        <Select
                            labelId="match-types"
                            id="match-types-select"
                            value={matchType}
                            label="Match Type"
                            onChange={handleMatchType}
                            >
                            <MenuItem value={1}>1 vs 1</MenuItem>
                            <MenuItem value={2}>2 vs 2</MenuItem>
                            <MenuItem value={3}>1 vs 3</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickClose} className="profilePageButtons">CLOSE</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}