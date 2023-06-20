import React from 'react';
import ResponsiveAppBar from '../ToolBar';
import BackgroundContainer from '../../Background';
import OptionBarFriends from './ChatMenus/OptionBarFriends';
import FriendBox from './FriendBox';
import ChannelBox from './ChannelBox';
import OptionBarChans from './ChatMenus/OptionBarChans';
import { CssBaseline } from '@mui/material';
import Chat from './ChatBox';
import OptionBarConversation from './ChatMenus/OptionBarConversation';
import { useState, useEffect } from 'react';


function ChatPage() {
	const [user, setUser] = useState(null);
    
    useEffect(() => {
      // Fetch the user data from the server
      const fetchUserData = async () => {
        try {
          const response = await fetch('http://localhost:4242/user/e26900d2-d2cb-40e7-905c-cf9e1f7fdbd3'); // Replace with your API endpoint
          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error occurred while fetching user data:', error);
        }
      };
      fetchUserData();
    }, [user]);

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