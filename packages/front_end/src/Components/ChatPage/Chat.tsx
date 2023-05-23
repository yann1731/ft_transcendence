import React from 'react';
import ResponsiveAppBar from '../ToolBar';
import BackgroundContainer from '../../Background';
import ContactContainer from './Contacts';
import ConversationContainer from './Conversation';


function Chat() {
	return (
	  <BackgroundContainer>
		  <div>
			<ResponsiveAppBar />
			<ContactContainer />
		  </div>
		  <div>
			<ConversationContainer />
		  </div>
	  </BackgroundContainer>
	);
  }
  
  export default Chat;

