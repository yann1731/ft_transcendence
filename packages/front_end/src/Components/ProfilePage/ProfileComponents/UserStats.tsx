import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import { experimentalStyled as styled } from '@mui/material/styles';
import Handler2FA from "./2FAActivation";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { theme } from '../../../Theme';
import { useEffect, useState } from "react";
import UserNameHandler from "./UsernameHandler";
import PassWordHandler from "./PasswordHandler";
//import axios from 'axios'

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
  }));

  
  interface Stats {
    gamesPlayed: number;
    wins: number;
    losses: number;
    winRatio: number;
  }

  const MyStats = () => {
    const [userStatistics, setUserStatistics] = useState<Stats | null>(null);
        
        useEffect(() => {
        const fetchUserStatistics = async () => {
            try {
                const response = await fetch('http://localhost:4242/api/users');
                //const response = await axios.get<Stats>('http://localhost:4242/api/users');
                if(response.ok)
                {
                    const data = await response.json();
                    setUserStatistics(data);
                }
                else
                {
                    console.error('fuck\n');
                }
            }
            catch (err) {
                console.error(err);
            }
        };
    
        fetchUserStatistics();
    }, []);

    return (
        <Box sx={{ width: '95%', mt: 3, boxShadow: 10, bgcolor: theme.palette.secondary.main,}}>
            <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item sx={{width: '99%'}}>
                <Item sx={{bgcolor: 'white', color: 'grey'}}>Nb Games Played: {userStatistics?.gamesPlayed} </Item>
            </Grid>
            <Grid item sx={{width: '99%'}}>
                <Item sx={{bgcolor: 'white', color: 'grey'}}>Wins: {userStatistics?.wins}</Item>
            </Grid>
            <Grid item sx={{width: '99%'}}>
                <Item sx={{bgcolor: 'white', color: 'grey'}}>Losses: {userStatistics?.losses}</Item>
            </Grid>
            <Grid item sx={{width: '99%'}}>
                <Item sx={{bgcolor: 'white', color: 'grey'}}>Win Ratio: {userStatistics?.winRatio}</Item>
            </Grid>
            <Grid item xs={13}>
            <Handler2FA></Handler2FA>
            </Grid>
            <Grid item xs={13}>
                <UserNameHandler></UserNameHandler>
            </Grid>
            <Grid item xs={13}>
                <PassWordHandler></PassWordHandler>
            </Grid>
        </Grid>
    </Box>
    );
};

export default MyStats;