import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function ScoresContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
        <Container maxWidth="xl">
        <Box className={"homeScoreBar"}>
          SCORE
        </Box>
        <Box className={"homeScoreBox"}>
            <Box sx={{height: '33.33%', textAlign: 'center', }}>
              <Box sx={{color: 'cyan', fontSize: '20px' }}>Hall of Fame</Box>
                <p style={{color: 'red'}}>
                  Nb games played:
                </p>
                <p style={{color: 'red'}}>
                  Wins:
                </p>
                <p style={{color: 'red'}}>
                  Losses:
                </p>
                <p style={{color: 'red'}}>
                  Current win streak:
                </p>
                <p style={{color: 'red'}}>
                  Best streak:
                </p>
            </Box>
            <Box sx={{height: '33.33%', textAlign: 'center'}}>
              <Box sx={{mt: 1, color: 'cyan', fontSize: '20px'}}>Personnal Stats</Box>
                <p style={{color: 'red'}}>
                  Nb games played: 
                </p>
                <p style={{color: 'red'}}>
                  Wins:
                </p>
                <p style={{color: 'red'}}>
                  Losses:
                </p>
                <p style={{color: 'red'}}>
                  Current win streak:
                </p>
                <p style={{color: 'red'}}>
                  Best streak:
                </p>
            </Box>
            <Box sx={{height: '33.34%', textAlign: 'center',}}>
              <Box sx={{mt: 1, color: 'cyan', fontSize: '20px'}}>Opponent's Stats</Box>
                <p style={{color: 'red'}}>
                  Nb games played:
                </p>
                <p style={{color: 'red'}}>
                  Wins:
                </p>
                <p style={{color: 'red'}}>
                  Losses:
                </p>
                <p style={{color: 'red'}}>
                  Current win streak:
                </p>
                <p style={{color: 'red'}}>
                  Best streak:
                </p>
            </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}