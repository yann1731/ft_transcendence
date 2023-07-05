import React, { useContext, useEffect, useState } from 'react';
import ResponsiveAppBar from '../ToolBar';
import BackgroundContainer from '../../Background';
import OptionBarFriends from './ChatMenus/OptionBarFriends';
import FriendBox from './FriendBox';
import ChannelBox from './ChannelBox';
import OptionBarChans from './ChatMenus/OptionBarChans';
import { CssBaseline } from '@mui/material';
import Chat from './ChatBox';
import OptionBarConversation from './ChatMenus/OptionBarConversation';
import { io, Socket } from "socket.io-client";
import { SocketContext, socket} from "../../Contexts/socketContext";

function ChatPage() {
	return (
	  	<React.Fragment>
			<SocketContext.Provider value={socket}>
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
			</SocketContext.Provider>
		</React.Fragment>
	);
  }
  
  export default ChatPage;