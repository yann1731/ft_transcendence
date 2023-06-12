import ResponsiveAppBar from '../ToolBar';
import BackgroundContainer from '../../Background';
import DashboardContainer from './Dashboard';
import { CssBaseline } from '@mui/material';
import React from 'react';
import GameNChat from './Game';
import HomeGameBar from './HomeGameBar';
import InGameChatContainer from './InGameChat';
import Box from '@mui/material/Box';
import InGameChatBar from './InGameChatBar';

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
						<Box>
							<HomeGameBar />
							<GameNChat />
						</Box>
						<Box>
							<InGameChatBar />
							<InGameChatContainer />
						</Box>
					</div>
				</div>
		</BackgroundContainer>
		</React.Fragment>
	)
}