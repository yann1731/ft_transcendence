import { Link } from 'react-router-dom';
import ResponsiveAppBar from '../ToolBar';
import DividerStack from './Divider';

function Home() {
	return (
	<div>
		<h1>
			<ResponsiveAppBar />
			<br></br>
			<DividerStack />
		</h1>
	</div>
	)
}

export default Home
;