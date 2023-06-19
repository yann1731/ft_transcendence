import BackgroundContainer from '../../Background';
import GetToken from './WaitingPage';

export default function Wait() {
    return (
        <div>
            <BackgroundContainer>
                <GetToken />
            </BackgroundContainer>
        </div>
    )
}