import myAxios from 'axiosInstance';
import Box from '@mui/material/Box';
import { useState, useContext } from 'react';
import { UserContext } from "Contexts/userContext";
import { Button, TextField } from '@mui/material';;

function OTPLoginPage() {
  const [otp, setOtp] = useState('');  // to store the OTP input
  const {user} = useContext(UserContext);

  const handleChange = (event: any) => {
    setOtp(event.target.value);  // update the OTP input
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();  // prevent the default form submission

    // do the API call to verify the OTP
    try {
      await myAxios.patch('/api/verifyOtp', { otp }, {headers: {
        'Authorization': sessionStorage.getItem("at"),
        'userId': user?.id,
      }});
      window.location.assign('/home');
    } catch (error) {
      // handle the error
      console.error('Error verifying the OTP: ', error);
      alert('Something went wrong verifying your one time password');
      window.location.assign('/');
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

export default OTPLoginPage;