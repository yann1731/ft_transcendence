
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { ListItemButton } from '@mui/material';

const useStyles = makeStyles({
	table: {
	  minWidth: 650,
	},
	border: {
		backgroundColor: 'white',
		overflowY: 'auto',
		overflowX: 'auto',
	},
  });
  

  export default function ContactBox() {
	const classes = useStyles();
	return(
	<Grid item xs={3} className={classes.border} sx={{height: '450px', width: '300px'}}>
	<List>
		<ListItemButton key="RemySharp">
			<ListItemIcon>
			<Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
			</ListItemIcon>
			<ListItemText primary="John Wick"></ListItemText>
		</ListItemButton>
	</List>
	<Divider />
	<Grid item xs={12} style={{padding: '10px'}}>
		<TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
	</Grid>
	<Divider />
	<List>
		<ListItemButton key="RemySharp">
			<ListItemIcon>
				<Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
			</ListItemIcon>
			<ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
			<ListItemText secondary="online" sx={{align: "right"}}></ListItemText>
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
	</Grid>)
};
