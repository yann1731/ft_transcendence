import React from 'react';
import ResponsiveAppBar from '../ToolBar';
import BackgroundContainer from '../../Background';
import ContactContainer from './Contacts';
import ConversationContainer from './Conversation';


function Chat() {
	return (
	  <div style={{ display: 'flex' }}>
	  	<BackgroundContainer>
		  <div style={{ flex: 1 }}>
			<ResponsiveAppBar />
			<ContactContainer />
		  </div>
		  <div style={{ flex: 1 }}>
			<ConversationContainer />
		  </div>
	  	</BackgroundContainer>
	  </div>
	);
  }
  
  export default Chat;

