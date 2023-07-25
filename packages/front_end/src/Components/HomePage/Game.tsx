import * as React from 'react';
import '../../App.css';
import option from './game/Option';
import oneVSoneHost from './game/oneVSoneHost';
import oneVSoneOther from './game/oneVSoneOther';
import threeVSoneHost from './game/threeVSoneHost';
import threeVSoneOther from './game/threeVSoneOther';
import twoVStwoHost from './game/twoVStwoHost';
import twoVStwoOther from './game/twoVStwoOther'
import Box from '@mui/material/Box';
import { UserContext } from 'Contexts/userContext';
import io from "socket.io-client"

export default function PongGame() {
    const {user} = React.useContext(UserContext);
    const socket = io("http://localhost:4242/game")

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
          threeVSoneHost,
          threeVSoneOther,
          twoVStwoHost,
          twoVStwoOther
        ]
      };
      
      const pong = new Phaser.Game(config);
      pong.scene.start('menu', {name: user?.id, socket: socket});
      return () => {
        socket.disconnect();
        pong.destroy(true);
      }
    }, [user]);

    return (
        <Box id="PONG" style={{ maxHeight: '82.7vh' }}></Box>
    );
}