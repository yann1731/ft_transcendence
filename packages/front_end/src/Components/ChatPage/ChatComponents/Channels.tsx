import { List, ListItemButton, ListItemText, ListItemIcon, Avatar } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import { Chatroom, ChatroomUser, ChatInUse, chatroomType } from 'Components/Interfaces';
import axios from 'axios';
import { UserContext, User } from 'Contexts/userContext';
import { socket } from 'Contexts/socketContext';
  
interface MyChannelsProps {
    searchText: string;
  }

  const MyChannels: React.FC<MyChannelsProps> = ({ searchText }) => {
    const {updateUser, user} = useContext(UserContext);
    
    /*useEffect(() => {
      const fetchChannels = async () => {
        try {
          const response = await axios.get('http://localhost:4242/chatroom', {headers: {
            'Authorization': user?.token,
            'userId': user?.id
          }});
          
          if (response.status === 200) {
            setChannels(response.data);
          }
          try {
            const response = await axios.get(`http://localhost:4242/chatroomuser/user/${user?.id}`, {headers: {
              'Authorization': user?.token,
              'userId': user?.id
            }})
            
            if (response.status === 200) {
              const chatroomUsersData: ChatroomUser[] = response.data;
              const chans: Chatroom[] = [];
              
              channels.forEach((channel: Chatroom) => {
                chatroomUsersData.forEach((users: ChatroomUser) => {
                  if (channel?.id === users?.chatroomId && users.banStatus !== true)
                  chans.push(channel);
                })
              });
              setJoinedChannels(chans)
              console.log('ChatroomUsers fetched: ', response.data);
            }
          } catch (error) {
            console.error('Error getting ChatroomUsers: ', error);
            alert('Error: could not get ChatroomUsers: ' + error);
          }
        } catch (error) {
          console.error('Error getting chatrooms:', error);
          alert('Error: could not get chatrooms: ' + error);
        }
      };
      fetchChannels();
    }, []); */
    
    const SetChatInUse = (name: string) => {
      const decodedName = decodeURIComponent(name);
      if (user !== null)
      {
        const chatroom = user?.Chatroom?.find((chat: Chatroom) => {
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
          updateUser(updatedUser);
        }
      }
    };
    
    useEffect(() => {
      socket.on("chatroom updated", (data: Chatroom) => {
        const chatroomIndexToUpdate = user?.Chatroom?.findIndex((chatroom: Chatroom) => chatroom.id === data.id);

        if (chatroomIndexToUpdate !== -1 && chatroomIndexToUpdate !== undefined) {
          const updatedChatrooms = user?.Chatroom ? [...user?.Chatroom] : [];
          updatedChatrooms[chatroomIndexToUpdate] = data;
          if (data.id !== user?.chatInUse?.chat?.id)
          {
            const newChatInUse: ChatInUse = {
              chat: data,
              type: chatroomType.channel,
            }
            const updatedUser: Partial<User> = { ...user, chatInUse: newChatInUse, Chatroom: updatedChatrooms };
            updateUser(updatedUser);
          }
          else
          {
            const updatedUser: Partial<User> = { ...user, Chatroom: updatedChatrooms };
            updateUser(updatedUser);
          }
        }
      })
    }, []);
    
    const filteredChannels = user?.Chatroom?.filter((channel: Chatroom) =>
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