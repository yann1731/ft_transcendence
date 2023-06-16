import { useState } from 'react';
import { Button, ButtonProps } from '@mui/material';
import { User } from 'Components/Interfaces';

type ToggleActive = () => void;



const Handler2FA = ({userStatistics}: { userStatistics: User | null}) => {
  const Handle2FA = (): [boolean, ToggleActive] => {
    const storedValue = localStorage.getItem('twoFaEnabled');
    const initialValue = storedValue !== null ? JSON.parse(storedValue) : userStatistics?.twoFaEnabled || false;
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

    if (userStatistics) {
      const updatedUserStatistics = { ...userStatistics, twoFaEnabled: updatedTwoFaEnabled };

      try {
        await updateUserStatistics(updatedUserStatistics); // Call the async function
        toggleActive(); // Met à jour la valeur après la mise à jour réussie
      } catch (err) {
        console.error(err);
      }
    }
  };

  const updateUserStatistics = async (updatedUserStatistics: User) => {
    const response = await fetch('http://localhost:4242/user/e26900d2-d2cb-40e7-905c-cf9e1f7fdbd3', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUserStatistics),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la mise à jour de twoFaEnabled');
    }
  };
  return (
    <div>
      <Button variant="contained" onClick={handleToggleActive} sx={{width: '99%', bgcolor: 'white', color: 'grey'}}>{buttonText}</Button>
    </div>
  );
};

export default Handler2FA;