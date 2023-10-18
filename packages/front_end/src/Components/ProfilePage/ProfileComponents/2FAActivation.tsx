import { useState, useContext, useEffect } from 'react';
import { Button } from '@mui/material';
import { UserContext, User } from "Contexts/userContext";
import myAxios from 'Components/axiosInstance';
import { useNavigate } from 'react-router-dom';

type ToggleActive = () => void;

const Handler2FA = () => {
  const { user, updateUser } = useContext(UserContext);
  const [isActive, setIsActive] = useState<boolean | null>(null);
  const navigate = useNavigate()

  useEffect(() => { // fetch the status of 2FA for this user
    fetch2FAStatus();
  }, []);

  const buttonText = isActive === null ? "Loading state..." : isActive ? "Deactivate 2FA" : "Activate 2FA"; // Loading state is necessary for 1st login

  const fetch2FAStatus = async () => {
    if (user) {
      try {
        const response = await myAxios.get('/api/user/me/' + user.id, {headers: {
          'Authorization': sessionStorage.getItem("at"),
          'userId': user?.id,
        }});

        const userWith2FAStatus = response.data;
        setIsActive(userWith2FAStatus.twoFaEnabled);
      } catch (err) {
        console.error("MARCHE PAS " + err);
      }
    }
  };

  const handleToggleActive = async () => {
    if (user && isActive !== null) {
      try {
        let updatedUser = { ...user };
  
        if (!isActive) {
          await updateUser2FA(updatedUser);
          navigate('/Enable2Fa');
        } else {
          updatedUser = { ...user, twoFaEnabled: false, twoFaSecret: null };
          await updateUser2FA(updatedUser);
          setIsActive(updatedUser.twoFaEnabled);
        }
  
        await update2FAStatusOnServer(updatedUser);
  
      } catch (err) {
        console.error(err);
      }
    }
  };

  const updateUser2FA = async (updatedUser: User) => {
    try {
      await myAxios.patch('/api/user/' + user?.id, updatedUser, {headers: {
          'Authorization': sessionStorage.getItem("at"),
          'userId': user?.id,
        },
      });
    } catch (error) {
      console.error('Error updating twoFaEnabled: ' + error);
    }
  };

  const update2FAStatusOnServer = async (updatedUser: User) => {
    try {
      await myAxios.patch('/api/user/' + user?.id, {
        twoFaEnabled: updatedUser.twoFaEnabled,
      }, {
        headers: {
          'Authorization': sessionStorage.getItem("at"),
          'userId': user?.id,
        },
      });
    } catch (error) {
      console.error('Error updating 2FA status on the server: ' + error);
    }
  };

  return (
    <Button variant="outlined" className="profilePageButtons" onClick={handleToggleActive}>
      {buttonText}
    </Button>
  );
};

export default Handler2FA;
