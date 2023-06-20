import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import DashboardBar from './DashboardBar';
import Divider from '@mui/material/Divider';



export default function DashboardContainer() {
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
              <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px' }}>Nb games played:</Box>
              <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px' }}>Wins:</Box>
              <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px' }}>Losses:</Box>
              <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px' }}>Current win streak:</Box>
              <Box sx={{ color: '#2067a1', fontSize: '15px' }}>Best streak:</Box>
            </Box>
        </Box>
        <Box className={"homeScoreBox"}>
            <Box sx={{ textAlign: 'center'}}>
              <Box sx={{mt: 1, color: 'white', fontSize: '20px'}}>Personal Stats</Box>
                <Divider style={{ marginBottom: '10px' }} />
                <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px' }}>Nb games played:</Box>
                <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px' }}>Wins:</Box>
                <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px' }}>Losses:</Box>
                <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px' }}>Current win streak:</Box>
                <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px' }}>Best streak:</Box>
            </Box>
        </Box>
        <Box className={"homeScoreBox"}>
            <Box sx={{ textAlign: 'center',}}>
              <Box sx={{mt: 1, color: 'white', fontSize: '20px'}}>Opponent's Stats</Box>
                <Divider style={{ marginBottom: '10px' }} />
                <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px' }}>Nb games played:</Box>
                <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px' }}>Wins:</Box>
                <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px' }}>Losses:</Box>
                <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px' }}>Current win streak:</Box>
                <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px' }}>Best streak:</Box>
            </Box>
        </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}