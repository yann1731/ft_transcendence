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
    
     useEffect(() => {
       const fetchChannels = async () => {
        await axios.get('http://localhost:4242/chatroom', {headers: {
          'Authorization': user?.token,
          'userId': user?.id
        }})
        .then((response:any) => {
          const Chans = response.data;
          axios.get(`http://localhost:4242/chatroomuser/user/${user?.id}`, {headers: {
            'Authorization': user?.token,
            'userId': user?.id
          }})
          .then((response: any) => {
            const chatroomUsersData: ChatroomUser[] = response.data;
            const chans: Chatroom[] = [];
            let trigger = "off";
            let newChatInUse = user?.chatInUse;

            Chans.forEach((channel: Chatroom) => {
              chatroomUsersData.forEach((users: ChatroomUser) => {

                if (channel?.id === users?.chatroomId && users.banStatus !== true)
                  chans.push(channel);
    
                if (channel?.id === user?.chatInUse?.chat?.id && newChatInUse !== undefined)
                {
                  newChatInUse.chat = channel;
                  trigger = "on";
                }
              })
            });

            if (trigger === 'on'){
                const updatedUser: Partial<User> = { ...user, chatInUse: newChatInUse, Chatroom: chans };
                updateUser(updatedUser);
            }

            if (trigger === "off")
            {
              const updatedUser: Partial<User> = { ...user, chatInUse: undefined, Chatroom: chans };
              updateUser(updatedUser);
            }

            console.log('ChatroomUsers fetched: ', response.data);
          })
          .catch((error: any) => {
            console.error('Error getting ChatroomUsers: ', error);
            alert('Error: could not get ChatroomUsers: ' + error);
          })
        })
       .catch((error: any) => {
          console.error('Error getting chatrooms:', error);
          alert('Error: could not get chatrooms: ' + error);
        })
      }
      fetchChannels();
    }, [refresh]);
    
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
        const chatroom = user?.Chatroom?.find((chat: Chatroom) => {
          return chat.name === decodedName;
        });
        if (chatroom !== undefined)
        {
          // console.log("Chatroom name: " + chatroom.name);
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
          await setHistory(updatedUser.chatInUse?.chat.id, updatedUser.chatInUse?.chat);
        }
      }
    };
    
/*     user?.Chatroom?.forEach((channel: Chatroom) => {
      alert(channel.name)
    }) */

/*     let filteredChannels : any = user?.Chatroom?.filter((channel: Chatroom) =>
      channel.name.toLowerCase().includes(searchText.toLowerCase())
    ); */

/*     filteredChannels.forEach((channel: Chatroom) => {
      alert(channel.name)
    }) */

    socket.on("connected", () => {
      socket.on("refresh", () => {
        setRefresh(refresh => refresh + 1);
      })
    });
    
    return (
      <List>
        {user?.Chatroom?.map((channel: Chatroom) => {
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