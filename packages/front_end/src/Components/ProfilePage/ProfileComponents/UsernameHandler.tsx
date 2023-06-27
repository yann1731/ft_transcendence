import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { UserContext } from "Contexts/userContext";
import { useContext } from "react";
import axios, { AxiosResponse } from "axios";


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
      const response: AxiosResponse = await axios.patch(`http://localhost:4242/user/${user?.id}`,
        { ...user, username: newUsername });

      if (response.status === 200) {
        const updatedUser = response.data;
        updateUser(updatedUser);
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