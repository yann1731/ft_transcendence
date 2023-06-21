import { useState } from 'react';
import { Button, ButtonProps } from '@mui/material';
import { User } from 'Components/Interfaces';
import { UserContext } from "Contexts/userContext";
import { useContext } from "react";

type ToggleActive = () => void;

const Handler2FA = () => {
  const {user} = useContext(UserContext);
  
  const Handle2FA = (): [boolean, ToggleActive] => {
    const storedValue = localStorage.getItem('twoFaEnabled');
    const initialValue = storedValue !== null ? JSON.parse(storedValue) : user?.twoFaEnabled || false;
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
    const updatedTwoFaEnabled = !isActive; // Inverse la valeur directement

    if (user) {
      const updatedUser = { ...user, twoFaEnabled: updatedTwoFaEnabled };

      try {
        await updateUser2FA(updatedUser); // Call the async function
        toggleActive(); // Met à jour la valeur après la mise à jour réussie
      } catch (err) {
        console.error(err);
      }
    }
  };

  const updateUser2FA = async (updatedUser: User) => {
    const response = await fetch('http://localhost:4242/user/e26900d2-d2cb-40e7-905c-cf9e1f7fdbd3', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour de twoFaEnabled');
    }
  };
  return (
      <Button variant="outlined" className="profilePageButtons" onClick={toggleActive}>{buttonText}</Button>
  );
};

export default Handler2FA;