import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { UserContext } from "Contexts/userContext";
import { useContext } from "react";
import { AxiosResponse } from "axios";
import myAxios from "Components/axiosInstance";
import { SocketContext } from "Contexts/socketContext";



const UsernameHandler = () => {
  const { user, updateUser } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [newNickname, setNewNickname] = useState('');
  const socket = useContext(SocketContext)

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
      const currentDataResponse = await myAxios.get(`/api/user/`, {headers: {
        'Authorization': sessionStorage.getItem("at"),
        'userId': user?.id
      }});
      const isNicknameInUse = currentDataResponse.data.some((userData: any) => userData.nickname === newNickname)
      if (isNicknameInUse) {
        alert("Nickname is already used by another user");
      } else if (newNickname.trim().length === 0) {
        alert("Nickname cannot be empty.");
      } else {
        const response: AxiosResponse = await myAxios.patch(`/api/user/${user?.id}`,
          { ...user, nickname: newNickname }, {headers: {
            'Authorization': sessionStorage.getItem("at"),
            'userId': user?.id
          }});
        if (response.status === 200) {
          const updatedUser = response.data;
          updateUser(updatedUser);
          socket.emit("reloadFriends")
        } else {
          console.error('Could not update username');
        }
        handleClose();
      }
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
            className="nicknameTextField"
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
          <Button className="profilePageButtons" onClick={handleClose}>Cancel</Button>
          <Button className="profilePageButtons" onClick={handleChangeUsername}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UsernameHandler;
