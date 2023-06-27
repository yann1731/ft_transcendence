import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MyFriends from './ChatComponents/Friends';

  export default function FriendBox() {
	return (
		<Box className={"friendsAndChannelBoxes"}>
			<Box>
				<TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth className={"focusedTextField .MuiOutlinedInput-root.Mui-focused fieldset"} />
			</Box>
			<MyFriends></MyFriends>
		</Box>
	  );
};
