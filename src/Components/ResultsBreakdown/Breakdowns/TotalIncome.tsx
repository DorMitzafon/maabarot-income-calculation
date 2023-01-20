import { store } from '../../../store';
import { totalIncomeCalcuation } from '../../../utils/income-calculation';
import { ExpandableUnit } from '../ExpandableUnit';
import { DisplayLine } from '../DisplayLine';


export const TotalIncome = () => {
    const state = store.getState();
    const incomeDetails = totalIncomeCalcuation(state.income);
    const showMembersIncome = () => {
        const components = Object.values(state.income.members).map((income, index) => {
            return (
                <DisplayLine title={`חבר ${index + 1}`} number={income} key={index}/>
            )
        });

        return components;
    };
    return (
        <>
            <ExpandableUnit title='סה״כ הכנסה' displayNumber={incomeDetails.totalIncome} >
                <>
                    {showMembersIncome()}
                </>
            </ExpandableUnit>
        </>
    );
}