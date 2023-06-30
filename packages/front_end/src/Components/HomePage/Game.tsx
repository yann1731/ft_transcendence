import * as React from 'react';
import '../../App.css';
import option from './game/Option';
import oneVSoneHost from './game/oneVSoneHost';
import threeVSone from './game/threeVSone';
import twoVStwo from './game/twoVStwo';
import Box from '@mui/material/Box';
import { UserContext } from 'Contexts/userContext';
import oneVSoneOther from './game/oneVSoneOther';

export default function PongGame() {
    const {user} = React.useContext(UserContext);

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
          oneVSoneHost,
          oneVSoneOther,
          threeVSone,
          twoVStwo
        ]
      };
      
      const pong = new Phaser.Game(config);
      pong.scene.start('menu', {name: user?.id});
      return () => {
        pong.destroy(true);
      }
    }, [user]);

    return (
        <Box id="PONG" sx={{ maxWidth: '880px' }}></Box>
    );
}