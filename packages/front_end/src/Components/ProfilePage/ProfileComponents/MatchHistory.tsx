import * as React from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

export default function MatchHistory() {
    
    const [open, setOpen] = React.useState(false);
    
    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClickClose = () => {
        setOpen(false);
    }

    return (
        <Box sx={{ width: '99%', textAlign: 'center', marginTop: '15px' }}>
            MATCH HISTORY
            <Box sx={{ width: '99%', textAlign: 'center', marginTop: '15px', display: 'flex' }}>
                <Box sx={{ width: '33%', marginRight: '5px' }}>
                    <Button className="profilePageButtons" onClick={handleClickOpen}>
                        <Typography>
                            1 vs 1
                        </Typography>
                    </Button>
                </Box>
                <Box sx={{ width: '33%', marginRight: '5px' }}>
                    <Button className="profilePageButtons" onClick={handleClickOpen}>
                        <Typography>
                            2 vs 2
                        </Typography>
                    </Button>
                </Box>
                <Box sx={{ width: '33%' }}>
                    <Button className="profilePageButtons" onClick={handleClickOpen}>
                        <Typography>
                            1 vs 3
                        </Typography>
                    </Button>
                </Box>
            </Box>
            <Dialog open={open} onClose={handleClickClose}>
                <DialogTitle>Match History</DialogTitle>
                <DialogContent>
                    MATCH HISTORY GOES HERE
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickClose} className="profilePageButtons">OK</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}