import PokeBallIcon from '@mui/icons-material/CatchingPokemonTwoTone'
import { useTheme, AppBar, Toolbar, Typography, Container } from '@mui/material/'

function LoginToolBar() {
  const theme = useTheme();
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
          <PokeBallIcon className="pokeball" />
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