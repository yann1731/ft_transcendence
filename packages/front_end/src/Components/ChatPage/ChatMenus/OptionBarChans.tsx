import * as React from 'react';
import DehazeIcon from '@mui/icons-material/Dehaze';
import {Autocomplete, AccordionDetails, Accordion, AccordionSummary, Button, TextField, Modal, Menu, IconButton, Typography, Box, MenuItem, Tooltip, AppBar, FormControlLabel, Checkbox} from '@mui/material';
import '../../../App.css';
import { Chatroom } from 'Components/Interfaces';
import ChanPictureSetter from '../ChatComponents/ChatPictureSetter';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from 'Contexts/userContext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ChatInUse } from 'Components/Interfaces';
import { useTheme } from '@mui/material/styles';

export default function OptionBarChans() {

    const Chansettings = ['Create', 'Modify', 'Delete'];
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [isCreationWindowOpen, setWindowIsOpen] = React.useState(false);
    const [channelName, setChannelName] = React.useState('');
    const [channelPicture, setChannelPicture] = React.useState<string | null>(null);
    const [isProtected, setIsProtected] = React.useState('public');
    const [pwd, setPassword] = React.useState<string | null> ('');
    const [mode, setMode] = React.useState<string>('');
    const [chatroom, setChatroom] = React.useState<Chatroom[]>([]);
    const {user, updateUser} = useContext(UserContext);
    const theme = useTheme();
    const createChannelcolors = theme.palette.mode === 'dark' ? '#FFFFFF' : '#2067A1';
    
    React.useEffect(() => {
      const fetchChannels = async () => {
        try {
          const response = await axios.get('http://localhost:4242/chatroom'); // Replace with your backend endpoint
          
          if (response.status === 200) {
            const chatroomData: Chatroom[] = response.data;
            setChatroom(chatroomData);
          }
        } catch (error) {
          console.error('Error fetching channels:', error);
        }
      };
  
      fetchChannels();
    }, [chatroom]);

    const DeleteChatInUse = (Chat: string) => {
      const chatInUse: ChatInUse = {
        chatInUse: Chat,
      };
      updateUser(chatInUse);
    }

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

    const chanOption = (option: string) => {
      switch(option)
      {
        case 'Create':
          handleMode('create');
          break;
        case 'Delete':
          handleMode('delete');
          break;
        case 'Modify' :
          handleMode('modify')
        }
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
      
      if (mode === 'create')
      {
        if (isProtected === 'pwProtected')
        {
          try {
            const response = await axios.post('http://localhost:4242/chatroom/password', newChannel);
            
            if (response.status === 200) {
              console.log('Chatroom created:', response.data);
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
            const response = await axios.post('http://localhost:4242/chatroom', newChannel);
            
            if (response.status === 200) {
              console.log('Chatroom created:', response.data);
            }
          } catch (error) {
            console.error('Error creating chatroom:', error);
            alert('Error: could not create channel');
          }
        }
      }
      else if (mode === 'modify')
      {
        try {
          const response = await axios.patch(`http://localhost:4242/chatroom/${channelName}`, newChannel);
          console.log('Chatroom modified:', response.data);
        } catch (error) {
          console.error('Error modifying chatroom:', error);
          alert('Error changing chatroom');
        }
      }
      else
      {
        try {
          const response = await axios.delete(`http://localhost:4242/chatroom/${channelName}`);
          console.log('Chatroom deleted:', response.data);
          DeleteChatInUse('')
        } catch (error) {
          console.error('Error deleting chatroom:', error);
          alert('Error deleting chatroom');
        }
      }
      setChannelName('');
      setChannelPicture('');
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
          {mode === 'create' ? 'Create New Channel' : 'Modify Channel'}
        </Typography>
        {mode === 'create' ?  
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
          : <Autocomplete
              disablePortal
              id="Channels"
              options={chatroom}
              getOptionLabel={(option) => option.name}
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
        {mode !== 'delete' && (
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
        {mode !== 'delete' && (
          <ChanPictureSetter onPictureSelected={handlePictureSelection} />
          )}
        {mode !== 'delete' ? 
          <Button onClick={handleChannel} className="profilePageButtons">
            Create
          </Button>
          :            
            <Button onClick={handleChannel} className="profilePageButtons">
              Delete
            </Button>
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