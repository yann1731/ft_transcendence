
import React, { useState, useRef, useEffect, useContext } from 'react';
import { List, ListItem, ListItemText, Divider, TextField, Fab } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ContactMenu from './ChatMenus/ContactMenu';
import Box from '@mui/material/Box';
import '../../App.css';
import { UserContext } from 'Contexts/userContext';
import { Message } from 'Components/Interfaces';

const Chat = () => {
  const {user} = useContext(UserContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Handles the scrollbar to the bottom on scrolling chat messages
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
      nickname: user?.username,
      UserAvatar: user?.avatar,
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
  <Box className={"chatSection"}>
    <Box sx={{ flex: 1, overflow: 'auto' }} ref={chatContainerRef}>
      <List>
        {messages.map((message, index) => (
          <ListItem key={index}>
            <Box sx={{ marginLeft: 'auto' }}>
              <Box sx={{ textAlign: 'right' }}>
                <ContactMenu {...{Useravatar: message.UserAvatar}}></ContactMenu>
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
        <Box className={"chatTextField"}>
          <TextField
            sx={{ flexGrow: 1, marginRight: '20px' }}
            id="message-input"
            label="Type Something"
            onKeyDown={handleKeyDown}
            className={"focusedTextField .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline"}
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