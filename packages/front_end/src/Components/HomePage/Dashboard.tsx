import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import DashboardBar from './DashboardBar';
import Divider from '@mui/material/Divider';
import { User } from 'Contexts/userContext';




export default function DashboardContainer({ user }: { user: User | null }) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Box sx={{ position: 'relative', marginTop: '114px' }}>
        <Box className={"homeScoreBar"}>
          <DashboardBar></DashboardBar>
        <Box className={"homeScoreBox"}>
            <Box sx={{ textAlign: 'center' }}>
              <Box sx={{color: 'white', fontSize: '20px' }}>Hall of Fame</Box>
              <Divider style={{ marginBottom: '10px' }} />
              <Box className="dashboardContents">Nb games played: </Box>
              <Box className="dashboardContents">Wins: </Box>
              <Box className="dashboardContents">Losses: </Box>
              <Box className="dashboardContents">Current win streak:</Box>
              <Box className="dashboardContents">Best streak:</Box>
            </Box>
        </Box>
        <Box className={"homeScoreBox"}>
            <Box sx={{ textAlign: 'center'}}>
              <Box sx={{mt: 1, color: 'white', fontSize: '20px'}}>Personal Stats</Box>
                <Divider style={{ marginBottom: '10px' }} />
                <Box className="dashboardContents">Nb games played: {user?.gamesPlayed}</Box>
                <Box className="dashboardContents">Wins: {user?.win}</Box>
                <Box className="dashboardContents">Losses: {user?.loss}</Box>
                <Box className="dashboardContents">Current win streak: </Box>
                <Box className="dashboardContents">Best streak:</Box>
            </Box>
        </Box>
        <Box className={"homeScoreBox"}>
            <Box sx={{ textAlign: 'center',}}>
              <Box sx={{mt: 1, color: 'white', fontSize: '20px'}}>Opponent's Stats</Box>
                <Divider style={{ marginBottom: '10px' }} />
                <Box className="dashboardContents">Nb games played:</Box>
                <Box className="dashboardContents">Wins:</Box>
                <Box className="dashboardContents">Losses:</Box>
                <Box className="dashboardContents">Current win streak:</Box>
                <Box className="dashboardContents">Best streak:</Box>
            </Box>
        </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}