import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { theme } from '../../Theme'
import OptionBar from './Options';


export default function ConversationContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
        <Container maxWidth="xl">
		<OptionBar></OptionBar>
		<Box sx={{ bgcolor: theme.palette.secondary.main, height: '85vh', boxShadow: 4, width: '70vw'}}>
		<div className="container">
		<img src="https://preview.redd.it/fat-cat-looking-mean-v0-ws54fkn9bwna1.png?auto=webp&s=f69d97602b3925f9bbc55583dcb4bb48f1227847" alt="Avatar" />
		<p>Hello. How are you today?</p>
		<span className="time-right">11:00</span>
		</div>

		<div className="container darker">
		<img src="data:image/jpeg;base64,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" alt="Avatar" className="right" />
		<p>Hey! I'm fine. Thanks for asking!</p>
		<span className="time-left">11:01</span>
		</div>
		</Box>
      </Container>
    </React.Fragment>
  );
}