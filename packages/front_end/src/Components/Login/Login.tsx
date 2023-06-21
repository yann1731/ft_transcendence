import BackgroundContainer from '../../Background';
import SignIn from './LoginPage';
import LoginToolBar from './LoginToolBar';

export default function LoginHome() {
    return (
        <div>
            <BackgroundContainer>
                <LoginToolBar />
                <SignIn />
            </BackgroundContainer>
        </div>
    )
}