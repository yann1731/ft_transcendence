import * as React from 'react';
import { Box, IconButton, Menu, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { theme } from '../../Theme';
import { useState } from 'react';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
  }));

const profilePicture = 'https://pbs.twimg.com/profile_images/1633238286045962243/JfgDezi9_400x400.jpg';
const settings = ['See profile picture', 'Upload profile picture'];

function ProfileContainer() {
	const [active, setActive] = useState(false);
	const handleClick = () => {
		setActive(!active);
	};

	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

	const [open, setOpen] = useState(false);
	const [selectedPicture, setSelectedPicture] = useState('');

	const handleOpen = (picture: string) => { 
		setSelectedPicture(picture);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const handleMenuItemClick = (setting: string) => {
		if (setting === 'See profile picture') {
			handleOpen(profilePicture);
		} 
		else
			handleClose();
	}
	
	return (
		<Box sx={{bgcolor: theme.palette.primary.main}}>
				<Avatar alt="Profile Picture" src={profilePicture} sx={{mt: 10, width: 200, height: 200, boxShadow: 10, margin: '0 auto'}}></Avatar>
				<div style={{ textAlign: 'center' }}>
					<Tooltip title="Open profile settings">
					<IconButton onClick={handleOpenUserMenu}>
						<AddAPhotoIcon />
					</IconButton>
					</Tooltip>
				<Menu
					sx={{ mt: '45px' }}
					id="profile-settings-menu"
					anchorEl={anchorElUser}
					anchorOrigin={{
						vertical:'top',
						horizontal:'right',
					}}
					keepMounted
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					open={Boolean(anchorElUser)}
					onClose={handleCloseUserMenu}
				>
					{settings.map((setting) => (
						<MenuItem key={setting} onClick={() => handleMenuItemClick(setting)}>
							<Typography textAlign="center">{setting}</Typography>
						</MenuItem>
					))}
				</Menu>
				<Modal open={open} onClose={handleClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<div>
						<img src={selectedPicture} alt="Profile" />
					</div>
				</Modal>
				</div>
				<Box sx={{textAlign: 'center', mt: 1}}>Username: </Box>
				<Box sx={{textAlign: 'center'}}>Level: </Box>
				<Box sx={{
					bgcolor: theme.palette.secondary.main,
					border: 1.5,
					width: 400,
					height: 450,
					margin: 'auto',
					borderRadius: 2.5,
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
						<Button variant="contained" onClick={handleClick} sx={{width: '99%', bgcolor: 'white', color: 'grey'}}>{active ? "Activate 2FA" : "Deactivate 2FA"}</Button>
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

export default ProfileContainer;