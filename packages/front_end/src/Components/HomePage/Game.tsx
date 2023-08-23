import * as React from 'react';
import '../../App.css';
import pong from './Pong'
import Box from '@mui/material/Box';
import { UserContext } from 'Contexts/userContext';
import { gamesocket } from 'Contexts/gameSocketContext';

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
        pong
      ]
    };
  

    const game = new Phaser.Game(config);
    game.scene.start('pong', {name: user?.id, socket: gamesocket});
    
  }, []);

  gamesocket.on("connected", () => {
    gamesocket.emit("connected", {name: user?.id})
  })

  return (
    <Box id="PONG" style={{ maxHeight: '82.7vh' }}></Box>
  ); 
}