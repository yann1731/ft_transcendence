import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function ScoresContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
        <Container maxWidth="lg">
        <Box sx={{bgcolor: '#B0BF1F',boxShadow: 4, textAlign: 'center', fontWeight: 'bold', width: '20vw'}}>SCORE</Box>
        <Box sx={{ bgcolor: '#B0BF1A', height: '85vh', boxShadow: 4, width: '20vw'}} />
      </Container>
    </React.Fragment>
  );
}