import "@fontsource/roboto"
import { createTheme, ThemeOptions, PaletteMode } from "@mui/material";

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
					'--textfield-color' : mode === 'dark' ? '#FFFFFF' : '#2067A1',
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
  };
  
  export const theme = createTheme(themeOptions);