import ResponsiveAppBar from '../ToolBar';
import BackgroundContainer from '../../Background';
import DashboardContainer from './Dashboard';
import { CssBaseline } from '@mui/material';
import React, { useContext } from 'react';
import PongGame from './Game';
import HomeGameBar from './HomeGameBar';
import { UserContext } from 'Contexts/userContext';
import SignIn from 'Components/Login/LoginPage';
import LoginToolBar from 'Components/Login/LoginToolBar';
import { SocketContext } from 'Contexts/socketContext';
import { gamesocket } from 'Contexts/gameSocketContext';


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
			<SocketContext.Provider value={gamesocket}>
				<CssBaseline />
					<BackgroundContainer>
						<div className="homeDashboard">
							<div className="homeDashboardBoxes">
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
				</SocketContext.Provider>
			</React.Fragment>
	)
}