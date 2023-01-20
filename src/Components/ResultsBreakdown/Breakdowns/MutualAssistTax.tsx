import * as React from 'react';
import { store } from '../../../store';
import Typography from '@mui/material/Typography';
import { balanceTaxCalculation } from '../../../utils/balance-tax';
import { netIncomeCalculation } from '../../../utils/budget-calculation';
import { ExpandableUnit } from '../ExpandableUnit';


export const MutualAssistTax = () => {
    const state = store.getState();
    const netIncome = netIncomeCalculation(state);
    const balanceTax = balanceTaxCalculation(state, netIncome);

    const incomeAfterBalanceTax = netIncome - balanceTax.totalTaxSum;

    return (
        <>
            <ExpandableUnit title='קרן לעזרה הדדית' displayNumber={Math.round(incomeAfterBalanceTax * 0.01) * -1} >
            <Typography variant='body1'>חישוב לפי 1% מהנטו לאחר כל ההורדות מעל</Typography>
            </ExpandableUnit>
        </>
    );
}