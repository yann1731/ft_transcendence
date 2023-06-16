import { Routes, Route } from 'react-router-dom';
import Home from './HomePage/Home';
import Chat from './ChatPage/Chat';
import Profile from './ProfilePage/Profile';
import FatCat from './FatCat';
import Login from './Login/Login';
import { useSelector } from "react-redux";
import { useState, useMemo } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { RootState } from 'store/store';
import { PaletteMode } from '@mui/material';

export const getDesignTokens = (mode: PaletteMode) => ({
	palette: {
	  mode,
	  ...(mode === "dark"
		? {
		  primary: {
			main: '#152647',
		  },
		  secondary: {
			main: '#001828'
		  },
		  background: {
			default: '#152647',
			paper: "#FFFFFF",
		  },
		  text: {
			primary: "#FFFFFF",
			secondary: "#001828",
		  },
		}
	  : {
		primary: {
		  main: '#FFFFFF',
		},
		secondary: {
		  main: '#152647',
		},
		background: {
		  default: "#FFFFFF",
		  paper: "#FFFFFF",
		},
		text: {
		  primary: '#001828',
		  secondary: '#FFFFFF',
		},
	  }),
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				':root': {
					'--secondary-color': '#001828',
					'--primary-color': '#152647',
				},
			},
		},
	},
  });

function App() {
	const [mode, setMode] = useState<PaletteMode>("dark");
	const lightMode = useSelector((state: RootState) => state.theme.lightMode);

	useMemo(() => {
		if (lightMode) {
			setMode("light");
		} else {
			setMode("dark");
		}
	}, [lightMode]);

	const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
	return (
	<ThemeProvider theme={theme}>
		<Routes>
			<Route path='/' element={ <Login />} />
			<Route path='/Home' element={ <Home /> } />
			<Route path='/Profile' element={ <Profile /> } />
			<Route path='/Chat' element={ <Chat /> } />
			<Route path='/FatCat' element={ <FatCat /> } />
		</Routes>
	</ThemeProvider>
	);
}
export default App;
