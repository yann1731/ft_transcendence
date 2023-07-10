import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { ListItemButton } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import { Chatroom } from 'Components/Interfaces';
import axios from 'axios';
import { UserContext, User } from 'Contexts/userContext';
  
interface MyChannelsProps {
    searchText: string;
  }

  const MyChannels: React.FC<MyChannelsProps> = ({ searchText }) => {
    const [channels, setChannels] = useState<Chatroom[]>([]);
    const {updateUser, user} = useContext(UserContext);
    
    useEffect(() => {
      const fetchChannels = async () => {
        try {
          const response = await axios.get('http://localhost:4242/chatroom');
          
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
    }, [channels]);
    
    const SetChatInUse = (name: string) => {
      if (user !== null)
      {
        const chatroom = user?.Chatroom?.find((obj) => {
          return obj.name === name;
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
          return (
            <ListItemButton key={channel.id} onClick={() => SetChatInUse(decodedName)}>
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