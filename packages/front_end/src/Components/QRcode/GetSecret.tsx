import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from 'axios';
import { UserContext } from "Contexts/userContext";
import { useContext, useEffect, useState } from "react";
import QRCode from "react-qr-code";


export default function GetSecret() {
  const { user } = useContext(UserContext);
  const [otpUrl, setOtpUrl] = useState('');
  
  useEffect(() => {
    const secretRequest = async () => {
      try {
        const response = await axios.post('/api/enable2fa', {info: 'information'}, {headers: {
            'Authorization': user?.token,
            'userId': user?.id
        }});
        setOtpUrl(response.data);
      } catch (error) {
        console.error(error);
        alert('Error while generating QRcode');
        window.location.assign('/profile');
      }
    };

    secretRequest(); // Call the async function.
  }, []);

    return (
        <Container maxWidth={false} sx={{ backgroundColor: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', width: "100%" }}>
            <Typography variant="h6" color='white'>
            Please scan with google authenticator
            </Typography>
            <QRCode value={otpUrl} />
            <button onClick={() => {window.location.assign('/profile')}}>Ok</button>
        </Container>
        );
}