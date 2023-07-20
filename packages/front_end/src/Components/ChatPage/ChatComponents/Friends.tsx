import { Avatar, List, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import { UserContext, User } from 'Contexts/userContext';
import { useContext } from 'react';
import { Chatroom, ChatInUse, chatroomType, UserFriendship } from 'Components/Interfaces';
import React from 'react'
import axios from 'axios'
interface MyFriendsProps {
    searchText: string;
}


const MyFriends: React.FC<MyFriendsProps> = ({ searchText }) => {
  const [Users, setUsers] = React.useState<User[]>([]);
  const [FriendUsers, setFriendUsers] = React.useState<User[]>([]);
  const {user, updateUser} = useContext(UserContext);
  
  React.useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4242/user', {headers: {
          'Authorization': user?.token,
          'userId': user?.id
        }});
        
        if (response.status === 200) {
          const UsersData: User[] = response.data;
          setUsers(UsersData);
        }
      } catch (error) {
        console.error('Error fetching users', error);
      }
      try {
        const response = await axios.get(`http://localhost:4242/userfriendship/`, {headers: {
          'Authorization': user?.token,
          'userId': user?.id
        }});
        
        if (response.status === 200) {
          const FriendshipData: UserFriendship[] = response.data;
          const tempFriends: User[] = [];
          if (FriendshipData.length !== 0)
          {
            FriendshipData.forEach(friend => {
              if (user !== null && user.id === friend.userAId)
              {
                const isFriend = Users.find((users: User) => {
                  return (users.id === friend.userBId)
                })
                if (isFriend !== undefined)
                {
                  tempFriends.push(isFriend);
                }
              }
              else if (user !== null && user.id === friend.userBId)
              {
                const isFriend = Users.find((users: User) => {
                  return (users.id === friend.userAId)
                })
                if (isFriend !== undefined)
                {
                  tempFriends.push(isFriend);
                }
              }
            })
          }
          setFriendUsers(tempFriends);
        }
      } catch (error) {
          console.error('Error getting Friends: ', error);
          alert('Error: could not get Friends: ' + error);
      }
    };
    fetchUsers();
  }, [Users, user]);

  const filteredFriends = FriendUsers.filter((friend: User) =>
  friend.username.toLowerCase().includes(searchText.toLowerCase())
  );
  
  // Éventuellement, remplacer par api get chatroom
  const SetChatInUse = (name: string, picture: string) => {
    if (user !== null)
    {
      const newChatroom: Chatroom = {
        id: "",
        name: name,
        picture: picture,
        messages: [],
        state: "private",
        chatroomOwner: user,
        userId: user?.id,
        password: null,
        users:[]
      };

      const newChatInUse: ChatInUse = {
        chat: newChatroom,
        type: chatroomType.friend
      }
      const updatedUser: Partial<User> = {
        ...user,
        chatInUse: newChatInUse,
      };
      
     updateUser(updatedUser);
    }
  };
  
    return (
      <List>
        {filteredFriends.map((friend: User) => (
         <ListItemButton key={friend.id} onClick={() => SetChatInUse(friend.username, friend.avatar)}>
            <ListItemIcon>
              <Avatar alt={friend.username} src={friend.avatar} />
            </ListItemIcon>
            <ListItemText primary={friend.username} />
            <ListItemText secondary={friend.userStatus} sx={{ textAlign: 'right' }} />
        </ListItemButton>
        ))}
      </List>
    );
  };
  
  export default MyFriends;
  