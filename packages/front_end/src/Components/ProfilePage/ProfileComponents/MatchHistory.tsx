import { Grid, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function MatchHistory() {
    return (
                <Grid item sx={{ width: '99%', textAlign: 'center' }}>
                    MATCH HISTORY
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>1 vs 1</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                MATCH HISTORY 1 vs 1 GOES HERE
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography>2 vs 2</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                MATCH HISTORY 2 vs 2 GOES HERE
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3a-content"
                            id="panel3a-header"
                            >
                            <Typography>1 vs 3</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                MATCH HISTORY 1 vs 3 GOES HERE
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </Grid>
    )
}