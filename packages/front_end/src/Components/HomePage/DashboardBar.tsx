import { AppBar } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

export default function DashboardBar() {
    return (
        <AppBar position="relative" sx={{ boxShadow: '0' }}>
            <Box className="dashboardTitle">
                DASHBOARD
            </Box>
        </AppBar>
    )
}