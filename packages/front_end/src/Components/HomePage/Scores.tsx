import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

export default function ScoresContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
        <Box className={"homeScoreBar"}>
          DASHBOARD
        <Box className={"homeScoreBox"}>
            <Box sx={{ textAlign: 'center', }}>
              <Box sx={{color: 'cyan', fontSize: '20px' }}>Hall of Fame</Box>
              <Box sx={{ color: 'red', fontSize: '15px' }}>Nb games played:</Box><br />
              <Box sx={{ color: 'red', fontSize: '15px' }}>Wins:</Box><br />
              <Box sx={{ color: 'red', fontSize: '15px' }}>Losses:</Box><br />
              <Box sx={{ color: 'red', fontSize: '15px' }}>Current win streak:</Box><br />
              <Box sx={{ color: 'red', fontSize: '15px' }}>Best streak:</Box>
            </Box>
        </Box>
        <Box className={"homeScoreBox"}>
            <Box sx={{ textAlign: 'center'}}>
              <Box sx={{mt: 1, color: 'cyan', fontSize: '20px'}}>Personal Stats</Box>
                <Box sx={{ color: 'red', fontSize: '15px' }}>Nb games played:</Box><br />
                <Box sx={{ color: 'red', fontSize: '15px' }}>Wins:</Box><br />
                <Box sx={{ color: 'red', fontSize: '15px' }}>Losses:</Box><br />
                <Box sx={{ color: 'red', fontSize: '15px' }}>Current win streak:</Box><br />
                <Box sx={{ color: 'red', fontSize: '15px' }}>Best streak:</Box>
            </Box>
        </Box>
        <Box className={"homeScoreBox"}>
            <Box sx={{height: '34%', textAlign: 'center',}}>
              <Box sx={{mt: 1, color: 'cyan', fontSize: '20px'}}>Opponent's Stats</Box>
                <Box sx={{ color: 'red', fontSize: '15px' }}>Nb games played:</Box><br />
                <Box sx={{ color: 'red', fontSize: '15px' }}>Wins:</Box><br />
                <Box sx={{ color: 'red', fontSize: '15px' }}>Losses:</Box><br />
                <Box sx={{ color: 'red', fontSize: '15px' }}>Current win streak:</Box><br />
                <Box sx={{ color: 'red', fontSize: '15px' }}>Best streak:</Box><br />
            </Box>
        </Box>
        </Box>
    </React.Fragment>
  );
}