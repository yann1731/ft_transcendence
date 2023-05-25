import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import OptionBarConversation from './ChatMenus/OptionBarConversation';
import Chat from './ChatBox';

export default function ConversationContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
        <Container maxWidth="xl" sx={{width: '70vw', height: '70%'}}>
          <OptionBarConversation></OptionBarConversation>
          <Chat></Chat>
        </Container>
    </React.Fragment>
  );
}
