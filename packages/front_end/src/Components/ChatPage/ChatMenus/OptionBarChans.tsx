import * as React from 'react';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { Autocomplete, AccordionDetails, Accordion, AccordionSummary, Button, TextField, Modal, Menu, IconButton, Typography, Box, MenuItem, Tooltip, AppBar, FormControlLabel, Checkbox, Dialog} from '@mui/material';
import '../../../App.css';
import { Chatroom } from 'Components/Interfaces';
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


export default function OptionBarChans() {

    const Chansettings = ['Create', 'Join', 'Edit', 'Delete'];
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [isCreationWindowOpen, setWindowIsOpen] = React.useState(false);
    const [channelName, setChannelName] = React.useState('');
    const [channelPicture, setChannelPicture] = React.useState<string | null>(null);
    const [isProtected, setIsProtected] = React.useState('public');
    const [pwd, setPassword] = React.useState<string | null> ('');
    const [join, setJoinPassword] = React.useState<string | null> ('');
    const [mode, setMode] = React.useState<string>('');
    const [ownChatroom, setOwnChatroom] = React.useState<Chatroom[]>([]);
    const [adminChatroom, setAdminChatroom] = React.useState<Chatroom[]>([]);
    const [joinChatroom, setJoinChatroom] = React.useState<Chatroom[]>([]);
    const {user, updateUser} = useContext(UserContext);
    const theme = useTheme();
    const createChannelcolors = theme.palette.mode === 'dark' ? '#FFFFFF' : '#2067A1';
    const [isDialogOpen, setDialog] = React.useState(false);

    // Sockets implementation
    const socket = useContext(SocketContext);

    React.useEffect(() => {
      const fetchChannels = async () => {
        try {
          const response = await axios.get('http://localhost:4242/chatroom');
          if (response.status === 200) {
            const chatroomData: Chatroom[] = response.data;
            const ownerChat: Chatroom[] = [];
            const joinChat: Chatroom[] = [];
            const adminChat: Chatroom[] = [];

            chatroomData.forEach(chat => {
              const isUser = chat.users?.find((obj) => {
                return obj.id === user?.id;
              });
              if (isUser !== undefined)
                adminChat.push(chat);
              if (chat.userId === user?.id)
              {
                adminChat.push(chat);
                ownerChat.push(chat);
              }
              else
              {
                if (chat.state !== 'private')
                  joinChat.push(chat);
              }
              })
              setOwnChatroom(ownerChat);
              setAdminChatroom(adminChat);
              setJoinChatroom(joinChat);
            }
        } catch (error) {
          console.error('Error fetching channels:', error);
        }
      };
      
      fetchChannels();
    }, [ownChatroom, joinChatroom, adminChatroom]);

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
      setDialog(false);
    };
    
    const handlePictureSelection = (picture: string | null) => {
      setChannelPicture(picture);
    };
    
    const handleIsProtected = (event: React.SyntheticEvent, expanded: string) => {
      const newValue = expanded;
      setIsProtected(newValue);
      if (newValue !== 'pwProtected')
        setPassword(null)
    };

    const handleDialog = () => {
      setDialog(true);
    }

    const chanOption = (option: string) => {
        handleMode(option);
        handleCloseUserMenu();
    };

    const handleChannel = async () => {
      if (!channelName) {
        alert('No channel name given')
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
            const response = await axios.post('http://localhost:4242/chatroom/password', newChannel);
            
            if (response.status === 201) {
              socket.emit("createChannel", {channelName: newChannel.name });
              console.log('Chatroom created:', response.data);
              const newChannelData: Chatroom = response.data;
              const updatedChatrooms: Chatroom[] = [...user?.Chatroom || [], newChannelData];
              const updatedUser: Partial<User> = { ...user, Chatroom: updatedChatrooms };
              updatedUser.chatInUse = newChannelData;
              updateUser(updatedUser);
              try {
                const response: AxiosResponse = await axios.patch('http://localhost:4242/user/' + user?.id,
                updatedUser);
                if (response.status === 200) {
                  console.log('Image uploaded successfully!');
                } else {
                  console.error('Image upload failed.');
                }
              } catch (error) {
                console.error('Error occurred while uploading the image:', error);
              }
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
            const response = await axios.post('http://localhost:4242/chatroom/', newChannel);
            if (response.status === 201) {
              socket.emit("createChannel", {channelName: newChannel.name });
              socket.on("fail", () => {
                throw Error;
              });
              console.log('Chatroom created:', response.data);
              const newChannelData: Chatroom = response.data;
              const updatedChatrooms: Chatroom[] = [...user?.Chatroom || [], newChannelData];
              const updatedUser: Partial<User> = { ...user, Chatroom: updatedChatrooms };
              updatedUser.chatInUse = newChannelData;
              updateUser(updatedUser);
              try {
                const response: AxiosResponse = await axios.patch('http://localhost:4242/user/' + user?.id,
                updatedUser);
                if (response.status === 200) {
                  console.log('Image uploaded successfully!');
                } else {
                  console.error('Image upload failed.');
                }
              } catch (error) {
                console.error('Error occurred while uploading the image:', error);
              }
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
          const response = await axios.patch(`http://localhost:4242/chatroom/${channelName}`, newChannel);
          console.log('Chatroom modified:', response.data);
          
          const newChannelData: Chatroom = response.data;
          const channelIndex = user?.Chatroom?.findIndex((obj) => obj.name === channelName);
          
          if (channelIndex && channelIndex !== -1) {
            const updatedChatrooms: Chatroom[] = [
              ...(user?.Chatroom?.slice(0, channelIndex) || []),
              newChannelData,
              ...(user?.Chatroom?.slice(channelIndex + 1) || []),
            ];
            
            const updatedUser: Partial<User> = { ...user, Chatroom: updatedChatrooms };
            updatedUser.chatInUse = newChannelData;
            updateUser(updatedUser);
            try {
              const response: AxiosResponse = await axios.patch('http://localhost:4242/user/' + user?.id,
                updatedUser);
              if (response.status === 200) {
                console.log('Image uploaded successfully!');
              } else {
                console.error('Image upload failed.');
              }
            } catch (error) {
              console.error('Error occurred while uploading the image:', error);
            }
          } 
        } catch (error) {
          console.error('Error editing chatroom:', error);
          alert('Error: could not edit channel');
        }
      }
      else
      {
        try {
          const response = await axios.delete(`http://localhost:4242/chatroom/${channelName}`);
          console.log('Chatroom deleted:', response.data);
          const updatedUser: Partial<User> = {
            ...user,
            Chatroom: user?.Chatroom?.filter((obj) => obj.name !== channelName),
          };
          updatedUser.chatInUse = undefined;
          updateUser(updatedUser);
          try {
            const response: AxiosResponse = await axios.patch('http://localhost:4242/user/' + user?.id,
            updatedUser);
            if (response.status === 200) {
              console.log('Image uploaded successfully!');
            } else {
              console.error('Image upload failed.');
            }
          } catch (error) {
            console.error('Error occurred while uploading the image:', error);
          }
          setDialog(false);
        } catch (error) {
          console.error('Error deleting chatroom:', error);
          alert('Error deleting chatroom');
        }
      }
      setChannelName('');
      setChannelPicture(null);
      setPassword('');
      setIsProtected('public');
      handleCloseWindow();
      setMode('');
    };
    
    const handleChannelSelection = (event: React.ChangeEvent<{}>, value: Chatroom | null) => {
      if (value) {
        setChannelName(value.name);
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
          <ChanPictureSetter onPictureSelected={handlePictureSelection} />
          )}
        {mode !== 'Delete' ?
        <Button onClick={handleChannel} className="profilePageButtons">
          {mode}
        </Button>
        :
        <Button onClick={handleDialog} className="profilePageButtons">
          {mode}
        </Button>
        }
        <Box>
          <Button onClick={handleCloseWindow} className="profilePageButtons" sx={{ marginTop: '15px'}}>
            Cancel
          </Button>
        </Box>
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
        {mode === 'Join' && isProtected !== 'pwProtected' && (
        <Button onClick={handleChannel} className="profilePageButtons">
          {mode}
        </Button>)}
        {mode === 'Join' && isProtected === 'pwProtected' && (
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
                      value={join}
                      onChange={(e) => setJoinPassword(e.target.value)}
                    /> 
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button className="profilePageButtons" onClick={handleCloseWindow}>Cancel</Button>
                <Button className="profilePageButtons" onClick={handleChannel}>Join</Button>
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
}