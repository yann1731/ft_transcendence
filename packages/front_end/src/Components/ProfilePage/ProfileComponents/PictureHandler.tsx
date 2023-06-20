import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useContext } from "react";
import { UserContext, User } from "Contexts/userContext";

// Faire quelque chose qui permet de click and drag une image pour la selectionner ou ouvrir un fenetre pour selectionner l'image sur l'ordinateur

const PictureHandler: React.FC = () => {
  const {user} = useContext(UserContext);
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

          try {
            const response = await fetch('http://localhost:4242/user/ec074b12-5f7a-4a08-b58c-c5795c58a655', {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(updatedUser),
            });

            if (response.ok) {
              console.log('Image uploaded successfully!');
              // Handle successful upload
            } else {
              console.error('Image upload failed.');
              // Handle upload failure
            }
          } catch (error) {
            console.error('Error occurred while uploading the image:', error);
            // Handle request error
          }
        };
        reader.readAsDataURL(selectedImage);
      } catch (error) {
        console.error('Error occurred while reading the image:', error);
        // Handle image reading error
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
