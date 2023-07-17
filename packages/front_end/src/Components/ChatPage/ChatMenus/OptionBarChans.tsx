import * as React from 'react';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { Autocomplete, AccordionDetails, Accordion, AccordionSummary, Button, TextField, Modal, Menu, IconButton, Typography, Box, MenuItem, Tooltip, AppBar, FormControlLabel, Checkbox, Dialog} from '@mui/material';
import '../../../App.css';
import { Chatroom, ChatroomUser } from 'Components/Interfaces';
import ChanPictureSetter from '../ChatComponents/ChatPictureSetter';
import axios, {AxiosResponse} from 'axios';
import { useContext } from 'react';
import { UserContext, User } from 'Contexts/userContext';
import { SocketContext } from "../../../Contexts/socketContext";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { userPermission } from 'Components/Interfaces';


export default function OptionBarChans() {

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
    const [refresh, setRefresh] = React.useState(false);
    // Sockets implementation
    const socket = useContext(SocketContext);

    React.useEffect(() => {
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
                chatroomData.forEach(chat => {
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
                    if (chat.state !== 'private')
                    {
                      joinChatroom.push(chat);
                    }
                  }
                  setAdminChatroom(adminChatroom);
                  setOwnChatroom(ownChatroom);
                  setJoinChatroom(joinChatroom);
                })
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
    }, [refresh, user?.chatInUse?.id]);
    
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
    
    const handleIsProtected = (event: React.SyntheticEvent, expanded: string) => {
      const newValue = expanded;
      setIsProtected(newValue);
      if (newValue !== 'pwProtected')
      setPassword(null)
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
        alert('No channel name given')
        if (mode === 'Delete')
          setDialog(false);
        return ;
      }
      const newChannel: Partial<Chatroom> = {
        name: channelName,
        picture: channelPicture,
        state: isProtected,
        userId: user?.id,
        password: isProtected === 'pwProtected' ? pwd : null,
      };
      console.log(newChannel);
      if (mode === 'Create')
      {
        if (isProtected === 'pwProtected')
        {
          try {
            const response = await axios.post('http://localhost:4242/chatroom/password', newChannel, {headers: {
              'Authorization': user?.token,
              'userId': user?.id
            }});
            
            if (response.status === 201) {
              socket.emit("createChannel", {channelName: newChannel.name });
              console.log('Chatroom created:', response.data);
              
              const newChannelData: Chatroom = response.data;
              const updatedUser: Partial<User> = { ...user, chatInUse: newChannelData };
              updateUser(updatedUser);
              setOwnChatroom(prevOwnChat => [...prevOwnChat, newChannelData]);
              setAdminChatroom(prevAdminChat => [...prevAdminChat, newChannelData]);
            }
          } catch (error) {
            console.error('Error creating chatroom:', error);
            alert('Error: could not create channel: ');
            console.log(error)
          }
        }
        else
        {
          try {
            const response = await axios.post('http://localhost:4242/chatroom/', newChannel, {headers: {
              'Authorization': user?.token,
              'userId': user?.id
            }});
            if (response.status === 201) {
              socket.emit("createChannel", {channelName: newChannel.name });
              socket.on("fail", () => {
                throw Error;
              });
              console.log('Chatroom created:', response.data);
              
              const newChannelData: Chatroom = response.data;
              const updatedUser: Partial<User> = { ...user, chatInUse: newChannelData };
              updateUser(updatedUser);
              setOwnChatroom(prevOwnChat => [...prevOwnChat, newChannelData]);
              setAdminChatroom(prevAdminChat => [...prevAdminChat, newChannelData]);
            }
          } catch (error) {
            console.error('Error creating chatroom:', error);
            alert('Error: could not create channel');
          }
        }
      }
      else if (mode === 'Edit')
      {
        try {
          const response = await axios.patch(`http://localhost:4242/chatroom/${channelName}`, newChannel, {headers: {
            'Authorization': user?.token,
            'userId': user?.id
          }});
          console.log('Chatroom modified:', response.data);
          
          const newChannelData: Chatroom = response.data;           
          const updatedUser: Partial<User> = { ...user, chatInUse: newChannelData };
          updateUser(updatedUser);
        } catch (error) {
          console.error('Error editing chatroom:', error);
          alert('Error: could not edit channel');
        }
        setRefresh(!refresh)
      }
      else if (mode === "Delete")
      {
        try {
          const response = await axios.delete(`http://localhost:4242/chatroom/${channelName}`, {headers: {
            'Authorization': user?.token,
            'userId': user?.id
          }});
          console.log('Chatroom deleted:', response.data);
          
          setOwnChatroom(prevOwnChat => prevOwnChat.filter(chat => chat.name !== channelName));
          setAdminChatroom(prevAdminChat => prevAdminChat.filter(chat => chat.name !== channelName));
          setJoinChatroom(prevJoinChat => prevJoinChat.filter(chat => chat.name !== channelName));
          const updatedUser: Partial<User> = { ...user, chatInUse: undefined };
          updateUser(updatedUser);
        } catch (error) {
          console.error('Error deleting chatroom:', error);
          alert('Error deleting chatroom');

        }
      }
      else if (mode === "Join")
      {
        try {
          const newChan = joinChatroom.find((obj) => {
            return obj.name === channelName});
          const newChatroomuser: Partial<ChatroomUser> = {
            userId: user?.id,
            user: user,
            chatroomId: newChan?.id,
            chatroom: newChan,
            permission: userPermission.regular,
            banStatus: false,
            banUntil: null,
            muteStatus: false,
          }
          const response = await axios.post(`http://localhost:4242/chatroomuser`, newChatroomuser, {headers: {
            'Authorization': user?.token,
            'userId': user?.id
          }});
          console.log('User added to chatroom', response.data);
          
          setJoinChatroom(prevJoinChat => prevJoinChat.filter(chat => chat.name !== channelName));
          const updatedUser: Partial<User> = { ...user, chatInUse: newChan };
          updateUser(updatedUser);
          setDialog(false);
        } catch (error) {
            console.error('Error adding user to channel', error);
            alert('Error adding user to channel');
        }
      }
      handleCloseWindow();
    };
    
    const handleChannelSelection = (event: React.ChangeEvent<{}>, value: Chatroom | null) => {
      if (value) {
        setChannelName(value.name);
        const editChan = adminChatroom.find((obj) => {
          return obj.name === value.name});
          if (editChan !== undefined)
          {
            setIsProtected(editChan?.state);
            setChannelPicture(editChan.picture);
            if (editChan.state === 'pwProtected')
            {
              //TODO Dehasher le password
              setPassword(editChan?.password);
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
      const chat = user?.Chatroom?.find((obj: any) => {
        return obj.name === channelName;
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
          />}
        {mode !== 'Delete' && mode !== 'Join' && (
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
                  type="password"
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
          <Box>
            <Button onClick={handleCloseWindow} className="profilePageButtons" sx={{ marginTop: '15px'}}>
              Cancel
            </Button>
          </Box>
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
            </Box>)
          }
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
}