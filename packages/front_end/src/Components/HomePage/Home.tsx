import DashboardAppBar from '../ToolBar';
import BackgroundContainer from '../../Background';
import DashboardContainer from './Dashboard';
import { CssBaseline } from '@mui/material';
import React, { useContext } from 'react';
import PongGame from './Game';
import HomeGameBar from './HomeGameBar';
import { UserContext } from 'Contexts/userContext';
import SignIn from 'Components/Login/LoginPage';
import LoginToolBar from 'Components/Login/LoginToolBar';

export default function Home() {
	const { user } = useContext(UserContext);

	if (!user) {
		return (
			<div>
                <BackgroundContainer>
                    <LoginToolBar />
                    <SignIn />
                </BackgroundContainer>
            </div>
		)
	}
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