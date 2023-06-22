import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { UserContext } from "Contexts/userContext";
import { useContext } from "react";

const UsernameHandler = () => {
  const { user, updateUser } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [newUsername, setNewUsername] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeUsername = async () => {
    try {
      const response = await fetch('http://localhost:4242/user/e26900d2-d2cb-40e7-905c-cf9e1f7fdbd3', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...user, username: newUsername }),
      });
  
      if (response.ok) {
        const updatedUser = await response.json();
        updateUser(updatedUser); // Update the user context with the updated user
      } else {
        console.error('Could not update username');
      }
  
      handleClose();
    } catch (error) {
      console.error('Error occurred while updating username:', error);
    }
    setNewUsername('');
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} className="profilePageButtons">
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
