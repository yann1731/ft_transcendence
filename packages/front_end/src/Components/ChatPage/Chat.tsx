import { Link } from 'react-router-dom';
import ResponsiveAppBar from '../ToolBar';
import DividerStack from './Divider';

function Chat() {
	return (
	<div>
		<h1>
			<ResponsiveAppBar></ResponsiveAppBar>
			<br></br>
			<DividerStack></DividerStack>
		</h1>
	</div>
	)
}

export default Chat;

