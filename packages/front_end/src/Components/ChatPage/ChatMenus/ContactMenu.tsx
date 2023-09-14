import * as React from 'react';
import { Avatar, Tooltip, IconButton, Box, Popover } from '@mui/material';
import { LimitedProfile } from '../../ProfilePage/Profile'
import { Message, statsProps } from '../../Interfaces';
import axios from 'axios';

export default function ContactMenu({ UserAvatar, nickname }: Message) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [userData, setUserData] = React.useState<statsProps[]>([])

  React.useEffect(() => {
    axios.get('api/user')
      .then((response) => {
        const userDataFromAPI: statsProps[] = response.data;
        setUserData(userDataFromAPI);
      })
      .catch((error) => {
        console.error('Error fetching user data', error);
      });
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'contact-options-popover' : undefined;
  const userToDisplay = userData.find((user) => user.nickname === nickname);


  return (
    <React.Fragment>
      <Box sx={{}}>
        <Tooltip title="Contact Profile">
          <IconButton
            onClick={handleClick}
            aria-controls={id}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar src={UserAvatar} sx={{ width: 32, height: 32 }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ p: 2 }}>
          {userToDisplay && <LimitedProfile userId={userToDisplay?.userId} username={userToDisplay?.username} nickname={userToDisplay?.nickname} win={userToDisplay?.win} loss={userToDisplay?.loss} gamesPlayed={userToDisplay?.gamesPlayed} avatar={userToDisplay?.avatar} />}
        </Box>
      </Popover>
    </React.Fragment>
  );
}