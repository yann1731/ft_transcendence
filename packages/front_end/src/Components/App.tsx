import { Routes, Route } from 'react-router-dom';
import Home from './HomePage/Home';
import Chat from './ChatPage/Chat';
import Profile from './ProfilePage/Profile';
import FatCat from './FatCat';
import Login from './Login/Login';
import Wait from './WaitingPage/Wait';
import Enable2Fa from './QRcode/Enable2Fa';
import Otp from './Otp/Otp';
import { useSelector } from "react-redux";
import React, { useState, useMemo } from "react";
import { createTheme, ThemeProvider, PaletteMode } from '@mui/material/';
import { RootState } from 'store/store';
import { getDesignTokens } from '../Theme';
import UserProvider from 'Contexts/userContext';
import { SocketContext } from 'Contexts/socketContext';
import ResponsiveAppBar from './ToolBar';

function App() {
	const [mode, setMode] = useState<PaletteMode>("dark");
	const lightMode = useSelector((state: RootState) => state.theme.lightMode);
	const socket = React.useContext(SocketContext)

	useMemo(() => {
		if (lightMode) {
			setMode("light");
		} else {
			setMode("dark");
		}
	}, [lightMode]);


	
	const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
	return (
		<UserProvider>
			<SocketContext.Provider value={socket}>
			<ThemeProvider theme={theme}>
				<ResponsiveAppBar />
				<Routes>
					<Route path='/' element={ <Login />} />
					<Route path='/FatCat' element={ <FatCat /> } />
					<Route path='/wait' element={<Wait /> } />
					<Route path='/Enable2Fa' element={ <Enable2Fa />} />
					<Route path='/otp' element={ <Otp /> } />
					<Route path='/Home' element={ <Home /> } />
					<Route path='/Profile' element={ <Profile /> } />
					<Route path='/Chat' element={ <Chat /> } />
				</Routes>
			</ThemeProvider>
			</SocketContext.Provider>
		</UserProvider>
	);
}
export default App;
