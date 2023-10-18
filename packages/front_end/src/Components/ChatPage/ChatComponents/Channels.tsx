import { List, ListItemButton, ListItemText, ListItemIcon, Avatar } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import { Chatroom, ChatInUse, chatroomType } from 'Components/Interfaces';
import { UserContext, User } from 'Contexts/userContext';
import { SocketContext } from 'Contexts/socketContext';
import { ChatroomMessage } from 'Components/Interfaces';

interface MyChannelsProps {
    searchText: string;
  }

  const MyChannels: React.FC<MyChannelsProps> = ({ searchText }) => {
    const {updateUser, user} = useContext(UserContext);
    const socket = useContext(SocketContext);
    const [channels, setChannels] = useState<Chatroom[]>([]);

    socket.on("updateChannels", (data: any) => {
      setChannels(data.channels);
    });

    useEffect(() => {
      socket.on("reloadChannels", () => {
        socket.emit("getChannels", { id: user?.id });
      });
      socket.off("reloadChannels");
      socket.off("updateChannels");
    }, []);
    
    useEffect(() => {
      socket.emit("getChannels", {id: user?.id});
      return () => {
        socket.off("getChannels");
      }
    }, []);

    socket.on("reloadChannels", () => {
      socket.emit("getChannels", { id: user?.id });
    });
    
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
          return chat.name === decodedName;
        });
        if (chatroom !== undefined)
        {
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
        }
      }
    };
    let filteredChannels : any = user?.Chatroom?.filter((channel: Chatroom) =>
    channel.name.toLowerCase().includes(searchText.toLowerCase())
  );
    return (
      <List>
        {filteredChannels?.map((channel: Chatroom) => {
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