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
    const [channels, setChannels] = useState<Chatroom[]>([]);
    const [joinedchannels, setJoinedChannels] = useState<Chatroom[]>([]);
    const [refresh, setRefresh] = useState(false);
    
    useEffect(() => {
      const fetchChannels = async () => {
        await axios.get('http://localhost:4242/chatroom', {headers: {
          'Authorization': user?.token,
          'userId': user?.id
        }})
        .then((response:any) => {
          setChannels(response.data);
          axios.get(`http://localhost:4242/chatroomuser/user/${user?.id}`, {headers: {
            'Authorization': user?.token,
            'userId': user?.id
          }})
          .then((response: any) => {
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
    }, [refresh, user]);
    
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
    
    socket.on("connected", () => {
      socket.on("added", () => {
        setRefresh(!refresh);
      })
      socket.on("chat created", (data: any) => {
        SetChatInUse(data.newChatroom.name)
      })
      socket.on("chatroom deleted", (data: any) => {
        setRefresh(!refresh);
      })
      socket.on("chatroom updated", (data: any) => {
        SetChatInUse(data.chatroomUpdated.name)
        const chatroomIndexToUpdate = joinedchannels.findIndex((chatroom: Chatroom) => chatroom.name === data.chatroomUpdated.name);

        if (chatroomIndexToUpdate !== -1 && chatroomIndexToUpdate !== undefined) {
          const updatedChatrooms = joinedchannels ? [...joinedchannels] : [];
          updatedChatrooms[chatroomIndexToUpdate] = data.chatroomUpdated;
          if (data.chatroomUpdated.name === user?.chatInUse?.chat?.name)
          {
            const newChatInUse: ChatInUse = {
              chat: data.chatroomUpdated,
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
          setJoinedChannels(updatedChatrooms);
        }
        else
          setRefresh(!refresh)
      })
    });
    
    const filteredChannels = joinedchannels.filter((channel: Chatroom) =>
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