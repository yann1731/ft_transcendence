import * as React from 'react';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import BackgroundContainer from './Background'
import Profile from './ProfilePage'
import Box from '@mui/material/Box';
import { theme } from '../../Theme'
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