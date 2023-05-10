import { Link } from 'react-router-dom';
import ResponsiveAppBar from '../ToolBar';

function Profile() {
	return (
	<div>
		<h1>
			<ResponsiveAppBar></ResponsiveAppBar>
			This is the Profile Page
		</h1>
	</div>
	)
}

export default Profile;