import ResponsiveAppBar from '../ToolBar';
import BackgroundContainer from '../../Background';
import DashboardContainer from './Dashboard';
import { CssBaseline } from '@mui/material';
import React from 'react';
import PongGame from './Game';
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
							<DashboardContainer/>
						</div>
						<div className="homeGameNChat">
							<Box>
								<HomeGameBar />
								<div className="font-face-gm">
									<PongGame />
								</div>
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