import React, { useContext } from 'react';
import ResponsiveAppBar from '../ToolBar';
import BackgroundContainer from '../../Background';
import OptionBarFriends from './ChatMenus/OptionBarFriends';
import FriendBox from './FriendBox';
import ChannelBox from './ChannelBox';
import OptionBarChans from './ChatMenus/OptionBarChans';
import { CssBaseline } from '@mui/material';
import Chat from './ChatBox';
import OptionBarConversation from './ChatMenus/OptionBarConversation';
import { io } from "socket.io-client";

export const socket = io("http://localhost:4242/chatsocket");

function ChatPage() {
	return (
	  	<React.Fragment>
			<CssBaseline />
			<BackgroundContainer>
			  <div>
				<ResponsiveAppBar />
				<div className="mainContainerStyle">
					<div className="friendsAndChannelStyle">
						<OptionBarFriends />
						<FriendBox />
						<OptionBarChans />
						<ChannelBox />
					</div>
					<div className="conversationStyle">
						<OptionBarConversation />
						<Chat />
					</div>
				</div>
			  </div>
	  		</BackgroundContainer>
		</React.Fragment>
	);
  }
  
  export default ChatPage;