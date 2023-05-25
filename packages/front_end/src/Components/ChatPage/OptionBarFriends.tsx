import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { theme } from '../../Theme';

export default function OptionBarContacts() {
    const settings = ['Add Friend', 'Block', 'Invite to Play', 'View Profile'];
  
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
  return (
      <AppBar position="relative" sx={{ boxShadow: 'none' }}>
      <Box sx={{ flexGrow: 0, bgcolor: theme.palette.primary.main }}>
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
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
      </AppBar>
  );
}