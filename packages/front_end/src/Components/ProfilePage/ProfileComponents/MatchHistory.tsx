import * as React from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';
import { UserContext, MatchHistoryOne, MatchHistoryTwo, MatchHistoryThree, User } from 'Contexts/userContext';
import { useContext, useEffect } from 'react';

export default function MatchHistory() {
    
    const [open, setOpen] = React.useState(false);
    const [MatchesOne, setMatchDataOne] = React.useState<MatchHistoryOne[]>([]);
    const [MatchesTwo, setMatchDataTwo] = React.useState<MatchHistoryTwo[]>([]);
    const [MatchesThree, setMatchDataThree] = React.useState<MatchHistoryThree[]>([]);
    const [winnerUsernames, setWinnerUsernames] = React.useState<string[]>([]);
    const [loserUsernames, setLoserUsernames] = React.useState<string[]>([]);
    const {user, updateUser} = useContext(UserContext);

    useEffect(() => {
        getMatchDataOne();
        getMatchDataTwo();
        getMatchDataThree();
    })
    
    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClickClose = () => {
        setOpen(false);
    }

    const getMatchDataOne = async() => {
        try {
            const response = await axios.get('http://localhost:4242/match-history/one', {headers: {
                'Authorization': user?.token,
                'userId': user?.id
            }});

            const matchDataOne: MatchHistoryOne[] = response.data;
            setMatchDataOne(matchDataOne);

            const winnerIds = matchDataOne.map(match => match.winnerId);
            const loserIds = matchDataOne.map(match => match.loserId);

            fetchUsernames(winnerIds, setWinnerUsernames);
            fetchUsernames(loserIds, setLoserUsernames);
        } catch (error) {
            console.error("Error fetching match data:", error);
        }
    }

    const getMatchDataTwo = async() => {
        try {
            const response = await axios.get('http://localhost:4242/match-history/two', {headers: {
                'Authorization': user?.token,
                'userId': user?.id
            }});

            const matchDataTwo: MatchHistoryTwo[] = response.data;
            setMatchDataTwo(matchDataTwo);

            const winnerIds = matchDataTwo.map(match => match.winnerId);
            const loserIds = matchDataTwo.map(match => match.loserId);

            fetchUsernames(winnerIds, setWinnerUsernames);
            fetchUsernames(loserIds, setLoserUsernames);
        } catch (error) {
            console.error("Error fetching match data:", error);
        }
    }

    const getMatchDataThree = async() => {
        try {
            const response = await axios.get('http://localhost:4242/match-history/three', {headers: {
                'Authorization': user?.token,
                'userId': user?.id
            }});

            const matchDataThree: MatchHistoryThree[] = response.data;
            setMatchDataThree(matchDataThree);

            const winnerIds = matchDataThree.map(match => match.winnerId);
            const loserIds = matchDataThree.map(match => match.loserId);

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