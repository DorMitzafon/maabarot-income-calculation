import * as React from 'react';
import { store } from '../../../store';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';
import commaNumber from 'comma-number';
import { infrastructureProjectionCalculation } from '../../../utils/infrastructure-projections';
import { ExpandableUnit } from '../ExpandableUnit';


export const InfrastructureProjection = () => {
    const state = store.getState();
    const infrastructure = infrastructureProjectionCalculation(state);
    const displayResidenceTax = () => {
        return (
            <>
                <Box sx={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
                    <Typography variant='body1' sx={{fontWeight: 'bold'}}>מס יישוב:</Typography>
                    <Typography>{commaNumber(infrastructure.residenceTax)}</Typography>
                    <Tooltip placement='top' title={<Typography sx={{direction: 'rtl'}}>300 שקלים לכל בית אב</Typography>}>
                        <HelpIcon sx={{color: 'lightcoral'}}/>
                    </Tooltip>
                </Box>       
            </>
        )
    }

    const displayInfrastructureProjection = () => {
        return (
            <>
                <Box sx={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
                    <Typography variant='body1' sx={{fontWeight: 'bold'}}>היטלי תשתיות:</Typography>
                    <Typography>{commaNumber(infrastructure.projection)}</Typography>
                    <Tooltip 
                        placement='top' 
                        title={
                        <>
                            <Typography sx={{direction: 'rtl'}}>
                                {`עד 95 מ״ר בחישוב של 5 שקלים למטר.`}
                            </Typography>
                            <Typography sx={{direction: 'rtl'}}>
                                {`2.5 שקלים לכל מ״ר נוסף.`}
                            </Typography>
                        </>
                        }
                        >
                        <HelpIcon sx={{color: 'lightcoral'}}/>
                    </Tooltip>
                </Box>       
            </>
        )
    }

    return (
        <>
            <ExpandableUnit title='היטלים' displayNumber={(infrastructure.projection + infrastructure.residenceTax) * -1} >
                <>
                {displayInfrastructureProjection()}
                {displayResidenceTax()}
                </>
            </ExpandableUnit>
        </>
    );
}