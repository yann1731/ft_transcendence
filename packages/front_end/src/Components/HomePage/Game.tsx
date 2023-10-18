import * as React from 'react';
import '../../App.css';
import pong from './Pong'
import invited from './Invited';
import Box from '@mui/material/Box';
import { User, UserContext } from 'Contexts/userContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import { SocketContext } from 'Contexts/socketContext';

export default function PongGame() {
  const {user, updateUser} = React.useContext(UserContext);
  const navigate = useNavigate()
  const socket = React.useContext(SocketContext)
  const location = useLocation()
  const history = createBrowserHistory()
  const gameType = location.state?.game || "false"
  history.replace("/Home")
  
  
  React.useEffect(() => {
    socket.off("start")
    socket.off("player")
    socket.off("disconnected")
    socket.off("movement")
    socket.off("movement2")
    socket.off("update")
    socket.off("random")
    socket.off("newPower")
    socket.off("multi")
    socket.off("power")
    socket.off("point")
    if (gameType === "false"){
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
      game.scene.start('pong', {name: sessionStorage.getItem('id'), socket: socket});
      
      return () => {
        game.destroy(true, false);
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
      if (gameType === "inviter")
        game.scene.start('invited', {socket: socket, invited: true, id: sessionStorage.getItem('id')});
      else
        game.scene.start('invited', {socket: socket, invited: false});

      return () => {
        game.destroy(true, false);
      }
    }
  }, []);

  socket.on("invite end", () => {
    const updatedUser: Partial<User> = {...user, host: false, isInvited: false};
    updateUser(updatedUser)
    socket.off("invite end")
  })

  socket.on("finished", () => {
    socket.off("finished")
    navigate("/chat")
  })

  return (
    <Box id="PONG" style={{ maxHeight: '82.7vh' }}></Box>
  ); 
}