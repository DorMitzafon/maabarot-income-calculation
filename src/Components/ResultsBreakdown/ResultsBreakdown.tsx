import Paper from '@mui/material/Paper';
import commaNumber from 'comma-number';
import { calculateTotalBudget } from '../../utils/budget-calculation';
import { TotalIncome } from './Breakdowns/TotalIncome';
import { StateAllowance } from './Breakdowns/StateAllowance';
import { CommunityTaxes } from './Breakdowns/CommunityTaxes';
import { InfrastructureProjection } from './Breakdowns/InfrastructureProjection';
import { BalanceTax } from './Breakdowns/BalanceTax';
import { MutualAssistTax } from './Breakdowns/MutualAssistTax';
import { store } from '../../store';
import { Box, Typography } from '@mui/material';


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
            <InfrastructureProjection />
            <BalanceTax />
            <MutualAssistTax />
            &nbsp;
            &nbsp;
            <Box sx={{ display: 'flex', justifyContent: 'right', textAlign: 'center', padding: '16px' }}>
                <Typography variant="h4" sx={{ width: '30%', flexShrink: 0, fontWeight: 'bold', textAlign: 'start' }}>
                    סה״כ נותר
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {totalBudgetCalculation()}
                </Typography>
            </Box>
        </Paper>
    );
}