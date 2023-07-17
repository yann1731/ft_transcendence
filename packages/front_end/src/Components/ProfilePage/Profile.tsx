import BackgroundContainer from '../../Background'
import ProfileContainer from './ProfilePage';
import ResponsiveAppBar from '../ToolBar';
import { UserContext } from 'Contexts/userContext';
import { useContext } from 'react';
import SignIn from 'Components/Login/LoginPage';
import LoginToolBar from 'Components/Login/LoginToolBar';

export default function DividerProfile() {
    const { user } = useContext(UserContext);

    console.log(user);
	if (!user) {
		return (
            <div>
                <BackgroundContainer>
                    <LoginToolBar />
                    <SignIn />
                </BackgroundContainer>
            </div>
        )
	}
    return (
        <div>
            <BackgroundContainer>
                <ResponsiveAppBar></ResponsiveAppBar>
                <br></br>
                <ProfileContainer></ProfileContainer>
            </BackgroundContainer>
        </div>
    )
}