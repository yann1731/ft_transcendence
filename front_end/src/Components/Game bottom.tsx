import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function GameBottomContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
        <Container maxWidth="lg">
        <Box sx={{ bgcolor: '#7CB9E8', height: '10vh', boxShadow: 4}} />
      </Container>
    </React.Fragment>
  );
}