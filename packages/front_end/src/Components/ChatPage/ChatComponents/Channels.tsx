import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { ListItemButton } from '@mui/material';
<<<<<<< HEAD
import { useState, useEffect, useContext } from 'react';
import { Chatroom } from 'Components/Interfaces';
=======
import React, { useState, useEffect, useContext } from 'react';
import { Chatroom, ChatroomUser } from 'Components/Interfaces';
>>>>>>> anthony
import axios from 'axios';
import { UserContext, User } from 'Contexts/userContext';
  
interface MyChannelsProps {
    searchText: string;
  }

  const MyChannels: React.FC<MyChannelsProps> = ({ searchText }) => {
    const [channels, setChannels] = useState<Chatroom[]>([]);
<<<<<<< HEAD
=======
    const [joinedChannels, setJoinedChannels] = useState<Chatroom[]>([]);
>>>>>>> anthony
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
            console.log('Chatroom created:', response.data);
          }
        } catch (error) {
          console.error('Error creating chatroom:', error);
          alert('Error: could not create channel: ');
        }
      };
      fetchChannels();
<<<<<<< HEAD
=======
    }, [user]);
    
    useEffect(() => {
      const fetchJoinedChannels = async () => {
        try {
          //Vrai api call
          //const response = await axios.get(`http://localhost:4242/chatroomuser/${user?.id}`);
          //Temp api call
          const response = await axios.get(`http://localhost:4242/chatroomuser`, {headers: {
            'Authorization': user?.token,
            'userId': user?.id
          }})
          
          if (response.status === 200) {
            const chatroomUsersData: ChatroomUser[] = response.data;
            const chans: Chatroom[] = [];

            channels.forEach(channel => {
              const isJoined = chatroomUsersData.find(user => user.chatroomId === channel.id);
              if (isJoined) {
                chans.push(channel);
                }
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
>>>>>>> anthony
    }, [channels]);
    
    const SetChatInUse = (name: string) => {
      const decodedName = decodeURIComponent(name);
      if (user !== null)
      {
        const chatroom = user?.Chatroom?.find((obj) => {
          return obj.name === decodedName;
        });
        user.chatInUse = chatroom;
        const updatedUser: Partial<User> = {
          ...user,
          chatInUse: chatroom,
        };
        updateUser(updatedUser);
      }
    };

    const filteredChannels = channels.filter((channel) =>
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