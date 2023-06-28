import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { UserContext } from "Contexts/userContext";
import { useContext } from "react";
import axios, { AxiosResponse } from "axios";


const UsernameHandler = () => {
  const { user, updateUser } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [newNickname, setNewNickname] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key=== 'Enter') {
        handleChangeUsername()
    }
  };

  const handleChangeUsername = async () => {
    try {
      const response: AxiosResponse = await axios.patch(`http://localhost:4242/user/${user?.id}`,
        { ...user, nickname: newNickname });

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
    setNewNickname('');
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} className="profilePageButtons">
        Change Nickname
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Nickname</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="New Username"
            type="nickname"
            value={newNickname}
            onKeyDown={handleKeyDown}
            onChange={(e) => setNewNickname(e.target.value)}
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
