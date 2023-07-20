import * as React from 'react';
import { useTheme, Container, CssBaseline } from '@mui/material/';
import './App.css';

export default function BackgroundContainer({ children }: { children: React.ReactNode }) {
    //const theme = useTheme(); Maybe not? Pas utilisé

    return (
        <React.Fragment>
            <CssBaseline />
            <Container className="backgroundContainer">
                {children}
            </Container>
        </React.Fragment>
    );  
}