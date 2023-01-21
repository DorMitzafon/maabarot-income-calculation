import {  MUTUAL_ASSIST_TAX_PERCENT } from '../constants';
import { RootState } from '../store';
import { totalIncomeCalcuation } from './income-calculation';
import { communityTaxesCalculation } from './community-taxes';
import { projectionsCalculation } from './projections-calculations';
import { balanceTaxCalculation } from './balance-tax';
import { stateAllowanceCalculation } from './state-allowance';
import { educationExpenseCalculation } from './children-education';
import { monthlyWaterExpense, monthlyArnonaExpense, monthlyElectricityExpense } from './infrastructure-calculation';

export const netIncomeCalculation = (info: RootState) => {
    const income = totalIncomeCalcuation(info.income);
    const communityTax = communityTaxesCalculation(info);
    const infrastructureProjection = projectionsCalculation(info);
    const stateAllowance = stateAllowanceCalculation(info);

    return income.totalIncome + stateAllowance.totalAllowance - 
        infrastructureProjection.projection - infrastructureProjection.residenceTax -
        communityTax.taxes;
}


export const calculateTotalBudget = (info: RootState) => {
    const { totalIncome } = totalIncomeCalcuation(info.income);

    const communityTax = communityTaxesCalculation(info);
    const infrastructureProjection = projectionsCalculation(info);

    const netIncome = totalIncome - communityTax.taxes - infrastructureProjection.projection - infrastructureProjection.residenceTax;
    
    const balanceTax = balanceTaxCalculation(info, netIncome);
    const mutualAssistTax = netIncome * MUTUAL_ASSIST_TAX_PERCENT;

    const netIncomeAfterBalanceDecreases = netIncome - balanceTax.totalTaxSum - mutualAssistTax;

    const childrenEducationDecrease = educationExpenseCalculation(info);

    const arnonaExpense = monthlyArnonaExpense(info.infrastructure);
    const electricityExpense = monthlyElectricityExpense(info.infrastructure);
    const waterExpense = monthlyWaterExpense(info);

    const total = netIncomeAfterBalanceDecreases - childrenEducationDecrease.totalEducationExpense - arnonaExpense - electricityExpense - waterExpense;
    return total;
}




