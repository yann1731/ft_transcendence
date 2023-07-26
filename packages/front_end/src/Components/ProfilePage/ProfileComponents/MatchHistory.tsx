import * as React from 'react';
import { Grid, useTheme, Box } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function MatchHistory() {
    const [matchType, setMatch] = React.useState('');
    
    const handleChange = (event: SelectChangeEvent) => {
        setMatch(event.target.value);
    }
    const theme = useTheme();
    const labelColor = theme.palette.mode === 'dark' ? '#FFFFFF' : '#2067A1';
    //const labelColor = 'green';
    return (
        <Box sx={{ width: '99%', textAlign: 'center'}}>
            
            <FormControl fullWidth className="matchHistoryCombo" sx={{ marginTop: '20px' }}>
                <InputLabel 
                    id="match-history" 
                    sx={{ color: labelColor, '&.Mui-focused': { color: labelColor, borderColor: labelColor } }}
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
                    <MenuItem value={'1v1'}>1 vs 1</MenuItem>
                    <MenuItem value={'2v2'}>2 vs 2</MenuItem>
                    <MenuItem value={'1v3'}>1 vs 3</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}