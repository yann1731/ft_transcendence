import ResponsiveAppBar from '../ToolBar';
import BackgroundContainer from '../../Background';
import ScoresContainer from './Scores';
import GameContainer from './game/Game';
import ChatContainer from './Chat';

function Home() {
	return (
	<div>
		<BackgroundContainer>
			<ResponsiveAppBar />
			<br></br>
			<ScoresContainer />
			<GameContainer />
			<ChatContainer />
		</BackgroundContainer>
	</div>
	)
}

export default Home;