import { Avatar, List, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import { UserContext, User } from 'Contexts/userContext';
import { useContext } from 'react';
import { Chatroom, ChatInUse, chatroomType, UserFriendship, UserBlocks } from 'Components/Interfaces';
import React from 'react'
import axios from 'axios'
import { SocketContext } from 'Contexts/socketContext';
import { ChatroomMessage } from 'Components/Interfaces';
import { PrivateMessage } from 'Components/Interfaces';
import { socket } from 'Contexts/socketContext';

interface MyFriendsProps {
    searchText: string;
}


const MyFriends: React.FC<MyFriendsProps> = ({ searchText }) => {
  const [Users, setUsers] = React.useState<User[]>([]);
  const [FriendUsers, setFriendUsers] = React.useState<User[]>([]);
  const [BlockedUsers, setBlockedUsers] = React.useState<User[]>([]);
  const {user, updateUser} = useContext(UserContext);
  const [refresh, setRefresh] = React.useState(1);
  
  React.useEffect(() => {
    const fetchUsers = async () => {
      axios.get('http://localhost:4242/user', {headers: {
          'Authorization': user?.token,
          'userId': user?.id
        }}).then((response: any) => {
          const UsersData: User[] = response.data;
          setUsers(UsersData);
        }).catch((error: any) => {
        console.error('Error fetching users', error);
      })

      axios.get('http://localhost:4242/userblocks', {headers: {
          'Authorization': user?.token,
          'userId': user?.id
      }}).then((response: any) => {
          const BlockedUsersData: UserBlocks[] = response.data;
          let tempBlockedUsers: User[] = [];
          BlockedUsersData.forEach((users: UserBlocks) => {
            if (user?.id === users.blockerId)
            {
              const isBlocked = Users.find((blockedUser: User) => {
                return users.blockedUserId === blockedUser.id;
              })
              if (isBlocked !== undefined)
              {
                tempBlockedUsers.push(isBlocked);
              }
              
            }
            else if (user?.id === users.blockedUserId)
            {
              const isBlocked = Users.find((blockedUser: User) => {
                return users.blockerId === blockedUser.id;
              })
              if (isBlocked !== undefined)
              {
                tempBlockedUsers.push(isBlocked);
              }
            }
          });
          setBlockedUsers(tempBlockedUsers);
      }).catch((error: any) => {
        console.error('Error fetching blocked users', error);
      })

      axios.get(`http://localhost:4242/userfriendship`, {headers: {
          'Authorization': user?.token,
          'userId': user?.id
      }}).then((response: any) => {
          const FriendshipData: UserFriendship[] = response.data;
          let tempFriends: User[] = [];
          if (FriendshipData.length !== 0)
          {
            FriendshipData.forEach((friend: UserFriendship) => {
              if (user !== null && user.id === friend.userAId)
              {
                const isFriend = Users.find((users: User) => {
                  return (users.id === friend.userBId)
                })
                if (isFriend !== undefined)
                {
                  let isBlocked = BlockedUsers.find((friend: User) => {
                    return friend.id === isFriend.id;})
                  if (isBlocked === undefined)
                  {
                    tempFriends.push(isFriend);
                  }
                }
              }
              else if (user !== null && user.id === friend.userBId)
              {
                const isFriend = Users.find((users: User) => {
                  return (users.id === friend.userAId)
                })
                if (isFriend !== undefined)
                {
                  let isBlocked = BlockedUsers.find((friend: User) => {
                    return friend.id === isFriend.id;})
                    if (isBlocked === undefined)
                    {
                      tempFriends.push(isFriend);
                    }
                  }
                }
              })
            }
            setFriendUsers(tempFriends);
      }).catch((error: any) => {
          console.error('Error getting Friends: ', error);

      })
    };
    fetchUsers();
  }, [user, refresh]);

  const filteredFriends = FriendUsers.filter((friend: User) =>
  friend.username.toLowerCase().includes(searchText.toLowerCase())
  );
  
  const setPrivateHistory = (channelName: string | undefined) => {
    let newMessage: Partial<PrivateMessage> = {
      content: "messageText",
      senderId: user?.id,
      recipientId: channelName,
    };
    socket.emit("getPrivateHistory", newMessage);
  }

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
    setPrivateHistory(updatedUser.chatInUse?.chat.name);
    }
  };
  
  socket.on("connected", () => {
    socket.on("blocked", (id: string) => {
      if (user?.chatInUse?.chat.name === id){
        const updatedUser: Partial<User> = {
          ...user,
          chatInUse: undefined,
        };
        updateUser(updatedUser);
      }
    })
    socket.on("refresh2", () => {
      setRefresh(refresh => refresh + 1)
    })
  })

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

