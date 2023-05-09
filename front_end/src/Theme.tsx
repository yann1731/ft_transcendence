
import { createTheme, ThemeOptions } from '@mui/material/styles';

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#55b8d2',
    },
    secondary: {
      main: '#378ea6',
    },
  },
};

export const theme = createTheme(themeOptions);