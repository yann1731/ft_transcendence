import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';

export default function BackgroundContainer({ children }: { children: React.ReactNode }) {
    const theme = useTheme();

    return (
        <React.Fragment>
            <CssBaseline />
                <Container sx={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    minHeight: '100vh',
                    minWidth: '100vw',
                    backgroundColor: theme.palette.primary.main, 
                    display:'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {children}
            </Container>
        </React.Fragment>
    );  
}