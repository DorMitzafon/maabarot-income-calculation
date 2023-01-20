import { store } from '../../../store';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import HelpIcon from '@mui/icons-material/Help';
import { stateAllowanceCalculation } from '../../../utils/state-allowance';
import { ExpandableUnit } from '../ExpandableUnit';
import { DisplayLine } from '../DisplayLine';


export const StateAllowance = () => {
    const state = store.getState();
    const stateAllowance = stateAllowanceCalculation(state);
    const displayChildrenAllowance = () => {
        return (
            <>
                <Box sx={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
                    <DisplayLine title={`קצבאות ילדים`} number={stateAllowance.children.allowance}/>
                    <Tooltip placement='top' title={<Typography>עפ״י מספר הילדים, לפי נתוני ביטוח לאומי</Typography>}>
                        <HelpIcon sx={{color: 'lightcoral'}}/>
                    </Tooltip>
                </Box>       
            </>
        )
    }

    return (
        <>
            {stateAllowance.children.number > 0 && 
                <ExpandableUnit title='קצבאות' displayNumber={stateAllowance.totalAllowance} >
                    {displayChildrenAllowance()}
                </ExpandableUnit>
            }
        </>
    );
}