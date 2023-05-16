import BackgroundContainer from '../../Background'
import ProfileContainer from './ProfilePage';
import ResponsiveAppBar from '../ToolBar';

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