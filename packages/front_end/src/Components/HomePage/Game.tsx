import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { theme } from '../../Theme'


export default function GameContainer() {
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
          fontSize: '25px'
          }}
          >GAME
        </Box>
        <Box sx={{
          bgcolor: theme.palette.secondary.main,
          boxShadow: 4,
          border: '1px solid black',
          height: '85vh',
          width: '45vw'
          }} 
        />
      </Container>
    </React.Fragment>
  );
}