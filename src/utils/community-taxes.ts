import { COMMUNITY_TAXES } from '../constants';
import { RootState } from '../store';

export const communityTaxesCalculation = (state: RootState) => {
    const numberOfMembers = Object.keys(state.income.members).length;
    return {
            taxes: numberOfMembers * COMMUNITY_TAXES,
            numberOfMembers,
        };
}