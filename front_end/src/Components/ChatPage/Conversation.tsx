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
		<Box sx={{ bgcolor: theme.palette.secondary.main, height: '85vh', boxShadow: 4, width: '70vw'}} />
      </Container>
    </React.Fragment>
  );
}