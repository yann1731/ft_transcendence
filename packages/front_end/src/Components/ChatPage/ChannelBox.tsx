import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MyChannels from './ChatComponents/Channels';
import { useState, ChangeEvent } from 'react';
  
  export default function ChannelBox() {
	const [searchText, setSearchText] = useState('');

	const handleSearchTextChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchText(event.target.value);
	}
	
	return(
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
		<MyChannels searchText={searchText}/>
	</Box>
	);
};
