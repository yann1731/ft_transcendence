import ResponsiveAppBar from '../ToolBar';
import BackgroundContainer from '../../Background';
import DashboardContainer from './Dashboard';
import { CssBaseline } from '@mui/material';
import React, { useContext } from 'react';
import PongGame from './Game';
import HomeGameBar from './HomeGameBar';
import InGameChatContainer from './InGameChat';
import Box from '@mui/material/Box';
import InGameChatBar from './InGameChatBar';
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