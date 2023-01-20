import _ from 'lodash';
import {  MUTUAL_ASSIST_TAX_PERCENT, ARNONA_PRICE_RATE_MONTHLY, ELECTRICITY_PRICE_RATE, WATER_USAGE_TRESHOLD, WaterPriceRates } from '../constants';
import { RootState } from '../store';
import { totalIncomeCalcuation } from './income-calculation';
import { communityTaxesCalculation } from './community-taxes';
import { infrastructureProjectionCalculation } from './infrastructure-projections';
import { balanceTaxCalculation } from './balance-tax';
import { stateAllowanceCalculation } from './state-allowance';
import { educationExpenseCalculation } from './children-education';

export const netIncomeCalculation = (info: RootState) => {
    const income = totalIncomeCalcuation(info.income);
    const communityTax = communityTaxesCalculation(info);
    const infrastructureProjection = infrastructureProjectionCalculation(info);
    const stateAllowance = stateAllowanceCalculation(info);

    return income.totalIncome + stateAllowance.totalAllowance - 
        infrastructureProjection.projection - infrastructureProjection.residenceTax -
        communityTax.taxes;
}


export const calculateTotalBudget = (info: RootState) => {
    const {totalIncome} = totalIncomeCalcuation(info.income);

    const communityTax = communityTaxesCalculation(info);
    const infrastructureProjection = infrastructureProjectionCalculation(info);

    const netIncome = totalIncome - communityTax.taxes - infrastructureProjection.projection - infrastructureProjection.residenceTax;
    
    const balanceTax = balanceTaxCalculation(info, netIncome);
    const mutualAssistTax = netIncome * MUTUAL_ASSIST_TAX_PERCENT;

    const netIncomeAfterBalanceDecreases = netIncome - balanceTax.totalTaxSum - mutualAssistTax;

    const childrenEducationDecrease = educationExpenseCalculation(info);

    const arnonaExpense = monthlyArnonaExpense(info.infrastructure);
    const electricityExpense = monthlyElectricityExpense(info.infrastructure);
    const waterExpense = monthlyWaterExpense(info);

    const total = netIncomeAfterBalanceDecreases - childrenEducationDecrease.totalEducationExpense - arnonaExpense - electricityExpense - waterExpense;
    // console.log({arnonaExpense, electricityExpense, waterExpense, netIncome, netIncomeAfterBalanceDecreases, total, childrenEducationDecrease, balanceTax, mutualAssistTax});
    return total;
}

const monthlyArnonaExpense = (infrastructure: RootState['infrastructure']) => {
    return infrastructure.houseSize * ARNONA_PRICE_RATE_MONTHLY;
}

const monthlyElectricityExpense = (infrastructure: RootState['infrastructure']) => {
    return infrastructure.electricity * ELECTRICITY_PRICE_RATE;
}

const monthlyWaterExpense = (info: RootState) => {
    const numberOfFamilyMember = _.sum(Object.keys(info.family.children)) + _.sum(Object.keys(info.income.members));
    const waterUsagePerPerson = info.infrastructure.water / numberOfFamilyMember;
    if (waterUsagePerPerson <= WATER_USAGE_TRESHOLD) {
        return info.infrastructure.water * (WaterPriceRates.High + WaterPriceRates.Low);
    }

    const waterUsageOverThreshold = info.infrastructure.water - numberOfFamilyMember * WATER_USAGE_TRESHOLD;
    return numberOfFamilyMember * WATER_USAGE_TRESHOLD * WaterPriceRates.Low + 
        waterUsageOverThreshold * WaterPriceRates.High + 
        WaterPriceRates.VIOLATION * info.infrastructure.water;
}


