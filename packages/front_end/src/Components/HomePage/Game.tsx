import * as React from 'react';
import '../../App.css';
import option from './game/Option';
import oneVSone from './game/oneVSone';
import threeVSone from './game/threeVSone';
import twoVStwo from './game/twoVStwo';
import Box from '@mui/material/Box';

export default function PongGame() {
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
        <Box id="PONG" sx={{ maxWidth: '880px' }}></Box>
    );
}