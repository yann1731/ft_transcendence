import { Routes, Route } from 'react-router-dom';
import Home from './HomePage/Home';
import Chat from './ChatPage/Chat';
import Profile from './ProfilePage/Profile';
import FatCat from './FatCat';
import Login from './Login/Login';
import Wait from './WaitingPage/Wait';
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
			paper: '#001828',
		  },
		  text: {
			primary: "#FFFFFF",
			secondary: "#FFFFFF",
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
		  primary: '#2067A1',
		  secondary: '#FFFFFF',
		},
	  }),
	},
	components: {
		MuiPaper: {
			styleOverrides: {
				root: mode === 'dark' ? {
					backgroundImage: 'none',
					backgroundColor: '#001828',
					color: 'white',
				} : '',
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					width: '99%',
					border: '1px solid white',
					...(mode === 'dark' ? {
					backgroundColor: '#001828',
					color: 'white',
				} : {
					backgroundColor: '#ABBEF5',
					}),
					'&:hover': {
						borderColor: mode === 'dark' ? 'white' : '#2067A1',
					},
				}
			},
		},
		MuiCssBaseline: {
			styleOverrides: {
				':root': {
					'--secondary-color': mode === 'dark' ? '#001828' : '#ABBEF5',
					'--primary-color': mode === 'dark' ? '#152647' : '#FFFFFF',
					'--button-color' : mode === 'dark' ? '#001828' : '#2067A1',
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				colorPrimary: {
					color: mode === 'dark' ? '#FFFFFF' : '#2067A1',
				},
			},
		},
		MuiMenuItem: {
			styleOverrides: {
				root: {
					color: mode === 'dark' ? '#FFFFFF' : '#2067A1'
				}
			}
		}
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
				<Route path='/wait' element={<Wait /> } />
			</Routes>
		</ThemeProvider>
	);
}
export default App;
