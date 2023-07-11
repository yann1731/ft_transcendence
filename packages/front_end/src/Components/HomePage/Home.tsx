import DashboardAppBar from '../ToolBar';
import BackgroundContainer from '../../Background';
import DashboardContainer from './Dashboard';
import { CssBaseline } from '@mui/material';
import React from 'react';
import PongGame from './Game';
import HomeGameBar from './HomeGameBar';

export default function Home() {
	return (
		  <React.Fragment>
				<CssBaseline />
				<BackgroundContainer>
					<div className="homeDashboard">
						<div className="homeDashboardBoxes">
							<DashboardAppBar />
							<DashboardContainer/>
						</div>
						<div className="homeGameNChat">
							<HomeGameBar />
							<div className="font-face-gm">
								<PongGame />
							</div>
						</div>
					</div>
				</BackgroundContainer>	
			</React.Fragment>
	)
}