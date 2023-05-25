import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import OptionBarContact from './ChatMenus/OptionBarContacts';
import OptionBarChans from './ChatMenus/OptionBarChans';
import ContactBox from './ContactBox';
import ChannelBox from './ChannelBox';

export default function ContactContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <OptionBarContact></OptionBarContact>
        <ContactBox></ContactBox>
        <OptionBarChans></OptionBarChans>
        <ChannelBox></ChannelBox>
      </Container>
    </React.Fragment>
  );
}