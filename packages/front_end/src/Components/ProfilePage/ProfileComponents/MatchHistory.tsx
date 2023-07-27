import * as React from 'react';
import { Box, Popover, Grid, Paper } from '@mui/material';
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
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
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
        <Box sx={{ width: '99%', textAlign: 'center'}}>
            <FormControl fullWidth className="matchHistoryCombo">
                <InputLabel 
                    id="match-history" 
                    className="matchHistoryInputLabel"
                >
                    Match History</InputLabel>
                <Select
                    labelId="match-history"
                    id="match-history-label"
                    value={matchType}
                    label="Match History"
                    onChange={handleChange}
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value={'1v1'} onClick={handleClick}>1 vs 1</MenuItem>
                    <MenuItem value={'2v2'} onClick={handleClick}>2 vs 2</MenuItem>
                    <MenuItem value={'1v3'} onClick={handleClick}>1 vs 3</MenuItem>
                </Select>
            </FormControl>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
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
    );
}