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
        <Typography align='center' >
          CHAT
        </Typography>
        <br>
        </br>
        <Box sx={{ bgcolor: '#cfe8fc', height: '75vh'}} />
      </Container>
    </React.Fragment>
  );
}