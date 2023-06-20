import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import DashboardBar from './DashboardBar';
import Divider from '@mui/material/Divider';
import { UserContext } from 'Contexts/userContext';
import { HallOfFame } from 'Components/Interfaces';
import { useEffect, useState, useContext } from 'react';

const DashboardContainer: React.FC = () => {
  const [highestScore, setHighestScore] = useState<number>(-1);
  const [gamesPlayedHighestScore, setGamesPlayedHighestScore] = useState<number>(1000000000);
  const [highestGamesPlayed, setHighestGamesPlayed] = useState<number>(-1);
  const [lowestScore, setLowestScore] = useState<number>(-1);
  const [gamesPlayedLowestScore, setGamesPlayedLowestScore] = useState<number>(1000000000);
  const [usernameHighScore, setUsernameHighScore] = useState<string>('');
  const [usernameLowScore, setUsernameLowScore] = useState<string>('');
  const [usernameGamesPlayed, setUsernameGamesPlayed] = useState<string>('');
  const { user } = useContext(UserContext);
  
  useEffect(() => {
    const fetchHallOfFame = async () => {
      try {
        const response = await fetch('http://localhost:4242/user');
        const data: HallOfFame[] = await response.json();
        
        data.forEach(score => {
          if (score.win >= highestScore) {
            if (score.win > highestScore)
            {
              setHighestScore(score.win);
              setUsernameHighScore(score.username);
              setGamesPlayedHighestScore(score.gamesPlayed);
            }
            else if (score.win == highestScore)
            {
              if ((score.win / score.gamesPlayed) * 100 > (highestScore / gamesPlayedHighestScore) * 100)
              setUsernameHighScore(score.username);
              else
              setUsernameHighScore("Tied");
              setHighestScore(score.win);
              setGamesPlayedHighestScore(score.gamesPlayed);
            }
          }
          if (score.loss >= lowestScore)
          {
            if (score.loss > lowestScore)
            {
              setLowestScore(score.loss);
              setUsernameLowScore(score.username);
              setGamesPlayedLowestScore(score.gamesPlayed);
            }
            else if (score.loss == lowestScore)
            {
              if ((score.loss / score.gamesPlayed) * 100 > (lowestScore / gamesPlayedLowestScore) * 100)
              setUsernameLowScore(score.username);
              else
              setUsernameLowScore("Tied");
              setHighestScore(score.win);
              setGamesPlayedLowestScore(score.gamesPlayed);
            }
          }
          if (score.gamesPlayed >= highestGamesPlayed)
          {
            if (score.gamesPlayed > highestGamesPlayed)
            {
              setHighestGamesPlayed(score.gamesPlayed);
              setUsernameGamesPlayed(score.username);
            }
            else if (score.loss == lowestScore)
            {
              setHighestScore(score.gamesPlayed);
              setUsernameGamesPlayed("Tied");
            }
          }
        });
        console.log('Username with the highest score:' + usernameHighScore);
        console.log('Username with the lowest score:' + usernameLowScore);
        console.log('Username with the highest number of games played:'+ usernameGamesPlayed);
      }
      catch(error) {
        console.error('Error occurred while fetching scores:', error);
      }
    };
    fetchHallOfFame();
  }, []);
  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{ position: 'relative', marginTop: '114px' }}>
        <Box className={"homeScoreBar"}>
          <DashboardBar></DashboardBar>
        <Box className={"homeScoreBox"}>
            <Box sx={{ textAlign: 'center' }}>
              <Box sx={{color: 'white', fontSize: '20px' }}>Hall of Fame</Box>
              <Divider style={{ marginBottom: '10px' }} />
              <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px' }}>[GAMES PLAYED]<br></br>{highestGamesPlayed}<br></br>{usernameGamesPlayed}</Box>
              <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px' }}>[WINS]<br></br>{highestScore}<br></br>{usernameHighScore}</Box>
              <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px' }}>[LOSSES]<br></br>{lowestScore}<br></br>{usernameLowScore}</Box>
            </Box>
        </Box>
        <Box className={"homeScoreBox"}>
            <Box sx={{ textAlign: 'center'}}>
              <Box sx={{mt: 1, color: 'white', fontSize: '20px'}}>Personal Stats</Box>
                <Divider style={{ marginBottom: '10px' }} />
                <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px' }}>[GAMES PLAYED]<br></br>{user?.gamesPlayed}</Box>
                <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px' }}>[WINS]<br></br>{user?.win}</Box>
                <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px' }}>[LOSSES]<br></br>{user?.loss}</Box>
                <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px' }}>[WIN RATIO]<br></br>{user?.win}</Box>
            </Box>
        </Box>
        <Box className={"homeScoreBox"}>
            <Box sx={{ textAlign: 'center',}}>
              <Box sx={{mt: 1, color: 'white', fontSize: '20px'}}>Opponent's Stats</Box>
                <Divider style={{ marginBottom: '10px' }} />
                <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px' }}>[GAMES PLAYED]<br></br></Box>
                <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px' }}>[WINS]<br></br></Box>
                <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px' }}>[LOSSES]<br></br></Box>
                <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px' }}>[WIN RATIO]<br></br></Box>
            </Box>
        </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}; export default DashboardContainer;