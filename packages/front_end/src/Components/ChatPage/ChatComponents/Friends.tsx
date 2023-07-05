import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { ListItemButton } from '@mui/material';
import { UserContext, User } from 'Contexts/userContext';
import { useContext } from 'react';

interface MyFriendsProps {
    searchText: string;
}


const MyFriends: React.FC<MyFriendsProps> = ({ searchText }) => {
  const {user, updateUser} = useContext(UserContext);
  const friendsList = [
    { id: '1', name: 'Remy Sharp', status: 'online', avatar: 'https://material-ui.com/static/images/avatar/1.jpg' },
    { id: '2', name: 'Alice Lepapier', status: 'offline', avatar: 'https://material-ui.com/static/images/avatar/3.jpg' },
    { id: '3', name: 'Cindy Baker', status: 'online', avatar: 'https://material-ui.com/static/images/avatar/2.jpg' },
    { id: '4', name: 'Aliche Desautels', status: 'online', avatar: 'https://material-ui.com/static/images/avatar/7.jpg' },
    { id: '5', name: 'Alonge Lemur', status: 'busy', avatar: 'https://material-ui.com/static/images/avatar/4.jpg'}
  ];
  
  const filteredFriends = friendsList.filter((friend) =>
  friend.name.toLowerCase().includes(searchText.toLowerCase())
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
        {filteredFriends.map((friend) => (
          <ListItemButton key={friend.id} onClick={() => SetChatInUse(friend.name, friend.avatar)}>
            <ListItemIcon>
              <Avatar alt={friend.name} src={friend.avatar} />
            </ListItemIcon>
            <ListItemText primary={friend.name} />
            <ListItemText secondary={friend.status} sx={{ textAlign: 'right' }} />
          </ListItemButton>
        ))}
      </List>
    );
  };
  
  export default MyFriends;
  