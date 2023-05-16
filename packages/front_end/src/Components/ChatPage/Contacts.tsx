import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { theme } from '../../Theme'
import OptionBarContact from './OptionBarContacts';
import OptionBarChans from './OptionBarChans';

export default function ContactContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <OptionBarContact></OptionBarContact>
        <Box sx={{ bgcolor: theme.palette.secondary.main, height: '40.5vh', boxShadow: 4}} />
        <OptionBarChans></OptionBarChans>
        <Box sx={{ bgcolor: theme.palette.secondary.main, height: '40.5vh', boxShadow: 4}} />
      </Container>
    </React.Fragment>
  );
}