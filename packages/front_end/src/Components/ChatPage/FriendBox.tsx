import { Box, TextField } from '@mui/material/';
import MyFriends from './ChatComponents/Friends';
import { useState, ChangeEvent } from 'react';

  export default function FriendBox() {
	const [searchText, setSearchText] = useState('');
	
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