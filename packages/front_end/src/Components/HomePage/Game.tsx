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
    if (user?.isInvited !== true){
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
          invited,
          pong
        ]
      };

      const game = new Phaser.Game(config);
      game.scene.start('invited', {name: user?.id, socket: gamesocket, invited: user?.host});
    }
  }, []);

  gamesocket.on("connected", () => {
    gamesocket.emit("connected", {name: user?.id})

    gamesocket.on("invite", () => {
      const newUser: Partial<User> = {
        ...user,
        isInvited: true,
        host: false
      }
      updateUser(newUser)
      navigate("/home")
    })
  })

  return (
    <Box id="PONG" style={{ maxHeight: '82.7vh' }}></Box>
  ); 
}