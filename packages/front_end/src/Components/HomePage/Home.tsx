import ResponsiveAppBar from '../ToolBar';
import BackgroundContainer from '../../Background';
import DashboardContainer from './Dashboard';
import GameContainer from './game/Config';
import ChatContainer from './Chat';
import { CssBaseline } from '@mui/material';
import React from 'react';

export default function Home() {
	return (
		<React.Fragment>
			<CssBaseline />
			<BackgroundContainer>
			<div>
				<ResponsiveAppBar />
				<DashboardContainer />
				<GameContainer />
			</div>
			<ChatContainer />
		</BackgroundContainer>
		</React.Fragment>
	)
}