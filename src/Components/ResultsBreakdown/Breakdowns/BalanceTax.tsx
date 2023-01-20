import * as React from 'react';
import Typography from '@mui/material/Typography';
import commaNumber from 'comma-number';
import Box from '@mui/material/Box';
import { store } from '../../../store';
import { balanceTaxCalculation } from '../../../utils/balance-tax';
import { netIncomeCalculation } from '../../../utils/budget-calculation';
import { ExpandableUnit } from '../ExpandableUnit';
import { NET_INCOME_THRESHOLD } from '../../../constants';
import { DisplayLine } from '../DisplayLine';


export const BalanceTax = () => {
    const state = store.getState();
    const netIncome = netIncomeCalculation(state);
    const balanceTax = balanceTaxCalculation(state, netIncome);

    const displayBalanceTaxDetails = () => {
        return (
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <Box>
                    <DisplayLine title={`הכנסה נטו`} number={netIncome}/>
                    <DisplayLine title={`חישוב תקן`} number={balanceTax.totalHouseBenchmark}/>
                    <DisplayLine title={`הכנסה לנפש`} number={Math.round(netIncome / balanceTax.totalHouseBenchmark)}/>
                    {balanceTax.incomeMargin > 0 ?
                        <>
                        <DisplayLine title={`יתרה מעל הבטחת הכנסה על כל נפש`} number={balanceTax.incomeMargin}/>
                        <DisplayLine title={`סכום היתרה לניכוי מס איזון`} number={balanceTax.incomeMargin * balanceTax.numberOfFamilyMembers}/>
                        </>
                        :
                        <>
                            <Typography variant='h6' sx={{fontWeight: 'bold', color: 'green'}}>{`ההכנסה לנפש נמוכה מהסכום המינימלי.`}</Typography>
                            <Typography variant='h6' sx={{fontWeight: 'bold', color: 'green'}}>{` לכן הקיבוץ ישלים ל-${commaNumber(NET_INCOME_THRESHOLD)}`}</Typography>
                        </>
                        
                    }
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                   {balanceTaxExplanation()}
                </Box>
                <Box sx={{direction: 'rtl', paddingRight: '2.5%'}}>
                    <Typography sx={{direction: 'rtl'}}>
                        על כל חבר קיבוץ במשפחה מוסיפים 1
                    </Typography>
                    <Typography sx={{direction: 'rtl'}}>
                        ילדים עד גיל 18 מחושבים לפי:
                    </Typography>
                    <Box sx={{direction: 'rtl', paddingRight: '2.5%'}}>
                        {showChildrenBalanceCalculation()}
                    </Box>
                </Box>

            </Box>
        )
    }

    return (
        <>
            <ExpandableUnit title='מס איזון' displayNumber={balanceTax.totalTaxSum * -1} >
                {displayBalanceTaxDetails()}
            </ExpandableUnit>
        </>
    );
}

const showChildrenBalanceCalculation = () => (
    <>
        <Typography sx={{direction: 'rtl'}}>
            ילד ראשון מוסיפים 0.9
        </Typography>
        <Typography sx={{direction: 'rtl'}}>
            ילד שני מוסיפים 0.8
        </Typography>
        <Typography sx={{direction: 'rtl'}}>
            ילד שלישי מוסיפים 0.7
        </Typography>
        <Typography sx={{direction: 'rtl'}}>
            כל ילד נוסף מוסיפים 0.6
        </Typography>
    </>
)

const balanceTaxExplanation = () => (
    <>
        <Typography sx={{direction: 'rtl'}}>
        {`מס איזון מחושב לפי הכנסה לנפש במשפחה. המינימום הכנסה לנפש הינה ${commaNumber(NET_INCOME_THRESHOLD)}.`}
        </Typography>
        <Typography variant='body1' sx={{direction: 'rtl'}}>
            הכנסה לנפש מחושבת עפ״י הכנסה נטו לחלק בתקן המחושב לפי מספר הנפשות במשפחה.
        </Typography>
        <Typography variant='body1' sx={{direction: 'rtl'}}>
            במידה וההכנסה לנפש נמוכה מהמינימום, ההכנסה תושלם בהתאם.
        </Typography>
        <Typography sx={{direction: 'rtl'}}>
            חישוב התקן מבוצע כך:
        </Typography>
    </>
)