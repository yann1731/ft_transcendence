import { List, ListItemButton, ListItemText, ListItemIcon, Avatar, setRef } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import { Chatroom, ChatroomUser, ChatInUse, chatroomType } from 'Components/Interfaces';
import axios from 'axios';
import { UserContext, User } from 'Contexts/userContext';
import { SocketContext } from 'Contexts/socketContext';
import { ChatroomMessage } from 'Components/Interfaces';
import { socket } from 'Contexts/socketContext';

interface MyChannelsProps {
    searchText: string;
  }

  const MyChannels: React.FC<MyChannelsProps> = ({ searchText }) => {
    const {updateUser, user} = useContext(UserContext);
    const socket = useContext(SocketContext);
    const [refresh, setRefresh] = useState(1);
    const [channels, setChannels] = useState<Chatroom[]>([]);

    socket.on("updateChannels", (data: any) => {
      setChannels(data.channels);
    });

    // useEffect(() => {
      socket.on("reloadChannels", () => {
        console.log("Reloading channels");
        socket.emit("getChannels", { id: user?.id });
      });
    //   socket.off("reloadChannels");
    // }, [socket]);
    
    useEffect(() => {
      socket.emit("getChannels", {id: user?.id});
      return () => {
        socket.off("getChannels");
      }
    }, []);
    
    const setHistory = (id: string | undefined, chat: any) => {
      if (id === undefined) {
        return ;
      }
      let newMessage: Partial<ChatroomMessage> = {
        content: "messageText",
        senderId: user?.id,
        chatroomId: id,
        chatroom: chat,
      };
      socket.emit("getHistory", newMessage);
    }

    const SetChatInUse = async (name: string) => {
      const decodedName = decodeURIComponent(name);
      
      if (user !== null)
      {
        const chatroom = channels.find((chat: Chatroom) => {
          console.log("chatInUse onClick = " + decodedName);
          return chat.name === decodedName;
        });
        if (chatroom !== undefined)
        {
           console.log("Chatroom name: " + chatroom.name);
          const newChatInUse: ChatInUse = {
            chat: chatroom,
            type: chatroomType.channel
          }
          const updatedUser: Partial<User> = {
            ...user,
            chatInUse: newChatInUse
          };
          await updateUser(updatedUser);

          let _chat: Array<string>;
          if (updatedUser.username && updatedUser.chatInUse?.chat.id && updatedUser.chatInUse?.type) {
            _chat = [updatedUser.chatInUse?.chat.name, updatedUser.chatInUse?.chat.id, updatedUser.chatInUse?.type, updatedUser.username]
            localStorage.setItem(updatedUser.username, JSON.stringify(_chat));
          }
          setHistory(updatedUser.chatInUse?.chat.id, updatedUser.chatInUse?.chat);
        } else {
          console.log("Obivously the chatinuse doesn't work.");
        }
      }
    };
    
    return (
      <List>
        {channels.map((channel: Chatroom) => {
          const decodedName = decodeURIComponent(channel.name);
          const encodedName = encodeURIComponent(channel.name);
          return (
            <ListItemButton key={channel.id} onClick={() => SetChatInUse(encodedName)}>
              <ListItemIcon>
                <Avatar alt={decodedName} src={channel.picture || undefined} />
              </ListItemIcon>
              <ListItemText primary={decodedName} />
            </ListItemButton>
          );
        })}
      </List>
    );
  };

export default MyChannels;