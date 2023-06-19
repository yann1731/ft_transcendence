import BackgroundContainer from '../../Background';
import GetToken from './WaitingPage';

export default function Wait() {
    console.log('wait fucker');
    return (
        <div>
            <BackgroundContainer>
                <GetToken />
            </BackgroundContainer>
        </div>
    )
}