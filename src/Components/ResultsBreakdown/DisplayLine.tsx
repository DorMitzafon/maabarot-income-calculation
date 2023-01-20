import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import commaNumber from 'comma-number';

interface DisplayLineProps {
    title: string
    number: number
}

export const DisplayLine = (props: DisplayLineProps) => {
    const { title, number } = props
    return (
        <>
            <Box key={number} sx={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
                    <Typography variant='body1' sx={{fontWeight: 'bold'}}>{`${title}:`}</Typography>
                    <Typography>{commaNumber(number)}</Typography>
            </Box>
        </>
    )
}