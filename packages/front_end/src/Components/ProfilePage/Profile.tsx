import ResponsiveAppBar from '../ToolBar';
import BackgroundContainer from './Background';
import ProfileContainer from './ProfilePage';

export default function DividerProfile() {
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