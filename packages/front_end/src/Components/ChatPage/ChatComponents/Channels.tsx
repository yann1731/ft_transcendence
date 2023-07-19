import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { ListItemButton } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import { Chatroom, ChatroomUser, ChatInUse, chatroomType } from 'Components/Interfaces';
import axios from 'axios';
import { UserContext, User } from 'Contexts/userContext';
  
interface MyChannelsProps {
    searchText: string;
  }

  const MyChannels: React.FC<MyChannelsProps> = ({ searchText }) => {
    const [channels, setChannels] = useState<Chatroom[]>([]);
    const [joinedChannels, setJoinedChannels] = useState<Chatroom[]>([]);
    const {updateUser, user} = useContext(UserContext);
    
    useEffect(() => {
      const fetchChannels = async () => {
        try {
          const response = await axios.get('http://localhost:4242/chatroom', {headers: {
            'Authorization': user?.token,
            'userId': user?.id
          }});
          
          if (response.status === 200) {
            setChannels(response.data);
          }
        } catch (error) {
          console.error('Error getting chatrooms:', error);
          alert('Error: could not get chatrooms: ' + error);
        }
      };
      fetchChannels();
    }, [user]);
    
    useEffect(() => {
      const fetchJoinedChannels = async () => {
        try {
          const response = await axios.get(`http://localhost:4242/chatroomuser/user/${user?.id}`, {headers: {
            'Authorization': user?.token,
            'userId': user?.id
          }})
          
          if (response.status === 200) {
            const chatroomUsersData: ChatroomUser[] = response.data;
            const chans: Chatroom[] = [];

            channels.forEach(channel => {
              chatroomUsersData.forEach(users => {
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
      };
      fetchJoinedChannels();
    }, [channels]);
    
    const SetChatInUse = (name: string) => {
      const decodedName = decodeURIComponent(name);
      if (user !== null)
      {
        const chatroom = joinedChannels.find((obj) => {
          return obj.name === decodedName;
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

    const filteredChannels = joinedChannels.filter((channel) =>
      channel.name.toLowerCase().includes(searchText.toLowerCase())
    );
    
    return (
      <List>
        {filteredChannels.map((channel) => {
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