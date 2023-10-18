import * as React from 'react';
import { AppBar, Box, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem } from '@mui/material/';
import MenuIcon from '@mui/icons-material/Menu';
import PokeBallIcon from '@mui/icons-material/CatchingPokemonTwoTone'
import ThemeModeIcon from '@mui/icons-material/DarkMode'
import { useContext } from 'react';
import { useDispatch } from "react-redux";
import { asyncToggleTheme } from "../store/reducers/themeSlice";
import { User, UserContext } from '../Contexts/userContext';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { SocketContext } from 'Contexts/socketContext';

const pages = [
  { label: 'Home', link: '/Home' },
  { label: 'Chat', link: '/Chat'},
  { label: 'Profile', link: '/Profile'},
];

const settings = ['Profile settings', 'Logout'];

function ResponsiveAppBar() {
  const socket = useContext(SocketContext);
  const {user, setUser, updateUser} = useContext(UserContext);
  const [button, setButton] = React.useState(true);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  
  const handleCloseNavMenu = (where: string, to: string) => {
      if (button === true) {
        setButton(false)
        setTimeout(() => {
          setButton(true)
        }, 500)
        if (where !== "Home"){
          const updatedUser: Partial<User> = {...user, host: false, isInvited: false};
          updateUser(updatedUser)
          socket.emit("disconnected")
        }
        if (where !== 'Chat'){
          const updatedUser: Partial<User> = {...user, chatInUse: undefined};
          updateUser(updatedUser)
          localStorage.clear()
        }
        setAnchorElNav(null);
        navigate(to)
      }
  };

  React.useEffect(() => {
    const updatedUser: Partial<User> = {...user, host: false, isInvited: false};
    updateUser(updatedUser)
    socket.emit("outGame", { id: user?.id})
  }, [])

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);  
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  
  const handleSettingClick = (setting: string) => {
    if (setting === 'Profile settings') {
      navigate('/profile');
    }
    else if (setting === 'Logout') {
      setUser(null);
      socket.emit("logout");
      navigate('/');
    }
    handleCloseUserMenu();
  };

  
  const dispatch = useDispatch();
  
  if (useLocation().pathname.toLowerCase() === "/home" || useLocation().pathname.toLowerCase() === "/chat" || useLocation().pathname.toLowerCase() === "/profile" ){
    if (!socket.connected)
      socket.connect();
  return (
    <div className="toolbar">
    <AppBar sx={{ height: '64px' }}>
      <Container maxWidth="xl">
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
          <Link to="/fatcat">
            <Typography
              variant="h6"
              noWrap
              component="a"
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
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ "&:hover": { backgroundColor: "transparent", } }}
            >
              <MenuIcon className="toolbarBurgerMenu" />
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
                    <MenuItem key={page.label} onClick={() => handleCloseNavMenu(page.label, page.link)}>
                      <Typography textAlign="center">{page.label}</Typography>
                    </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Link to="/home" style={{ textDecoration: 'none ', color: 'white' }}>
            <Typography
              variant="h5"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                position: 'center',
                marginLeft: '120px',
                marginTop: '-9px',
              }}
            >
              TRANSCENDENCE
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, position: 'fixed', left: 150 }}>
            {pages.map((page) => (
                <Button variant="outlined"
                  key={page.label}
                  onClick={() => handleCloseNavMenu(page.label, page.link)}
                  className="toolbarButtons"
                  sx={{ marginRight: '15px', marginTop: '14px', width: 'auto', fontWeight: 'bold', ":hover": { bgcolor: "white"} }}
                  >
                  {page.label}
                </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0}}>
            <Tooltip title="Open settings">
              <div id="anim" className="profileButtonStyle">
                <IconButton onClick={handleOpenUserMenu}>
                  <Avatar alt={user?.username} src={user?.avatar} />
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
              {settings.map((setting: string) => (
                <MenuItem key={setting} onClick={() => handleSettingClick(setting)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
      </Container>
    </AppBar>
    </div>
  );
  } else {
    return (<div></div>);
  }
          
}

export default ResponsiveAppBar;