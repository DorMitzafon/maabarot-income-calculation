import _ from 'lodash';
import { ChildrenTypes, FORMAL_SCHOOL_EXPENSE_PERCENT, INFORMAL_SCHOOL_EXPENSE_PERCENT, KINDERGARTEN_EXPENSE_PERCENT, Schools } from '../constants';
import { RootState } from '../store';

export const educationExpenseCalculation = (info: RootState) => {
    const childrenEducationExpenses = Object.values(info.family.children).map(child => {
        const { education, isFormal, kindergarten } = child
        let expense: number;
        switch (education) {
            case ChildrenTypes.Elementary:
                if (isFormal) {
                    expense = Schools.FormalElementary * FORMAL_SCHOOL_EXPENSE_PERCENT;
                } else {
                    expense = Schools.InFormalElementary * INFORMAL_SCHOOL_EXPENSE_PERCENT;
                }

                break;
            case ChildrenTypes.HighSchool:
                if (isFormal) {
                    expense = Schools.FormalHighSchool * FORMAL_SCHOOL_EXPENSE_PERCENT;
                } else {
                    expense = Schools.InFormalHighSchool * INFORMAL_SCHOOL_EXPENSE_PERCENT;
                }

                break;
            case ChildrenTypes.Toddler:
                expense = kindergarten * KINDERGARTEN_EXPENSE_PERCENT;
                break;
            case ChildrenTypes.Infant:
                expense = 0;
                break;
            default:
                throw new Error('Unsupported Child type');
        }

        return {...child, expense}
    });

    
    return {
        totalEducationExpense: _.sum(childrenEducationExpenses.map(child => child.expense)),
        childrenEducationExpenses
    }
}