import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function ChatContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box className={"ingameChatBar"}>IN-GAME CHAT
        </Box>
        <Box className={"ingameChatBox"}/>
      </Container>
    </React.Fragment>
  );
}