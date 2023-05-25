import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import OptionBarContact from './ChatMenus/OptionBarFriends';
import OptionBarChans from './ChatMenus/OptionBarChans';
import ContactBox from './FriendBox';
import ChannelBox from './ChannelBox';
import OptionBarConversation from './ChatMenus/OptionBarConversation';
import Chat from './ChatBox';

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
          <ContactBox />
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
