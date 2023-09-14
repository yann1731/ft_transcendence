import BackgroundContainer from '../../Background'
import ProfileContainer from './ProfilePage';
import ResponsiveAppBar from '../ToolBar';
import { UserContext } from 'Contexts/userContext';
import { useContext } from 'react';
import SignIn from 'Components/Login/LoginPage';
import LoginToolBar from 'Components/Login/LoginToolBar';
import { ReadOnlyProfile } from './ProfilePage';
import { statsProps } from '../Interfaces';
export interface LimitedProfileProps { 
    userAvatar: string | undefined;
    nickname: string;
}

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
                <ResponsiveAppBar />
                <br></br>
                <ProfileContainer />
            </BackgroundContainer>
        </div>
    )
}

export function LimitedProfile({ userId, username, nickname, win, loss, gamesPlayed, avatar }: statsProps) {
    return (
        <div>
            <ReadOnlyProfile userId={userId} username={username} nickname={nickname} win={win} loss={loss} gamesPlayed={gamesPlayed} avatar={avatar}/>
        </div>
    )
}