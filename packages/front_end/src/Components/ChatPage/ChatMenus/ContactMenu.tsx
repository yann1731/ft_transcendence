import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import { Avatar, Typography } from '@mui/material';

export default function ContactMenu({Useravatar}: { Useravatar: string | undefined }) {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };

    return (
      <React.Fragment>
        <Box sx={{}}>
          <Tooltip title="Contact Profile">
            <IconButton
              onClick={handleClick}
              aria-controls={open ? 'Contact options' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar src={Useravatar} sx={{ width: 32, height: 32 }}></Avatar>
            </IconButton>
          </Tooltip>
        </Box>
      </React.Fragment>
    );
  } 