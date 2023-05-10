import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import ChatContainer from './Chat';
import GameContainer from './Game';
import ScoresContainer from './Scores';

export default function DividerStack() {
  return (
    <div>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={3}
        >
            <ScoresContainer></ScoresContainer>
            <GameContainer></GameContainer>
            <ChatContainer></ChatContainer>
      </Stack>
    </div>
  );
}