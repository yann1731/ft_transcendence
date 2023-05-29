
import { createTheme, ThemeOptions } from '@mui/material/styles';
import "@fontsource/roboto"

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    background: {
      default: '#152647',
    },
    primary: {
      main: '#152647',
    },
    secondary: {
      main: '#001828',
    },
  },
  typography: {
    fontFamily: 'Roboto',
  },
};

export const theme = createTheme(themeOptions);