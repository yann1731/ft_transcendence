import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import GameBottomContainer from './Game bottom';
import { createTheme, ThemeProvider } from '@mui/material/styles';


export default function GameContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
        <Container maxWidth="lg">
        <Box sx={{bgcolor: '#ff000F', boxShadow: 4, textAlign: 'center', fontWeight: 'bold'}}>GAME</Box>
        <Box sx={{ bgcolor: '#ff0000', height: '65vh', boxShadow: 4}} />
          <GameBottomContainer></GameBottomContainer>
      </Container>
    </React.Fragment>
  );
}