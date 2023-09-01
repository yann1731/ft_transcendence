import * as React from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';
import { UserContext, MatchHistoryOne, MatchHistoryTwo, MatchHistoryThree, User } from 'Contexts/userContext';
import { useContext, useEffect } from 'react';

export default function MatchHistory() {
    
    const [open, setOpen] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState<string | null>(null);
    const [MatchesOne, setMatchDataOne] = React.useState<MatchHistoryOne[]>([]);
    const [MatchesTwo, setMatchDataTwo] = React.useState<MatchHistoryTwo[]>([]);
    const [MatchesThree, setMatchDataThree] = React.useState<MatchHistoryThree[]>([]);
    const [winnerUsernamesOne, setWinnerUsernamesOne] = React.useState<string[]>([]);
    const [loserUsernamesOne, setLoserUsernamesOne] = React.useState<string[]>([]);
    const [winnerUsernamesTwo, setWinnerUsernamesTwo] = React.useState<string[]>([]);
    const [loserUsernamesTwo, setLoserUsernamesTwo] = React.useState<string[]>([]);
    const [winnerUsernamesThree, setWinnerUsernamesThree] = React.useState<string[]>([]);
    const [loserUsernamesThree, setLoserUsernamesThree] = React.useState<string[]>([]);
    const {user, updateUser} = useContext(UserContext);

    useEffect(() => {
        let cancelRequest = false;

        const fetchData = async () => {
            try {
                const [dataOne, dataTwo, dataThree] = await Promise.all([
                    getMatchDataOne(),
                    getMatchDataTwo(),
                    getMatchDataThree()
                ]);

                setMatchDataOne(dataOne.matchData);
                setWinnerUsernamesOne(dataOne.winnerUsernames);
                setLoserUsernamesOne(dataOne.loserUsernames);

                setMatchDataTwo(dataTwo.matchData);
                setWinnerUsernamesTwo(dataTwo.winnerUsernames);
                setLoserUsernamesTwo(dataTwo.loserUsernames);

                setMatchDataThree(dataThree.matchData);
                setWinnerUsernamesThree(dataThree.winnerUsernames);
                setLoserUsernamesThree(dataThree.loserUsernames);

                
            } catch (error) {
                console.error("Error fetching match data:", error);
            }
        };
        fetchData();
    }, []);
    
    const handleClickOpen = (dialogType: string) => {
        setOpenDialog(dialogType);
        setOpen(true);
    }

    const handleClickClose = () => {
        setOpenDialog(null);
        setOpen(false);
    }

    const getMatchDataOne = async() => {
        try {
            const response = await axios.get('/match-history/one', {headers: {
                'Authorization': user?.token,
                'userId': user?.id
            }});

            const matchDataOne: MatchHistoryOne[] = response.data;
                //setMatchDataOne(matchDataOne);

                const winnerIds = matchDataOne.map(match => match.winnerId);
                const loserIds = matchDataOne.map(match => match.loserId);

                const winnerUsernamesOne: string[] = await fetchUsernames(winnerIds);
                const loserUsernamesOne: string[] = await fetchUsernames(loserIds);

                return {
                    matchData: matchDataOne,
                    winnerUsernames: winnerUsernamesOne,
                    loserUsernames: loserUsernamesOne
                };

                //setWinnerUsernamesOne(winnerUsernamesOne);
                //setLoserUsernamesOne(loserUsernamesOne);
        } catch (error) {
            console.error("Error fetching match data:", error);
            return {
                matchData: [],
                winnerUsernames: [],
                loserUsernames: []
            };
        }
    }

    const getMatchDataTwo = async() => {
        try {
            const response = await axios.get('/match-history/two', {headers: {
                'Authorization': user?.token,
                'userId': user?.id
            }});

            const matchDataTwo: MatchHistoryTwo[] = response.data;
            //setMatchDataTwo(matchDataTwo);

            const winnerIds: string[][] = matchDataTwo.map(match => match.winnerId);
            const loserIds: string[][] = matchDataTwo.map(match => match.loserId);
            
            const winnerUsernamesTwo: string[] = await fetchUsernames(winnerIds.flat());
            const loserUsernamesTwo: string[] = await fetchUsernames(loserIds.flat());

            return {
                matchData: matchDataTwo,
                winnerUsernames: winnerUsernamesTwo,
                loserUsernames: loserUsernamesTwo
            };

            //setWinnerUsernamesTwo(winnerUsernamesTwo);
            //setLoserUsernamesTwo(loserUsernamesTwo);
        } catch (error) {
            console.error("Error fetching match data:", error);
            return {
                matchData:[],
                winnerUsernames: [],
                loserUsernames: []
            };
        }
    }

    const getMatchDataThree = async() => {
        try {
            const response = await axios.get('/match-history/three', {headers: {
                'Authorization': user?.token,
                'userId': user?.id
            }});

            const matchDataThree: MatchHistoryThree[] = response.data;
            //setMatchDataThree(matchDataThree);

            const winnerIds: string[][] = matchDataThree.map(match => match.winnerId);
            const loserIds: string[][] = matchDataThree.map(match => match.loserId);

            const winnerUsernamesThree: string[] = await fetchUsernames(winnerIds.flat());
            const loserUsernamesThree: string[] = await fetchUsernames(loserIds.flat());
            //setWinnerUsernamesThree(winnerUsernamesThree);
            //setLoserUsernamesThree(loserUsernamesThree);

            return {
                matchData: matchDataThree,
                winnerUsernames: winnerUsernamesThree,
                loserUsernames: loserUsernamesThree
            };

        } catch (error) {
            console.error("Error fetching match data:", error);
            return {
                matchData: [],
                winnerUsernames: [],
                loserUsernames: []
            }
        };
    }

    const fetchUsernames = async (userIds: string[]) => {
        try {
            const usernames: string[] = [];

            for (const userId of userIds) {
                const response = await axios.get(`/user/${userId}`);
                const userData = response.data;
                usernames.push(userData.username);
            }
            return usernames;
        } catch (error) {
            console.error("Error fetching usernames:", error);
            return[];
        }
    }

    return (
        <Box sx={{ width: '99%', textAlign: 'center', marginTop: '15px' }}>
            MATCH HISTORY
            <Box sx={{ width: '99%', textAlign: 'center', marginTop: '15px', display: 'flex' }}>
                <Box sx={{ width: '33%', marginRight: '5px' }}>
                    <Button className="profilePageButtons" onClick={() => handleClickOpen('1vs1')}>
                        <Typography>
                            1 vs 1
                        </Typography>
                    </Button>
                </Box>
                <Dialog open={openDialog === '1vs1'} onClose={handleClickClose}>
                    <DialogTitle>1 vs. 1 History</DialogTitle>
                    <DialogContent>
                        {MatchesOne.map((match, index) => (
                            <div key={match.id}>
                                <Typography sx={{ color: 'green' }}>Winner: {winnerUsernamesOne[index]}</Typography>
                                <Typography sx={{ color: 'red' }}>Loser: {loserUsernamesOne[index]}</Typography>
                                <Typography>Score: {match.winnerScore} - {match.loserScore}</Typography>
                            </div>
                        ))}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClickClose} className="profilePageButtons">Close</Button>
                    </DialogActions>
                </Dialog>
                <Box sx={{ width: '33%', marginRight: '5px' }}>
                    <Button className="profilePageButtons" onClick={() => handleClickOpen('2vs2')}>
                        <Typography>
                            2 vs 2
                        </Typography>
                    </Button>
                </Box>
                <Dialog open={openDialog === '2vs2'} onClose={handleClickClose}>
                    <DialogTitle>2 vs. 2 History</DialogTitle>
                    <DialogContent>
                        {MatchesTwo.map((match, index) => (
                            <div key={match.id} style={{ marginRight: '20px' }}>                            
                                <Typography sx={{ color: 'green' }}>Winner: {winnerUsernamesTwo[0]} and {winnerUsernamesTwo[1]}</Typography>
                                <Typography sx={{ color: 'red' }}>Loser: {loserUsernamesTwo[0]} and {loserUsernamesTwo[1]}</Typography>
                                <Typography>Score: {match.winnerScore} - {match.loserScore}</Typography>
                            </div>
                        ))}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClickClose} className="profilePageButtons">Close</Button>
                    </DialogActions>
                </Dialog>
                <Box sx={{ width: '33%' }}>
                    <Button className="profilePageButtons" onClick={() => handleClickOpen('1vs3')}>
                        <Typography>
                            1 vs 3
                        </Typography>
                    </Button>
                </Box>
                <Dialog open={openDialog === '1vs3'} onClose={handleClickClose}>
                    <DialogTitle>1 vs. 3 History</DialogTitle>
                    <DialogContent>
    {(() => {
        let counterWinner = 0;
        let counterLoser = 0;
        let winFlag = false;
        let loseFlag = false;


        return MatchesThree.map((match, index) => {
            const isTeamWinner = match.winnerId.length > 1;
            console.log("TEAM WINNER = " + isTeamWinner);
            const winnerUsernamesShow = winnerUsernamesThree;
            const loserUsernamesShow = loserUsernamesThree;

            const winnerUsernamesToShow = isTeamWinner
                ? (winFlag = true, winnerUsernamesShow.slice(counterWinner, counterWinner + 3).join(', '))
                : winnerUsernamesShow[index];

            const loserUsernamesToShow = isTeamWinner
                ? loserUsernamesShow[index]
                : (loseFlag = true, loserUsernamesShow.slice(counterLoser, counterLoser + 3).join(', '));

                if (winFlag === true) {
                    winFlag = false;
                    counterWinner += 3;
                }
                
                if (loseFlag === true) {
                    loseFlag = false;
                    counterLoser += 3;
                }


            return (
                <div key={match.id}>
                    <Typography sx={{ color: 'green' }}>Winner: {winnerUsernamesToShow}</Typography>
                    <Typography sx={{ color: 'red' }}>Loser: {loserUsernamesToShow}</Typography>
                    <Typography>Score: {match.winnerScore} - {match.loserScore}</Typography>
                </div>
            );
        });
    })()}
</DialogContent>

                    <DialogActions>
                        <Button onClick={handleClickClose} className="profilePageButtons">Close</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    );
}