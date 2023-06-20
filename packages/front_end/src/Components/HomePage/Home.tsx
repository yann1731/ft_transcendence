import ResponsiveAppBar from '../ToolBar';
import BackgroundContainer from '../../Background';
import DashboardContainer from './Dashboard';
import { CssBaseline } from '@mui/material';
import React, { useEffect } from 'react';
import PongGame from './Game';
import HomeGameBar from './HomeGameBar';
import InGameChatContainer from './InGameChat';
import Box from '@mui/material/Box';
import InGameChatBar from './InGameChatBar';
import { useContext } from 'react';
import {UserProvider} from 'Contexts/userContext';

export default function Home() {;
/* 	const {user, setUser} = useContext(UserContext);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const response = await fetch('http://localhost:4242/user/ec074b12-5f7a-4a08-b58c-c5795c58a655');
				if(response.ok)
				{
					const data = await response.json();
					setUser(data);
				}
				else
				{
					console.error('Could not fetch user');
				}
			}
			catch (err) {
				console.error(err);
			}
		};
		fetchUser();
	}, [user]); */

	  return (
		  <React.Fragment>
				<CssBaseline />
				<BackgroundContainer>
				<UserProvider>
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
				</UserProvider>
				</BackgroundContainer>	
			</React.Fragment>
	)
}