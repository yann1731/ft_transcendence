import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { theme } from '../../Theme'

export default function ScoresContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
        <Container maxWidth="xl">
        <Box sx={{
          bgcolor: theme.palette.primary.main,
          boxShadow: 4,
          textAlign: 'center',
          fontWeight: 'bold',
          color: 'cyan',
          fontSize:'25px'
          }}
          >SCORE</Box>
        <Box sx={{ 
          bgcolor: theme.palette.secondary.main,
          height: '85vh',
          boxShadow: 4,
          border: '1px solid black'
        }}>
            <Box sx={{height: '33.33%', textAlign: 'center', }}>
              <Box sx={{ color: 'cyan', fontSize: '20px', border: '0.5px solid black'}}>Hall of Fame</Box>
            </Box>
            <Box sx={{height: '33.33%', textAlign: 'center'}}>
              <Box sx={{mt: 1, color: 'cyan', fontSize: '20px', border: '0.5px solid black'}}>Personnal Stats</Box>
            </Box>
            <Box sx={{height: '33.34%', textAlign: 'center',}}>
              <Box sx={{mt: 1, color: 'cyan', fontSize: '20px', border: '0.5px solid black'}}>Opponent's Stats</Box>
            </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}