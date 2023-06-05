import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { theme } from '../../../Theme'
import oneVSone from './oneVSone';
import option from './Option';
import threeVSone from './threeVSone'
import twoVStwo from './twoVStwo'

export default function GameContainer() {
  React.useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: 'PONG',
      backgroundColor: '#000000',
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
        },
      },
      scene: [
        option,
        oneVSone,
        threeVSone,
        twoVStwo
      ]
    };
    
    const pong = new Phaser.Game(config);
    return () => {
      pong.destroy(true);
    }
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
        <Container maxWidth="xl">
        <Box sx={{bgcolor: theme.palette.primary.main, boxShadow: 24, textAlign: 'center', fontWeight: 'bold', width: '50vw', color: 'cyan'}}>GAME</Box>
        <div id="PONG" style={{ height: '65vh', width: '50vw'}}></div>
      </Container>
    </React.Fragment>
  );
}

