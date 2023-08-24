import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Divider } from '@mui/material/';
import DashboardBar from './DashboardBar';
import { User, UserContext } from 'Contexts/userContext';
import { HallOfFame } from 'Components/Interfaces';
import { useEffect, useState, useContext } from 'react';
import axios, { AxiosResponse } from 'axios';
import { gamesocket } from 'Contexts/gameSocketContext';
import { GamesOutlined } from '@mui/icons-material';

const DashboardContainer: React.FC = () => {
  const [highestScore, setHighestScore] = useState<number>(0);
  const [gamesPlayedHighestScore, setGamesPlayedHighestScore] = useState<number>(1000000000);
  const [highestGamesPlayed, setHighestGamesPlayed] = useState<number>(0);
  const [lowestScore, setLowestScore] = useState<number>(0);
  const [gamesPlayedLowestScore, setGamesPlayedLowestScore] = useState<number>(1000000000);
  const [nicknameHighScore, setNicknameHighScore] = useState<string>('');
  const [nicknameLowScore, setNicknameLowScore] = useState<string>('');
  const [nicknameGamesPlayed, setNicknameGamesPlayed] = useState<string>('');
  const { user, updateUser } = useContext(UserContext);
  const [refresh, setRefresh] = useState(1);
  const [winRatio, setWinRatio] = useState("");


  useEffect(() => {
    const fetchHallOfFame = async () => {
      axios.get(`http://localhost:4242/user/${user?.id}`, {headers: {
        'Authorization': user?.token,
        'userId': user?.id
      }}).then((response: any) => {
          updateUser(response.data);
          if (user)
            if (user.gamesPlayed !== 0)
              setWinRatio((user.win / user.gamesPlayed) * 100 + "%")
            else
              setWinRatio("N/A")
      }).catch((error: any) => {
        console.log("could not fetch user:", error)
      })
      try {
        const token = user?.token;
        const userId = user?.id;
        const response: AxiosResponse = await axios.get(`http://localhost:4242/user/`, {headers: {
          'Authorization': token,
          'userId': userId
        }});
        const data: HallOfFame[] = response.data;
        
        data.forEach((score: HallOfFame) => {
          if (score.win >= highestScore) {
            if (score.win > highestScore)
            {
              setHighestScore(score.win);
              setNicknameHighScore(score?.nickname);
              setGamesPlayedHighestScore(score.gamesPlayed);
            }
            else if (score.win === highestScore && score.win === 0){
              setNicknameHighScore("None");
            }
            else if (score.win === highestScore)
            {
              if ((score.win / score.gamesPlayed) * 100 > (highestScore / gamesPlayedHighestScore) * 100)
                setNicknameHighScore(score?.nickname);
              else
                setNicknameHighScore("Tied");
              setHighestScore(score.win);
              setGamesPlayedHighestScore(score.gamesPlayed);
            }

          }
          if (score.loss >= lowestScore)
          {
            if (score.loss > lowestScore)
            {
              setLowestScore(score.loss);
              setNicknameLowScore(score?.nickname);
              setGamesPlayedLowestScore(score.gamesPlayed);
            }
            else if (score.loss === lowestScore && score.loss === 0){
              setNicknameLowScore("None");
            }
            else if (score.loss === lowestScore)
            {
              if ((score.loss / score.gamesPlayed) * 100 > (lowestScore / gamesPlayedLowestScore) * 100)
                setNicknameLowScore(score?.nickname);
              else
                setNicknameLowScore("Tied");
              setHighestScore(score.win);
              setGamesPlayedLowestScore(score.gamesPlayed);
            }
          }
          if (score.gamesPlayed >= highestGamesPlayed)
          {
            if (score.gamesPlayed > highestGamesPlayed)
            {
              setHighestGamesPlayed(score.gamesPlayed);
              setNicknameGamesPlayed(score?.nickname);
            }
            else if (score.gamesPlayed === highestGamesPlayed && score.gamesPlayed === 0){
              setNicknameGamesPlayed("None");
            }
            else if (score.gamesPlayed === highestGamesPlayed)
            {
              setHighestScore(score.gamesPlayed);
              setNicknameGamesPlayed("Tied");
            }
            
          }
        });
        console.log('nickname with the highest score:' + nicknameHighScore);
        console.log('nickname with the lowest score:' + nicknameLowScore);
        console.log('nickname with the highest number of games played:'+ nicknameGamesPlayed);
      }
      catch(error) {
        console.error('Error occurred while fetching scores:', error);
      }
    };
    fetchHallOfFame();
  }, [refresh]);

  gamesocket.on("connected", () => {
    gamesocket.on("refresh", () => {
      setRefresh(refresh => refresh + 1)
    })
  })

  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{ position: 'relative', marginTop: '114px' }}>
        <Box className={"homeScoreBar"}>
          <DashboardBar />
          <Box className={"homeScoreBox"}>
            <Box sx={{ textAlign: 'center', width: '100%' }}>
              <Box sx={{color: 'white', fontSize: '20px' }}>Hall of Fame</Box>
              <Divider style={{ marginBottom: '10px' }} />
              <Box className="dashboardContents">[GAMES PLAYED]<br></br>{highestGamesPlayed}<br></br>{nicknameGamesPlayed}</Box>
              <Box className="dashboardContents">[WINS]<br></br>{highestScore}<br></br>{nicknameHighScore}</Box>
              <Box className="dashboardContents">[LOSSES]<br></br>{lowestScore}<br></br>{nicknameLowScore}</Box>
            </Box>
          </Box>
          <Box className={"homeScoreBox"}>
            <Box sx={{ textAlign: 'center'}}>
              <Box sx={{mt: 1, color: 'white', fontSize: '20px'}}>Personal Stats</Box>
              <Divider style={{ marginBottom: '10px' }} />
              <Box className="dashboardContents">[GAMES PLAYED]<br></br>{user?.gamesPlayed}</Box>
              <Box className="dashboardContents">[WINS]<br></br>{user?.win}</Box>
              <Box className="dashboardContents">[LOSSES]<br></br>{user?.loss}</Box>
              <Box className="dashboardContents">[WIN RATIO]<br></br>{winRatio}</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}; export default DashboardContainer;