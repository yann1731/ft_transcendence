import React, { useContext } from 'react';
import ResponsiveAppBar from '../ToolBar';
import BackgroundContainer from '../../Background';
import OptionBarFriends from './ChatMenus/OptionBarFriends';
import FriendBox from './ChatBoxes/FriendBox';
import ChannelBox from './ChatBoxes/ChannelBox';
import OptionBarChans from './ChatMenus/OptionBarChans';
import { CssBaseline } from '@mui/material';
import Chat from './ChatBoxes/ChatBox';
import OptionBarConversation from './ChatMenus/OptionBarConversation';
import { io, Socket } from "socket.io-client";
import { SocketContext, socket} from "../../Contexts/socketContext";
import { User, UserContext } from 'Contexts/userContext';
import SignIn from 'Components/Login/LoginPage';
import LoginToolBar from 'Components/Login/LoginToolBar';
import { Message } from '../Interfaces';
import { gameSocketContext } from 'Contexts/gameSocketContext';
import { useNavigate } from 'react-router-dom';

function ChatPage() {
	const { user, updateUser } = useContext(UserContext);
	const socket = useContext(SocketContext);
	const gamesocket = useContext(gameSocketContext)
	const navigate = useNavigate()

	

	 /*  const newUser: Partial<User> = {
		...user,
		isInvited: false,
		host: false
	}
	updateUser(newUser) */

	if (!user) {
		return (
			<div>
            	<BackgroundContainer>
                	<LoginToolBar />
                    <SignIn />
                </BackgroundContainer>
            </div>
		)
	}
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