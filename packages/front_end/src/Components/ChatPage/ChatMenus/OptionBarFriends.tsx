import axios from 'axios';
import * as React from 'react';
import { Popover, useTheme, Button, Modal, Autocomplete, TextField, Menu, IconButton, Typography, Box, MenuItem, Tooltip, AppBar } from '@mui/material';
import DehazeIcon from '@mui/icons-material/Dehaze';
import '../../../App.css';
import { UserContext, User } from 'Contexts/userContext';
import { UserFriendship, Chatroom, chatroomType, ChatInUse, UserBlocks } from 'Components/Interfaces';
import { LimitedProfile } from 'Components/ProfilePage/Profile';
import { PrivateMessage } from 'Components/Interfaces';
import { SocketContext } from 'Contexts/socketContext';
import { useContext } from 'react';

const OptionBarFriends: React.FC = () => {
    const settings = ['Add Friend', 'View Profile'];
    const [mode, setMode] = React.useState<string>('');
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [isFriendManagementWindowOpen, setWindowIsOpen] = React.useState(false);
    const theme = useTheme();
    const createChannelcolors = theme.palette.mode === 'dark' ? '#FFFFFF' : '#2067A1';
    const [UserName, setUserName] = React.useState('');
    const [Users, setUsers] = React.useState<User[]>([]);
    const [NonFriendUsers, setNonFriendUsers] = React.useState<User[]>([]);
    const {user, updateUser} = React.useContext(UserContext);
    const [refresh, setRefresh] = React.useState<Boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const id = open ? 'contact-options-popover' : undefined;
    const socket = useContext(SocketContext);

    React.useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:4242/user', {headers: {
            'Authorization': user?.token,
            'userId': user?.id
          }});
          
          if (response.status === 200) {
            const UsersData: User[] = response.data;
            let otherUsers: User[] = [];
            UsersData.forEach((users: User) => {
              if (users.id !== user?.id)
              {
                otherUsers.push(users);
              }
            })
            setUsers(otherUsers);
            try {
              const response = await axios.get(`http://localhost:4242/userfriendship/user/${user?.id}`, {headers: {
                'Authorization': user?.token,
                'userId': user?.id
              }});
              if (response.status === 200) {
                const FriendshipData: UserFriendship[] = response.data;
                const tempIsNotFriend: User[] = [];
                otherUsers.forEach((users: User) => {
                  const notFriend = FriendshipData.find((friend: UserFriendship) => {
                    return (users?.id === friend?.userAId || users?.id === friend?.userBId)
                  })
                  if (notFriend === undefined)
                  {
                    tempIsNotFriend.push(users);
                  }
                });
                setNonFriendUsers(tempIsNotFriend);
              }
            } catch (error) {
              alert(error)
              console.error('Error fetching friendships', error);
            }
          }
        } catch (error) {
          console.error('Error fetching users', error);
        }
      }
      fetchUsers();
    }, [setRefresh]);
    
    const handleMode = (mode: string) => {
      setMode(mode);
      setRefresh(!refresh);
      setWindowIsOpen(true);
    };
    
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      if (mode === "View Profile")
      {
        setAnchorEl(event.currentTarget);
      }
      else
      {
        handleFriends();
      }
    };
  
    const handleClose = () => {
      setAnchorEl(null);
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
      const friendToModify = Users.find((friend: User) => {
        return friend.nickname === UserName;
      });
      if (mode === 'Add Friend')
      {
        try {
          const response = await axios.post(`http://localhost:4242/userfriendship`, {userAId: user?.id, userBId: friendToModify?.id}, {headers: {
            'Authorization': user?.token,
            'userId': user?.id
          }});
          console.log('Friend successfuly added', response.data);
          const username = friendToModify?.username === undefined ? "pouet" : friendToModify?.username;
          const newChannel: Chatroom = {
            id: "",
            name: username,
            picture: friendToModify?.avatar,
            state: "private",
            userId: user?.id,
            password: null,
          };
          const newChatInUse: ChatInUse = {
            chat: newChannel,
            type: chatroomType.channel,
        }
          const updatedUser: Partial<User> = { ...user, chatInUse: newChatInUse };
          updateUser(updatedUser);
          let _chat: Array<string>;
          if (updatedUser.username && updatedUser.chatInUse?.chat.id && updatedUser.chatInUse?.type) {
            _chat = [updatedUser.chatInUse?.chat.name, updatedUser.chatInUse?.chat.id, updatedUser.chatInUse?.type, updatedUser.username]
            localStorage.setItem(updatedUser.username, JSON.stringify(_chat));
          }
          let newMessage: Partial<PrivateMessage> = {
            content: "messageText",
            senderId: user?.id,
            recipientId: username,
          };
          socket.emit("getPrivateHistory", newMessage);
        } catch (error) {
          console.error('Error adding new friend', error);
          alert('Error adding new friend: ' + error);
        }
      }
      setUserName('');
      handleCloseWindow();
      setMode('');
    };
    
    const handleUserSelection = (event: React.ChangeEvent<{}>, friend: User | null) => {
      if (friend) {
        setUserName(friend.nickname);
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
        {mode !== "Add Friend" ?
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
        :
        <Autocomplete
          disablePortal
          id="Users"
          options={NonFriendUsers}
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
        />}
        <Button onClick={handleClick} className="profilePageButtons" sx={{ marginBottom: 2 }}>
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
          {settings.map((setting: string) => (
            <MenuItem key={setting} onClick={() => friendsOption(setting)}>
                <Typography textAlign="left">{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Modal open={isFriendManagementWindowOpen} onClose={handleCloseWindow}>{friendHandlerWindow}</Modal>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        <Box sx={{ p: 2 }}>
          <LimitedProfile />
        </Box>
      </Popover>
    </AppBar>
  );
};
export default OptionBarFriends;