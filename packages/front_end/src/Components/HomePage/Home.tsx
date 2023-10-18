
import BackgroundContainer from '../../Background';
import DashboardContainer from './Dashboard';
import { CssBaseline } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import PongGame from './Game';
import HomeGameBar from './HomeGameBar';
import { UserContext } from 'Contexts/userContext';
import SignIn from 'Components/Login/LoginPage';
import LoginToolBar from 'Components/Login/LoginToolBar';
import { SocketContext } from 'Contexts/socketContext';


export default function Home() {
	const { user } = useContext(UserContext);
	const socket = useContext(SocketContext);

	useEffect(() => {
			socket.emit("connectMe", { 
				id: sessionStorage.getItem('id'),
				at: sessionStorage.getItem('at')});
		return () => {
			socket.offAny()
		}
	}, [user]);

	if (user === null){
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
								<DashboardContainer/>
							</div>
							<div className="homeGameNChat">
								<HomeGameBar />
								<div className="font-face-gm">
									<PongGame/>
								</div>
							</div>
						</div>
					</BackgroundContainer>	
			</React.Fragment>
	)
}