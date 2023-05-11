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
          bgcolor: theme.palette.primary.main,boxShadow: 4,
          textAlign: 'center',
          fontWeight: 'bold',
          width: '20vw',
          color: 'cyan',
          fontSize:'25px'
          }}
          >SCORE</Box>
        <Box sx={{ 
          bgcolor: theme.palette.secondary.main,
          height: '85vh',
          boxShadow: 4,
          border: '1px solid black',
          width: '20vw'
        }} 
          />
      </Container>
    </React.Fragment>
  );
}