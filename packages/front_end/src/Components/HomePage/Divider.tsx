import * as React from 'react';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import ChatContainer from './Chat';
import GameContainer from './Game';
import ScoresContainer from './Scores';
import BackgroundContainer from './Background'
import Box from '@mui/material/Box';
import { theme } from '../../Theme'


export default function DividerStack() {
  return (
    <div>
      <BackgroundContainer>
        <ScoresContainer />
        <GameContainer />
        <ChatContainer />
      </BackgroundContainer>
    </div>
  );
}