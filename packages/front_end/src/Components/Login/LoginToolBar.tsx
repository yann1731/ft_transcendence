import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import PokeBallIcon from '@mui/icons-material/CatchingPokemonTwoTone'
import { theme } from '../../Theme'


function LoginToolBar() {
  return (
    <AppBar position="fixed" style={{ backgroundImage: "none" }} sx={{ bgcolor: theme.palette.secondary.main }}>
      <Container>
        <Toolbar 
            sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    height: 64,
                }}>
          <PokeBallIcon sx={{ position: 'fixed', left: 15, color: 'white' }} />
          <Typography
            variant="h5"
            component="a"
            href=""
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            TRANSCENDENCE
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default LoginToolBar;