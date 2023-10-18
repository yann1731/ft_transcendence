import React, { useContext, useEffect } from 'react';
import BackgroundContainer from '../../Background';
import OptionBarFriends from './ChatMenus/OptionBarFriends';
import FriendBox from './ChatBoxes/FriendBox';
import ChannelBox from './ChatBoxes/ChannelBox';
import OptionBarChans from './ChatMenus/OptionBarChans';
import { CssBaseline } from '@mui/material';
import Chat from './ChatBoxes/ChatBox';
import OptionBarConversation from './ChatMenus/OptionBarConversation';
import { SocketContext} from "../../Contexts/socketContext";
import { UserContext } from 'Contexts/userContext';
import LoginToolBar from 'Components/Login/LoginToolBar';
import SignIn from 'Components/Login/LoginPage';

function ChatPage() {
	const { user } = useContext(UserContext);
	const socket = useContext(SocketContext);

	useEffect(() => {
			socket.emit("connectMe", { 
				id: sessionStorage.getItem('id'),
				at: sessionStorage.getItem('at')});
		return () => {
			socket.offAny()
		}
	}, [user]);


	    if (user === null) {
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
						<div className="mainContainerStyle">
							<div className="friendsAndChannelStyle">
								<OptionBarFriends />
								<FriendBox />
								<OptionBarChans />
								<ChannelBox />
							</div>
							<div className="conversationStyle">
								<OptionBarConversation />
								<Chat/>
							</div>
						</div>
				  	</div>
	  			</BackgroundContainer>
		</React.Fragment>
	);
  }
  
  export default ChatPage;