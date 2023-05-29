import React from 'react';
import ResponsiveAppBar from '../ToolBar';
import BackgroundContainer from '../../Background';
import ChatContainer from './ChatStyles';


function Chat() {
	return (
	  <div style={{ display: 'flex' }}>
	  	<BackgroundContainer>
		  <div style={{ display: 'flex' }}>
			<ResponsiveAppBar />
			<ChatContainer />
		  </div>
	  	</BackgroundContainer>
	  </div>
	);
  }
  
  export default Chat;

