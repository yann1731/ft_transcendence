import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PokeBallIcon from '@mui/icons-material/CatchingPokemonTwoTone'
import ThemeModeIcon from '@mui/icons-material/DarkMode'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { User } from './Interfaces';
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../store/reducers/themeSlice";

const pages = [
  { label: 'Home', link: '/Home' },
  { label: 'Chat', link: '/Chat'},
  { label: 'Profile', link: '/Profile'},
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];



function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [userStatistics, setUserStatistics] = useState<User | null>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
		const fetchUserStatistics = async () => {
			try {
				const response = await fetch('http://localhost:4242/user/e26900d2-d2cb-40e7-905c-cf9e1f7fdbd3');
				if(response.ok)
				{
					const data = await response.json();
					setUserStatistics(data);
				}
				else
				{
					console.error('Could not fetch user');
				}
			}
			catch (err) {
				console.error(err);
			}
		};

		fetchUserStatistics();
	}, [userStatistics]);
  
  const dispatch = useDispatch();

  return (
    <div className="toolbar">
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <Tooltip title="Gotta catch em all!">
              <PokeBallIcon className="pokeball" />
            </Tooltip>
          <div id="anim" className="themeButtonStyle">
            <Tooltip title="Light / Dark Mode">
              <IconButton className="buttonBackground" onClick={() => dispatch(asyncToggleTheme() as any)}>
                <ThemeModeIcon className="iconThemeBackground"></ThemeModeIcon>
              </IconButton>
            </Tooltip>
          </div>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/FatCat"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              textDecoration: 'none',
            }}
          >
            <img src="https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,fl_progressive,q_auto,w_1024/632d52a6376a2b001d128f18.jpg" alt="fat cat" width={65} style={{ position: 'fixed', top: 1, left: 55}}>
			      </img>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                "&.MuiPaper-root":{ backgroundColor: "red" }
              }}
            >
              {pages.map((page) => (
                  <Link style={{textDecoration: 'none'}} to={page.link}>
                    <MenuItem key={page.label} onClick={handleCloseNavMenu} sx={{ color: 'white', fontWeight: 'bold' }}>
                      <Typography textAlign="center">{page.label}</Typography>
                    </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TRANSCENDENCE
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, position: 'fixed', left: 150 }}>
            {pages.map((page) => (
              <Link style={{textDecoration: 'none'}} to={page.link}>
                <Button variant="outlined"
                  key={page.label}
                  onClick={handleCloseNavMenu}
                  className="toolbarButtons"
                  sx={{ marginRight: '15px', width: 'auto', fontWeight: 'bold', ":hover": { bgcolor: "white"} }}
                  >
                  {page.label}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0}}>
            <Tooltip title="Open settings">
              <div id="anim" className="profileButtonStyle">
                <IconButton onClick={handleOpenUserMenu}>
                  <Avatar alt={userStatistics?.username} src={userStatistics?.avatar} />
                </IconButton>
              </div>
            </Tooltip>
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
        </Toolbar>
      </Container>
    </AppBar>
    </div>
  );
}

export default ResponsiveAppBar;