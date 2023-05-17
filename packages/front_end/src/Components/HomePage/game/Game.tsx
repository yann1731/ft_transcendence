import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { theme } from '../../../Theme'
import { scene } from './scene';

export default function GameContainer() {
  React.useEffect(() => {
    // Initialize Phaser game
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: 'PONG',
      backgroundColor: '#000000',
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        min: {
          width: 480,
          height: 480,
        },
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
        },
      },
      scene: [scene],
    };

    const game = new Phaser.Game(config);
    return () => {
      game.destroy(true);
    }
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
        <Container maxWidth="xl">
        <Box sx={{bgcolor: theme.palette.primary.main, boxShadow: 24, textAlign: 'center', fontWeight: 'bold', width: '50vw', color: 'cyan'}}>GAME</Box>
        <div id="PONG" style={{ height: '65vh', width: '50vw'}}></div>
        <Box sx={{ bgcolor: theme.palette.secondary.main, height: '20vh', boxShadow: 4, width: '50vw'}} />
      </Container>
    </React.Fragment>
  );
}

/*
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { theme } from '../../../Theme';
import './pong.ts';

export default function GameContainer() {
  React.useEffect(() => {
    // Initialize and start your Phaser game here
    // Make sure to handle any necessary cleanup when unmounting

    return () => {
      // Clean up the Phaser game when unmounting or before navigating away
      // Pause the game and perform any necessary cleanup
    };
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{ bgcolor: theme.palette.primary.main, boxShadow: 24, textAlign: 'center', fontWeight: 'bold', width: '50vw', color: 'cyan' }}>GAME</Box>
        <div id="PONG" style={{ height: '65vh', width: '50vw' }}></div>
        <Box sx={{ bgcolor: theme.palette.secondary.main, height: '20vh', boxShadow: 4, width: '50vw' }} />
      </Container>
    </React.Fragment>
  );
}
*/