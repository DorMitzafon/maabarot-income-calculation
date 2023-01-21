import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box, Divider, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { SectionSummary } from './SharedComponents/SectionSummary';
import { ControlAmount } from './SharedComponents/ControlAmount';
import { ChildrenTypes, Kindergartens } from '../../constants';
import { updateChildren, deleteChild } from '../../features/family-state';
import { useAppSelector, useAppDispatch } from '../../hooks';


export const FamilySection = () => {
    const family = useAppSelector(state => state.family);
    const dispatch = useAppDispatch()
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [numChildren, setNumChildren] = 
        React.useState<number>(Object.keys(family.children).length|| 1);
    
    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

    const renderFriends = () => Array.from(Array(numChildren).keys()).map((_, index) => {
        return <Box sx={{ padding: '20px' }} key={index}>
            <Typography sx={{ color: 'text.secondary' }}>{`ילד ${index + 1}`}</Typography>
            <Box sx={{display: 'flex', gap: '10px'}}>
                <FormControl fullWidth>
                    <InputLabel id="education-select-label">מסגרת חינוכית</InputLabel>
                    <Select
                        labelId="education-select-label"
                        id="education-select-id"
                        value={family.children[index]?.education ?? ''}
                        label="education"
                        defaultValue='בחר/י מסגרת'
                        onChange={(event) =>{
                            const childStatus = family.children[index];
                            const isFormal = event.target.value === ChildrenTypes.Elementary || event.target.value === ChildrenTypes.HighSchool;
                            dispatch(updateChildren({...family.children, [index]: {...childStatus, education: event.target.value, isFormal}}))
                        }}
                    >
                        <MenuItem value={ChildrenTypes.Infant}>לא במסגרת</MenuItem>
                        <MenuItem value={ChildrenTypes.Toddler}>גיל הרך</MenuItem>
                        <MenuItem value={ChildrenTypes.Elementary}>יסודי</MenuItem>
                        <MenuItem value={ChildrenTypes.HighSchool}>חטיבה/תיכון</MenuItem>
                    </Select>
                </FormControl>
                {family.children[index]?.education === ChildrenTypes.Toddler ?
                <FormControl fullWidth>
                    <InputLabel id="kindergraten-select-label">גן ילדים</InputLabel>
                    <Select
                        labelId="kidnergarten-select-label"
                        id="kindergarten-select-id"
                        value={family.children[index]?.kindergarten ? `${family.children[index]?.kindergarten}` : ''}
                        label="kindergarten"
                        defaultValue='בחר/י גן'
                        onChange={(event) =>{
                            const childStatus = family.children[index];
                            dispatch(updateChildren({...family.children, [index]: {...childStatus, kindergarten: parseInt(event.target.value)}}));
                        }}
                    >
                        <MenuItem value={Kindergartens.Pashosh}>גן פשוש</MenuItem>
                        <MenuItem value={Kindergartens.Ofer}>גן עופר</MenuItem>
                        <MenuItem value={Kindergartens.Savion}>גן סביון</MenuItem>
                        <MenuItem value={Kindergartens.Oren}>גן אורן</MenuItem>
                    </Select>
                </FormControl>
                : family.children[index]?.education === ChildrenTypes.Elementary || family.children[index]?.education === ChildrenTypes.HighSchool ?
                <FormControl fullWidth>
                    <InputLabel id="formal-select-label">חינוך פורמלי</InputLabel>
                    <Select
                        labelId="formal-select-label"
                        id="formal-select"
                        value={family.children[index]?.isFormal ? 1 : 0}
                        label="education"
                        onChange={(event) => {
                            const childStatus = family.children[index];
                            dispatch(updateChildren(({...family.children, [index]: {...childStatus, isFormal: Boolean(event.target.value)}})));
                            }
                        }
                    >
                        <MenuItem value={1}>פורמלי</MenuItem>
                        <MenuItem value={0}>לא פורמלי</MenuItem>
                    </Select>
                </FormControl>
                : <></>
            }
            </Box>
        </Box>
    });

    const removeChild = () => {       
        if (numChildren === 0) {
            return;
        }

        const updateChildrenNum = numChildren - 1;
        dispatch(deleteChild(updateChildrenNum));
        setNumChildren(updateChildrenNum);
    }

    return (
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{direction: 'rtl'}}>
        <SectionSummary title="ילדים" subtitle='כמות ילדים לבית אב (עד גיל 18)'/>
        <AccordionDetails sx={{display: 'flex', flexDirection: 'column'}}>
          {renderFriends()}
          <Divider></Divider>
          <ControlAmount 
          addTitle='הוסף ילד'
          removeTitle='הורד ילד'
          onAddClick={() => setNumChildren(numChildren + 1)}
          onRemoveClick={removeChild}
          />
        </AccordionDetails>
      </Accordion>
    )
}