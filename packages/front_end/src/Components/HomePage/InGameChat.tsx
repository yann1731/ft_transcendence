import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function InGameChatContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Box className={"ingameChatBox"}/>
      </Container>
    </React.Fragment>
  );
}