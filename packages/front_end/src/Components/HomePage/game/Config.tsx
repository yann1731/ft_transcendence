import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { theme } from '../../../Theme'
import oneVSone from './oneVSone';
import option from './Option';
import threeVSone from './threeVSone';
import '../../../App.css';

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
        threeVSone
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
        <div id="PONG" style={{ height: '65vh', width: '50vw'}}>
          <Box className={"gameBoxBar"}>GAME</Box>
        </div>
    </React.Fragment>
  );
}

