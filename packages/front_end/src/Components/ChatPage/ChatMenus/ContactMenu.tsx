import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { Avatar, Typography } from '@mui/material';

export default function ContactMenu() {

    const chatSettings = ['Add', 'Ban', 'Invite to Play', 'Kick', 'Make Admin', 'Mute', 'View Profile'];
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
      <React.Fragment>
        <Box sx={{}}>
          <Tooltip title="Contact options">
            <IconButton
              onClick={handleClick}
              aria-controls={open ? 'Contact options' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}></Avatar>
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="Contact options"
          open={open}
          onClick={handleClose}
        >
          {chatSettings.map((setting) => (
            <MenuItem key={setting} onClick={handleClose}>
              <Typography textAlign="left">{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </React.Fragment>
    );
  }