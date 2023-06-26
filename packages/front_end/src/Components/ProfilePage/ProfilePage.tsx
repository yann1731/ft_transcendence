import * as React from 'react';
import { Box, IconButton, Menu, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Modal from '@mui/material/Modal';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';
import MyStats from './ProfileComponents/UserStats';
import PictureHandler from './ProfileComponents/PictureHandler';
import UserProvider, { UserContext, User } from 'Contexts/userContext';
import { useContext } from 'react';

const settings = ['See profile picture', 'Upload profile picture'];

function ProfileContainer() {
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
	const [open, setOpen] = useState(false);
	const [picture, setSelectedPicture] = useState('');
 	const {user} = useContext(UserContext);
	const handleOpen = (picture: string | undefined) => { 
		if (picture !== undefined)
		{
			setSelectedPicture(picture);
			setOpen(true);
		}
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

	return (
		<Box className="profileMainBox">
				<Avatar alt={user?.avatar} src={user?.avatar} sx={{mt: 10, width: 200, height: 200, boxShadow: 10, margin: '0 auto'}}></Avatar>
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
					<MenuItem onClick={() => handleOpen(user?.avatar)}>
						<Typography textAlign="center">See profile picture</Typography>
					</MenuItem>
					<PictureHandler></PictureHandler>
				</Menu>
				<Modal open={open} onClose={handleClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<div>
						<img src={user?.avatar} alt={user?.username} style={{color: 'white'}} />
					</div>
				</Modal>
				</div>
				<Box sx={{textAlign: 'center', mt: 1}}>Username: {user?.username}</Box>
				<Box sx={{textAlign: 'center'}}>Level: </Box>
				<Box className="profileSection" sx={{
					width: 400,
					height: 450,
					margin: 'auto',
					borderRadius: 2.5,
					mt: 3,
					display: 'flex',
					flexDirection: "column",
					alignItems: 'center',
				}}>
				<MyStats></MyStats>
			</Box>
		</Box>
	)
}

export default ProfileContainer;