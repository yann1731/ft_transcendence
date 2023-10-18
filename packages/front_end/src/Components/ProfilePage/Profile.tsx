import BackgroundContainer from '../../Background'
import ProfileContainer from './ProfilePage';
import { UserContext } from 'Contexts/userContext';
import { useContext, useEffect } from 'react';
import SignIn from 'Components/Login/LoginPage';
import LoginToolBar from 'Components/Login/LoginToolBar';
import { ReadOnlyProfile } from './ProfilePage';
import { statsProps } from '../Interfaces';
import { SocketContext } from 'Contexts/socketContext';

export interface LimitedProfileProps { 
    userAvatar: string | undefined;
    nickname: string;
    userId: string;
}

export default function DividerProfile() {
    const { user } = useContext(UserContext);
    const socket = useContext(SocketContext);

	useEffect(() => {
		    socket.emit("connectMe", { 
		    	id: sessionStorage.getItem('id'),
		    	at: sessionStorage.getItem('at')});

        return () => {
           socket.offAny()
        }
	}, [user]);

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