import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useContext } from "react";
import { UserContext } from "Contexts/userContext";
import axios, { AxiosResponse } from "axios";

const PictureHandler: React.FC = () => {
  const {user, updateUser} = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleClickOpen = () => {
    setOpen(true);
    return;
  };

  const handleClose = () => {
    setOpen(false);
    return;
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
  
    if (file) {
      setSelectedImage(file);
    }
  };

  const uploadImage = async () => {
    if (selectedImage) {
      try {
        const reader = new FileReader();
        reader.onloadend = async () => {
          const imageDataUrl = reader.result as string;

          const updatedUser = { ...user, avatar: imageDataUrl };
          updateUser(updatedUser);
          try {
            const response: AxiosResponse = await axios.patch('http://localhost:4242/user/' + user?.id,
              updatedUser, {headers: {
                'Authorization': user?.token,
                'userId': user?.id
              }});
            if (response.status === 200) {
              console.log('Image uploaded successfully!');
            } else {
              console.error('Image upload failed.');
            }
          } catch (error) {
            console.error('Error occurred while uploading the image:', error);
          }
        };
        reader.readAsDataURL(selectedImage);
      } catch (error) {
        console.error('Error occurred while reading the image:', error);
      }
    }

    handleClose();
  };

  return (
    <>
      <MenuItem onClick={handleClickOpen}>Upload profile picture</MenuItem>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select new image</DialogTitle>
        <DialogContent>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {selectedImage && (
            <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={uploadImage}>Upload</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PictureHandler;
