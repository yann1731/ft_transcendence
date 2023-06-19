import * as React from 'react';
import { AppBar } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import DehazeIcon from '@mui/icons-material/Dehaze';
import Button from '@mui/material/Button';
import '../../../App.css';

export default function OptionBarFriends() {
    const settings = ['Add Friend', 'Block', 'Invite to Play', 'View Profile'];
  
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const handleAdd = () => {
      return (alert(":D"))
    };
    const handleBlock = () => {
      return (alert(":O"))
    };
    const handleInvite = () => {
      return (alert(":/"))
    };
    const handleProfile = () => {
      return (alert(":("))
    };

    const Alert = (option: string) => {
      switch(option)
      {
        case 'Add Friend':
          handleAdd();
          break;
        case 'Block':
          handleBlock();
          break;
        case 'Invite to Play':
            handleInvite();
            break;
        case 'View Profile':
            handleProfile();
            break;
        default:
          alert(":'(")

      }
    };
  return (
      <AppBar position="relative" sx={{ boxShadow: '0' }}>
      <Box className={"chatOptionBars"}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <DehazeIcon></DehazeIcon>
              </IconButton>
            </Tooltip>
            Friends
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="left">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
      </AppBar>
  );
}