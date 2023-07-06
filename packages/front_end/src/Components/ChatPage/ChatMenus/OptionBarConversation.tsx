import * as React from 'react';
import {Avatar, Button, Modal, Autocomplete, TextField, Menu, IconButton, Typography, Box, MenuItem, Tooltip, AppBar } from '@mui/material';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { UserContext, User } from 'Contexts/userContext';
import { useTheme } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';

export default function OptionBarConversation() {
    /* Settings vont être pris directement dans les objets Users, qui seront divisé en 3 categories, Owner, Admin et Standard*/
    const AdminSettings = ['Add', 'Ban', 'Kick', 'Make Admin', 'Mute', 'Quit', 'View Members'];
    const UserSettings = ['Add', 'Quit', 'View Members'];
    const [mode, setMode] = React.useState<string>('');
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [isFriendManagementWindowOpen, setWindowIsOpen] = React.useState(false);
    const theme = useTheme();
    const createChannelcolors = theme.palette.mode === 'dark' ? '#FFFFFF' : '#2067A1';
    const [UserName, setUserName] = React.useState('');
    const [Users, setUsers] = React.useState<User[]>([]);
    const {user, updateUser} = React.useContext(UserContext);

    React.useEffect(() => {
      const fetchChannels = async () => {
        try {
          const response = await axios.get('http://localhost:4242/user');
          
          if (response.status === 200) {
            const UsersData: User[] = response.data;
            setUsers(UsersData);
          }
        } catch (error) {
          console.error('Error fetching users', error);
        }
      };
  
      fetchChannels();
    }, [Users]);

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
        alert("pouet1")
      }
      else if (mode === 'Ban')
      {
        alert("pouet2")
        
      }
      else if (mode === 'Kick')
      {
        alert("pouet3")
        
      }
      else if (mode === 'Make Admin')
      {
        alert("pouet4")
        
      }
      else if (mode === 'Mute')
      {
        alert("pouet5")
        
      }
      else if (mode === 'Quit')
      {
        alert("pouet6")
        
      }
      else if (mode === 'View Members')
      {
        alert("pouet7")
        
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
        {(mode !== 'Quit' && mode !== 'View Members') ? (
          <div>
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
          </div>
          )
          :
          (<Typography>Soup</Typography>)
        }
      </Box>
    );

  return (
    <Box>
    {user?.chatInUse !== undefined ? (
      <AppBar position="relative" sx={{ boxShadow: '0' }}>
      <Box className={"chatOptionBars"} sx={{justifyContent: 'space-between' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <DehazeIcon></DehazeIcon>
              </IconButton>
            </Tooltip>
            {user?.chatInUse?.name}
            <Menu
              sx={{ mt: '40px' }}
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
              {AdminSettings.map((setting) => (
                <MenuItem key={setting} onClick={() => friendsOption(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
              <Avatar src={user?.chatInUse?.picture ?? ''} sx={{ marginRight: 0.5 }}></Avatar>
          </Box>
          <Modal open={isFriendManagementWindowOpen} onClose={handleCloseWindow}>{friendHandlerWindow}</Modal>
          </AppBar>
          ) : (
            <AppBar position="relative" sx={{ boxShadow: '0'}}>
              <Box className={"chatOptionBars"} sx={{justifyContent: 'space-between' }}>
              <Tooltip title="No active chat">
              <IconButton onClick={handleOpenUserMenu}>
                <ClearIcon></ClearIcon>
              </IconButton>
            </Tooltip>
              </Box>
            </AppBar>
          )
      }
    </Box>
  );
}