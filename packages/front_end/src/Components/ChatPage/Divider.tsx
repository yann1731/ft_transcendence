import * as React from 'react';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import ContactContainer from './Contacts';
import ConversationContainer from './Conversation';
import Box from '@mui/material/Box';
import BackgroundContainer from './Background';


export default function DividerStack() {
  return (
    <div>
      <BackgroundContainer>
            <ContactContainer></ContactContainer>
            <ConversationContainer></ConversationContainer>
      </BackgroundContainer>
    </div>
  );
}