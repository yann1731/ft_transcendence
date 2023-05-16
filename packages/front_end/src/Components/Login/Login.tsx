import { Sign } from 'crypto';
import * as React from 'react';
import BackgroundContainer from '../../Background';
import ResponsiveAppBar from '../ToolBar';
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