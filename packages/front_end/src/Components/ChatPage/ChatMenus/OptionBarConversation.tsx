import axios from 'axios';
import * as React from 'react';
import {useTheme, Avatar, Button, Modal, Autocomplete, TextField, Menu, IconButton, Typography, Box, MenuItem, Tooltip, AppBar, List, ListItemIcon, ListItemButton, ListItemText } from '@mui/material';
import DehazeIcon from '@mui/icons-material/Dehaze';
import ClearIcon from '@mui/icons-material/Clear';
import { UserContext, User } from 'Contexts/userContext';
import { chatroomType, ChatroomUser, userPermission, ChatInUse } from 'Components/Interfaces';

const OptionBarConversation: React.FC = () => {
  const AdminSettings = ['Add', 'Ban', 'Kick', 'Make Admin', 'Mute', 'Quit', 'UnMute', 'View Members'];
  const UserSettings = ['Add', 'Quit', 'View Members'];
  const FriendSettings = ['Mute', 'Unmute']
  const [mode, setMode] = React.useState<string>('');
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [isFriendManagementWindowOpen, setWindowIsOpen] = React.useState(false);
  const theme = useTheme();
  const createChannelcolors = theme.palette.mode === 'dark' ? '#FFFFFF' : '#2067A1';
  const [UserName, setUserName] = React.useState('');
  const [Users, setUsers] = React.useState<User[]>([]);
  const {user, updateUser} = React.useContext(UserContext);
  const [userRights, setUserRights] = React.useState(UserSettings);
  const [chatroomUsers, setChatroomUsers] = React.useState<ChatroomUser[]>([]);
  const [usersInCurrentChat, setUsersInCurrentChat] = React.useState<User[]>([]);
  const [usersNotInCurrentChat, setUsersNotInCurrentChat] = React.useState<User[]>([]);

  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:4242/chatroomuser/chatroom/${user?.chatInUse?.chat?.id}`, {headers: {
          'Authorization': user?.token,
          'userId': user?.id
        }});
        if (response.status === 200) {
          const ChatroomUsersData: ChatroomUser[] = response.data;
          setChatroomUsers(ChatroomUsersData);
        } 
      } catch (error) {
        console.error('Error fetching chatroom users', error);
      }
      try {
        const response = await axios.get('http://localhost:4242/user', {headers: {
          'Authorization': user?.token,
          'userId': user?.id
        }});
        if (response.status === 200) {
          const UsersData: User[] = response.data;
          setUsers(UsersData);
          const tempUsersInChan: User[] = [];
          const tempUsersNotInChan: User[] = [];
          
          Users.forEach((userToFind: User) => {
            const isUser = chatroomUsers.find((chatUser: ChatroomUser) => {
              return chatUser.userId === userToFind.id;
            })
            if (isUser !== undefined && user?.id !== isUser?.userId && isUser.banStatus !== true)
            {
              tempUsersInChan.push(userToFind);
            }
            else if (isUser === undefined)
            {
              tempUsersNotInChan.push(userToFind);
            }
          });
          setUsersInCurrentChat(tempUsersInChan);
          setUsersNotInCurrentChat(tempUsersNotInChan);
        }
      } catch (error) {
        console.error('Error fetching chatroom users', error);
      }
    };
    fetchUsers();
  }, [mode]);
  
  const handleMode = (mode: string) => {
    setMode(mode);
    setWindowIsOpen(true);
  };
  
  const handleCloseWindow = () => {
    setWindowIsOpen(false);
  };
  // TODO S'assurer qu'il n'y a pas de variables superflus. Peut-être n'utiliser suelement que chatroomUsers et usersInCurrentChat
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
    
      let currentChatroomUser: ChatroomUser | undefined;
      chatroomUsers.forEach((chatUser: ChatroomUser) => {
        if (chatUser.userId === user?.id)
        currentChatroomUser = chatUser;
      });
      if (user?.chatInUse?.type === "friend")
      {
        setUserRights(FriendSettings)
      }
      else if (user?.chatInUse?.chat?.userId === user?.id || currentChatroomUser?.permission === userPermission.admin)
      {
        setUserRights(AdminSettings);
      }
      else
      {
        setUserRights(UserSettings);    
      }
    };
    
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
    
    const closeChat = () => {
      const updatedUser: Partial<User> = { ...user, chatInUse: undefined };
      updateUser(updatedUser);
    };
    
    const friendsOption = (option: string) => {
      handleMode(option);
      handleCloseUserMenu();
    };
    
    const handleFriends = async () => {
      if (!UserName && mode !== 'Quit' && mode !== 'View Members') {
        alert('No username was given')
        return ;
      }
      const Friend = Users.find((friend: User) => {
        return friend.nickname === UserName;
      });
      
      const chatUser = chatroomUsers.find((chatUser: ChatroomUser) => {
        return chatUser.userId === Friend?.id;
      });
      
      const selfChatroomUser = chatroomUsers.find((self: ChatroomUser) => {
        return user?.id === self?.userId;
      });

      if (mode === 'Add')
      {
        try {
          const newChatroomuser: Partial<ChatroomUser> = {
            userId: Friend?.id,
            user: Friend,
            chatroomId: user?.chatInUse?.chat?.id,
            chatroom: user?.chatInUse?.chat,
            permission: userPermission.regular,
            banStatus: false,
            banUntil: null,
            muteStatus: false,
          }
          const response = await axios.post(`http://localhost:4242/chatroomuser`, newChatroomuser, {headers: {
            'Authorization': user?.token,
            'userId': user?.id
          }});
          if(response.status === 200)
          {
            console.log('User added to chatroom', response.data);
            const ChatroomUsersData: ChatroomUser = response.data;
            setChatroomUsers((prevChatUsers: any) => [...prevChatUsers, ChatroomUsersData]);
          }
        } catch (error) {
            console.error('Error adding user to channel', error);
            alert('Error adding user to channel');
        }
      }
      else if (mode === 'Ban')
      {
        if (chatUser !== undefined)
        {
          if ((chatUser.permission === userPermission.owner || chatUser.permission === userPermission.admin) && selfChatroomUser?.permission !== userPermission.owner)
          {
            alert("Cannot ban owner or Admin");
            return ;
          }
          const newChatUser: Partial<ChatroomUser> = {
            banStatus: true,
          }
          try {
            const response = await axios.patch(`http://localhost:4242/chatroomuser/${chatUser.id}`, newChatUser, {headers: {
              'Authorization': user?.token,
              'userId': user?.id
            }});
            if (response.status === 200) {
              const ChatroomUsersData: ChatroomUser = response.data;
              setChatroomUsers((prevChatUsers: any) => [...prevChatUsers, ChatroomUsersData]);
            } 
          } catch (error) {
            console.error('Error fetching chatroom users', error);
          }
        };
      }
      else if (mode === 'Kick')
      {
        if (chatUser !== undefined)
        {
          if ((chatUser.permission === userPermission.owner || chatUser.permission === userPermission.admin) && selfChatroomUser?.permission !== userPermission.owner)
          {
            alert("Cannot kick owner or Admin");
            return ;
          }
          try {
            const response = await axios.delete(`http://localhost:4242/chatroomuser/${chatUser.id}`, {headers: {
              'Authorization': user?.token,
              'userId': user?.id
            }});
            if (response.status === 200) {
              console.log('User removed from channel', response.data);
            } else {
              console.error('Removing user from channel failed');
            }
          } catch (error) {
            console.error('Error occurred while removing user from channel: ', error);
          }
        }
      }
      else if (mode === 'Make Admin')
      {
        if (chatUser !== undefined)
        {
          if (chatUser.permission === userPermission.owner || chatUser.permission === userPermission.admin)
          {
            alert("This user is already an admin");
            return ;
          }
          const newChatUser: Partial<ChatroomUser> = {
            permission: userPermission.admin,
          }
          try {
            const response = await axios.patch(`http://localhost:4242/chatroomuser/${chatUser.id}`, newChatUser, {headers: {
              'Authorization': user?.token,
              'userId': user?.id
            }});
            if (response.status === 200) {
              const ChatroomUsersData: ChatroomUser = response.data;
              setChatroomUsers((prevChatUsers: any) => [...prevChatUsers, ChatroomUsersData]);
            } 
          } catch (error) {
            console.error('Error fetching chatroom users', error);
          }
        }        
      }
      else if (mode === 'Mute')
      {
        if (chatUser !== undefined)
        {
          if ((chatUser.permission === userPermission.owner || chatUser.permission === userPermission.admin) && selfChatroomUser?.permission !== userPermission.owner)
          {
            alert("Cannot mute owner or an admin");
            return ;
          }
          if (chatUser.muteStatus === true)
          {
            alert("Cannot mute, user already muted");
            return ;
          }
          chatUser.muteStatus = true;
          try {
            const response = await axios.patch(`http://localhost:4242/chatroomuser/${chatUser.id}`, chatUser, {headers: {
              'Authorization': user?.token,
              'userId': user?.id
            }});
            if (response.status === 200) {
              const ChatroomUsersData: ChatroomUser = response.data;
              setChatroomUsers((prevChatUsers: any) => [...prevChatUsers, ChatroomUsersData]);
            } 
          } catch (error) {
            console.error('Error fetching chatroom users', error);
          }
        }                
      }
      else if (mode === 'UnMute')
      {
        if (chatUser !== undefined)
        {
          if (chatUser.muteStatus === false)
          {
            alert("Cannot unmute, user not muted");
            return ;
          }
          chatUser.muteStatus = false;
          try {
            const response = await axios.patch(`http://localhost:4242/chatroomuser/${chatUser.id}`, chatUser, {headers: {
              'Authorization': user?.token,
              'userId': user?.id
            }});
            if (response.status === 200) {
              const ChatroomUsersData: ChatroomUser = response.data;
              setChatroomUsers((prevChatUsers: any) => [...prevChatUsers, ChatroomUsersData]);
            } 
          } catch (error) {
            console.error('Error fetching chatroom users', error);
          }
        }                
      }
      else if (mode === 'Quit')
      {     
        if (user?.id === user?.chatInUse?.chat?.userId)
        {
          try {
            // Make sure there's an endpoint for deleting chatroom with id
            const response = await axios.delete(`http://localhost:4242/chatroom/${user?.chatInUse?.chat?.id}`, {headers: {
              'Authorization': user?.token,
              'userId': user?.id
            }});
            if (response.status === 200) {
              console.log('Channel deleted', response.data);
              const updatedUser: Partial<User> = { ...user, chatInUse: undefined };
              updateUser(updatedUser);
            } else {
              console.error('Deleting channel failed');
            }
          } catch (error) {
            console.error('Error occurred while deleting channel: ', error);
          }
        }
        else
        {
          try {
            const response = await axios.delete(`http://localhost:4242/chatroomuser/${selfChatroomUser?.id}`, {headers: {
              'Authorization': user?.token,
              'userId': user?.id
            }});
            if (response.status === 200) {
              console.log('User removed from channel', response.data);
              const updatedUser: Partial<User> = { ...user, chatInUse: undefined };
              updateUser(updatedUser);
            } else {
              console.error('Removing user from channel failed');
            }
          } catch (error) {
            console.error('Error occurred while removing user from channel: ', error);
          }
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
        {mode !== 'Quit' && mode !== 'View Members' && mode !== 'Add' && (
          <div>
            <Autocomplete
            disablePortal
            id="Users"
            options={usersInCurrentChat}
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
        )}
        {mode === 'Add' && (
          <div>
            <Autocomplete
            disablePortal
            id="Users"
            options={usersNotInCurrentChat}
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
        )}
        {mode === 'Quit' && (
          <Button onClick={handleFriends} className="profilePageButtons" sx={{ marginBottom: 2 }}>
            {mode}
          </Button>
        )}
        {mode === 'View Members' && (
          <List>
            {usersInCurrentChat.map((user: User) => (
              <ListItemButton key={user.id}>
                <ListItemIcon>
                  <Avatar alt={user?.nickname} src={user?.avatar || undefined} />
                </ListItemIcon>
                <ListItemText primary={user?.nickname} />
              </ListItemButton>
            ))}
          </List>
        )}
      </Box>
    );
    
    return (
      <Box>
    {user?.chatInUse !== null && user?.chatInUse !== undefined ? (
      <AppBar position="relative" sx={{ boxShadow: '0' }}>
        <Box className={"chatOptionBars"} sx={{justifyContent: 'space-between' }}>
          {user?.chatInUse?.type === chatroomType.channel ? (
            <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu}>
              <DehazeIcon></DehazeIcon>
            </IconButton>
          </Tooltip>
          ) : (
            <Tooltip title="Close conversation">
            <IconButton onClick={closeChat}>
              <ClearIcon></ClearIcon>
            </IconButton>
          </Tooltip>)}
          {decodeURIComponent(user?.chatInUse?.chat?.name)}
          {user?.chatInUse?.type === chatroomType.channel && (
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
            {userRights.map((setting: string) => (
              <MenuItem key={setting} onClick={() => friendsOption(setting)}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>)}
            <Avatar src={user?.chatInUse?.chat?.picture ?? ''} sx={{ marginRight: 0.5 }}></Avatar>
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
      </AppBar>)
    }
    </Box>
  );
};
export default OptionBarConversation;