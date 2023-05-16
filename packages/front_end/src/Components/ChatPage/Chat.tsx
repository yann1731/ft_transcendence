import ResponsiveAppBar from '../ToolBar';
import BackgroundContainer from '../../Background';
import ContactContainer from './Contacts';
import ConversationContainer from './Conversation';

function Chat() {
	return (
	<div>
		<BackgroundContainer>
			<ResponsiveAppBar></ResponsiveAppBar>
			<br></br>
			<ContactContainer></ContactContainer>
			<ConversationContainer></ConversationContainer>
		</BackgroundContainer>
	</div>
	)
}

export default Chat;

