import ChatContainer from './Chat';
import GameContainer from './Game';
import ScoresContainer from './Scores';
import BackgroundContainer from './Background'



export default function DividerStack() {
  return (
    <div>
      <BackgroundContainer>
        <ScoresContainer />
        <GameContainer />
        <ChatContainer />
      </BackgroundContainer>
    </div>
  );
}