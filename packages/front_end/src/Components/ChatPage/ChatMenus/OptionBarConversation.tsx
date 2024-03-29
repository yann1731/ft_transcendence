
import * as React from 'react';
import {Popover, useTheme, Avatar, Button, Modal, Autocomplete, TextField, Menu, IconButton, Typography, Box, MenuItem, Tooltip, AppBar, List, ListItemIcon, ListItemText, ListItem } from '@mui/material';
import DehazeIcon from '@mui/icons-material/Dehaze';
import ClearIcon from '@mui/icons-material/Clear';
import { UserContext, User } from 'Contexts/userContext';
import { chatroomType, ChatroomUser, userPermission } from 'Components/Interfaces';
import { LimitedProfile } from 'Components/ProfilePage/Profile';
import { SocketContext } from 'Contexts/socketContext';
import { AxiosResponse } from 'axios';
import myAxios from 'Components/axiosInstance';

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
  const [refresh, setRefresh] = React.useState(1);
  const [Users, setUsers] = React.useState<User[]>([]);
  const {user, updateUser} = React.useContext(UserContext);
  const [userRights, setUserRights] = React.useState(UserSettings);
  const [chatroomUsers, setChatroomUsers] = React.useState<ChatroomUser[]>([]);
  const [usersInCurrentChat, setUsersInCurrentChat] = React.useState<User[]>([]);
  const [usersNotInCurrentChat, setUsersNotInCurrentChat] = React.useState<User[]>([]);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const id = open ? 'contact-options-popover' : undefined;
  const socket = React.useContext(SocketContext);
  

  React.useEffect(() => {
    const fetchUsers = async () => {
      if (user?.chatInUse?.type === "channel") {
        await myAxios.get(`/api/chatroomuser/chatroom/${user?.chatInUse?.chat?.id}`, {headers: {
          'Authorization': sessionStorage.getItem("at"),
          'userId': user?.id
        }}).then((response: AxiosResponse) => {
          const ChatroomUsersData: ChatroomUser[] = response.data;
          setChatroomUsers(ChatroomUsersData);
          myAxios.get('/api/user', {headers: {
            'Authorization': sessionStorage.getItem("at"),
              'userId': user?.id
            }}).then((response: AxiosResponse) => {
              const UsersData: User[] = response.data;
              setUsers(UsersData);
              const tempUsersInChan: User[] = [];
              const tempUsersNotInChan: User[] = [];
              
              UsersData.forEach((userToFind: User) => {
                const isUser = ChatroomUsersData.find((chatUser: ChatroomUser) => {
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
            }).catch((error: Error) => {
            console.error('Error fetching chatroom users', error);
        })
      }).catch((error: Error) => {
        console.error('Error fetching chatroom users', error);
        })
    }
    else{
      myAxios.get('/api/user', {headers: {
        'Authorization': sessionStorage.getItem("at"),
        'userId': user?.id
      }}).then((response: AxiosResponse) => {
        const UsersData: User[] = response.data;
        setUsers(UsersData);
      }).catch((error: Error) => {
        console.error('Error fetching chatroom users', error);
      })
    }};
    fetchUsers();
  }, [user, refresh]);
  
  socket.on("connected",() => {
    socket.on("refresh", () => {
      setRefresh(refresh => refresh + 1)
    })

    socket.on("chatroom deleted", (data: any) => {
      if (user?.chatInUse?.chat?.name === data.chanName){
        const updatedUser: Partial<User> = { ...user, chatInUse: undefined };
        updateUser(updatedUser);
      }
    })

    socket.on("blocked", (data: any) => {
      if (user?.chatInUse?.chat?.name === data.id){
        const updatedUser: Partial<User> = { ...user, chatInUse: undefined };
        updateUser(updatedUser);
      }
    })
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

  const getNickname = Users.find((friend: User) => {
    return friend.nickname === user?.chatInUse?.chat?.name;
  })

  const getId = Users.find((friend: User) => {
    if (user?.chatInUse?.type === chatroomType.friend)
      if (user.chatInUse.chat.name === friend.username)
        return friend.id;
  })

  const getAvatar = Users.find((friend: User) => {
    return friend.avatar === user?.chatInUse?.chat?.picture;
  })
  
  const handleFriends = async () => {
    if (!UserName && mode !== 'Quit' && mode !== 'View Members' && mode !== 'Block' && mode !== 'Invite to Play' && mode !== 'View Profile') {
      alert('No username was given')
      return ;
    }

    const friendChat = Users.find((friend: User) => {
      return friend.username === user?.chatInUse?.chat?.name;
    })

    const Friend = Users.find((friend: User) => {
      return friend.username === UserName;
    });

    const notFriend = usersNotInCurrentChat.find((friend: User) => {
      return friend.username === UserName;
    });

    const chatUser = chatroomUsers.find((chatUser: ChatroomUser) => {
      return chatUser.userId === Friend?.id;
    });
  
    const selfChatroomUser = chatroomUsers.find((self: ChatroomUser) => {
          return user?.id === self.userId;
      });
    
    // the problem is linked to un-updated socket IDs... 
    // Why the fuck is this happening tho?
    if (mode === 'Add')
    {
      try{
        const newChatroomuser: Partial<ChatroomUser> = {
          userId: notFriend?.id,
          user: notFriend,
          userName: notFriend?.username,
          chatroomId: user?.chatInUse?.chat?.id,
          chatroom: user?.chatInUse?.chat,
          permission: userPermission.regular,
          banStatus: false,
          muteStatus: false,
          muteUntil: null,
       } 
        const response = await myAxios.post(`/api/chatroomuser`, newChatroomuser, {headers: {
          'Authorization': sessionStorage.getItem("at"),
          'userId': user?.id
        }}).then((response: AxiosResponse) => {
          const ChatroomUsersData: ChatroomUser = response.data;
          setChatroomUsers((prevChatUsers: any) => [...prevChatUsers, ChatroomUsersData]);
          socket.emit("channelUpdate", { id: newChatroomuser.userId });
          socket.emit("refresh");
        })
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

        myAxios.get(`/api/user/${chatUser.userId}`, {headers: {
          'Authorization': sessionStorage.getItem("at"),
          'userId': user?.id
        }}).then((response: AxiosResponse) => {
          const userData: User = response.data;
        
          const newChatUser: Partial<ChatroomUser> = {
            userId: chatUser.user?.id,
            chatroomId: user?.chatInUse?.chat?.id,
            userName: userData.username
          }

          myAxios.post(`/api/chatroomuser/ban/${chatUser.id}`, newChatUser, {headers: {
            'Authorization': sessionStorage.getItem("at"),
            'userId': user?.id
          }}).then((response: AxiosResponse) => {
              socket.emit("refresh");
              socket.emit("blocked", {id: user?.chatInUse?.chat?.name, blocked: Friend?.id})
              socket.emit("channelUpdate", { id: newChatUser.userId});
              socket.emit("clearOtherHistory", { otherID: Friend?.id});
          }).catch((error: Error) => {
            console.error('Error occurred while removing user from channel: ', error);
          })
        }).catch((error: Error) => {
          console.error('Error occurred while removing user from channel: ', error);
        })

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
          await myAxios.delete(`/api/chatroomuser/${chatUser.id}`, {headers: {
            'Authorization': sessionStorage.getItem("at"),
            'userId': user?.id
          }}).then((response: AxiosResponse) => {
          if (response.status === 200){
            socket.emit("channelUpdate", { id: chatUser.userId });
            socket.emit("clearOtherHistory", { chat: user?.chatInUse?.chat.name, otherID: chatUser.userId });
            socket.emit("refresh2");
            // socket.emit("blocked", {id: user?.chatInUse?.chat?.name, blocked: Friend?.id})
          } else {
            console.error('Removing user from channel failed');
          }
        }).catch((error: Error) => {
          console.error('Error occurred while removing user from channel: ', error);
        })
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
        await myAxios.patch(`/api/chatroomuser/${chatUser.id}`, newChatUser, {headers: {
            'Authorization': sessionStorage.getItem("at"),
            'userId': user?.id
          }}).then((response: AxiosResponse) => {
            const ChatroomUsersData: ChatroomUser = response.data;
            setChatroomUsers((prevChatUsers: any) => [...prevChatUsers, ChatroomUsersData]);
            socket.emit("refresh");
          }).catch((error: Error) => {
          console.error('Error fetching chatroom users', error);
        })
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
        await myAxios.patch(`/api/chatroomuser/${chatUser.id}`, chatUser, {headers: {
            'Authorization': sessionStorage.getItem("at"),
            'userId': user?.id
          }}).then((response: AxiosResponse) => {
            const ChatroomUsersData: ChatroomUser = response.data;
            setChatroomUsers((prevChatUsers: any) => [...prevChatUsers, ChatroomUsersData]);
            socket.emit("muteUser", {mute: chatUser});
            socket.emit("refresh")
          }).catch((error: Error) => {
          console.error('Error fetching chatroom users', error);
        })
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
        await myAxios.patch(`/api/chatroomuser/${chatUser.id}`, chatUser, {headers: {
            'Authorization': sessionStorage.getItem("at"),
            'userId': user?.id
          }}).then((response: AxiosResponse) => {
            const ChatroomUsersData: ChatroomUser = response.data;
            setChatroomUsers((prevChatUsers: any) => [...prevChatUsers, ChatroomUsersData]);
            socket.emit("unmuteUser", {mute: chatUser});
            socket.emit("refresh")
          }).catch((error: Error) => {
          console.error('Error fetching chatroom users', error);
        })
      }                
    }
    else if (mode === 'Quit')
    {     
      if (user?.id === user?.chatInUse?.chat?.userId)
      {
        await myAxios.delete(`/api/chatroom/${user?.chatInUse?.chat?.name}`, {headers: {
            'Authorization': sessionStorage.getItem("at"),
            'userId': user?.id
          }}).then((response: AxiosResponse) => {
            if (response.status){
              socket.emit("delete chatroom", {chanName: user?.chatInUse?.chat?.name});
              const updatedUser: Partial<User> = { ...user, chatInUse: undefined};
              updateUser(updatedUser);
              socket.emit("clearHistory");
              socket.emit("getChannels", { id: user?.id});
              socket.emit("refresh");
            } else {
             console.error('Deleting channel failed');
            }
          }).catch((error: Error) => {
            console.error('Error occurred while deleting channel: ', error);
          })
      }
      else
      {
          await myAxios.delete(`/api/chatroomuser/${selfChatroomUser?.id}`, {headers: {
            'Authorization': sessionStorage.getItem("at"),
            'userId': user?.id
          }}).then((response: AxiosResponse) => {
            const updatedUser: Partial<User> = { ...user, chatInUse: undefined };
            updateUser(updatedUser);
            socket.emit("clearHistory");
            socket.emit("getChannels", { id: user?.id});
            socket.emit("refresh");
          }).catch((error: Error) => {
            console.error('Error occurred while removing user from channel: ', error);
          });
      }
    }
    else if(mode === "Block")
    {
      try {
        const response = await myAxios.post(`/api/userblocks`, {blockerId: user?.id, blockedUserId: friendChat?.id}, {headers: {
          'Authorization': sessionStorage.getItem("at"),
          'userId': user?.id
        }});
        const id = user?.nickname;
        const blocked = friendChat?.id;
        let _chat: Array<string>;
        if (user?.username) {
          _chat = ["null", "null", "friend", user?.username];
          localStorage.setItem(user?.username, JSON.stringify(_chat));
        }
        socket.emit("getFriends", { id: user?.id});
        socket.emit("friendUpdate", { id: blocked });
        socket.emit("clearHistory");
        socket.emit("blocked", {id: id, blocked: blocked});
        socket.emit("clearOtherHistory", { chat: user?.chatInUse?.chat.name, otherID: blocked });
        socket.emit("refresh2");
      } catch (error) {
        console.error('Error blocking user', error);
        alert('Error adding blocking user: ' + error);
      }
      closeChat();
    }
    else if (mode === "Invite to Play")
    {
      socket.emit("inviteToPlay", { username: friendChat?.username });
    }

    setUserName('');
    handleCloseWindow();
    setMode('');
  };
  
  const handleUserSelection = (event: React.ChangeEvent<{}>, friend: User | null) => {
    if (friend) {
      setUserName(friend.username);
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
            <ListItem key={user.id} >
              <ListItemIcon >
                <Avatar alt={user?.nickname} src={user?.avatar || undefined} />
              </ListItemIcon>
              <ListItemText primary={user?.nickname} />
            </ListItem>
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
          <LimitedProfile avatar={getAvatar?.avatar || 'default'} userId={getId?.id || 'default'} nickname={getNickname?.nickname || 'default'} />
        </Box>
      </Popover>
    </Box>
  );
};

export default OptionBarConversation;