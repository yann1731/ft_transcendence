import { Routes, Route } from 'react-router-dom';
import Home from './HomePage/Home';
import Chat from './ChatPage/Chat';
import Profile from './ProfilePage/Profile';
import FatCat from './FatCat';

function App() {
	return (
	<Routes>
		<Route path='/' element={ <Home /> } />
		<Route path='/Profile' element={ <Profile /> } />
		<Route path='/Chat' element={ <Chat /> } />
		<Route path='/FatCat' element={ <FatCat /> } />
	</Routes>
	)
}

export default App;