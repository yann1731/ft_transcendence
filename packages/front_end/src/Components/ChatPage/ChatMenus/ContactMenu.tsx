import * as React from 'react';
import { Avatar, Tooltip, IconButton, Box, Popover } from '@mui/material';
import { LimitedProfile } from '../../ProfilePage/Profile'
import { Message, statsProps } from '../../Interfaces';
import axios from 'axios';

export default function ContactMenu({ UserAvatar, nickname, userId }: Message) {
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
  const userToDisplay = userData.find((user) => user.username === nickname);

  console.log(userId)
  return (
    <React.Fragment>
      <Box sx={{}}>
          <IconButton>
            <Avatar src={UserAvatar} sx={{ width: 32, height: 32 }} />
          </IconButton>
      </Box>
    </React.Fragment>
  );
}