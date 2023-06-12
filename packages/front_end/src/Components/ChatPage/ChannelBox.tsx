import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MyChannels from './ChatComponents/Channels';
import Divider from '@mui/material/Divider';
  
  export default function ChannelBox() {
	return(
	<Box className={"friendsAndChannelBoxes"}>
		<Box>
			<TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth className={"focusedTextField .MuiOutlinedInput-root.Mui-focused fieldset"} />
		</Box>
		<Divider />
		<MyChannels></MyChannels>
	</Box>
	);
};
