import { useState } from 'react';
import { Button, ButtonProps } from '@mui/material';

type ToggleActive = () => void;

const Handle2FA = (): [boolean, ToggleActive] => {
  const [active, setActive] = useState(false);

  const toggleActive: ToggleActive = () => {
    setActive(!active);
  };

  return [active, toggleActive];
};

const Handler2FA = () => {
  const [isActive, toggleActive] = Handle2FA();
  const buttonText = isActive ? "Activate 2FA" : "Deactivate 2FA";

  return (
    <div>
      <Button variant="contained" onClick={toggleActive} sx={{width: '99%', bgcolor: 'white', color: 'grey'}}>{buttonText}</Button>
    </div>
  );
};

export default Handler2FA;