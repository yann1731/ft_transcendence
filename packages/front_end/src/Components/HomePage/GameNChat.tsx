import * as React from 'react';
import option from './game/Option';
import oneVSone from './game/oneVSone';
import threeVSone from './game/threeVSone';
import twoVStwo from './game/twoVStwo';
import { CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';

export default function GameNChat() {
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
        <Box id="PONG" sx={{ maxWidth: '835px' }}></Box>
    );
}