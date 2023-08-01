import * as React from 'react';
import DehazeIcon from '@mui/icons-material/Dehaze';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DialogTitle, DialogContentText, DialogContent, DialogActions, useTheme, Autocomplete, AccordionDetails, Accordion, AccordionSummary, Button, TextField, Modal, Menu, IconButton, Typography, Box, MenuItem, Tooltip, AppBar, FormControlLabel, Checkbox, Dialog} from '@mui/material';
import '../../../App.css';
import ChanPictureSetter from '../ChatComponents/ChatPictureSetter';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext, User } from 'Contexts/userContext';
import { SocketContext } from "../../../Contexts/socketContext";
import { userPermission, ChatInUse, chatroomType, Chatroom, ChatroomUser } from 'Components/Interfaces';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const OptionBarChans: React.FC = () => {

  const Chansettings = ['Create', 'Join', 'Edit', 'Delete'];
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [isCreationWindowOpen, setWindowIsOpen] = React.useState(false);
  const [channelName, setChannelName] = React.useState('');
  const [channelPicture, setChannelPicture] = React.useState<string | null | undefined>(null);
  const [isProtected, setIsProtected] = React.useState('public');
  const [pwd, setPassword] = React.useState<string | null> ('');
  const [joinPassword, setJoinPassword] = React.useState<string | null> ('');
  const [mode, setMode] = React.useState<string>('');
  const [ownChatroom, setOwnChatroom] = React.useState<Chatroom[]>([]);
  const [adminChatroom, setAdminChatroom] = React.useState<Chatroom[]>([]);
  const [joinChatroom, setJoinChatroom] = React.useState<Chatroom[]>([]);
  const {user, updateUser} = useContext(UserContext);
  const theme = useTheme();
  const createChannelcolors = theme.palette.mode === 'dark' ? '#FFFFFF' : '#2067A1';
  const [isDialogOpen, setDialog] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [wasPwProtected, setWasPwProtected] = React.useState(false);
  
  // Sockets implementation
  const socket = useContext(SocketContext);
  React.useEffect(() => {
    const fetchChannels = async () => {
      await axios.get('http://localhost:4242/chatroom', {headers: {
        'Authorization': user?.token,
        'userId': user?.id
      }})
      .then( async (response: any) => {
        console.log('Chatrooms fetched');
        const chatroomData: Chatroom[] = response.data;
        await axios.get(`http://localhost:4242/chatroomuser/user/${user?.id}`, {headers: {
          'Authorization': user?.token,
          'userId': user?.id
        }})
        .then((response: any) => {
          console.log('ChatroomUsers fetched: ', response.data);
          
          const chatroomUsersData: ChatroomUser[] = response.data;
          const adminChatroom: Chatroom[] = [];
          const ownChatroom: Chatroom[] = [];
          const joinChatroom: Chatroom[] = [];
          const userChatroom: Chatroom[] = [];
          chatroomData.forEach((chat: Chatroom) => {
            const isJoined = chatroomUsersData.find(user => user.chatroomId === chat.id);
            if (isJoined?.permission === userPermission.regular || isJoined?.permission === userPermission.owner || isJoined?.permission === userPermission.admin)
            {
              userChatroom.push(chat);
            }
            if (isJoined?.permission === userPermission.admin)
            {
              adminChatroom.push(chat);
            }
            else if (isJoined?.permission === userPermission.owner)
            {
              adminChatroom.push(chat);
              ownChatroom.push(chat);
            }
            else if (isJoined === undefined)
            {
              if (chat.state !== "private")
              {
                joinChatroom.push(chat);
              }
            }
          })
          setAdminChatroom(adminChatroom);
          setOwnChatroom(ownChatroom);
          setJoinChatroom(joinChatroom);
          const updatedUser: Partial<User> = { ...user, Chatroom:  userChatroom};
          updateUser(updatedUser);    
        })
        .catch((error: any) => {
          console.error('Error getting ChatroomUsers: ', error);
          alert('Error: could not get ChatroomUsers: ' + error);
        })
      })
      .catch((error: any) => {
        console.error('Error fetching channels:', error);
      })
    };
    fetchChannels();
  }, []);
  
  socket.on("connected", () => {
    socket.emit("connected", user?.id);
   /*  socket.on("chatroom created", (data: Chatroom) => {
      //setJoinChatroom((prevJoinChat: Chatroom[]) => [...prevJoinChat, data]);
      const fetchChannels = async () => {
        try {
            const response = await axios.get('http://localhost:4242/chatroom', {headers: {
              'Authorization': user?.token,
              'userId': user?.id
            }});
            if (response.status === 200) {
              console.log('Chatrooms fetched');
              const chatroomData: Chatroom[] = response.data;
              
              try {
                const response = await axios.get(`http://localhost:4242/chatroomuser/user/${user?.id}`, {headers: {
                  'Authorization': user?.token,
                  'userId': user?.id
                }});
                
                if (response.status === 200) {
                  console.log('ChatroomUsers fetched: ', response.data);
                  
                  const chatroomUsersData: ChatroomUser[] = response.data;
                  const adminChatroom: Chatroom[] = [];
                  const ownChatroom: Chatroom[] = [];
                  const joinChatroom: Chatroom[] = [];
                  const userChatroom: Chatroom[] = [];
                  chatroomData.forEach((chat: Chatroom) => {
                    const isJoined = chatroomUsersData.find(user => user.chatroomId === chat.id);
                    if (isJoined?.permission === userPermission.regular || isJoined?.permission === userPermission.owner || isJoined?.permission === userPermission.admin)
                    {
                      userChatroom.push(chat);
                    }
                    if (isJoined?.permission === userPermission.admin)
                    {
                      adminChatroom.push(chat);
                    }
                    else if (isJoined?.permission === userPermission.owner)
                    {
                      adminChatroom.push(chat);
                      ownChatroom.push(chat);
                    }
                    else if (isJoined === undefined)
                    {
                      if (chat.state !== "private")
                      {
                        joinChatroom.push(chat);
                      }
                    }
                  })
                  setAdminChatroom(adminChatroom);
                  setOwnChatroom(ownChatroom);
                  setJoinChatroom(joinChatroom);
                  const updatedUser: Partial<User> = { ...user, Chatroom:  userChatroom};
                  updateUser(updatedUser);    
                }
              } catch (error) {
                console.error('Error getting ChatroomUsers: ', error);
                alert('Error: could not get ChatroomUsers: ' + error);
              }
            }
          } catch (error) {
            console.error('Error fetching channels:', error);
          }
        };
        fetchChannels(); */
    socket.on("chatroom created", (data: any) => {
      setJoinChatroom((prevJoinChat: Chatroom[]) => [...prevJoinChat, data.newChatroom]);
    })
    socket.on("chatroom deleted", (data: any) => {
      setOwnChatroom((prevOwnChat: Chatroom[]) => prevOwnChat.filter((chat: Chatroom) => chat.name !== data.chatroomDeleted.name));
      setAdminChatroom((prevAdminChat: Chatroom[]) => prevAdminChat.filter((chat: Chatroom) => chat.name !== data.chatroomDeleted.name));
      setJoinChatroom((prevJoinChat: Chatroom[]) => prevJoinChat.filter((chat: Chatroom) => chat.name !== data.chatroomDeleted.name));
      const newChans = user?.Chatroom?.filter((chat: Chatroom) => chat.name !== data.chatroomDeleted.name);
      const chatUserToDelete = user?.chatrooms?.filter((chatUser: ChatroomUser) => chatUser.chatroomId !== data.chatroomDeleted.id);
      if (data.chatroomDeleted.name === data.chatInUseName)
      {
        const updatedUser: Partial<User> = { ...user, chatInUse: undefined, Chatroom: newChans, chatrooms: chatUserToDelete };
        updateUser(updatedUser);    
      }
      else
      {
        const updatedUser: Partial<User> = { ...user, Chatroom: newChans, chatrooms: chatUserToDelete };
        updateUser(updatedUser);    
      }
    })
    socket.on("chatroom updated", (data: any) => {
      const chatroomIndexToUpdate = user?.Chatroom?.findIndex((chatroom: Chatroom) => chatroom.id === data.chatroomUpdated.id);

      if (chatroomIndexToUpdate !== -1 && chatroomIndexToUpdate !== undefined) {
        const updatedChatrooms = user?.Chatroom ? [...user?.Chatroom] : [];
        updatedChatrooms[chatroomIndexToUpdate] = data.chatroomUpdated;
        setJoinChatroom((prevJoinChat: Chatroom[]) => prevJoinChat.map((chat: Chatroom) => chat.name === data.chatroomUpdated.name ? data.chatroomUpdated: chat));
        setOwnChatroom((prevOwnChat: Chatroom[]) => prevOwnChat.map((chat: Chatroom) => chat.name === data.chatroomUpdated.name ? data.chatroomUpdated: chat));
        setAdminChatroom((prevAdminChat: Chatroom[]) => prevAdminChat.map((chat: Chatroom) => chat.name === data.chatroomUpdated.name ? data.chatroomUpdated: chat));
      }
    })
    //TODO, vérifier si je dois implémenter quelque chose pour que l'utilisateur puisse voir les autres utilisateurs dans le channel
    socket.on("user joined", (data: any) => {
      if (user?.Chatroom?.find((chatroom: Chatroom) => {
        return (chatroom.name === data.chatroomUpdated.name)
      }) !== undefined) 
      {
        if (data.chatroomUpdated.name === user?.chatInUse?.chat.name)
        {
          const newChatInUse: ChatInUse = {
            chat: data.chatroomUpdated,
            type: chatroomType.channel,
          }
          const updatedUser: Partial<User> = { ...user, chatInUse: newChatInUse, Chatroom: user.Chatroom ? [...user.Chatroom, data.chatroomUpdated] : [data.chatroomUpdated], chatrooms: user.chatrooms ? [...user.chatrooms, data.newChatUser] : [data.newChatUser] };
          updateUser(updatedUser);
        }
        else
        {
          const updatedUser: Partial<User> = { ...user, Chatroom: user.Chatroom ? [...user.Chatroom, data.chatroomUpdated] : [data.chatroomUpdated], chatrooms: user.chatrooms ? [...user.chatrooms, data.newChatUser] : [data.newChatUser] };
          updateUser(updatedUser);
        }
      }
    })
  });

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  const handleMode = (mode: string) => {
    setMode(mode);
    setWindowIsOpen(true);
  };
  
  const handleCloseWindow = () => {
    setWindowIsOpen(false);
    setDialog(false);
    setMode('');
    setChannelName('');
    setChannelPicture(null);
    setPassword('');
    setIsProtected('public');
  };
  
  const handlePictureSelection = (picture: string | null | undefined) => {
    if (picture) {
      setChannelPicture(picture);
    }
  };
  
  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword: any) => !prevShowPassword);
  };
  
  const handleIsProtected = (event: React.SyntheticEvent, expanded: string) => {
    const newValue = expanded;
    setIsProtected(newValue);
    if (newValue !== 'pwProtected')
    {
      setPassword(null)
    }
  };
  
  const handleDialog = () => {
    setDialog(true);
  };
  
  const chanOption = (option: string) => {
    handleMode(option);
    handleCloseUserMenu();
  };
  
  const handleChannel = async () => {
    if (!channelName) {
      alert('Error: No channel name given');
      if (mode === 'Delete')
      {
        setDialog(false);
      }
      return ;
    }
    let newChannel: Partial<Chatroom> = {
      name: channelName,
      picture: channelPicture,
      state: isProtected,
      userId: user?.id,
      password: isProtected === 'pwProtected' ? pwd : null,
    };
    console.log(newChannel);
    if (mode === 'Create')
    {
      if (isProtected === 'pwProtected' && pwd === "")
        alert("Error: no password given");
      else if (isProtected === 'pwProtected')
      {
        await axios.post('http://localhost:4242/chatroom/password', newChannel, {headers: {
          'Authorization': user?.token,
          'userId': user?.id
        }})
        .then((response: any) => {
          console.log('Chatroom created:', response.data);
          const newChannelData = response.data;
          socket.emit("create chatroom", { newChatroom: newChannelData });
          if (user)
          {
            const newChatInUse: ChatInUse = {
              chat: newChannelData,
              type: chatroomType.channel,
            }
            const updatedUser: Partial<User> = { ...user, chatInUse: newChatInUse, Chatroom: user.Chatroom ? [...user.Chatroom, newChannelData] : [newChannelData]};
            updateUser(updatedUser);
            setOwnChatroom((prevOwnChat: Chatroom[]) => [...prevOwnChat, newChannelData]);
            setAdminChatroom((prevAdminChat: Chatroom[]) => [...prevAdminChat, newChannelData]);
          }
        })
        .catch((error: any) => {
          console.error('Error creating chatroom:', error);
          alert('Error: could not create channel: ');
        })
      }
      else
      {
        await axios.post('http://localhost:4242/chatroom/', newChannel, {headers: {
          'Authorization': user?.token,
          'userId': user?.id
        }})
        .then((response: any) => {
          console.log('Chatroom created:', response.data);            
          const newChannelData = response.data;
          socket.emit("create chatroom", { newChatroom: newChannelData });
          if (user)
          {
            const newChatInUse: ChatInUse = {
              chat: newChannelData,
              type: chatroomType.channel,
            }
            const updatedUser: Partial<User> = { ...user, chatInUse: newChatInUse, Chatroom: user.Chatroom ? [...user.Chatroom, newChannelData] : [newChannelData]};
            updateUser(updatedUser);
            setOwnChatroom((prevOwnChat: Chatroom[]) => [...prevOwnChat, newChannelData]);
            setAdminChatroom((prevAdminChat: Chatroom[]) => [...prevAdminChat, newChannelData]);
          }
        })
        .catch((error: any) => {
          console.error('Error creating chatroom:', error);
          alert('Error: could not create channel');
        })
      }
    }
    else if (mode === 'Edit')
    {
      if (isProtected === 'pwProtected' && pwd === "")
      {
        if (wasPwProtected === false)
        {
          alert("Password empty, please add a password to the selected channel");
          return ;
        }
        const newChan: Partial<Chatroom> = {
          name: channelName,
          picture: channelPicture,
          state: isProtected,
          userId: user?.id,
        }
        await axios.patch(`http://localhost:4242/chatroom/${channelName}`, newChan, {headers: {
          'Authorization': user?.token,
          'userId': user?.id
        }})
        .then((response: any) => {
          console.log('Chatroom modified:', response.data);
          const ChannelData = response.data;
          socket.emit("update chatroom", { chatroomUpdated: ChannelData });
        })
        .catch((error: any) => {
          console.error('Error editing chatroom:', error);
          alert('Error: could not edit channel');
        })
      }
      else
      {    
        await axios.patch(`http://localhost:4242/chatroom/${channelName}`, newChannel, {headers: {
          'Authorization': user?.token,
          'userId': user?.id
        }})
        .then((response: any) => {
          console.log('Chatroom modified:', response.data);
          const ChannelData = response.data;
          socket.emit("update chatroom", { chatroomUpdated: ChannelData });
        })
        .catch((error: any) => {
          console.error('Error editing chatroom:', error);
          alert('Error: could not edit channel');
        })
      }
    }
    else if (mode === "Delete")
    {
      await axios.delete(`http://localhost:4242/chatroom/${channelName}`, {headers: {
       'Authorization': user?.token,
       'userId': user?.id
      }})
      .then((response: any) => {
       console.log('Chatroom deleted:', response.data);
       socket.emit("delete chatroom", { chatroomDeleted: response.data, chatInUseName: user?.chatInUse?.chat?.name });
      })
      .catch((error: any) => {
       console.error('Error deleting chatroom:', error);
       alert('Error deleting chatroom');
      })
    }
    else if (mode === "Join")
    {
      const newChan = joinChatroom.find((chan: Chatroom) => {
        return chan.name === channelName});
      if (newChan && user)
      {
        const newChatroomuser: Partial<ChatroomUser> = {
          userId: user.id,
          user: user,
          chatroomId: newChan.id,
          chatroom: newChan,
          permission: userPermission.regular,
          banStatus: false,
          muteStatus: false,
          muteUntil: null,
        }
        await axios.post(`http://localhost:4242/chatroomuser`, newChatroomuser, {headers: {
          'Authorization': user?.token,
          'userId': user?.id
        }})
        .then((response: any) => {
          const newChatroomuserData = response.data;
          const updatedNewChan = { ...newChan };
          updatedNewChan.users = updatedNewChan.users ? [...updatedNewChan.users, newChatroomuserData] : [newChatroomuserData];
          console.log('User added to chatroom ', newChatroomuserData);
          socket.emit("join chatroom", { newChatUser: newChatroomuserData, chatroomUpdated: updatedNewChan });
          setJoinChatroom((prevJoinChat: Chatroom[]) => prevJoinChat.filter((chat: Chatroom) => chat.name !== channelName));
          if (newChatroomuserData !== undefined)
          {
            const newChatInUse: ChatInUse = {
              chat: newChan,
              type: chatroomType.channel,
            }
            if (user)
            {
              const updatedUser: Partial<User> = { ...user, chatInUse: newChatInUse, Chatroom: user.Chatroom ? [...user.Chatroom, updatedNewChan] : [updatedNewChan], chatrooms: user.chatrooms ? [...user.chatrooms, newChatroomuserData] : [newChatroomuserData] };
              updateUser(updatedUser);
            }
          }
          setDialog(false);
        })
        .catch((error: any) => {
          console.error('Error adding user to channel', error);
          alert('Error adding user to channel');
        })
      }
    }
    handleCloseWindow();
  };
  
  const handleChannelSelection = (event: React.ChangeEvent<{}>, value: Chatroom | null) => {
    if (value) {
      setChannelName(value.name);
      const editChan = adminChatroom.find((chan: Chatroom) => {
        return chan.name === value.name});
        if (editChan !== undefined)
        {
          setIsProtected(editChan?.state);
          setChannelPicture(editChan.picture);
          if (editChan?.state === "pwProtected")
          {
            setWasPwProtected(true);
          }
          else
          {
            setWasPwProtected(false);
          }
        }
      } else {
        setChannelName('');
    }
  };
  
  const getOptionsByMode = () => {
    switch (mode) {
      case 'Delete':
        return ownChatroom;
      case 'Join':
        return joinChatroom;
      case 'Edit':
        return adminChatroom;
      default:
        return [];
    }
  };
          
  const checkChannelPrivacy = () => {
    const chat = joinChatroom.find((chan: Chatroom) => {
      return chan.name === channelName;
    })
    if (chat !== undefined)
    {
      if (chat.state === "pwProtected")
      {
        setIsProtected("pwProtected");
        handleDialog();
        return ;
      }
    }
    setIsProtected("public");
    handleChannel();
  };
  
  // TODO vérification du mot de passe devra être fait dans backend, utiliser websocket
  const handleJoin = () => {
    const chat = user?.Chatroom?.find((obj: any) => {
      return obj.name === channelName;
    })
    if (chat !== undefined)
    {
      if (joinPassword === chat?.password)
        handleChannel();
      else
      {
        setJoinPassword("");
        alert("Password does not match, please try again")
        return ;
      }
    }
    setJoinPassword("");
    alert("Password does not match, please try again")
    return ;
  };
  
  const channelHandlerWindow = (
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
      {mode === 'Create' ?
        <TextField
          variant='outlined'
          label="Channel Name"
          fullWidth
          className="newChannelTextField"
          sx={{ 
           marginBottom: 2,
           '& label': { color: createChannelcolors },
           '& .MuiInputLabel-root.Mui-focused' : { color: createChannelcolors }
          }}
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
        /> 
        : 
        <Autocomplete
          disablePortal
          id="Channels"
          options={getOptionsByMode()}
          getOptionLabel={(option) => decodeURIComponent(option.name)}
          fullWidth
          sx={{ marginBottom: 2 }}
          onChange={handleChannelSelection}
          renderInput={(params) => 
            <TextField
              {...params}
              className="newChannelTextField"
              sx={{
                '& label': { color: createChannelcolors },
                '& .MuiInputLabel-root.Mui-focused' : { color: createChannelcolors }
              }}
              label="Channels" 
            />
          }
        />
      }
      {(mode === 'Create' || (mode === 'Edit' && ownChatroom.find((chat: Chatroom) => {return chat?.name === channelName}))) && (
        <Accordion variant="outlined" sx={{ marginBottom: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body1">Channel Privacy</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <FormControlLabel
                value="public"
                control={
                  <Checkbox 
                    checked={isProtected === 'public'} 
                    sx={{ color: createChannelcolors, '&.Mui-checked': { color: createChannelcolors } }}
                  />
                }
                label="Public"
                sx={{ marginBottom: 2 }}
                onClick={(event) => handleIsProtected(event, 'public')}
              />
              <FormControlLabel
                value="private"
                control={
                  <Checkbox 
                    checked={isProtected === 'private'} 
                    sx={{ color: createChannelcolors, '&.Mui-checked': { color: createChannelcolors } }} 
                  />
                }
                label="Private"
                sx={{ marginBottom: 2 }}
                onClick={(event) => handleIsProtected(event, 'private')}
              />
              <FormControlLabel
                value="protected"
                control={
                  <Checkbox 
                    checked={isProtected === 'pwProtected'} 
                    sx={{ color: createChannelcolors, '&.Mui-checked': { color: createChannelcolors } }}
                  />
                }
                label="Password Protected"
                sx={{ marginBottom: 2 }}
                onClick={(event) => handleIsProtected(event, 'pwProtected')}
              />
              {isProtected === 'pwProtected' && (
                <TextField
                  label="Password"
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    ),
                  }}
                  sx={{ marginBottom: 2 }}
                  value={pwd}
                  onChange={(e) => setPassword(e.target.value)}
                />
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
      )}
      {mode !== 'Delete' && mode !== 'Join' && (
        <Box>
          <ChanPictureSetter onPictureSelected={handlePictureSelection} defaultPicture={channelPicture} />
          <Button onClick={handleChannel} className="profilePageButtons">
            {mode}
          </Button>
          <Button onClick={handleCloseWindow} className="profilePageButtons" sx={{ marginTop: '15px'}}>
            Cancel
          </Button>
        </Box>
        )}
      {mode === 'Delete' && (
        <Box>
          <Button onClick={handleDialog} className="profilePageButtons">
            {mode}
          </Button>
          <Button onClick={handleCloseWindow} className="profilePageButtons" sx={{ marginTop: '15px'}}>
            Cancel
          </Button>
        </Box>)}
      {mode === 'Delete' && (
        <Box>
          <Dialog
            open={isDialogOpen}
            onClose={handleCloseWindow}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Do you really want to delete this channel?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText color={"red"} id="alert-dialog-description">
                All messages from this channel will be permanently lost.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button className="profilePageButtons" onClick={handleCloseWindow}>Cancel</Button>
              <Button className="profilePageButtons" onClick={handleChannel}>Agree</Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
      {mode === 'Join' && (
        <Box>
          <Button onClick={checkChannelPrivacy} className="profilePageButtons">
            {mode}
          </Button>
          <Button onClick={handleCloseWindow} className="profilePageButtons" sx={{ marginTop: '15px'}}>
            Cancel
          </Button>
        </Box>)}
      {mode === 'Join' && isProtected === "pwProtected" && (
        <Box>
          <Dialog
            open={isDialogOpen}
            onClose={handleCloseWindow}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Please, enter password to join the chat!"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText color={"red"} id="alert-dialog-description" textAlign={'center'}>
                Enter Password: 
                <TextField
                  variant='outlined'
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <IconButton onClick={handleTogglePassword} edge="end">
                        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    ),
                  }}
                  fullWidth
                  className="newChannelTextField"
                  sx={{ 
                    marginBottom: 2,
                    marginTop: 2,
                    '& label': { color: createChannelcolors },
                    '& .MuiInputLabel-root.Mui-focused' : { color: createChannelcolors }
                  }}
                  value={joinPassword}
                  onChange={(e) => setJoinPassword(e.target.value)}
                /> 
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button className="profilePageButtons" onClick={handleCloseWindow}>Cancel</Button>
              <Button className="profilePageButtons" onClick={handleJoin}>Join</Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
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
          Channels
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
          {Chansettings.map((setting) => (
            <MenuItem key={setting} onClick={() => chanOption(setting)}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Modal open={isCreationWindowOpen} onClose={handleCloseWindow}>{channelHandlerWindow}</Modal>
    </AppBar>
  );
};
export default OptionBarChans; 