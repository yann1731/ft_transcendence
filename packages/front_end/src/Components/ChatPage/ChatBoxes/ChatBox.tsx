
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
import { Popover } from '@mui/material';
import InvitationPopover from "../ChatComponents/InvitationPopover"
import { allowedNodeEnvironmentFlags } from 'process';
import { gameSocketContext } from 'Contexts/gameSocketContext';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const theme = useTheme();
  const buttonColor = theme.palette.mode === 'dark' ? '#FFFFFF' : '#2067A1'

  const {updateUser, user} = useContext(UserContext);
  const socket = useContext(SocketContext);
  const gamesocket = useContext(gameSocketContext)
  const [messages, setMessages] = useState<Message[]>([]);
  const [userBlocks, setUserBlocks] = useState<UserBlocks[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);
  const [ showInvitation, setShowInvitation ] = useState(false);
  const [ inviter, setInviter] = useState("null");
  const navigate = useNavigate();

  

  // Handles the scrollbar to the bottom on scrolling chat messages
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  // socket.on("Testing", () => alert("Wuddup!"));
  useEffect(() => {
    socket.on("refused", () => {
      setShowInvitation(false)
      setInviter("null")
    })
    socket.on('messageResponse', (data: any) => displayMessage(data));
    socket.on("sendHistory", (data: any) => makeHistory(data));
    socket.on("connected", () => socket.emit("connected"));
    // socket.on("disconnected", () => socket.emit("registerDisconnect", {id: user?.id}));
    socket.on("clearHistory", () => clearHistory());
    socket.on("clearOtherHistory", (data: any) => clearOtherHistory(data));
    socket.on("closeSocket", () => socket.close());
    socket.on("invitedToPlay", (data: any, acknowledge: any) => handleInvitation(data.inviterID, acknowledge));
    socket.on("displayFailure", (data: any) => alert(data.msg));

    gamesocket.on("invite", () => {
      localStorage.setItem("host" + user?.username, "true")
      localStorage.setItem("invite" + user?.username, "true")
      navigate("/home")
    })

    localStorage.setItem("host" + user?.username, "false")
    localStorage.setItem("invite" + user?.username, "false")

    return () => {
      /* socket.off("messageResponse");
      socket.off("connected");
      socket.off("displayFailure"); */
    }
  }, [])

  const handleInvitation = (inviterID: string, acknowledge: any) => {
    console.log('getting invite');
    acknowledge(true);
    setShowInvitation(true);
    setInviter(inviterID);
  }

  const makeConnection = () => {
    const updatedUser: Partial<User> = {...user, userStatus: true};
    updateUser(updatedUser);
    socket.emit("connected", user?.id);
    socket.emit("refresh2");
  }

  const clearHistory = () => {
    const _cleared: Message[] = [];
    setMessages(_cleared);
    const updatedUser: Partial<User> = {
      ...user,
      chatInUse: undefined,
    }
    updateUser(updatedUser);
  }

  const clearOtherHistory = (data: any) => {
    if (user?.username) {
      console.log("Catching here!");
      const _chatInfo = JSON.parse(localStorage.getItem(user?.username) || "[]");
      if (_chatInfo[0] === data.chat) {
        const _cleared: Message[] = [];
        setMessages(_cleared);
        const updatedUser: Partial<User> = {
          ...user,
          chatInUse: undefined,
        }
        updateUser(updatedUser);
        let _chat: Array<string>;
        if (user?.username) {
          _chat = ["null", "null", "channel", user?.username];
          localStorage.setItem(user?.username, JSON.stringify(_chat));
        }
        socket.emit("refresh");
      } else {
        let newMessage: Partial<ChatroomMessage> = {
          content: "messageText",
          senderId: user?.id,
          chatroomId: _chatInfo[1],
          chatroom: undefined,
        };
        socket.emit("getHistory", newMessage);
      }
    }
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
        userId: element.userId
      };
      msgHistory.push(msg);
    });
    setMessages(msgHistory);
  };
  
  const blockExists = (userID: string, senderID: string): boolean => {
    for (const block of userBlocks) {
      if (block.blockedUserId === senderID) {
        return true;
      }
    }
    return false;
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
            UserAvatar: message.avatar,
          userId: message.userId
          };
          setMessages((prevMessages: Message[]) => [...prevMessages, newMessage]);
          // endif
        }
      } else if (message.type === "friend") {
        console.log("chatinUse on DISPLAY = " + user?.chatInUse?.chat.name)
      if ((_chatInfo[0] === message.recipient && message.nickname === user?.username) || (_chatInfo[0] === message.nickname && message.recipient === user?.username)) {
          const newMessage: Message = {
            text: message.text,
            timestamp: message.timestamp,
            nickname: message.nickname,
            UserAvatar: message.avatar,
          userId: message.userId
          };
          setMessages((prevMessages: Message[]) => [...prevMessages, newMessage]);
          // endif
        }
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (user?.username) {
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
            try {
              socket.emit("sendMessage", newMessage);
            } catch (error) {
              alert("You are muted. Mute Time is 5 minutes. Come back later!");
            }
            messageInput.value = '';
          }
        }
      }
    }
  };
  
  const handleClick = () => {
    const messageInput = document.getElementById('message-input') as HTMLInputElement | null;
    if (messageInput) {
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

  return (
    <Box className={"chatSection"}>
      <Box>
        {showInvitation && <InvitationPopover
          userA={user?.id}
          userB={inviter}
          open={showInvitation}
          onClose={() => setShowInvitation(false)}/>}
      </Box>
      <Box sx={{ flex: 1, overflow: 'auto' }} ref={chatContainerRef}>
        <List>
        {messages.map((message: Message, index: number) => {
            const shouldAlignLeft = message.nickname === user?.username;

            return (
              <ListItem key={index}>
                <Box sx={{ marginLeft: shouldAlignLeft ? 'auto' : '0' }}>
                  <Box sx={{ textAlign: shouldAlignLeft ? 'right' : 'left' }}>
                    <ContactMenu {... message } />
                    <ListItemText sx={{ overflowWrap: 'break-word', wordBreak: 'break-all' }} primary={message.text} />
                  </Box>
                  <Box sx={{ textAlign: shouldAlignLeft ? 'right' : 'left' }}>
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