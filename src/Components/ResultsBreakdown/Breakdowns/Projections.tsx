import { store } from '../../../store';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { projectionsCalculation } from '../../../utils/projections-calculations';
import { ExpandableUnit } from '../ExpandableUnit';
import { DisplayLine } from '../DisplayLine';


export const Projections = () => {
    const state = store.getState();
    const infrastructure = projectionsCalculation(state);
    const displayResidenceTax = () => {
        return (
            <>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <DisplayLine title={`מס יישוב`} number={infrastructure.residenceTax}/>
                    <Typography variant='body1' sx={{direction: 'rtl'}}>
                            מחושב לפי 300 שקלים לבית אב
                    </Typography>
                </Box>       
            </>
        )
    }

    const displayInfrastructureProjection = () => {
        return (
            <>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <DisplayLine title={`היטלי תשתיות`} number={infrastructure.projection}/>
                    <Typography sx={{direction: 'rtl'}}>
                        {`עד 95 מ״ר בחישוב של 5 שקלים למטר.`}
                    </Typography>
                    <Typography sx={{direction: 'rtl'}}>
                        {`2.5 שקלים לכל מ״ר נוסף.`}
                    </Typography>
                </Box>       
            </>
        )
    }

    return (
        <>
            <ExpandableUnit title='היטלים' displayNumber={(infrastructure.projection + infrastructure.residenceTax) * -1} >
                <>
                    {displayInfrastructureProjection()}
                    &nbsp;
                    {displayResidenceTax()}
                </>
            </ExpandableUnit>
        </>
    );
}