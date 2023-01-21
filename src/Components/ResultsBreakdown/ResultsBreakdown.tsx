import Paper from '@mui/material/Paper';
import commaNumber from 'comma-number';
import { calculateTotalBudget } from '../../utils/budget-calculation';
import { TotalIncome } from './Breakdowns/TotalIncome';
import { StateAllowance } from './Breakdowns/StateAllowance';
import { CommunityTaxes } from './Breakdowns/CommunityTaxes';
import { Projections } from './Breakdowns/Projections';
import { BalanceTax } from './Breakdowns/BalanceTax';
import { MutualAssistTax } from './Breakdowns/MutualAssistTax';
import { ChildrenEducation } from './Breakdowns/ChildrenEducation';
import { Infrastructure } from './Breakdowns/Infrastructure';
import { store } from '../../store';
import { Box, Typography } from '@mui/material';
import { mobileAndTabletCheck } from '../../utils/mobile-detection';


export const ResultsBreakdown = () => {
    const totalBudgetCalculation = () => {
        const budget = calculateTotalBudget(store.getState())
        return commaNumber(budget.toFixed(0));
    }

    return (
        <Paper elevation={3} sx={{display: 'flex', flexDirection: 'column', direction: 'rtl'}}>
            <TotalIncome />
            <StateAllowance />
            <CommunityTaxes />
            <Projections />
            <BalanceTax />
            <MutualAssistTax />
            <ChildrenEducation />
            <Infrastructure />
            &nbsp;
            &nbsp;
            <Box sx={{ display: 'flex', justifyContent: 'right', textAlign: 'center', padding: '16px' }}>
                <Typography variant="h5" sx={{ width: mobileAndTabletCheck() ? '61%': '31.5%', flexShrink: 0, fontWeight: 'bold', textAlign: 'start' }}>
                    יתרה חודשית
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center', color: 'green', direction: 'ltr' }}>
                    {totalBudgetCalculation()}
                </Typography>
            </Box>
        </Paper>
    );
}