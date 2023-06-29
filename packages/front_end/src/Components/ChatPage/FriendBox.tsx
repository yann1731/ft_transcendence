import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MyFriends from './ChatComponents/Friends';
import Autocomplete from '@mui/material/Autocomplete';
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
					className={"focusedTextField .MuiOutlinedInput-root.Mui-focused fieldset"} 
					value={searchText}
					onChange={handleSearchTextChange}
				/>
			</Box>
			<MyFriends searchText={searchText}/>
		</Box>
	  );
}