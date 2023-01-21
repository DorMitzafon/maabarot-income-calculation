import { store } from '../../../store';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { 
    monthlyArnonaExpense, 
    monthlyElectricityExpense,
    monthlyWaterExpense,
} from '../../../utils/infrastructure-calculation';
import { ExpandableUnit } from '../ExpandableUnit';
import { DisplayLine } from '../DisplayLine';
import { WaterPriceRates, ARNONA_PRICE_RATE_MONTHLY } from '../../../constants';


export const Infrastructure = () => {
    const state = store.getState();
    const electricityExpense = monthlyElectricityExpense(state.infrastructure);
    const arnonaExpense = monthlyArnonaExpense(state.infrastructure);
    const waterExpense = monthlyWaterExpense(state);

    const displayElectricityExpenses = () => {
        return (
            <>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <DisplayLine title={`חשבון חשמל`} number={Math.round(electricityExpense)}/>
                    <Typography variant='body1' sx={{direction: 'rtl'}}>
                        לפי 0.56 לקוט״ש
                    </Typography>
                </Box>       
            </>
        )
    }

    const displayArnonaExpenses = () => {
        return (
            <>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <DisplayLine title={`ארנונה`} number={Math.round(arnonaExpense)}/>
                    <Typography sx={{direction: 'rtl'}}>
                        לפי חישוב חודשי של {ARNONA_PRICE_RATE_MONTHLY.toFixed(2)} שקלים לכל מ״ר
                    </Typography>
                </Box>       
            </>
        )
    }

    const displayWaterExpenses = () => {
        return (
            <>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <DisplayLine title={`חשבון מים`} number={Math.round(waterExpense)}/>
                    <Typography sx={{direction: 'rtl'}}>
                        לפי הקצבה של 6 קו״ב לנפש
                    </Typography>
                    <Typography sx={{direction: 'rtl'}}>
                        {`המחיר עד 6 קו״ב לנפש הינו ${WaterPriceRates.Low + WaterPriceRates.Violation}`}
                    </Typography>
                    <Typography sx={{direction: 'rtl'}}>
                        {`המחיר מעל 6 קו״ב לנפש הינו ${WaterPriceRates.High}`}
                    </Typography>
                </Box>       
            </>
        )
    }

    return (
        <>
            <ExpandableUnit title='תשתיות' displayNumber={(waterExpense + electricityExpense + arnonaExpense) * -1}>
                <>
                    {displayArnonaExpenses()}
                    &nbsp;
                    {displayElectricityExpenses()}
                    &nbsp;
                    {displayWaterExpenses()}
                </>
            </ExpandableUnit>
        </>
    );
}