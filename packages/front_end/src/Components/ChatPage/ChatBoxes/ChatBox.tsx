
import React, { useState, useRef, useEffect, useContext } from 'react';
import { useTheme, Box, List, ListItem, ListItemText, Divider, TextField, Fab } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ContactMenu from '../ChatMenus/ContactMenu';
import '../../../App.css';
import { UserContext } from 'Contexts/userContext';
import { Message, PrivateMessage } from 'Components/Interfaces';
import { Socket } from "socket.io"
import { SocketContext } from "../../../Contexts/socketContext";
import { ChatroomMessage } from 'Components/Interfaces';
import axios from 'axios';
import { UserBlocks } from 'Components/Interfaces';
import { Chatroom, ChatInUse, chatroomType } from 'Components/Interfaces';
import { User } from 'Contexts/userContext';

const Chat = () => {
  const theme = useTheme();
  const buttonColor = theme.palette.mode === 'dark' ? '#FFFFFF' : '#2067A1'

  const {updateUser, user} = useContext(UserContext);
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [userBlocks, setUserBlocks] = useState<UserBlocks[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Handles the scrollbar to the bottom on scrolling chat messages
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  // socket.on("Testing", () => alert("Wuddup!"));
  useEffect(() => {
    socket.on('messageResponse', (data: any) => displayMessage(data));
    socket.on("sendHistory", (data: any) => makeHistory(data));
    socket.on("connected", () => socket.emit("registerUser", { username: user?.username }));
    socket.on("clearHistory", () => clearHistory());
    // socket.on("receiveBlocks", (data: any) => makeBlocks(data));
    // return () => {
    //   socket.off("messageResponse");
    // }
    return () => {
      socket.off("messageResponse");
    }
  }, []);

  const clearHistory = () => {
    const _cleared: Message[] = [];
    setMessages(_cleared);
  }

  const makeBlocks = (data: any) => {
    const _blocks = data.blocks;
    const _userBlocks: UserBlocks[] = [];
    _blocks.forEach((element: any) => {
      const b: UserBlocks = {
        id: element.id,
        blockerId: element.blockerId,
        blockedUserId: element.blockedUserId,
      };
      _userBlocks.push(b);
    });
    setUserBlocks(_userBlocks);
  }

  const makeHistory = (data: any) => {
    const history = data.history;
    const msgHistory: Message[] = [];
    history.forEach((element: any) => {
      const msg: Message = {
        text: element.text,
        timestamp: element.timestamp,
        nickname: element.nickname,
        UserAvatar: element.avatar,
      };
      msgHistory.push(msg);
    });
    setMessages(msgHistory);
  };


  // _chatInfo: chatName, chatID, chatType, username
  const displayMessage = (message: any) => {
    if (user?.username) {
      const _chatInfo = JSON.parse(localStorage.getItem(user?.username) || "[]");
      if (message.type === "channel") {
        if (message.channelID === _chatInfo[1]) {
          const newMessage: Message = {
            text: message.text,
            timestamp: message.timestamp,
            nickname: message.nickname,
            UserAvatar: message.avatar
          };
          setMessages((prevMessages: Message[]) => [...prevMessages, newMessage]);
          // endif
        }
      } else if (message.type === "friend") {
        if ((_chatInfo[0] === message.recipient && message.nickname === user?.username) || (_chatInfo[0] === message.nickname && message.recipient === user?.username)) {
          const newMessage: Message = {
            text: message.text,
            timestamp: message.timestamp,
            nickname: message.nickname,
            UserAvatar: message.avatar
          };
          setMessages((prevMessages: Message[]) => [...prevMessages, newMessage]);
          // endif
        }
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // console.log("keydown: " + user?.chatInUse?.chat.name);
      const messageInput = event.target as HTMLInputElement;
      const messageText = messageInput.value.trim();
      if (user?.chatInUse?.type === "friend") {
        if (messageText !== '') {
          let newMessage: Partial<PrivateMessage> = {
            content: messageText,
            senderId: user?.id,
            recipientId: user?.chatInUse?.chat.name,
          };
          socket.emit("sendPrivateMessage", newMessage);
          messageInput.value = '';
        }
      } else {
        if (messageText !== '') {
          let newMessage: Partial<ChatroomMessage> = {
            content: messageText,
            senderId: user?.id,
            chatroomId: user?.chatInUse?.chat.id,
            chatroom: user?.chatInUse?.chat,
          };
          // socket.emit("getUserBlocks", {userID: user?.id, name: user?.username});
          socket.emit("sendMessage", newMessage);
          messageInput.value = '';
        }
      }
    }
  };
  
  const handleClick = () => {
    const messageInput = document.getElementById('message-input') as HTMLInputElement | null;
    if (messageInput) {
      const messageText = messageInput.value.trim();
      if (messageText !== '') {
        let newMessage: Partial<ChatroomMessage> = {
          content: messageText,
          senderId: user?.id,
          chatroomId: user?.chatInUse?.chat.id,
          chatroom: user?.chatInUse?.chat,
        };
        socket.emit("sendMessage", newMessage);
        //sendMessage(messageText);
        messageInput.value = '';
      }
    }
  };

  return (
    <Box className={"chatSection"}>
      <Box sx={{ flex: 1, overflow: 'auto' }} ref={chatContainerRef}>
        <List>
        {messages.map((message: Message, index: number) => {
            const shouldAlignLeft = message.nickname === user?.username;

            return (
              <ListItem key={index}>
                <Box sx={{ marginLeft: shouldAlignLeft ? '0' : 'auto' }}>
                  <Box sx={{ textAlign: shouldAlignLeft ? 'left' : 'right' }}>
                    <ContactMenu {...{ Useravatar: message.UserAvatar }} />
                    <ListItemText primary={message.text} />
                  </Box>
                  <Box sx={{ textAlign: shouldAlignLeft ? 'left' : 'right' }}>
                    <ListItemText
                      secondary={`${message.nickname}, ${message.timestamp}`}
                    />
                  </Box>
                </Box>
              </ListItem>
            );
          })}
        </List>
      </Box>
      <Box sx={{ marginTop: 'auto' }}>
        <Divider />
        <Box style={{ padding: '20px' }}>
          <Box className={"chatTextField"}>
            <TextField
              className={"focusedTextField .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline"}
              sx={{ marginRight: '20px' }}
              id="message-input"
              label="Type Something"
              onKeyDown={handleKeyDown}
            />
            <Fab color="primary" aria-label="add" onClick={handleClick} sx={{ flexShrink: 0}} style={{ color: buttonColor }}>
              <SendIcon />
            </Fab>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
 export default Chat;