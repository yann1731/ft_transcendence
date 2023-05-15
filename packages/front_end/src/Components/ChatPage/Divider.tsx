import * as React from 'react';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import ContactContainer from './Contacts';
import ConversationContainer from './Conversation';
import Box from '@mui/material/Box';


export default function DividerStack() {
  return (
    <div>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={0}
        >
          <Box sx={{width: '25vw'}}>
            <ContactContainer></ContactContainer>
          </Box>
          <Box sx={{width: '70vw'}}>
            <ConversationContainer></ConversationContainer>
          </Box>
      </Stack>
    </div>
  );
}