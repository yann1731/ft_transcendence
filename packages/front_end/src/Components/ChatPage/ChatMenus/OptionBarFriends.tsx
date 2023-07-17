import * as React from 'react';
import {Button, Modal, Autocomplete, TextField, Menu, IconButton, Typography, Box, MenuItem, Tooltip, AppBar } from '@mui/material';
import DehazeIcon from '@mui/icons-material/Dehaze';
import '../../../App.css';
import { useTheme } from '@mui/material/styles';
import { UserContext, User } from 'Contexts/userContext';
import axios from 'axios';

export default function OptionBarFriends() {
    const settings = ['Add Friend', 'Block', 'Invite to Play', 'View Profile'];
    const [mode, setMode] = React.useState<string>('');
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [isFriendManagementWindowOpen, setWindowIsOpen] = React.useState(false);
    const theme = useTheme();
    const createChannelcolors = theme.palette.mode === 'dark' ? '#FFFFFF' : '#2067A1';
    const [UserName, setUserName] = React.useState('');
    const [Users, setUsers] = React.useState<User[]>([]);
    const {user, updateUser} = React.useContext(UserContext);

    React.useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:4242/user', {headers: {
            'Authorization': user?.token,
            'userId': user?.id
          }});
          
          if (response.status === 200) {
            const UsersData: User[] = response.data;
            setUsers(UsersData);
          }
        } catch (error) {
          console.error('Error fetching users', error);
        }
      };
  
      fetchUsers();
    }, []);

    const handleMode = (mode: string) => {
      setMode(mode);
      setWindowIsOpen(true);
    };

    const handleCloseWindow = () => {
      setWindowIsOpen(false);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const friendsOption = (option: string) => {
      handleMode(option);
      handleCloseUserMenu();
    };

    const handleFriends = async () => {
      if (!UserName) {
        alert('No username was given')
        return ;
      }
      const newFriend = Users.find((obj) => {
        return obj.nickname === UserName;
      });
      if (mode === 'Add')
      {
        try {
          const response = await axios.post(`http://localhost:4242/userfriendship`, {userAId: user?.id, userBId: newFriend?.id}, {headers: {
            'Authorization': user?.token,
            'userId': user?.id
          }});
          console.log('Friend successfuly added', response.data);
        } catch (error) {
          console.error('Error adding new friend', error);
          alert('Error adding new friend' + error);
        }
        if (user && user.friendListA && user.friendListA.length > 0) {
          alert(user.friendListA[0]);
        }
      }
      else if (mode === 'Block')
      {

      }
      else if (mode === 'Invite')
      {

      }
      else if (mode === 'View')
      {

      }
      setUserName('');
      handleCloseWindow();
      setMode('');
    };
    
    const handleUserSelection = (event: React.ChangeEvent<{}>, value: User | null) => {
      if (value) {
        setUserName(value.nickname);
      } else {
        setUserName('');
      }
    };
        
    
    const friendHandlerWindow = (
      <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 3
        }}
      >
        <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
        {mode}
        </Typography>
        <Autocomplete
          disablePortal
          id="Users"
          options={Users}
          getOptionLabel={(option) => option.nickname}
          fullWidth
          sx={{ marginBottom: 2 }}
          onChange={handleUserSelection}
          renderInput={(params) => 
          <TextField
            {...params}
            className="Search For User"
            sx={{
              '& label': { color: createChannelcolors },
              '& .MuiInputLabel-root.Mui-focused' : { color: createChannelcolors }
            }}
            label="Users" 
          />
        }
        />
        <Button onClick={handleFriends} className="profilePageButtons" sx={{ marginBottom: 2 }}>
          {mode}
        </Button>
        <Button onClick={handleCloseWindow} className="profilePageButtons">
          cancel
        </Button>
      </Box>
    );

  return (
      <AppBar position="relative" sx={{ boxShadow: '0' }}>
      <Box className={"chatOptionBars"}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <DehazeIcon></DehazeIcon>
              </IconButton>
            </Tooltip>
            <Typography sx={{textAlign: 'center'}}>
            Friends
            </Typography>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
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
                <MenuItem key={setting} onClick={() => friendsOption(setting)}>
                    <Typography textAlign="left">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Modal open={isFriendManagementWindowOpen} onClose={handleCloseWindow}>{friendHandlerWindow}</Modal>
      </AppBar>
  );
}