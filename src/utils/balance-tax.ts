import _ from 'lodash';
import { BalanceTaxPercent, Benchmarks, NET_INCOME_THRESHOLD } from '../constants';
import { RootState } from '../store';

export const balanceTaxCalculation = (info: RootState, netIncome: number) => {
    const totalHouseBenchmark = benchmarkCalculation(info);
    const incomeMargin = Math.round((netIncome / (totalHouseBenchmark || 1)) - NET_INCOME_THRESHOLD);
    const numberOfFamilyMembers = Object.keys(info.income.members).length + Object.keys(info.family.children).length;
    const balanceTaxPercent = incomeMargin > 0 ? BalanceTaxPercent.High : 1;
    const totalTaxSum = Math.round(incomeMargin * balanceTaxPercent * (numberOfFamilyMembers ?? 1));
    
    return {
        totalHouseBenchmark,
        incomeMargin,
        numberOfFamilyMembers,
        totalTaxSum
    }
}


const benchmarkCalculation = (info: RootState) => {
    const membersBenchmark = _.sum(Object.keys(info.income.members).map(member => Benchmarks.Member));
    const childrenBenchmark = _.sum(Object.keys(info.family.children).map((child, index) => {
        switch (index) {
            case 0:
                return Benchmarks.FirstChild
            case 1:
                return Benchmarks.SecondChild
            case 2:
                return Benchmarks.ThirdChild
            default:
                return Benchmarks.FourthChildAndAbove
        }
    }));
    
    return membersBenchmark + childrenBenchmark;
}