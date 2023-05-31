import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import OptionBarContact from './ChatMenus/OptionBarFriends';
import OptionBarChans from './ChatMenus/OptionBarChans';
import FriendBox from './FriendBox';
import ChannelBox from './ChannelBox';
import OptionBarConversation from './ChatMenus/OptionBarConversation';
import Chat from './ChatBox';
import '../../App.css';

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
