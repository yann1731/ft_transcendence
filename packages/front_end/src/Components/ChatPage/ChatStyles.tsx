import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import OptionBarContact from './ChatMenus/OptionBarFriends';
import OptionBarChans from './ChatMenus/OptionBarChans';
import FriendBox from './FriendBox';
import ChannelBox from './ChannelBox';
import OptionBarConversation from './ChatMenus/OptionBarConversation';
import Chat from './ChatBox';
import { makeStyles } from '@mui/styles';
import { theme } from '../../Theme';

//export const useStyles = makeStyles({
//  chatSection: {
//    backgroundImage: "none",
//    backgroundColor: theme.palette.secondary.main,
//    borderRadius: 10,
//    height: '77.9vh',
//    overflowY: 'auto',
//  },
//  focusedTextField: {
//    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
//      borderColor: 'white',
//    },
//    '& .MuiInputLabel-root.Mui-focused': {
//      color: 'white',
//    },
//    '& .MuiOutlinedInput-root.Mui=focused': {
//      '& fieldset': {
//        borderWidth: 1,
//        borderColor: 'white',
//      },
//    },
//  },
//});


//TODO convert those 3 React CSSProperties to actual CSS inside App.css to test if it works
export default function MainContainer() {
  const mainContainerStyle: React.CSSProperties = {
    display: 'flex',
    height: '80vh',
    position: 'fixed',
    top: '9vh',
    left: '0',
    right: '0',
  };

  const friendsAndChannelsStyle: React.CSSProperties = {
    width: 'min(35vw, 400px)',
    marginLeft: '20px',
  };

  const conversationStyle: React.CSSProperties = {
    flexGrow: 1,
    marginLeft: '20px',
    marginRight: '20px',
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <div style={mainContainerStyle}>
        <div style={friendsAndChannelsStyle}>
          <OptionBarContact />
          <FriendBox />
          <OptionBarChans />
          <ChannelBox />
        </div>
        <div style={conversationStyle}>
          <OptionBarConversation />
          <Chat />
        </div>
      </div>
    </React.Fragment>
  );
}
