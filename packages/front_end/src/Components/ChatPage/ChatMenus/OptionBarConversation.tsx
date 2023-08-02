import axios from 'axios';
import * as React from 'react';
import {Popover, useTheme, Avatar, Button, Modal, Autocomplete, TextField, Menu, IconButton, Typography, Box, MenuItem, Tooltip, AppBar, List, ListItemIcon, ListItemButton, ListItemText } from '@mui/material';
import DehazeIcon from '@mui/icons-material/Dehaze';
import ClearIcon from '@mui/icons-material/Clear';
import { UserContext, User } from 'Contexts/userContext';
import { chatroomType, ChatroomUser, userPermission, Chatroom } from 'Components/Interfaces';
import { LimitedProfile } from 'Components/ProfilePage/Profile';
import { socket } from 'Contexts/socketContext';

const OptionBarConversation: React.FC = () => {
  const AdminSettings = ['Add', 'Ban', 'Kick', 'Make Admin', 'Mute', 'Quit', 'UnMute', 'View Members'];
  const UserSettings = ['Add', 'Quit', 'View Members'];
  const FriendSettings = ['Block', 'Invite to Play', 'View Profile']
  const [mode, setMode] = React.useState<string>('');
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [isFriendManagementWindowOpen, setWindowIsOpen] = React.useState(false);
  const theme = useTheme();
  const createChannelcolors = theme.palette.mode === 'dark' ? '#FFFFFF' : '#2067A1';
  const [UserName, setUserName] = React.useState('');
  const [refresh, setRefresh] = React.useState(false);
  const [Users, setUsers] = React.useState<User[]>([]);
  const {user, updateUser} = React.useContext(UserContext);
  const [userRights, setUserRights] = React.useState(UserSettings);
  const [chatroomUsers, setChatroomUsers] = React.useState<ChatroomUser[]>([]);
  const [usersInCurrentChat, setUsersInCurrentChat] = React.useState<User[]>([]);
  const [usersNotInCurrentChat, setUsersNotInCurrentChat] = React.useState<User[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'contact-options-popover' : undefined;
  
/*   const fetchUsers = async (setChatroomUsers: any, setUsers: any, setUsersInCurrentChat: any, setUsersNotInCurrentChat: any, chatroomUsers: any, Users:any, user: any) => {
    try {
      const response = await axios.get(`http://localhost:4242/chatroomuser/chatroom/${user?.chatInUse?.chat?.id}`, {
        headers: {
          'Authorization': user?.token,
          'userId': user?.id
        }
      });
      if (response.status === 200) {
        const ChatroomUsersData: ChatroomUser[] = response.data;
        setChatroomUsers(ChatroomUsersData);
      }
    } catch (error) {
      console.error('Error fetching chatroom users', error);
    }
    try {
      const response = await axios.get('http://localhost:4242/user', {
        headers: {
          'Authorization': user?.token,
          'userId': user?.id
        }
      });
      if (response.status === 200) {
        const UsersData: User[] = response.data;
        setUsers(UsersData);
        const tempUsersInChan: User[] = [];
        const tempUsersNotInChan: User[] = [];
  
        Users.forEach((userToFind: User) => {
          const isUser = chatroomUsers.find((chatUser: ChatroomUser) => {
            return chatUser.userId === userToFind.id;
          });
          if (isUser !== undefined && user?.id !== isUser?.userId && !isUser.banStatus) {
            tempUsersInChan.push(userToFind);
          } else if (isUser === undefined) {
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
  
  
  React.useEffect(() => {
    fetchUsers(
      setChatroomUsers,
      setUsers,
      setUsersInCurrentChat,
      setUsersNotInCurrentChat,
      chatroomUsers,
      Users,
      user
    );
  }, []); */

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
  }, [user, refresh]);
  
  socket.on("connected",() => {
/*     socket.on("chatroom created", (data: Chatroom) => {
      setJoinChatroom((prevJoinChat: Chatroom[]) => [...prevJoinChat, data]);
    }) */
    socket.on("user left", () => {
      setRefresh(!refresh);
    })
    socket.on("chatroom quitted", (data: Chatroom) => {
      const newChans = user?.Chatroom?.filter((chat: Chatroom) => chat.name !== data.name);
      const chatUserToDelete = user?.chatrooms?.filter((chatUser: ChatroomUser) => chatUser.chatroomId !== data.id);
      alert(data.name + " data id");
      alert(user?.chatInUse?.chat.name + " chat in use id");
      if (data.id === user?.chatInUse?.chat.id)
      {
        alert("beaucoup de caca");
        const updatedUser: Partial<User> = { ...user, chatInUse: undefined, Chatroom: newChans, chatrooms: chatUserToDelete };
        updateUser(updatedUser);    
      }
      else
      {
        alert("beaucoup plus de caca");
        const updatedUser: Partial<User> = { ...user, Chatroom: newChans, chatrooms: chatUserToDelete };
        updateUser(updatedUser);    
      }
    })
/*     socket.on("chatroom updated", (data: Chatroom) => {
      const chatroomIndexToUpdate = user?.Chatroom?.findIndex((chatroom: Chatroom) => chatroom.id === data.id);

      if (chatroomIndexToUpdate !== -1 && chatroomIndexToUpdate !== undefined) {
        const updatedChatrooms = user?.Chatroom ? [...user?.Chatroom] : [];
        updatedChatrooms[chatroomIndexToUpdate] = data;
        setJoinChatroom((prevJoinChat: Chatroom[]) => prevJoinChat.map((chat: Chatroom) => chat.name === data.name ? data: chat));
        setOwnChatroom((prevOwnChat: Chatroom[]) => prevOwnChat.map((chat: Chatroom) => chat.name === data.name ? data: chat));
        setAdminChatroom((prevAdminChat: Chatroom[]) => prevAdminChat.map((chat: Chatroom) => chat.name === data.name ? data: chat));
      }
    }) */
    /* socket.on("user joined", (chatUser: ChatroomUser, chat: Chatroom) => {
      if (user?.Chatroom?.find((chatroom: Chatroom) => {
        return (chatroom.id === chat.id)
      }) !== undefined) 
      {
        if (chat.id === user?.chatInUse?.chat.id)
        {
          const newChatInUse: ChatInUse = {
            chat: chat,
            type: chatroomType.channel,
          }
          const updatedUser: Partial<User> = { ...user, chatInUse: newChatInUse, Chatroom: user.Chatroom ? [...user.Chatroom, chat] : [chat], chatrooms: user.chatrooms ? [...user.chatrooms, chatUser] : [chatUser] };
          updateUser(updatedUser);
        }
        else
        {
          const updatedUser: Partial<User> = { ...user, Chatroom: user.Chatroom ? [...user.Chatroom, chat] : [chat], chatrooms: user.chatrooms ? [...user.chatrooms, chatUser] : [chatUser] };
          updateUser(updatedUser);
        }
      }
    }) */
/*     fetchUsers(setChatroomUsers,
      setUsers,
      setUsersInCurrentChat,
      setUsersNotInCurrentChat,
      chatroomUsers,
      Users,
      user); */
  });

  const handleMode = (mode: string) => {
    setMode(mode);
    setWindowIsOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleCloseWindow = () => {
    setWindowIsOpen(false);
  };
  
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
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
    //alert("ceci est le nom du chat in use " + user?.chatInUse?.chat.name);
    if (!UserName && mode !== 'Quit' && mode !== 'View Members' && mode !== 'Block' && mode !== 'Invite to Play' && mode !== 'View Profile') {
      alert('No username was given')
      return ;
    }
    const friendChat = Users.find((friend: User) => {
      return friend.nickname === user?.chatInUse?.chat?.name;
    })

    const Friend = Users.find((friend: User) => {
      return friend.nickname === UserName;
    });
    
    const notFriend = usersNotInCurrentChat.find((friend: User) => {
      return friend.nickname === UserName;
    });

    const chatUser = chatroomUsers.find((chatUser: ChatroomUser) => {
      return chatUser.userId === Friend?.id;
    });
  
    const selfChatroomUser = chatroomUsers.find((self: ChatroomUser) => {
          return user?.id === self.userId;
      });
    
    
    if (mode === 'Add')
    {
        const newChatroomuser: Partial<ChatroomUser> = {
          userId: notFriend?.id,
          user: notFriend,
          chatroomId: user?.chatInUse?.chat?.id,
          chatroom: user?.chatInUse?.chat,
          permission: userPermission.regular,
          banStatus: false,
          muteStatus: false,
          muteUntil: null,
       } 
        await axios.post(`http://localhost:4242/chatroomuser`, newChatroomuser, {headers: {
          'Authorization': user?.token,
          'userId': user?.id
        }}).then((response: any) =>
        {
          console.log('User added to chatroom', response.data);
          const ChatroomUsersData: ChatroomUser = response.data;
          socket.emit("user added", {id: newChatroomuser.userId});
          setChatroomUsers((prevChatUsers: any) => [...prevChatUsers, ChatroomUsersData]);
          setRefresh(!refresh);
        }).catch((error: any) => {
          console.error('Error adding user to channel', error);
          alert('Error adding user to channel');
      })
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
          const response = await axios.delete(`http://localhost:4242/chatroom/${user?.chatInUse?.chat?.name}`, {headers: {
            'Authorization': user?.token,
            'userId': user?.id
          }});
          if (response.status === 200) {
            console.log('Channel deleted', response.data);
            socket.emit("delete chatroom", response.data);
          } else {
            console.error('Deleting channel failed');
          }
        } catch (error) {
          console.error('Error occurred while deleting channel: ', error);
        }
      }
      else
      {
          await axios.delete(`http://localhost:4242/chatroomuser/${selfChatroomUser?.id}`, {headers: {
            'Authorization': user?.token,
            'userId': user?.id
          }}).then((response: any) => {
            socket.emit("user left");
            console.log('User removed from channel', response.data);
            const updatedUser: Partial<User> = { ...user, chatInUse: undefined };
            updateUser(updatedUser);
          }).catch((error: any) => {
            console.error('Error occurred while removing user from channel: ', error);
          });
      }
    }
    else if(mode === "Block")
    {
      try {
        const response = await axios.post(`http://localhost:4242/userblocks`, {blockerId: user?.id, blockedUserId: friendChat?.id}, {headers: {
          'Authorization': user?.token,
          'userId': user?.id
        }});
        console.log('User successfuly blocked', response.data);
        const id = user?.nickname;
        const blocked = friendChat?.id;
        socket.emit("blocked", {id: id, blocked: blocked});
      } catch (error) {
        console.error('Error blocking user', error);
        alert('Error adding blocking user: ' + error);
      }
      closeChat();
    }
    else if(mode === "Invite to Play")
    {
      alert(friendChat?.nickname);
      closeChat();
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
      {mode !== 'Quit' && mode !== 'View Members' && mode !== 'Add' && mode !== 'Block' && mode !== 'Invite to Play' && mode !== 'View Profile' && (
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
      {mode === 'Block' && (
        <Button onClick={handleFriends} className="profilePageButtons" sx={{ marginBottom: 2 }}>
          {mode}
        </Button>
      )}
      {mode === 'Invite to Play' && (
        <Button onClick={handleFriends} className="profilePageButtons" sx={{ marginBottom: 2 }}>
          {mode}
        </Button>
      )}
      {mode === 'View Profile' && (
        <Button onClick={handleClick} className="profilePageButtons" sx={{ marginBottom: 2 }}>
          {mode}
        </Button>
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
            <Tooltip title="Contact Menu">
            <IconButton onClick={handleOpenUserMenu}>
              <DehazeIcon></DehazeIcon>
            </IconButton>
          </Tooltip>)}
          {decodeURIComponent(user?.chatInUse?.chat?.name)}
          {(user?.chatInUse?.type === chatroomType.channel || user?.chatInUse?.type === chatroomType.friend) && (
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
    </Box>
  );
};
export default OptionBarConversation;