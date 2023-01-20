import * as React from 'react';
import { store } from '../../../store';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';
import commaNumber from 'comma-number';
import { educationExpenseCalculation } from '../../../utils/children-education';
import { ExpandableUnit } from '../ExpandableUnit';


export const ChildrenEducation = () => {
    const state = store.getState();
    const educationExpense = educationExpenseCalculation(state);
    const displayChildrenEducationDetails = () => {
        return (
            <>
                {/* <Box sx={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
                    <Typography variant='body1' sx={{fontWeight: 'bold'}}>קצבאות ילדים:</Typography>
                    <Typography>{commaNumber(educationExpense.children.allowance)}</Typography>
                    <Tooltip placement='top' title={<Typography>עפ״י מספר הילדים, לפי נתוני ביטוח לאומי</Typography>}>
                        <HelpIcon sx={{color: 'lightcoral'}}/>
                    </Tooltip>
                </Box>        */}
            </>
        )
    }

    return (
        <>
            {educationExpense.childrenEducationExpenses.length &&
                <ExpandableUnit title='הוצאות חינוך' displayNumber={educationExpense.totalEducationExpense * -1} >
                    {displayChildrenEducationDetails()}
                </ExpandableUnit>
            }   
        </>
    );
}