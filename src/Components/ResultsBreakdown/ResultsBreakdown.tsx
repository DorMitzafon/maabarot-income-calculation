import * as React from 'react';
import Paper from '@mui/material/Paper';
import commaNumber from 'comma-number';
import { Title } from '../Title/Title';
import { calculateTotalBudget } from '../../utils/budget-calculation';
import { TotalIncome } from './Breakdowns/TotalIncome';
import { StateAllowance } from './Breakdowns/StateAllowance';
import { CommunityTaxes } from './Breakdowns/CommunityTaxes';
import { InfrastructureProjection } from './Breakdowns/InfrastructureProjection';
import { BalanceTax } from './Breakdowns/BalanceTax';
import { MutualAssistTax } from './Breakdowns/MutualAssistTax';
import { store } from '../../store';


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
            <Title title={totalBudgetCalculation()}/>
        </Paper>
    );
}