import BackgroundContainer from '../../Background'
import ProfileContainer from './ProfilePage';
import ResponsiveAppBar from '../ToolBar';
import {UserProvider} from 'Contexts/userContext';

export default function DividerProfile() {
    return (
        <UserProvider>
            <div>
                <BackgroundContainer>
                    <ResponsiveAppBar></ResponsiveAppBar>
                    <br></br>
                    <ProfileContainer></ProfileContainer>
                </BackgroundContainer>
            </div>
        </UserProvider>
    )
}