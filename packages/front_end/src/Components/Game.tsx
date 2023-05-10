import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { theme } from '../Theme'
import '../pong.ts'

export default function GameContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
        <Container maxWidth="xl">
        <Box sx={{bgcolor: theme.palette.primary.main, boxShadow: 24, textAlign: 'center', fontWeight: 'bold', width: '50vw', color: 'cyan'}}>GAME</Box>
        <div id="game-content" style={{ height: '65vh', width: '50vw'}}></div>
        <Box sx={{ bgcolor: theme.palette.secondary.main, height: '20vh', boxShadow: 4, width: '50vw'}} />
      </Container>
    </React.Fragment>
  );
}