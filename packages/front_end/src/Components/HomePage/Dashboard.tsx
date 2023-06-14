import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import DashboardBar from './DashboardBar';
import Divider from '@mui/material/Divider';

//TODO Change styles to CSS in App.css
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
              <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px', animation: "rotation 3s infinite linear" }}>Nb games played:</Box>
              <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px', animation: "rotation 3s infinite linear" }}>Wins:</Box>
              <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px', animation: "rotation 3s infinite linear" }}>Losses:</Box>
              <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px', animation: "rotation 3s infinite linear" }}>Current win streak:</Box>
              <Box sx={{ color: '#2067a1', fontSize: '15px', animation: "rotation 3s infinite linear" }}>Best streak:</Box>
            </Box>
        </Box>
        <Box className={"homeScoreBox"}>
            <Box sx={{ textAlign: 'center'}}>
              <Box sx={{mt: 1, color: 'white', fontSize: '20px'}}>Personal Stats</Box>
                <Divider style={{ marginBottom: '10px' }} />
                <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px', animation: "rotation 3s infinite linear" }}>Nb games played:</Box>
                <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px', animation: "rotation 3s infinite linear" }}>Wins:</Box>
                <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px' , animation: "rotation 3s infinite linear"}}>Losses:</Box>
                <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px', animation: "rotation 3s infinite linear" }}>Current win streak:</Box>
                <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px' , animation: "rotation 3s infinite linear"}}>Best streak:</Box>

            </Box>
        </Box>
        <Box className={"homeScoreBox"}>
            <Box sx={{ textAlign: 'center',}}>
              <Box sx={{mt: 1, color: 'white', fontSize: '20px'}}>Opponent's Stats</Box>
                <Divider style={{ marginBottom: '10px' }} />
                <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px', animation: "rotation 3s infinite linear" }}>Nb games played:</Box>
                <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px', animation: "rotation 3s infinite linear" }}>Wins:</Box>
                <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px', animation: "rotation 3s infinite linear"}}>Losses:</Box>
                <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px' , animation: "rotation 3s infinite linear"}}>Current win streak:</Box>
                <Box sx={{ color: '#2067a1', fontSize: '15px', marginBottom: '25px', animation: "rotation 3s infinite linear" }}>Best streak:</Box>
            </Box>
        </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}