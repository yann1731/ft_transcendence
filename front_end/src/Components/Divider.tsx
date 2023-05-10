import * as React from 'react';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import ChatContainer from './Chat';
import GameContainer from './Game';
import ScoresContainer from './Scores';

const styles = {
  gameContainer: {
    flexBasis: "50%",
  },
};

export default function DividerStack() {
  return (
    <div style={{ height: "100%" }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={0}
      >
        <ScoresContainer />
        <GameContainer />
        <ChatContainer />
      </Stack>
    </div>
  );
}
