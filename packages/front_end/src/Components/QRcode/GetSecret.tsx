import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { UserContext } from "Contexts/userContext";
import { useContext, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import myAxios from "Components/axiosInstance";
import { Button, TextField } from '@mui/material';
import Verify from '../Otp/Verify';
import { useNavigate } from "react-router-dom";


export default function GetSecret() {
  const { user } = useContext(UserContext);
  const [otpUrl, setOtpUrl] = useState('');
  const navigate = useNavigate()
  
  useEffect(() => {
    const secretRequest = async () => {
      try {
        const response = await myAxios.post('/api/enable2fa', {info: 'information'}, {headers: {
          'Authorization': sessionStorage.getItem("at"),
            'userId': user?.id
        }});
        setOtpUrl(response.data);
      } catch (error) {
        console.error("ERROR SECRET REQUEST generating QR Code" + error);
        //alert('Error while generating QRcode');
        alert(error);
        navigate('/profile');
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
            <div>
              <Verify />
              <Button className="profilePageButtons" sx={{ maxWidth:"100px", minWidth:"100px", marginTop:"10px" }} onClick={() => {navigate('/profile')}}>Cancel</Button>
            </div>
        </Container>
        );
}