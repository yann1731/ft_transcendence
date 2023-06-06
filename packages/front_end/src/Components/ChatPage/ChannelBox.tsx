import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { ListItemButton } from '@mui/material';
  
  export default function ChannelBox() {
	return(
	<Box className={"friendsAndChannelBoxes"}>
		<Box>
			<TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth className={"focusedTextField .MuiOutlinedInput-root.Mui-focused fieldset"} />
		</Box>
		<List>
			<ListItemButton key="#Chats">
				<ListItemIcon>
					<Avatar alt="Chat" src="https://images.saymedia-content.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:eco%2Cw_1200/MTk2NzY3MjA5ODc0MjY5ODI2/top-10-cutest-cat-photos-of-all-time.jpg" />
				</ListItemIcon>
				<ListItemText primary="#Chats">Chats</ListItemText>
				<ListItemText secondary="online" sx={{ align:"right" }}></ListItemText>
			</ListItemButton>
			<ListItemButton key="#Plus de chats">
				<ListItemIcon>
					<Avatar alt="#Plus de chats" src="https://hips.hearstapps.com/hmg-prod/images/cute-cat-photos-1593441022.jpg?crop=1.00xw:0.753xh;0,0.153xh&resize=1200:*" />
				</ListItemIcon>
				<ListItemText primary="#Plus de chats">PDC</ListItemText>
			</ListItemButton>
			<ListItemButton key="Un gros chat">
				<ListItemIcon>
					<Avatar alt="Un gros chat" src="https://i.guim.co.uk/img/media/ae4637c5bdca3e3c7f0f86a741f43ecbe897852e/0_132_3545_2127/master/3545.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=fa7442eb6602af03e57f71f33207e0c4" />
				</ListItemIcon>
				<ListItemText primary="#Un gros chat">GC</ListItemText>
			</ListItemButton>
		</List>
	</Box>
	);
};
