import { List, ListItemButton, ListItemText, ListItemIcon, Avatar, setRef } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import { Chatroom, ChatroomUser, ChatInUse, chatroomType } from 'Components/Interfaces';
import axios from 'axios';
import { UserContext, User } from 'Contexts/userContext';
import { socket } from 'Contexts/socketContext';

//TODO Quand on update un chatroom, le chatInUse du user change pour un autre, et celui des autres utilisateurs changent pour cleui qui est modifié
//TODO Aussi retester Delete
interface MyChannelsProps {
    searchText: string;
  }

  const MyChannels: React.FC<MyChannelsProps> = ({ searchText }) => {
    const {updateUser, user} = useContext(UserContext);
    const [channels, setChannels] = useState<Chatroom[]>([]);
    const [joinedchannels, setJoinedChannels] = useState<Chatroom[]>([]);
    const [refresh, setRefresh] = useState(1);
    
     useEffect(() => {
      //alert("in effect");
      const fetchChannels = async () => {
        await axios.get('http://localhost:4242/chatroom', {headers: {
          'Authorization': user?.token,
          'userId': user?.id
        }})
        .then((response:any) => {
          setChannels(response.data);
          const Chans = response.data;
          axios.get(`http://localhost:4242/chatroomuser/user/${user?.id}`, {headers: {
            'Authorization': user?.token,
            'userId': user?.id
          }})
          .then((response: any) => {
            const chatroomUsersData: ChatroomUser[] = response.data;
            const chans: Chatroom[] = [];
            
            Chans.forEach((channel: Chatroom) => {
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
    }, [user]);
    
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
      socket.emit("refresh");
    };
    
    let filteredChannels : any = user?.Chatroom?.filter((channel: Chatroom) =>
      channel.name.toLowerCase().includes(searchText.toLowerCase())
    );

    socket.on("connected", () => {
      socket.on("refresh", () => {
        setRefresh(refresh => refresh + 1);
      })
      /* socket.on("chat created", (data: any) => {
        SetChatInUse(data.newChatroom.name)
        //setRefresh(!refresh);
      })
      socket.on("chatroom created", (data: any) => {
        setRefresh(refresh + 1);
      })
      socket.on("added", () => {
        setRefresh(refresh + 1);
      })
      socket.on("chatroom deleted", (data: any) => {
        setRefresh(refresh + 1);
      }) 
      socket.on("chatroom updated", (data: any) => {
       const chatroomIndexToUpdate = user?.Chatroom?.findIndex((chatroom: Chatroom) => chatroom.name === data.chatroomUpdated.name);

        if (chatroomIndexToUpdate !== -1 && chatroomIndexToUpdate !== undefined) {
          const updatedChatrooms = user?.Chatroom ? [...user?.Chatroom] : [];
          updatedChatrooms[chatroomIndexToUpdate] = data.chatroomUpdated;
          setJoinedChannels(updatedChatrooms);
        }
        else
          setRefresh(refresh + 1)
        })
        socket.on("chatroom quit", () => {
          setRefresh(refresh + 1);
        }) */
    });
    
    
    
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