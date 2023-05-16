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

//export default function DividerStack() {
//    return (
//      <div style={{ position: 'relative'}}>
//        <Stack
//          direction="row"
//
//          divider={<Divider orientation="vertical" flexItem />}
//          spacing={0}
//          >
//              <BackgroundContainer></BackgroundContainer>
//              <ScoresContainer></ScoresContainer>
//              <GameContainer></GameContainer>
//              <ChatContainer></ChatContainer>
//        </Stack>
//      </div>
//    );
//  }

//export default function DividerGrid() {
//  return (
//    <div style={{ 
//      display: "grid",
//      gridTemplateColumns: "repeat(3, 1fr))",
//      gap: "1rem"
//      }}
//    >
//      <ScoresContainer></ScoresContainer>
//      <GameContainer></GameContainer>
//      <ChatContainer></ChatContainer>
//    </div>
//  );
//}