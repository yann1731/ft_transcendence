import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { ListItemButton } from '@mui/material';

  export default function FriendBox() {
	return (
		<Box className={"friendsAndChannelBoxes"}>
		  <Box>
			<TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth className={"focusedTextField .MuiOutlinedInput-root.Mui-focused fieldset"} />
		  </Box>
		  <List>
			<ListItemButton key="RemySharp">
			  <ListItemIcon>
				<Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
			  </ListItemIcon>
			  <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
			  <ListItemText secondary="online" sx={{ textAlign: 'right' }} />
			</ListItemButton>
			<ListItemButton key="Alice">
			  <ListItemIcon>
				<Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
			  </ListItemIcon>
			  <ListItemText primary="Alice">Alice</ListItemText>
			</ListItemButton>
			<ListItemButton key="CindyBaker">
			  <ListItemIcon>
				<Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
			  </ListItemIcon>
			  <ListItemText primary="Cindy Baker">Cindy Baker</ListItemText>
			</ListItemButton>
		  </List>
		</Box>
	  );
};
