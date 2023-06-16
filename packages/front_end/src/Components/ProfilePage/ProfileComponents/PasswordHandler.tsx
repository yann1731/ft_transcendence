import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { User } from "Components/Interfaces";

const PasswordHandler = ({ userStatistics }: { userStatistics: User | null }) => {
  const [open, setOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePassword = async () => {
    try {
      const response = await fetch('http://localhost:4242/user/password/e26900d2-d2cb-40e7-905c-cf9e1f7fdbd3', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...userStatistics, Password: newPassword }), // Mettez à jour le champ 'Password' avec la nouvelle valeur
      });
  
      if (response.ok) {
        const updatedData = await response.json();
        setNewPassword(updatedData);
      } else {
        console.error('Could not update user statistics');
      }
  
      handleClose();
    } catch (error) {
      console.error('Error occurred while updating Password:', error);
    }
    setNewPassword("");
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} sx={{ width: '99%', bgcolor: 'white', color: 'grey' }}>
        Change Password
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="New Password"
            type="Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleChangePassword}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PasswordHandler;