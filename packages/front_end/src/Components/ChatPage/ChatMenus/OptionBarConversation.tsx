import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { UserContext } from 'Contexts/userContext';
import { Avatar } from '@mui/material';

export default function OptionBarConversation() {
    /* Settings vont être pris directement dans les objets Users, qui seront divisé en 3 categories, Owner, Admin et Standard*/
    const AdminSettings = ['Add', 'Ban', 'Kick', 'Make Admin', 'Mute', 'Quit', 'View Members'];
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const {user} = React.useContext(UserContext);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
  return (
    <AppBar position="relative" sx={{ boxShadow: '0' }}>
      <Box className={"chatOptionBars"} sx={{justifyContent: 'space-between' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu}>
                <DehazeIcon></DehazeIcon>
              </IconButton>
            </Tooltip>
            {user?.chatInUse?.Name}
            <Menu
              sx={{ mt: '40px' }}
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
              {AdminSettings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
            <Avatar src={user?.chatInUse?.Picture} sx={{ marginRight: 0.5 }}></Avatar>
          </Box>
      </AppBar>
  );
}