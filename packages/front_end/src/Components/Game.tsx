import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';


export default function GameContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
        <Container maxWidth="xl">
        <Box sx={{bgcolor: '#ff000F', boxShadow: 4, textAlign: 'center', fontWeight: 'bold', width: '50vw'}}>GAME</Box>
        <Box sx={{ bgcolor: '#ff0000', height: '65vh', boxShadow: 4, width: '50vw'}} />
        <Box sx={{ bgcolor: '#ff0000', height: '20vh', boxShadow: 4, width: '50vw'}} />
      </Container>
    </React.Fragment>
  );
}