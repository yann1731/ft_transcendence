import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { User } from "Components/Interfaces";

const UsernameHandler = ({ userStatistics }: { userStatistics: User | null }) => {
  const [open, setOpen] = useState(false);
  const [newUsername, setNewUsername] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
    return;
  };

  const handleClose = () => {
    setOpen(false);
    return;
  };

  const handleChangeUsername = async () => {
    try {
      const response = await fetch('http://localhost:4242/user/e26900d2-d2cb-40e7-905c-cf9e1f7fdbd3', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...userStatistics, username: newUsername }), // Mettez à jour le champ 'username' avec la nouvelle valeur
      });
  
      if (response.ok) {
        const updatedData = await response.json();
        setNewUsername(updatedData);
      } else {
        console.error('Could not update user statistics');
      }
  
      handleClose();
    } catch (error) {
      console.error('Error occurred while updating username:', error);
    }
    setNewUsername("");
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} sx={{ width: '99%', bgcolor: 'white', color: 'grey' }}>
        Change Username
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Username</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="New Username"
            type="username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleChangeUsername}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UsernameHandler;