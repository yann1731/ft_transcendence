import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { User } from "Components/Interfaces";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const PictureHandler = ({ userStatistics }: { userStatistics: User | null }) => {
  const [open, setOpen] = useState(false);
  const [newPicture, setNewPicture] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
    return;
  };

  const handleClose = () => {
    setOpen(false);
    return;
  };

  const handleChangePicture = async () => {
    try {
      const response = await fetch('http://localhost:4242/user/e26900d2-d2cb-40e7-905c-cf9e1f7fdbd3', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...userStatistics, avatar: newPicture }), // Mettez à jour le champ 'username' avec la nouvelle valeur
      });
  
      if (response.ok) {
        const updatedPicture = await response.json();
        setNewPicture(updatedPicture);
      } else {
        console.error('Could not update user statistics');
      }
  
      handleClose(); 
    } catch (error) {
      console.error('Error occurred while updating username:', error);
    }
    setNewPicture("");
  };

  return (
    <MenuItem onClick={handleClickOpen}>
      <Typography textAlign="center">Upload Picture</Typography>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Profile Picture</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="New Picture"
            type="picture"
            value={newPicture}
            onChange={(e) => setNewPicture(e.target.value)}
            fullWidth
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleChangePicture}>Save</Button>
        </DialogActions>
      </Dialog>
    </MenuItem>
  );
};

export default PictureHandler;