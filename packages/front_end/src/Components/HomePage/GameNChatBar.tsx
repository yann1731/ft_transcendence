import { AppBar } from '@mui/material';
import Box from '@mui/material/Box';

export default function GameNChatBar() {
    return (
        <AppBar position="relative" sx={{ boxShadow: '0', maxWidth: '835px' }}>
            <Box className="dashboardTitle">
                GAME
            </Box>
        </AppBar>
    )
}