import * as React from 'react';
import '../../App.css';
import pong from './Pong'
import invited from './Invited';
import Box from '@mui/material/Box';
import { User, UserContext } from 'Contexts/userContext';
import { gamesocket } from 'Contexts/gameSocketContext';
import { useNavigate } from 'react-router-dom';

export default function PongGame() {
  const {user, updateUser} = React.useContext(UserContext);
  const navigate = useNavigate()

  React.useEffect(() => {
    if (localStorage.getItem("invite" + user?.username) !== "true"){
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

      return () => {
        game.destroy(true);
      }
    }
    else{
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
          invited
        ]
      };
      const game = new Phaser.Game(config);
      if (localStorage.getItem("host" + user?.username) === "true")
        game.scene.start('invited', {socket: gamesocket, invited: true});
      else
        game.scene.start('invited', {socket: gamesocket, invited: false});

      return () => {
        game.destroy(true);
      }
    }
  }, []);

  gamesocket.on("invite end", () => {
    localStorage.setItem("host" + user?.username, "false")
    localStorage.setItem("invite" + user?.username, "false")
    gamesocket.off("invite end")
  })

  gamesocket.on("finished", () => {
    gamesocket.off("finished")
    navigate("/chat")
  })

  return (
    <Box id="PONG" style={{ maxHeight: '82.7vh' }}></Box>
  ); 
}