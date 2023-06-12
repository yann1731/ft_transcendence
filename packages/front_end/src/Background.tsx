import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import './App.css';

export default function BackgroundContainer({ children }: { children: React.ReactNode }) {
    const theme = useTheme();

    return (
        <React.Fragment>
            <CssBaseline />
            <Container className="backgroundContainer">
                {children}
            </Container>
        </React.Fragment>
    );  
}