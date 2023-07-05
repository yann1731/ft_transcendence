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
    const {updateUser} = useContext(UserContext);

    
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
    
    const filteredChannels = channels.filter((channel) =>
    channel.name.toLowerCase().includes(searchText.toLowerCase())
    );
 
    const SetChatInUse = (name: string, picture: string | undefined | null) => {
      if (picture !== null) {
        const chatInUse: Partial<User> = {
          chatInUse: {
          Name: name,
          Picture: picture,
          },
        };
        updateUser(chatInUse);
      }
      else {
        const chatInUse: Partial<User> = {
          chatInUse: {
          Name: name,
          },
        };
        updateUser(chatInUse);
      }
    }
    
    return (
    <List>
        {filteredChannels.map((channel) => (
            <ListItemButton key={channel.id} onClick={() => SetChatInUse(channel.name, channel.picture)}>
                <ListItemIcon>
                    <Avatar alt={channel.name} src={channel.picture || undefined} />
                </ListItemIcon>
                <ListItemText primary={channel.name} />
            </ListItemButton>
        ))}
    </List>
    );
};

export default MyChannels;