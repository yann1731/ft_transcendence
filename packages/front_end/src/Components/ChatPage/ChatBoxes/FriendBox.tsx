import { Box, TextField } from '@mui/material/';
import MyFriends from '../ChatComponents/Friends';
import { useState, ChangeEvent, useContext } from 'react';
import { SocketContext } from 'Contexts/socketContext';
import { UserContext } from 'Contexts/userContext';

  export default function FriendBox() {
	const [searchText, setSearchText] = useState('');
	const socket = useContext(SocketContext);
	const {user, updateUser} = useContext(UserContext);
	
	const handleSearchTextChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchText(event.target.value);
	};

	return (
		<Box className={"friendsAndChannelBoxes"}>
			<Box>
				<TextField 
					label="Search"
					fullWidth 
					className={"focusedTextField"} 
					value={searchText}
					onChange={handleSearchTextChange}
				/>
			</Box>
			<MyFriends searchText={searchText}/>
		</Box>
	);
}