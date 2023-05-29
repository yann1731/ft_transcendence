
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { ListItemButton } from '@mui/material';
import { theme } from '../../Theme';

const useStyles = makeStyles({
	border: {
		position: 'relative',
		backgroundColor: theme.palette.secondary.main,
		overflowY: 'auto',
		overflowX: 'auto',
		height: '37vh',
		borderRadius: 10,
	},
	focusedTextField: {
		'& Mui.OutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
			borderColor: 'white',
		},
		'& .MuiInputLabel-root.Mui-focused': {
			color:'white',
		},
		'& .MuiOutlinedInput-root.Mui-focused': {
			'& fieldset': {
			  borderWidth: 1,
			  borderColor: 'white',
			},
		},
	},
  });

  export default function ContactBox() {
	const classes = useStyles();
	return(
	<Grid item xs={3} className={classes.border} sx={{ height: '33.5vh' }}>
	<Grid item xs={12} style={{padding: '10px'}}>
		<TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth className={classes.focusedTextField} />
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
