import ResponsiveAppBar from '../ToolBar';
import BackgroundContainer from '../../Background';
import DashboardContainer from './Dashboard';
import { CssBaseline } from '@mui/material';
import React from 'react';
import GameNChat from './GameNChat';
import GameNChatBar from './GameNChatBar';
import ChatContainer from './Chat';
import Box from '@mui/material/Box';

export default function Home() {
	return (
		<React.Fragment>
			<CssBaseline />
			<BackgroundContainer>
				<div className="homeDashboard">
					<div className="homeDashboardBoxes">
						<ResponsiveAppBar />
						<DashboardContainer />
					</div>
					<div className="homeGameNChat">
						<Box sx={{ display: 'flex', flexDirection: 'column', maxHeight: 'calc(100vh - 550px)' }}>
							<GameNChatBar />
							<GameNChat />
						</Box>
						<Box sx={{ position: 'fixed', top: '816px', width: '50vw', maxWidth: '850px' }}>
							<ChatContainer />
						</Box>
					</div>
				</div>
		</BackgroundContainer>
		</React.Fragment>
	)
}