import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import { SectionSummary } from './SharedComponents/SectionSummary';
import { Input } from './SharedComponents/Input';
import { updateElectricityPrice, updateHouseSize, updateWaterPrice, Infrastructure } from '../../features/infrastructure-state';
import { useAppDispatch } from '../../hooks';

type InfraDetailsFields = keyof Infrastructure;

export const InfrastructureSection = () => {
    const dispatch = useAppDispatch()

    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [isHouseSizeInputError, setIsHouseSizeInputError] = React.useState<boolean>(false);
    const [isElectricityError, setIsElectricityError] = React.useState<boolean>(false);
    const [isWaterPriceError, setIsWaterPriceError] = React.useState<boolean>(false);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
    
    const onInputeStateChange = 
        (fieldName: InfraDetailsFields, setError: React.Dispatch<React.SetStateAction<boolean>>) => 
            (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                const value = parseInt(event.target.value);
                if (Number.isNaN(value) && event.target.value !== '') {
                    setError(true);
                    return;
                }

                setError(false);
                switch (fieldName) {
                    case 'electricity':
                        return dispatch(updateElectricityPrice(value));
                    case 'houseSize':
                        return dispatch(updateHouseSize(value));
                    case 'water':
                        return dispatch(updateWaterPrice(value));
                    default:
                        throw new Error(`not supported update type ${fieldName}`);
                }
    }
    

    const onChangeHouseSize = onInputeStateChange('houseSize', setIsHouseSizeInputError);
    const onChangeElectricityPrice = onInputeStateChange('electricity', setIsElectricityError);
    const onChangeWaterPrice = onInputeStateChange('water', setIsWaterPriceError);

    return (
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{direction: 'rtl'}}>
        <SectionSummary title="היטלים" subtitle='הוצאות על תשתיות'/>
        <AccordionDetails sx={{display: 'flex'}}>
            <Input 
            title='גודל הנכס'
            isError={isHouseSizeInputError}
            onChangeInput={onChangeHouseSize}
            />
            <Input 
            title='צריכת חשמל (קוט״ש)'
            isError={isElectricityError}
            onChangeInput={onChangeElectricityPrice}
            />
            <Input 
            title='צריכת מים (מ״ק)'
            isError={isWaterPriceError}
            onChangeInput={onChangeWaterPrice}
            />
        </AccordionDetails>
      </Accordion>
    )
}