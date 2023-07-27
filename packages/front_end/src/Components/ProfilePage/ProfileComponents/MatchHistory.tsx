import * as React from 'react';
import { Box, Popover, Grid, Paper, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { experimentalStyled as styled } from '@mui/material/styles';

export default function MatchHistory() {
    
    const [matchType, setMatch] = React.useState('');
    
    const handleChange = (event: SelectChangeEvent) => {
        setMatch(event.target.value);
    }
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleHover = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        backgroundColor: theme.palette.mode === 'dark' ? '#2B375E' : '#D4DEFF',
      }));

    const open = Boolean(anchorEl);
    const id = open ? 'match-history-popover' : undefined;

    return (
        <Box sx={{ width: '99%', textAlign: 'center', marginTop: '15px' }}>
            <Item>MATCH HISTORY</Item>
        <Box sx={{ width: '99%', textAlign: 'center', marginTop: '15px', display: 'flex' }}>
            <Box sx={{ width: '33%', marginRight: '5px' }}>
            <Item>
                <Typography
                    aria-owns={open ? 'mouse-over-popover' : undefined }
                    aria-haspopup="true"
                    onMouseEnter={handleHover}
                    onMouseLeave={handleClose}
                    >
                    1 vs 1
                </Typography>
            </Item>
            </Box>
            <Box sx={{ width: '33%', marginRight: '5px' }}>
            <Item>
                <Typography
                    aria-owns={open ? 'mouse-over-popover' : undefined }
                    aria-haspopup="true"
                    onMouseEnter={handleHover}
                    onMouseLeave={handleClose}
                    >
                    2 vs 2
                </Typography>
            </Item>
            </Box>
            <Box sx={{ width: '33%' }}>
            <Item>
                <Typography
                    aria-owns={open ? 'mouse-over-popover' : undefined }
                    aria-haspopup="true"
                    onMouseEnter={handleHover}
                    onMouseLeave={handleClose}
                    >
                    1 vs 3
                </Typography>
            </Item>
            </Box>
            <Popover
                id="mouse-over-popover"
                sx={{ pointerEvents: 'none', }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{ 
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                onClose={handleClose}
                disableRestoreFocus
                >
                <Box sx={{ p: 2 }}>
                    <div>
                        <Grid container rowSpacing={3}>
                            <Grid item sx={{ width: '99%' }}>
                                <Item>Match history goes here</Item>
                            </Grid>
                            <Grid item sx={{ width: '99%' }}>
                                <Item>Match history goes here</Item>
                            </Grid>
                            <Grid item sx={{ width: '99%' }}>
                                <Item>Match history goes here</Item>
                            </Grid>
                            <Grid item sx={{ width: '99%' }}>
                                <Item>Match history goes here</Item>
                            </Grid>
                        </Grid>
                    </div>
                </Box>
            </Popover>
        </Box>
        </Box>
    );
}