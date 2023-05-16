import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { theme } from '../../Theme'

export default function ChatContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{
          bgcolor: theme.palette.primary.main,
          boxShadow: 4,
          textAlign: 'center',
          fontWeight: 'bold',
          width: '20vw',
          color: 'cyan',
          fontSize: '25px' 
          }}
          >CHAT
        </Box>
        <Box sx={{
          bgcolor: theme.palette.secondary.main,
          aspectRatio: '16 / 9',
          boxShadow: 4,
          boxSizing: 'border-box',
          padding: '10px',
          border: '1px solid black',
          height: '85vh',
          width: '20vw'
          }} 
        />
      </Container>
    </React.Fragment>
  );
}