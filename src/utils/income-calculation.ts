import _ from 'lodash';
import { RootState } from '../store';

export const totalIncomeCalcuation = (income: RootState['income']) => {
    const membersCount = Object.keys(income.members).length;
    const totalIncome = _.sum(Object.values(income.members) || 0)
    return {
        membersCount,
        totalIncome,
    }
}

export const netIncomeCalcualtion = (info: RootState) => {
    
}