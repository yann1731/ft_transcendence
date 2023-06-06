import ResponsiveAppBar from '../ToolBar';
import BackgroundContainer from '../../Background';
import ScoresContainer from './Scores';
import GameContainer from './game/Config';
import ChatContainer from './Chat';

function Home() {
	return (
		<BackgroundContainer>
			<ResponsiveAppBar />
			<br></br>
			<div>
				<ScoresContainer />
			</div>
			<div>
				<GameContainer />
			</div>
			<ChatContainer />
		</BackgroundContainer>
	)
}

export default Home;