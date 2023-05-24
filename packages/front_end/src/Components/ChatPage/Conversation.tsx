import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import OptionBarConversation from './OptionBarConversation';
import Chat from './ChatBox';

//TODO fix the increasing gap between sideContainer and chatContainer
export default function ConversationContainer() {
  const chatContainerStyle: React.CSSProperties = {
    borderRadius: 10,
    boxShadow: 'none',
    height: '80vh',
    width: 'min(50vw, 1200px)',
    top: '9vh',
    left: '35vw',
    position: 'fixed',
  }
  return (
    <React.Fragment>
      <CssBaseline />
        <Container style={ chatContainerStyle }>
          <OptionBarConversation></OptionBarConversation>
              <Chat></Chat>
        </Container>
    </React.Fragment>
  );
}
