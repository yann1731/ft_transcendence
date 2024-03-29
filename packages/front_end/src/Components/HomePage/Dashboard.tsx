import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Divider } from '@mui/material/';
import DashboardBar from './DashboardBar';
import { UserContext } from 'Contexts/userContext';
import { HallOfFame } from 'Components/Interfaces';
import { useEffect, useState, useContext } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import myAxios from 'Components/axiosInstance';
import { SocketContext } from 'Contexts/socketContext';

const DashboardContainer: React.FC = () => {
  const socket = useContext(SocketContext)
  const [highestScore, setHighestScore] = useState<number>(0);
  const [highestGamesPlayed, setHighestGamesPlayed] = useState<number>(0);
  const [lowestScore, setLowestScore] = useState<number>(0);
  const [gamesPlayedHighestScore, setGamesPlayedHighestScore] = useState<number>(1000000000); 
  const [gamesPlayedLowestScore, setGamesPlayedLowestScore] = useState<number>(1000000000);
  const [nicknameHighScore, setNicknameHighScore] = useState<string>('');
  const [nicknameLowScore, setNicknameLowScore] = useState<string>('');
  const [nicknameGamesPlayed, setNicknameGamesPlayed] = useState<string>('');
  const { user, updateUser } = useContext(UserContext);
  const [refresh, setRefresh] = useState(1);
  const [winRatio, setWinRatio] = useState("");


  useEffect(() => {
    const fetchHallOfFame = async () => {
      myAxios.get(`/api/user/${user?.id}`, {headers: {
        'Authorization': sessionStorage.getItem("at"),
        'userId': user?.id
      }}).then((response: any) => {
          updateUser(response.data);
          if (response.data.gamesPlayed !== 0)
            setWinRatio((response.data.win / response.data.gamesPlayed) * 100 + "%")
          else
            setWinRatio("N/A")
      }).catch((error: AxiosError) => {
        console.error("could not fetch user:", error.message)
      })


      try {
        const userId = user?.id;
        const response: AxiosResponse = await myAxios.get(`/api/user/`, {headers: {
          'Authorization': sessionStorage.getItem("at"),
          'userId': userId
        }});
        const data: HallOfFame[] = response.data;
        let HighestGamesPlayed: number = 0
        let LowestScore: number = 0
        let HighestScore: number = 0;

        data.forEach((score: HallOfFame) => {
          if (score.win >= HighestScore) {
            if (score.win > HighestScore)
            {
              setHighestScore(score.win)
              HighestScore = score.win;
              setNicknameHighScore(score?.nickname);
              setGamesPlayedHighestScore(score.gamesPlayed);
            }
            else if (score.win === HighestScore && score.win === 0){
              setNicknameHighScore("None");
            }
            else if (score.win === HighestScore)
            {
              if ((score.win / score.gamesPlayed) * 100 > (HighestScore / gamesPlayedHighestScore) * 100)
                setNicknameHighScore(score?.nickname);
              else
                setNicknameHighScore("Tied");
              HighestScore = score.win;
              setGamesPlayedHighestScore(score.gamesPlayed);
            }
          }

          if (score.loss >= LowestScore)
          {
            if (score.loss > LowestScore)
            {
              setLowestScore(score.loss)
              LowestScore = score.loss;
              setNicknameLowScore(score?.nickname);
              setGamesPlayedLowestScore(score.gamesPlayed);
            }
            else if (score.loss === LowestScore && score.loss === 0){
              setNicknameLowScore("None");
            }
            else if (score.loss === LowestScore)
            {
              if ((score.loss / score.gamesPlayed) * 100 > (LowestScore / gamesPlayedLowestScore) * 100)
                setNicknameLowScore(score?.nickname);
              else
                setNicknameLowScore("Tied");
              LowestScore = score.win;
              setGamesPlayedLowestScore(score.gamesPlayed);
            }
          }

          if (score.gamesPlayed >= HighestGamesPlayed)
          {
            if (score.gamesPlayed > HighestGamesPlayed)
            {
              setHighestGamesPlayed(score.gamesPlayed)
              HighestGamesPlayed = score.gamesPlayed;
              setNicknameGamesPlayed(score?.nickname);
            }
            else if (score.gamesPlayed === HighestGamesPlayed && score.gamesPlayed === 0){
              setNicknameGamesPlayed("None");
            }
            else if (score.gamesPlayed === HighestGamesPlayed)
            {
              HighestGamesPlayed = score.gamesPlayed;
              setNicknameGamesPlayed("Tied");
            }
            
          }
        });
      }
      catch(error) {
        console.error('Error occurred while fetching scores:', error);
      }
    };
    fetchHallOfFame();
    socket.on("refresh", () => {
      setRefresh(refresh => refresh + 1)
    })

    return() => {
      socket.off("refresh")
    }
  }, [refresh]);


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