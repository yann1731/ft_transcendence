import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import GameBottomContainer from './Game bottom';

export default function GameContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
        <Container maxWidth="lg">
          <Typography align='center' >
            GAME
          </Typography>
          <br></br>
        <Box sx={{ bgcolor: '#ff0000', height: '50vh' }} />
      </Container>
      <GameBottomContainer></GameBottomContainer>
    </React.Fragment>
  );
}