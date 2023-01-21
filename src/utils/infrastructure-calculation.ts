import _ from 'lodash';
import { RootState } from '../store';
import {  ARNONA_PRICE_RATE_MONTHLY, ELECTRICITY_PRICE_RATE, WATER_USAGE_TRESHOLD, WaterPriceRates } from '../constants';


export const monthlyArnonaExpense = (infrastructure: RootState['infrastructure']) => {
    return infrastructure.houseSize * ARNONA_PRICE_RATE_MONTHLY;
}

export const monthlyElectricityExpense = (infrastructure: RootState['infrastructure']) => {
    return infrastructure.electricity * ELECTRICITY_PRICE_RATE;
}

export const monthlyWaterExpense = (info: RootState) => {
    const numberOfFamilyMember = _.sum(Object.keys(info.family.children)) + _.sum(Object.keys(info.income.members));
    const waterUsagePerPerson = info.infrastructure.water / numberOfFamilyMember;
    if (waterUsagePerPerson <= WATER_USAGE_TRESHOLD) {
        return info.infrastructure.water * (WaterPriceRates.Violation + WaterPriceRates.Low);
    }

    const waterUsageOverThreshold = info.infrastructure.water - numberOfFamilyMember * WATER_USAGE_TRESHOLD;
    return numberOfFamilyMember * WATER_USAGE_TRESHOLD * WaterPriceRates.Low + 
        waterUsageOverThreshold * WaterPriceRates.High + 
        WaterPriceRates.Violation * info.infrastructure.water;
}