import axios from 'axios';
import * as React from 'react';
import { useTheme, Button, Modal, Autocomplete, TextField, Menu, IconButton, Typography, Box, MenuItem, Tooltip, AppBar } from '@mui/material';
import DehazeIcon from '@mui/icons-material/Dehaze';
import '../../../App.css';
import { UserContext, User } from 'Contexts/userContext';
import { UserFriendship, Chatroom, chatroomType, ChatInUse } from 'Components/Interfaces';

export default function OptionBarFriends() {
    const settings = ['Add Friend', 'Block', 'Invite to Play', 'View Profile'];
    const [mode, setMode] = React.useState<string>('');
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [isFriendManagementWindowOpen, setWindowIsOpen] = React.useState(false);
    const theme = useTheme();
    const createChannelcolors = theme.palette.mode === 'dark' ? '#FFFFFF' : '#2067A1';
    const [UserName, setUserName] = React.useState('');
    const [Users, setUsers] = React.useState<User[]>([]);
    const [NonFriendUsers, setNonFriendUsers] = React.useState<User[]>([]);
    const [FriendUsers, setFriendUsers] = React.useState<User[]>([]);
    const {user, updateUser} = React.useContext(UserContext);

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
              FriendshipData.forEach((friend: UserFriendship) => {
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
            
            const tempIsNotFriend: User[] = [];
            Users.forEach((users: User) => {
              const notFriend = FriendUsers.find((friend: User) => {
                return users?.id === friend?.id;
              })
              if (notFriend === undefined && users?.id !== user?.id)
              {
                tempIsNotFriend.push(users);
              }
            });
            setNonFriendUsers(tempIsNotFriend);
          }
        } catch (error) {
          console.error('Error fetching users', error);
        }
      };
  
      fetchUsers();
    }, [mode, FriendUsers, Users, user]);

    const handleMode = (mode: string) => {
      setMode(mode);
      setWindowIsOpen(true);
    };

    const handleCloseWindow = () => {
      setWindowIsOpen(false);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const friendsOption = (option: string) => {
      handleMode(option);
      handleCloseUserMenu();
    };

    const handleFriends = async () => {
      if (!UserName) {
        alert('No username was given')
        return ;
      }
      const friendToModify = Users.find((friend: User) => {
        return friend.nickname === UserName;
      });
      if (mode === 'Add Friend')
      {
        try {
          const response = await axios.post(`http://localhost:4242/userfriendship`, {userAId: user?.id, userBId: friendToModify?.id}, {headers: {
            'Authorization': user?.token,
            'userId': user?.id
          }});
          console.log('Friend successfuly added', response.data);
          const username = friendToModify?.username === undefined ? "pouet" : friendToModify?.username;
          const newChannel: Chatroom = {
            id: "",
            name: username,
            picture: friendToModify?.avatar,
            state: "private",
            userId: user?.id,
            password: null,
          };
          const newChatInUse: ChatInUse = {
            chat: newChannel,
            type: chatroomType.channel,
        }
          const updatedUser: Partial<User> = { ...user, chatInUse: newChatInUse };
          updateUser(updatedUser);
        } catch (error) {
          console.error('Error adding new friend', error);
          alert('Error adding new friend: ' + error);
        }
      }
      else if (mode === 'Block')
      {
        try {
          const response = await axios.post(`http://localhost:4242/userblocks`, {blocker: user?.id, blockedUser: friendToModify?.id}, {headers: {
            'Authorization': user?.token,
            'userId': user?.id
          }});
          console.log('User successfuly blocked', response.data);
        } catch (error) {
          console.error('Error blocking user', error);
          alert('Error adding blocking user: ' + error);
        }
      }
      else if (mode === 'Invite')
      {

      }
      else if (mode === 'View')
      {

      }
      setUserName('');
      handleCloseWindow();
      setMode('');
    };
    
    const handleUserSelection = (event: React.ChangeEvent<{}>, friend: User | null) => {
      if (friend) {
        setUserName(friend.nickname);
      } else {
        setUserName('');
      }
    };
        
    
    const friendHandlerWindow = (
      <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 3
        }}
      >
        <Typography variant="h6" component="div" sx={{ marginBottom: 2 }}>
        {mode}
        </Typography>
        {mode !== "Add Friend" ?
        <Autocomplete
          disablePortal
          id="Users"
          options={FriendUsers}
          getOptionLabel={(option) => option.nickname}
          fullWidth
          sx={{ marginBottom: 2 }}
          onChange={handleUserSelection}
          renderInput={(params) => 
          <TextField
            {...params}
            className="Search For User"
            sx={{
              '& label': { color: createChannelcolors },
              '& .MuiInputLabel-root.Mui-focused' : { color: createChannelcolors }
            }}
            label="Users" 
          />
        }
        />
        :
        <Autocomplete
          disablePortal
          id="Users"
          options={NonFriendUsers}
          getOptionLabel={(option) => option.nickname}
          fullWidth
          sx={{ marginBottom: 2 }}
          onChange={handleUserSelection}
          renderInput={(params) => 
          <TextField
            {...params}
            className="Search For User"
            sx={{
              '& label': { color: createChannelcolors },
              '& .MuiInputLabel-root.Mui-focused' : { color: createChannelcolors }
            }}
            label="Users" 
          />
        }
        />}
        <Button onClick={handleFriends} className="profilePageButtons" sx={{ marginBottom: 2 }}>
          {mode}
        </Button>
        <Button onClick={handleCloseWindow} className="profilePageButtons">
          cancel
        </Button>
      </Box>
    );

  return (
      <AppBar position="relative" sx={{ boxShadow: '0' }}>
      <Box className={"chatOptionBars"}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <DehazeIcon></DehazeIcon>
              </IconButton>
            </Tooltip>
            <Typography sx={{textAlign: 'center'}}>
            Friends
            </Typography>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              >
              {settings.map((setting: string) => (
                <MenuItem key={setting} onClick={() => friendsOption(setting)}>
                    <Typography textAlign="left">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Modal open={isFriendManagementWindowOpen} onClose={handleCloseWindow}>{friendHandlerWindow}</Modal>
      </AppBar>
  );
}