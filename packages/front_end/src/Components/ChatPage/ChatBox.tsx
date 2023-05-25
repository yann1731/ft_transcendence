import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Grid, Paper, List, ListItem, ListItemText, Divider, TextField, Fab, Avatar, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { theme } from '../../Theme';
import ContactMenu from './ChatMenus/ContactMenu';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  chatSection: {
    backgroundImage: "none",
    backgroundColor: theme.palette.secondary.main,
    borderRadius: 10,
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto',
    overflowX: 'scroll',
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
    <div style={{overflowWrap: 'break-word'}}>
      <Grid container>
        <Grid item xs={12}></Grid>
      </Grid>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={12}>
          <List className={classes.messageArea}>
            {messages.map((message, index) => (
              <ListItem key={index}>
                <Grid container>
                  <Grid item xs={12} sx={{display: 'flex'}}>
                    <ContactMenu></ContactMenu>
                    <ListItemText sx={{}} primary={message.text}></ListItemText>
                  </Grid>
                  <Grid>
                    <ListItemText sx={{ align: 'right'}} secondary={`${message.nickname}, ${message.timestamp}`}></ListItemText>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Grid container style={{ padding: '20px' }}>
            <Grid item sx={{ width: '75%' }}>
              <TextField id="message-input" label="Type Something" fullWidth onKeyDown={handleKeyDown} />
            </Grid>
            <Grid sx={{ ml: 'auto', align: 'right' }}>
              <Fab color="primary" aria-label="add" onClick={handleClick}>
                <SendIcon />
              </Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};
export default Chat;