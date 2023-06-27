import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import DashboardBar from './DashboardBar';
import Divider from '@mui/material/Divider';
import { UserContext, UserContextType } from 'Contexts/userContext';
import { HallOfFame } from 'Components/Interfaces';
import { useEffect, useState, useContext } from 'react';
import axios, { AxiosResponse } from 'axios';

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
        const response: AxiosResponse = await axios.get('http://localhost:4242/user');
        const data: HallOfFame[] = response.data;
        
        data.forEach(score => {
          if (score.win >= highestScore) {
            if (score.win > highestScore)
            {
              setHighestScore(score.win);
              setUsernameHighScore(score.username);
              setGamesPlayedHighestScore(score.gamesPlayed);
            }
            else if (score.win === highestScore)
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
            else if (score.loss === lowestScore)
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
            else if (score.loss === lowestScore)
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
              <Box className="dashboardContents">[GAMES PLAYED]<br></br>{highestGamesPlayed}<br></br>{usernameGamesPlayed}</Box>
              <Box className="dashboardContents">[WINS]<br></br>{highestScore}<br></br>{usernameHighScore}</Box>
              <Box className="dashboardContents">[LOSSES]<br></br>{lowestScore}<br></br>{usernameLowScore}</Box>
            </Box>
        </Box>
        <Box className={"homeScoreBox"}>
            <Box sx={{ textAlign: 'center'}}>
              <Box sx={{mt: 1, color: 'white', fontSize: '20px'}}>Personal Stats</Box>
                <Divider style={{ marginBottom: '10px' }} />
                <Box className="dashboardContents">[GAMES PLAYED]<br></br>{user?.gamesPlayed}</Box>
                <Box className="dashboardContents">[WINS]<br></br>{user?.win}</Box>
                <Box className="dashboardContents">[LOSSES]<br></br>{user?.loss}</Box>
                <Box className="dashboardContents">[WIN RATIO]<br></br>{user?.win}</Box>
            </Box>
        </Box>
        <Box className={"homeScoreBox"}>
            <Box sx={{ textAlign: 'center',}}>
              <Box sx={{mt: 1, color: 'white', fontSize: '20px'}}>Opponent's Stats</Box>
                <Divider style={{ marginBottom: '10px' }} />
                <Box className="dashboardContents">[GAMES PLAYED]<br></br></Box>
                <Box className="dashboardContents">[WINS]<br></br></Box>
                <Box className="dashboardContents">[LOSSES]<br></br></Box>
                <Box className="dashboardContents">[WIN RATIO]<br></br></Box>
            </Box>
        </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}; export default DashboardContainer;