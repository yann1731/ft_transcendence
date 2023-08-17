import * as React from 'react';
import { Avatar, Tooltip, IconButton, Box, Popover } from '@mui/material';
import { LimitedProfile } from '../../ProfilePage/Profile'
import { Message } from '../../Interfaces';

export default function ContactMenu({ UserAvatar, userId, nickname }: Message) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'contact-options-popover' : undefined;

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
          <LimitedProfile userAvatar={UserAvatar} userId={userId} nickname={nickname} />
        </Box>
      </Popover>
    </React.Fragment>
  );
}