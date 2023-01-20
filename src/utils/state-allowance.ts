import _ from 'lodash';
import { RootState } from '../store';
import { ChildrenAllowance } from '../constants';

export const stateAllowanceCalculation = (state: RootState) => {
    const numberOfChildren = Object.keys(state.family.children).length;
    const childrenAllowance =_.sum(Object.keys(state.family.children).map((child, index) => {
        switch(index + 1) {
            case 2:
            case 3:
            case 4:
                return ChildrenAllowance.SecondToFourthChild
            default:
                return ChildrenAllowance.FirstOrFifthAndABove
        }
    }));

    const totalAllowance = childrenAllowance;
    return {
        children: {
            number: numberOfChildren,
            allowance: childrenAllowance
        },
        totalAllowance
    }
}