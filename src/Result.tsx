import * as React from 'react';
import { useNavigate } from "react-router-dom";
import Confetti from 'react-confetti';
import {Box, Container } from '@mui/material';
import Button from '@mui/material-next/Button';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Title } from './Components/Titles/Title';
import { ResultsBreakdown } from './Components/ResultsBreakdown/ResultsBreakdown';


export const Result = () => {
    const navigate = useNavigate();
    const [celebrateTime, setCelebrateTime] = React.useState<number>(0);
    const timer = setInterval(() => {
      setCelebrateTime(prevCelebrateTime => {
        if (prevCelebrateTime === 10) {
          clearInterval(timer as NodeJS.Timer)
          return prevCelebrateTime;
        }

        return prevCelebrateTime + 1;
      });
    }, 1000); 

    return (
        <Container maxWidth="xl" sx={{ bgcolor: '#98caf3', display: 'block', padding: '50px', height: '100vh' }}>
            <Confetti opacity={1 - celebrateTime * 0.1 } numberOfPieces={1000} gravity={0.1}/>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Title title='פירוט הכנסה חודשית'/>
                <ResultsBreakdown />
                <Box sx={{display: 'flex', justifyContent: 'center', padding: '20px'}}>
                    <div onClick={() => navigate('/')}>
                    <Button variant='filled' color='tertiary' size='large' startIcon={<KeyboardBackspaceIcon />}>
                        חזור למילוי פרטים
                    </Button>
                    </div>
                </Box>
            </Box>
        </Container>
    );
}

