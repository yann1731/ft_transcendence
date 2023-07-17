import { useState } from 'react';
import { Button } from '@mui/material';
import { UserContext, User } from "Contexts/userContext";
import { useContext } from "react";
import axios from 'axios';

type ToggleActive = () => void;

const Handler2FA = () => {
  const {user, updateUser} = useContext(UserContext);
  
  const Handle2FA = (): [boolean, ToggleActive] => {
    const storedValue = localStorage.getItem('twoFaEnabled');
    const initialValue = storedValue !== null ? JSON.parse(storedValue) : user?.twoFaEnabled;
    const [active, setActive] = useState(initialValue);
    
    const toggleActive: ToggleActive = () => {
      setActive((prevActive: boolean) => {
        const updatedValue = !prevActive;
        localStorage.setItem('twoFaEnabled', JSON.stringify(updatedValue));
        return updatedValue;
      });
    };
    return [active, toggleActive];
  };
  
  const [isActive, toggleActive] = Handle2FA();
  const buttonText = isActive ? "Deactivate 2FA" : "Activate 2FA";
  
  const handleToggleActive = async () => {
    
    if (user) {
      const updatedUser = { ...user, twoFaEnabled: !isActive };
      updateUser(updatedUser);
      try {
        await updateUser2FA(updatedUser);
        toggleActive();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const updateUser2FA = async (updatedUser: User) => {
     try {
      const response = await axios.patch('http://localhost:4242/user/' + user?.id, updatedUser, {headers: {
        'Authorization': user?.token,
        'userId': user?.id
      }})
    } catch (error){
      console.error('Erreur lors de la mise à jour de twoFaEnabled' + error)
    }
  };
  return (
      <Button variant="outlined" className="profilePageButtons" onClick={handleToggleActive}>{buttonText}</Button>
  );
};

export default Handler2FA;