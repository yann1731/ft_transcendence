import BackgroundContainer from '../../Background'
import ProfileContainer from './ProfilePage';
import ResponsiveAppBar from '../ToolBar';
import { UserContext } from 'Contexts/userContext';
import { useState, useEffect } from 'react';
import { UserProvider } from 'Contexts/userContext';

export default function DividerProfile() {
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
        <UserProvider>
            <div>
                <BackgroundContainer>
                    <ResponsiveAppBar></ResponsiveAppBar>
                    <br></br>
                    <ProfileContainer></ProfileContainer>
                </BackgroundContainer>
            </div>
        </UserProvider>
    )
}