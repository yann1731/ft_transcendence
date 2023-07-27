import * as React from 'react';
import DehazeIcon from '@mui/icons-material/Dehaze';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DialogTitle, DialogContentText, DialogContent, DialogActions, useTheme, Autocomplete, AccordionDetails, Accordion, AccordionSummary, Button, TextField, Modal, Menu, IconButton, Typography, Box, MenuItem, Tooltip, AppBar, FormControlLabel, Checkbox, Dialog} from '@mui/material';
import '../../../App.css';
import ChanPictureSetter from '../ChatComponents/ChatPictureSetter';
import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { UserContext, User } from 'Contexts/userContext';
import { SocketContext } from "../../../Contexts/socketContext";
import { userPermission, ChatInUse, chatroomType, Chatroom, ChatroomUser, chatRoomState } from 'Components/Interfaces';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const OptionBarChans: React.FC = () => {

  const Chansettings = ['Create', 'Join', 'Edit', 'Delete'];
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [isCreationWindowOpen, setWindowIsOpen] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [channelPicture, setChannelPicture] = useState<string | null | undefined>(null);
  const [isProtected, setIsProtected] = useState<chatRoomState>(chatRoomState.public);
  const [pwd, setPassword] = useState<string | null> ('');
  const [joinPassword, setJoinPassword] = useState<string | null> ('');
  const [mode, setMode] = useState<string>('');
  const [ownChatroom, setOwnChatroom] = useState<Chatroom[]>([]);
  const [adminChatroom, setAdminChatroom] = useState<Chatroom[]>([]);
  const [joinChatroom, setJoinChatroom] = useState<Chatroom[]>([]);
  const {user, updateUser} = useContext(UserContext);
  const theme = useTheme();
  const createChannelcolors = theme.palette.mode === 'dark' ? '#FFFFFF' : '#2067A1';
  const [isDialogOpen, setDialog] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [wasPwProtected, setWasPwProtected] = useState(false);
  
  // Sockets implementation
  const socket = useContext(SocketContext);
  useEffect(() => {
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
              chatroomData.forEach((chat: Chatroom) => {
                const isJoined = chatroomUsersData.find(user => user.chatroomId === chat.id);
                if (isJoined?.permission === "admin")
                {
                  adminChatroom.push(chat);
                }
                else if (isJoined?.permission === "owner")
                {
                  adminChatroom.push(chat);
                  ownChatroom.push(chat);
                }
                else if (isJoined === undefined)
                {
                  if (chat.state !== chatRoomState.private)
                  {
                    joinChatroom.push(chat);
                  }
                }
              })
              setAdminChatroom(adminChatroom);
              setOwnChatroom(ownChatroom);
              setJoinChatroom(joinChatroom);
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
    fetchChannels();
  }, []);
  
  useEffect(() => {
    socket.on("chatroom created", (data: Chatroom) => {
      setJoinChatroom((prevJoinChat: Chatroom[]) => [...prevJoinChat, data]);
    })
    socket.on("creation success", (data: Chatroom) => {
      console.log('Chatroom created successfully!');
      setOwnChatroom((prevOwnChat: Chatroom[]) => [...prevOwnChat, data]);
      setAdminChatroom((prevAdminChat: Chatroom[]) => [...prevAdminChat, data]);
    });
    socket.on("creation failure", () => { 
      console.error('Error creating chatroom:');
      alert('Error: could not create channel');
    });
    socket.on("chatroom deleted", (data: Chatroom) => {
      setOwnChatroom((prevOwnChat: Chatroom[]) => prevOwnChat.filter((chat: Chatroom) => chat.name !== data.name));
      setAdminChatroom((prevAdminChat: Chatroom[]) => prevAdminChat.filter((chat: Chatroom) => chat.name !== data.name));
      setJoinChatroom((prevJoinChat: Chatroom[]) => prevJoinChat.filter((chat: Chatroom) => chat.name !== data.name));
      if (data.id == user?.chatInUse?.chat?.id)
      {
        const updatedUser: Partial<User> = { ...user, chatInUse: undefined };
        updateUser(updatedUser);    
      }
    })
    socket.on("deletion success", (data: Chatroom) => {
      console.log('Chatroom deleted: ', data);
      
      setOwnChatroom((prevOwnChat: Chatroom[]) => prevOwnChat.filter((chat: Chatroom) => chat.name !== data.name));
      setAdminChatroom((prevAdminChat: Chatroom[]) => prevAdminChat.filter((chat: Chatroom) => chat.name !== data.name));
      setJoinChatroom((prevJoinChat: Chatroom[]) => prevJoinChat.filter((chat: Chatroom) => chat.name !== data.name));
      const updatedUser: Partial<User> = { ...user, chatInUse: undefined };
      updateUser(updatedUser);
    })
    socket.on("deletion failure", () => {
      console.error('Error deleting chatroom');
      alert('Error deleting chatroom');
    })
    socket.on("update success", (data: Chatroom) => {
        console.log('Chatroom modified: ', data);
        const newChatInUse: ChatInUse = {
          chat: data,
          type: chatroomType.channel,
        }
        const updatedUser: Partial<User> = { ...user, chatInUse: newChatInUse };
        updateUser(updatedUser);
    })
    socket.on("update failure", () => {
      console.error('Error editing chatroom');
      alert('Error: could not edit channel');
    })
    socket.on("chatroom updated", (data: Chatroom) => {
      setJoinChatroom((prevJoinChat: Chatroom[]) => prevJoinChat.filter((chat: Chatroom) => chat.name !== data.name));
      if (data.id !== user?.chatInUse?.chat?.id)
      {
        const newChatInUse: ChatInUse = {
          chat: data,
          type: chatroomType.channel,
        }
        const updatedUser: Partial<User> = { ...user, chatInUse: newChatInUse };
        updateUser(updatedUser);
      }
    })
    // TODO chatroom inexistant, voire coment arranger ça
    socket.on("chatroom joined", (data: ChatroomUser) => {
      console.log('User added to chatroom', data);
      setJoinChatroom((prevJoinChat: Chatroom[]) => prevJoinChat.filter((chat: Chatroom) => chat.name !== data.chatroom?.name));
      if (data?.chatroom !== undefined)
      {
        const newChatInUse: ChatInUse = {
            chat: data?.chatroom,
            type: chatroomType.channel,
        }
        const updatedUser: Partial<User> = { ...user, chatInUse: newChatInUse };
        updateUser(updatedUser);
      }
      setDialog(false);
    })
    socket.on("user joined", (data: ChatroomUser) => {
      
    })
    socket.on("joining failure", () => {
      console.error('Error adding user to channel');
      alert('Error adding user to channel');
    })
  }, []);
  
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
    setIsProtected(chatRoomState.public);
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
    if (newValue === chatRoomState.pwProtected)
    {
      setIsProtected(chatRoomState.pwProtected);
    }
    if (newValue === chatRoomState.public)
    {
      setIsProtected(chatRoomState.public);
      setPassword(null);
    }
    if (newValue === chatRoomState.private)
    {
      setIsProtected(chatRoomState.private);
      setPassword(null);
    }
  };
  
  const handleDialog = () => {
    setDialog(true);
  };
  
  const chanOption = (option: string) => {
    handleMode(option);
    handleCloseUserMenu();
  };
  
  //TODO, make sure UPDATE
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
      password: isProtected === chatRoomState.pwProtected ? pwd : null,
    };
    console.log(newChannel);
    if (mode === 'Create')
    {
      if (isProtected === chatRoomState.pwProtected && pwd === "")
      alert("Error: no password given");
      else if (isProtected === chatRoomState.pwProtected)
      {
        socket.emit("create password chatroom", newChannel);
      }
      else
      {
        socket.emit("create chatroom", newChannel);
      }
    }
    else if (mode === 'Edit')
    {
      if (isProtected === chatRoomState.pwProtected && pwd === "")
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
        socket.emit("update chatroom", newChan.name, newChan);
      }
      else
      {
        socket.emit("update chatroom", newChannel.name, newChannel);
      }
      setRefresh(!refresh)
    }
    else if (mode === "Delete")
    {
      socket.emit("delete chatroom", newChannel.name);
    }
    else if (mode === "Join")
    {
      //TODO changer banUntil par muteUntil
      const newChan = joinChatroom.find((chan: Chatroom) => {
        return chan.name === channelName});
        const newChatroomuser: Partial<ChatroomUser> = {
          userId: user?.id,
          user: user,
          chatroomId: newChan?.id,
          chatroom: newChan,
          permission: userPermission.regular,
          banStatus: false,
          muteStatus: false,
          muteUntil: null,
        }
        
        socket.emit("create chatroomuser", newChatroomuser);
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
          setChannelPicture(editChan.picture);
          if (editChan?.state === chatRoomState.pwProtected)
          {
            setIsProtected(chatRoomState.pwProtected);
            setWasPwProtected(true);
          }
          else if (editChan?.state === chatRoomState.public)
          {
            setIsProtected(chatRoomState.public);
            setWasPwProtected(false);
          }
          else if (editChan?.state === chatRoomState.private)
          {
            setIsProtected(chatRoomState.private);
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
      if (chat.state === chatRoomState.pwProtected)
      {
        setIsProtected(chatRoomState.pwProtected);
        handleDialog();
        return ;
      }
    }
    setIsProtected(chatRoomState.public);
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