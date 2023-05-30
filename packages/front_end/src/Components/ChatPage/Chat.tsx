import React from 'react';
import ResponsiveAppBar from '../ToolBar';
import BackgroundContainer from '../../Background';
import ChatContainer from './ChatStyles';


function Chat() {
	return (
	  
	  	<BackgroundContainer>
		  <div>
			<ResponsiveAppBar />
			<ChatContainer />
		  </div>
	  	</BackgroundContainer>
	  
	);
  }
  
  export default Chat;

