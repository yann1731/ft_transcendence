import { Avatar, List, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import { UserContext, User } from 'Contexts/userContext';
import { useContext, useState, useEffect } from 'react';
import { Chatroom, ChatInUse, chatroomType, UserFriendship, UserBlocks } from 'Components/Interfaces';
import React from 'react'
import axios from 'axios'
import { PrivateMessage } from 'Components/Interfaces';
import { SocketContext } from 'Contexts/socketContext';

interface MyFriendsProps {
    searchText: string;
}

const MyFriends: React.FC<MyFriendsProps> = ({ searchText }) => {
  const [Users, setUsers] = React.useState<User[]>([]);
  const [FriendUsers, setFriendUsers] = React.useState<User[]>([]);
  const [BlockedUsers, setBlockedUsers] = React.useState<User[]>([]);
  const {user, updateUser} = useContext(UserContext);
  const [refresh, setRefresh] = React.useState(1);
  const [friends, setFriends] = useState<User[]>([]);

  const socket = useContext(SocketContext);

  socket.on("updateFriends", (data: any) => {
    setFriends(data.friends);
  });

  socket.on("reloadFriends", (data: any) => {
    socket.emit("getFriends", { id: user?.id });
  });

  useEffect(() => {
    socket.emit("getFriends", { id: user?.id});
  }, []);

  const setPrivateHistory = (channelName: string | undefined) => {
    let newMessage: Partial<PrivateMessage> = {
      content: "messageText",
      senderId: user?.id,
      recipientId: channelName,
    };
    socket.emit("getPrivateHistory", newMessage);
  }

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

    let _chats: Array<string>;
    if (updatedUser.username && updatedUser.chatInUse?.type) {
      _chats = [updatedUser.chatInUse?.chat.name, updatedUser.chatInUse?.chat.id, updatedUser.chatInUse?.type, updatedUser.username]
      localStorage.setItem(updatedUser.username, JSON.stringify(_chats));
    }
    const _chatInfo = JSON.parse(localStorage.getItem(user?.username) || "[]");
    setPrivateHistory(updatedUser.chatInUse?.chat.name);
    }
  };
  

    return (
      <List>
        {friends.map((friend: User) => (
         <ListItemButton key={friend.id} onClick={() => SetChatInUse(friend.username, friend.avatar)}>
            <ListItemIcon>
              <Avatar alt={friend.username} src={friend.avatar} />
            </ListItemIcon>
            <ListItemText primary={friend.nickname} />
            <ListItemText secondary={friend.userStatus} sx={{ textAlign: 'right' }} />
        </ListItemButton>
        ))}
      </List>
    );
  };
  
export default MyFriends;

