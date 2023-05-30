import React, { useState, useRef, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Grid, Paper, List, ListItem, ListItemText, Divider, TextField, Fab, Avatar, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { theme } from '../../Theme';
import ContactMenu from './ChatMenus/ContactMenu';
import Box from '@mui/material/Box';

const useStyles = makeStyles({
  chatSection: {
    backgroundImage: "none",
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 10,
    height: '77.9vh',
    overflowY: 'auto',
  },
  focusedTextField: {
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'white',
    },
    '& .MuiOutlinedInput-root.Mui=focused': {
      '& fieldset': {
        borderWidth: 1,
        borderColor: 'white',
      },
    },
  },
});


interface Message {
  text: string;
  timestamp: string;
  nickname: string;
  UserAvatar: string;
}

const Chat = () => {

  const classes = useStyles();
  const [messages, setMessages] = useState<Message[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (messageText: string) => {
    const newMessage: Message = {
      text: messageText,
      timestamp: new Date().toLocaleTimeString(),
      nickname: 'patate',
      UserAvatar: "https://assets1.cbsnewsstatic.com/hub/i/2016/09/29/d1a671d9-556e-468d-8639-159e2842f15b/logan-new-hamshire-cat-2016-09-29.jpg"
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      const messageInput = event.target as HTMLInputElement;
      const messageText = messageInput.value.trim();
      if (messageText !== '') {
        sendMessage(messageText);
        messageInput.value = '';
      }
    }
  };
  
  const handleClick = () => {
    const messageInput = document.getElementById('message-input') as HTMLInputElement | null;
    if (messageInput) {
      const messageText = messageInput.value.trim();
      if (messageText !== '') {
        sendMessage(messageText);
        messageInput.value = '';
      }
    }
  };

  return (
  <Box component={Paper} className={classes.chatSection} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
    <Box sx={{ flexGrow: 1, overflow: 'auto' }} ref={chatContainerRef}>
      <List>
        {messages.map((message, index) => (
          <ListItem key={index}>
            <Box>
              <Box sx={{ display: 'flex' }}>
                <ContactMenu></ContactMenu>
                <ListItemText primary={message.text}></ListItemText>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <ListItemText
                  secondary={`${message.nickname}, ${message.timestamp}`}
                ></ListItemText>
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
    <Box sx={{ marginTop: 'auto' }}>
      <Divider />
      <Box style={{ padding: '20px' }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
          <TextField
            sx={{ flexGrow: 1, marginRight: '20px' }}
            id="message-input"
            label="Type Something"
            onKeyDown={handleKeyDown}
            className={classes.focusedTextField}
          />
          <Fab color="primary" aria-label="add" onClick={handleClick} sx={{ flexShrink: 0}}>
            <SendIcon />
          </Fab>
        </Box>
      </Box>
    </Box>
  </Box>
  );
}
 export default Chat;