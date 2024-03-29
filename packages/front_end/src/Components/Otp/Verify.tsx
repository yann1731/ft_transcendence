import { useState, useContext } from 'react';
import { UserContext } from "Contexts/userContext";
import myAxios from 'Components/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { AxiosError } from 'axios';

function OTPInputPage() {
  const [otp, setOtp] = useState('');  // to store the OTP input
  const {user} = useContext(UserContext);
  const navigate = useNavigate()

  const handleChange = (event: any) => {
    setOtp(event.target.value);  // update the OTP input
  };
  
  const handleSubmit = async (event: any) => {
    event.preventDefault();  // prevent the default form submission

    // do the API call to verify the OTP
    try {
      await myAxios.patch('/api/firstValidation', { otp }, { headers: {
        'Authorization': sessionStorage.getItem("at"),
        'userId': sessionStorage.getItem('id')
      }});
      navigate('/Profile');
    } catch (error: any) {
      // handle the error
      console.error('Error verifying the OTP: ', error.message);
      alert('Something went wrong verifying your one time password');
      navigate('/profile');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Enter your OTP"
          type="text"
          value={otp}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          />
          <Box>
            <Button className="profilePageButtons" type="submit" sx={{ maxWidth:"100px", minWidth: "100px" }}>
              Verify OTP
            </Button>
          </Box>
      </form>
    </div>
  )
}

export default OTPInputPage;