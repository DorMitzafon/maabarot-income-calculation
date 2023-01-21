import { store, RootState } from '../../../store';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { educationExpenseCalculation } from '../../../utils/children-education';
import { ExpandableUnit } from '../ExpandableUnit';
import { DisplayLine } from '../DisplayLine';
import { ChildrenTypes, Kindergartens, Schools } from '../../../constants';
import commaNumber from 'comma-number';

const kindergartenMap = {
    [Kindergartens.Ofer]: 'עופר',
    [Kindergartens.Oren]: 'אורן',
    [Kindergartens.Pashosh]: 'פשוש',
    [Kindergartens.Savion]: 'סביון'
}

export const ChildrenEducation = () => {
    const state = store.getState();
    const educationExpense = educationExpenseCalculation(state);
    const displayChildrenEducationDetails = () => {
        return Object.values(state.family.children).map((child, index) => {

            return (
                <>
                    <Box sx={{display: 'flex', flexDirection: 'column', direction: 'rtl'}}>
                        <Typography variant='body1' sx={{fontWeight: 'bold', textDecoration: 'underline' }}>
                            {`ילד ${index + 1}`}
                        </Typography>
                        <Box sx={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
                            <Typography variant='body1' sx={{ fontWeight: 'bold' }}>
                                {`מסגרת חינוכית:`}
                            </Typography>
                            <Typography variant='body1'>
                                {showEducationDetails(child)}
                            </Typography>
                        </Box>
                        <DisplayLine title={`הוצאה`} number={Math.round(educationExpense.childrenEducationExpenses[index].expense)}/>
                    </Box>    
                    &nbsp;   
                </>
            );
        })
    }

    return (
        <>
            {Object.keys(state.family.children).length > 0 &&
                <ExpandableUnit title='הוצאות חינוך' displayNumber={educationExpense.totalEducationExpense * -1} >
                    {displayChildrenEducationDetails()}
                    {educationExplanation()}
                </ExpandableUnit>
            }   
        </>
    );
}

type ValueOf<T> = T[keyof T];
const showEducationDetails = (child: ValueOf<RootState['family']['children']>) => {
    switch (child.education) {
        case ChildrenTypes.Elementary:
            return `יסודי ${child.isFormal ? '' : 'לא'} פורמלי`;
        case ChildrenTypes.HighSchool:
            return `חטיבה/תיכון ${child.isFormal ? '' : 'לא'} פורמלי`;
        case ChildrenTypes.Toddler:
            return `גן ${kindergartenMap[child.kindergarten]}`
    }
}

const educationExplanation = () => (
    <>
        <Typography sx={{direction: 'rtl'}}>
        {`הוצאות החינוך משתנות לפי המסגרת החינוכית.`}
        </Typography>
        <Typography variant='body1' sx={{direction: 'rtl'}}>
            השתתפות עבור הגנים הינה 35%. מחירי הגנים:
        </Typography>
        {showKindergartenExpenses()}
        <Typography variant='body1' sx={{direction: 'rtl'}}>
            השתתפות עבור בתי ספר פורמליים הינה 100%. מחירי בתי הספר:
        </Typography>
        {showFormalSchoolsCost()}
        <Typography variant='body1' sx={{direction: 'rtl'}}>
            השתתפות עבור בתי ספר לא פורמליים הינה 20%. מחירי בתי הספר:
        </Typography>
        {showInformalSchoolsCost()}
    </>
)

const showKindergartenExpenses = () => (
    <Box sx={{paddingRight: '2.5%', textDecoration: 'underline'}}>
        <Typography sx={{direction: 'rtl'}}>
            {`פשוש: ${roundedCommaNumber(Kindergartens.Pashosh)}`}
        </Typography>
        <Typography sx={{direction: 'rtl'}}>
            {`עופר: ${roundedCommaNumber(Kindergartens.Ofer)}`}
        </Typography>
        <Typography sx={{direction: 'rtl'}}>
            {`סביון: ${roundedCommaNumber(Kindergartens.Savion)}`}
        </Typography>
        <Typography sx={{direction: 'rtl'}}>
            {`אורן: ${roundedCommaNumber(Kindergartens.Oren)}`}
        </Typography>
    </Box>
)

const showFormalSchoolsCost = () => (
    <Box sx={{paddingRight: '2.5%', textDecoration: 'underline'}}>
        <Typography sx={{direction: 'rtl'}}>
            {`יסודי: ${roundedCommaNumber(Schools.FormalElementary)}`}
        </Typography>
        <Typography sx={{direction: 'rtl'}}>
            {`חטיבה/תיכון: ${roundedCommaNumber(Schools.FormalHighSchool)}`}
        </Typography>
    </Box>
)

const showInformalSchoolsCost = () => (
    <Box sx={{paddingRight: '2.5%', textDecoration: 'underline'}}>
        <Typography sx={{direction: 'rtl'}}>
            {`יסודי: ${roundedCommaNumber(Schools.InFormalElementary)}`}
        </Typography>
        <Typography sx={{direction: 'rtl'}}>
            {`חטיבה/תיכון: ${roundedCommaNumber(Schools.InFormalHighSchool)}`}
        </Typography>
    </Box>
)

const roundedCommaNumber = (number: number) => commaNumber(Math.round(number))