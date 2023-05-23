import ResponsiveAppBar from '../ToolBar';
import BackgroundContainer from '../../Background';
import ContactContainer from './Contacts';
import ConversationContainer from './Conversation';
import { AlignHorizontalLeft } from '@mui/icons-material';


function Chat() {
	return (
	<BackgroundContainer>
		<div>
			<ResponsiveAppBar></ResponsiveAppBar>
			<br></br>
			<ContactContainer></ContactContainer>
		</div>
		<div>
			<ConversationContainer></ConversationContainer>
		</div>
	</BackgroundContainer>
	)
}

export default Chat;

