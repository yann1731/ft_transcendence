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
import { UserContext } from 'Contexts/userContext';

function ChatPage() {
const {user} = useContext(UserContext);
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
						<Chat user={user} />
					</div>
				</div>
			  </div>
	  		</BackgroundContainer>
		</React.Fragment>
	);
  }
  
  export default ChatPage;