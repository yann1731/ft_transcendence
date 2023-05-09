import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function ChatContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{bgcolor: '#cfe8ff', boxShadow: 4, textAlign: 'center', fontWeight: 'bold', width: '20vw'}}>CHAT</Box>
        <Box sx={{ bgcolor: '#cfe8fc', height: '85vh', boxShadow: 4, width: '20vw'}} />
      </Container>
    </React.Fragment>
  );
}