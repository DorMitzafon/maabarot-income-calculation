import * as React from 'react';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface SectionSummaryProps {
    title: string;
    subtitle: string;
}

export const SectionSummary = (props: SectionSummaryProps) => {
    const {title, subtitle} = props
    return (
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${title}-calc-content`}
          id={`${title}-calc`}
        >
          <Typography variant="h5" sx={{ width: '33%', flexShrink: 0, fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>{subtitle}</Typography>
        </AccordionSummary>
    )
}