import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import OptionBarContact from './ChatMenus/OptionBarFriends';
import OptionBarChans from './ChatMenus/OptionBarChans';
import FriendBox from './FriendBox';
import ChannelBox from './ChannelBox';
import OptionBarConversation from './ChatMenus/OptionBarConversation';
import Chat from './ChatBox';
import '../../App.css';
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

export default function MainContainer() {

  return (
    <React.Fragment>
      <CssBaseline />
      <div className="mainContainerStyle">
        <div className="friendsAndChannelStyle">
          <OptionBarContact />
          <FriendBox />
          <OptionBarChans />
          <ChannelBox />
        </div>
        <div className="conversationStyle">
          <OptionBarConversation />
          <Chat />
        </div>
      </div>
    </React.Fragment>
  );
}
