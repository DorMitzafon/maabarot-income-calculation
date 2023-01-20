import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box, Divider, TextField } from '@mui/material';
import { SectionSummary } from './SharedComponents/SectionSummary';
import { ControlAmount } from './SharedComponents/ControlAmount';
import { updateMembers, deleteMember } from '../../features/income-state';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { totalIncomeCalcuation } from '../../utils/income-calculation';


export const IncomeSection = () => {
    const income = useAppSelector((state) => state.income)
    const dispatch = useAppDispatch()

    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [inputError, setInputError] = React.useState<Record<string, boolean>>({});
    const [numMembers, setNumMembers] = 
      React.useState<number>(Object.keys(income.members).length || 1);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
    
    const renderMembers = () => Array.from(Array(numMembers).keys()).map((_, index) => {
        const isInputError = inputError[index];
        const member = income.members[index];
        return <Box sx={{ padding: '20px' }} key={index}>
            <Typography sx={{ color: 'text.secondary' }}>{`חבר ${index + 1}`}</Typography>
            <TextField
            error={isInputError}
            required
            id="outlined-required"
            label={isInputError ? 'שגיאה' : "נחוץ"}
            helperText={isInputError ? 'יכול להכיל רק ספרות' : "הכנס את המשכורת בספרות בלבד"}
            placeholder='משכורת נטו'
            {...(member && {value: member})}
            onChange={(event) => {
                const memberIncome = parseInt(event.target.value);
                if (Number.isNaN(memberIncome) && event.target.value !== '') {
                    setInputError({...inputError, [index]: true})
                    return;
                }

                setInputError({...inputError, [index]: false})
                dispatch(updateMembers({[index]: memberIncome}));
                
            }}
            />
        </Box>
    });

    const removeMember = () => {        
        if (numMembers === 1) {
          return;
        }

        const updateMembersNum = numMembers - 1;

        dispatch(deleteMember(updateMembersNum));
        setNumMembers(updateMembersNum);
        setInputError({...inputError, [updateMembersNum]: false})
    }

    return (
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{direction: 'rtl'}}>
        <SectionSummary title="הכנסה" subtitle='הכנסה נטו לבית אב' />
        <AccordionDetails sx={{display: 'flex', flexDirection: 'column'}}>
          {renderMembers()}
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Typography variant='caption'>{`סך הכל: ${totalIncomeCalcuation(income).totalIncome}`}</Typography>
          </Box>
          <Divider></Divider>
          <ControlAmount 
          addTitle='הוסף חבר'
          removeTitle='הורד חבר'
          onAddClick={() => {
            if (numMembers === 2) {
                return ;
            }

            setNumMembers(numMembers + 1)
            }}
          onRemoveClick={removeMember}
          />
        </AccordionDetails>
      </Accordion>
    )
}