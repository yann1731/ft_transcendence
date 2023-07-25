import React, { useState, useContext } from 'react';
import axios from 'axios';
import { userPermission } from 'Components/Interfaces';
import { UserContext, User } from "Contexts/userContext";

function OTPInputPage() {
  const [otp, setOtp] = useState('');  // to store the OTP input
  const {user} = useContext(UserContext);

  const handleChange = (event: any) => {
    setOtp(event.target.value);  // update the OTP input
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();  // prevent the default form submission

    // do the API call to verify the OTP
    try {
      const response = await axios.post('http://localhost:4242/verifyOtp', { otp }, { headers: {
        'Authorization': user?.token,
        'userId': user?.id
      }});
      window.location.assign('http://localhost:3000/home');
      console.log('Success');
    } catch (error) {
      // handle the error
      console.error('Error verifying the OTP: ', error);
      alert('Something went wrong verifying your one time password');
      window.location.assign('http://localhost:3000/');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter your OTP:
        <input type="text" value={otp} onChange={handleChange} />
      </label>
      <input type="submit" value="Verify OTP" />
    </form>
  );
}

export default OTPInputPage;