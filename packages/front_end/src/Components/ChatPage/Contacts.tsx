import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import OptionBarContact from './OptionBarContacts';
import OptionBarChans from './OptionBarChans';
import ContactBox from './ContactBox';
import ChannelBox from './ChannelBox';

export default function ContactContainer() {
  const sideContainerStyle = {
    height: '80vh',
    width: '380px',
  }
  
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" style={ sideContainerStyle }>
        <Container maxWidth="lg">
          <OptionBarContact></OptionBarContact>
          <ContactBox></ContactBox>
        </Container>
        <Container maxWidth="lg">
          <OptionBarChans></OptionBarChans>
          <ChannelBox></ChannelBox>
        </Container>
      </Container>
    </React.Fragment>
  );
}