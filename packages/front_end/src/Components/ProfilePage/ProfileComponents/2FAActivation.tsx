import { useState } from 'react';
import { Button, ButtonProps } from '@mui/material';
import { theme } from '../../../Theme';

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
      <Button variant="outlined" className="profilePageButtons" onClick={toggleActive}>{buttonText}</Button>
  );
};

export default Handler2FA;