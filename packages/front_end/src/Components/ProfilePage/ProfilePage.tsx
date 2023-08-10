import * as React from 'react';
import { Box, IconButton, Menu, Typography, Avatar, Modal, Tooltip, MenuItem } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useState, useContext, useEffect } from 'react';
import MyStats from './ProfileComponents/UserStats';
import PictureHandler from './ProfileComponents/PictureHandler';
import { LimitedStats } from '../ProfilePage/ProfileComponents/UserStats';
import axios, { AxiosResponse } from 'axios';
import { useRouteLoaderData } from 'react-router-dom';
import { UserContext, User } from '../../Contexts/userContext';

export default function ProfileContainer() {
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
	const [open, setOpen] = useState(false);
 	const {user} = useContext(UserContext);
	
	const handleOpen = (picture: string | undefined) => { 
		if (picture !== undefined)
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
	return (
		<Box className="profileMainBox">
			<Avatar alt={user?.nickname} src={user?.avatar} sx={{mt: 10, width: 200, height: 200, boxShadow: 10, margin: '0 auto'}} />
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
					<PictureHandler />
				</Menu>
				<Modal open={open} onClose={handleClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
					<div>
						<img src={user?.avatar} alt={user?.nickname} style={{color: 'white'}} />
					</div>
				</Modal>
			</div>
			<Box sx={{textAlign: 'center', mt: 1}}>Nickname: {user?.nickname}</Box>
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
				<MyStats />
			</Box>
		</Box>
	)
}

export function ReadOnlyProfile({ Useravatar }: { Useravatar: string | undefined }) {
	const [userProfile, setUserProfile] = useState<User | null>(null);
  
	useEffect(() => {
	  const fetchUserProfile = async () => {
		try {
		  const response = await axios.get('http://localhost:4242/user', {
			headers: {
			  'Authorization': user?.token,
			  'userId': user?.id
			}
		  });
  
		  if (response.status === 200) {
			const userProfileData: User[] = response.data;
			const clickedUserProfile = userProfileData.find(u => u.avatar === Useravatar);
			setUserProfile(clickedUserProfile);
		  }
		} catch (error) {
		  console.error('Error while fetching user data: ', error);
		}
	  };
  
	  fetchUserProfile();
	}, [user, Useravatar]); // Update when user or Useravatar changes
  
	return (
	  <div>
		{userProfile && (
		  <div>
			<Avatar alt={userProfile.nickname} src={userProfile.avatar} sx={{ mt: 10, width: 200, height: 200, boxShadow: 10, margin: '0 auto' }} />
			<Box sx={{ textAlign: 'center', mt: 1 }}>Nickname: {userProfile.nickname}</Box>
			<Box className="profileSection" sx={{
			  borderRadius: 2.5,
			  mt: 3,
			  display: 'flex',
			  flexDirection: "column",
			  alignItems: 'center',
			}}>
			  <LimitedStats />
			</Box>
		  </div>
		)}
	  </div>
	);
  }
  