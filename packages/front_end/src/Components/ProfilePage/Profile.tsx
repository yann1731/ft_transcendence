import ResponsiveAppBar from '../ToolBar';
import { Box, IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { theme } from '../../Theme';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
  }));

function Profile() {
	return (
		<Box sx={{bgcolor: theme.palette.primary.main}}>
			<ResponsiveAppBar></ResponsiveAppBar>
			<br></br>
			<Box sx={{
				display: "flex",
          		flexDirection: "column",
          		alignItems: "center",
				mt: 15,
				bgcolor: theme.palette.primary.main,
			}}
			>
				<Avatar alt="yoyoyo" src="https://pbs.twimg.com/profile_images/1633238286045962243/JfgDezi9_400x400.jpg" sx={{mt: 10, width: 200, height: 200, boxShadow: 10}}></Avatar>
				<IconButton><AddAPhotoIcon /></IconButton>
				<Box sx={{textAlign: 'center', mt: 1}}>Username </Box>
				<Box sx={{textAlign: 'center'}}>Level: </Box>
				</Box>
				<Box sx={{
					bgcolor: theme.palette.secondary.main,
					border: 1.5,
					width: 400,
					height: 450,
					margin: 'auto',
					borderRadius: 1.5,
					boxShadow: 10,
					mt: 3,
					display: 'flex',
					flexDirection: "column",
					alignItems: 'center',
				}}>
				<Box sx={{ width: '95%', mt: 3, boxShadow: 10, bgcolor: theme.palette.secondary.main,}}>
					<Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
						<Grid item sx={{width: '99%'}}>
						<Item sx={{bgcolor: 'white', color: 'grey'}}>Nb Games Played: </Item>
						</Grid>
						<Grid item sx={{width: '99%'}}>
						<Item sx={{bgcolor: 'white', color: 'grey'}}>Wins: </Item>
						</Grid>
						<Grid item sx={{width: '99%'}}>
						<Item sx={{bgcolor: 'white', color: 'grey'}}>Losses: </Item>
						</Grid>
						<Grid item sx={{width: '99%'}}>
						<Item sx={{bgcolor: 'white', color: 'grey'}}>Win Ratio: </Item>
						</Grid>
						<Grid item xs={13}>
						<Button variant="contained" sx={{width: '99%', bgcolor: 'white', color: 'grey'}}>Activate 2FA</Button>
						</Grid>
						<Grid item xs={13}>
						<Button variant="contained" sx={{width: '99%', bgcolor: 'white', color: 'grey'}}>Change Username</Button>
						</Grid>
						<Grid item xs={13}>
						<Button variant="contained" sx={{width: '99%', bgcolor: 'white', color: 'grey'}}>Change Password</Button>
						</Grid>
					</Grid>
    			</Box>
			</Box>
		</Box>
	)
}

export default Profile;