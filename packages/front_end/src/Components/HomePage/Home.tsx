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
import { useState } from 'react';

export default function Home() {;
    const [user, setUser] = useState(null);
    
    useEffect(() => {
      // Fetch the user data from the server
      const fetchUserData = async () => {
        try {
          const response = await fetch('http://localhost:4242/user/e26900d2-d2cb-40e7-905c-cf9e1f7fdbd3'); // Replace with your API endpoint
          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error occurred while fetching user data:', error);
        }
      };
      fetchUserData();
    }, [user]);
	  return (
		  <React.Fragment>
			<CssBaseline />
			<BackgroundContainer>
				<div className="homeDashboard">
					<div className="homeDashboardBoxes">
						<ResponsiveAppBar />
						<DashboardContainer user={user}/>
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