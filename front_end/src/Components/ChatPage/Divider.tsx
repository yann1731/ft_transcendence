import * as React from 'react';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import ContactContainer from './Contacts';
import ConversationContainer from './Conversation';

export default function DividerStack() {
  return (
    <div>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={3}
        >
          <ContactContainer></ContactContainer>
          <ConversationContainer></ConversationContainer>
      </Stack>
    </div>
  );
}