import * as React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

interface ChanPictureSetterProps {
  onPictureSelected: (picture: string | null) => void;
}

const ChanPictureSetter: React.FC<ChanPictureSetterProps> = ({ onPictureSelected }) => {
  const [open, setOpen] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          onPictureSelected(imageDataUrl);
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
      <Button className="profilePageButtons" sx={{ marginBottom: 2 }} onClick={handleClickOpen}>Add Picture</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Select an image</DialogTitle>
        <DialogContent>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="Selected" />}
        </DialogContent>
        <DialogActions>
          <Button onClick={uploadImage}>Upload</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChanPictureSetter;