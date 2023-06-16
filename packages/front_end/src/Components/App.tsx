import { Routes, Route } from 'react-router-dom';
import Home from './HomePage/Home';
import Chat from './ChatPage/Chat';
import Profile from './ProfilePage/Profile';
import FatCat from './FatCat';
import Login from './Login/Login';
import { UserProvider } from 'Contexts/userContext';

function App() {
	return (
		<UserProvider>
			<Routes>
				<Route path='/' element={ <Login />} />
				<Route path='/Home' element={ <Home /> } />
				<Route path='/Profile' element={ <Profile /> } />
				<Route path='/Chat' element={ <Chat /> } />
				<Route path='/FatCat' element={ <FatCat /> } />
			</Routes>
		</UserProvider>
	);
}
export default App;
