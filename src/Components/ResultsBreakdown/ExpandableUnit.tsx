import * as React from 'react';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import commaNumber from 'comma-number';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';

interface ExpandableUnitProps extends React.PropsWithChildren {
    title: string;
    displayNumber: number;
}

export const ExpandableUnit = (props: ExpandableUnitProps) => {
    const { title, displayNumber, children } = props;

    const [expanded, setExpanded] = React.useState<string | false>(false);
    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
      };

    const displayNumberColor = displayNumber > 0 ? 'green' : 'red';
    return (
        <Accordion 
            expanded={expanded === 'panel1'} 
            onChange={handleChange('panel1')} 
            sx={{direction: 'rtl'}}
        >
        <AccordionSummary
            aria-controls={`${title}-calc-content`}
            id={`${title}-calc`}
            sx={{display: 'flex', alignItems: 'center'}}
            expandIcon={<ExpandMoreIcon />}
        >
          <Typography variant="h6" sx={{ width: '33%', flexShrink: 0, fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Typography variant="body1" sx={{ display: 'flex', justifyContent: 'center',alignContent: 'center', flexDirection: 'column', color: displayNumberColor, direction: 'ltr' }}>
              {commaNumber(displayNumber)}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{display: 'flex', flexDirection: 'column', direction: 'rtl', paddingRight: '5%'}}>
            {children}
          </Box>
        </AccordionDetails>
      </Accordion>
    );
}
