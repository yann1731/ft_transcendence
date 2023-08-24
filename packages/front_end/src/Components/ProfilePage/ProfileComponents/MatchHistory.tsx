import * as React from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';
import { UserContext, MatchHistoryOne, User } from 'Contexts/userContext';
import { useContext, useEffect } from 'react';

export default function MatchHistory() {
    
    const [open, setOpen] = React.useState(false);
    const [Matches, setMatchData] = React.useState<MatchHistoryOne[]>([]);
    const [winnerUsernames, setWinnerUsernames] = React.useState<string[]>([]);
    const [loserUsernames, setLoserUsernames] = React.useState<string[]>([]);
    const {user, updateUser} = useContext(UserContext);

    useEffect(() => {
        getMatchData();
    })
    
    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClickClose = () => {
        setOpen(false);
    }

    const getMatchData = async() => {
        try {
            const response = await axios.get('http://localhost:4242/match-history/one', {headers: {
                'Authorization': user?.token,
                'userId': user?.id
            }});

            const matchData: MatchHistoryOne[] = response.data;
            setMatchData(matchData);

            const winnerIds = matchData.map(match => match.winnerId);
            const loserIds = matchData.map(match => match.loserId);

            fetchUsernames(winnerIds, setWinnerUsernames);
            fetchUsernames(loserIds, setLoserUsernames);
        } catch (error) {
            console.error("Error fetching match data:", error);
        }
    }

    const fetchUsernames = async (userIds: string[], setUsernameState: React.Dispatch<React.SetStateAction<string[]>>) => {
        try {
            const usernames: string[] = [];

            for (const userId of userIds) {
                const response = await axios.get(`http://localhost:4242/user/${userId}`);
                const userData = response.data;
                usernames.push(userData.username);
            }

            setUsernameState(usernames);
        } catch (error) {
            console.error("Error fetching usernames:", error);
        }
    }

    return (
        <Box sx={{ width: '99%', textAlign: 'center', marginTop: '15px' }}>
            MATCH HISTORY
            <Box sx={{ width: '99%', textAlign: 'center', marginTop: '15px', display: 'flex' }}>
                <Box sx={{ width: '33%', marginRight: '5px' }}>
                    <Button className="profilePageButtons" onClick={handleClickOpen}>
                        <Typography>
                            1 vs 1
                        </Typography>
                    </Button>
                </Box>
                <Dialog open={open} onClose={handleClickClose}>
                <DialogTitle>Match History</DialogTitle>
                <DialogContent>
                    {Matches.map((match, index) => (
                        <div key={match.id}>
                            <Typography sx={{ color: 'green' }}>Winner: {winnerUsernames[index]}</Typography>
                            <Typography sx={{ color: 'red' }}>Loser: {loserUsernames[index]}</Typography>
                            <Typography>Score: {match.winnerScore} - {match.loserScore}</Typography>
                        </div>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickClose}>Close</Button>
                </DialogActions>
            </Dialog>
                <Box sx={{ width: '33%', marginRight: '5px' }}>
                    <Button className="profilePageButtons" onClick={handleClickOpen}>
                        <Typography>
                            2 vs 2
                        </Typography>
                    </Button>
                </Box>
                <Box sx={{ width: '33%' }}>
                    <Button className="profilePageButtons" onClick={handleClickOpen}>
                        <Typography>
                            1 vs 3
                        </Typography>
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}