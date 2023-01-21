import * as React from 'react';
import Confetti from 'react-confetti';
import {Box, Container } from '@mui/material';
import Button from '@mui/material-next/Button';
import CalculateIcon from '@mui/icons-material/Calculate';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Sections from './Components/Sections';
import { Title } from './Components/Titles/Title';
import { ResultsBreakdown } from './Components/ResultsBreakdown/ResultsBreakdown';


function App() {
  let timer: NodeJS.Timer | boolean;
  const [shouldCalculateBudget, setShouldCalculateBudget] = React.useState<boolean>(false);
  const [celebrateTime, setCelebrateTime] = React.useState<number>(0);
  const calculateBudget = () => {
    setCelebrateTime(0);
    setShouldCalculateBudget(true);
    timer = !timer && setInterval(() => {
      
      setCelebrateTime(prevCelebrateTime => {
        if (prevCelebrateTime === 10) {
          clearInterval(timer as NodeJS.Timer)
          return prevCelebrateTime;
        }

        return prevCelebrateTime + 1;
      });
    }, 1000); 
  }

  return (
    <Container maxWidth="xl" sx={{ bgcolor: '#98caf3', display: 'block', padding: '50px', height: '100vh' }}>
      {!shouldCalculateBudget ? 
        <>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Title title='קיבוץ מעברות'/>
            <Title title='חישוב תקציב לאחר השינוי'/>
          </Box>
          <Sections />
          <Box sx={{display: 'flex', justifyContent: 'center', padding: '20px'}}>
            <div onClick={calculateBudget}>
              <Button variant='filled' color="primary" size='large' startIcon={<CalculateIcon />}>
                חשב יתרה חודשית
              </Button>
            </div>
          </Box>
        </>
        :
        <>
          <Confetti opacity={1 - celebrateTime * 0.1 } numberOfPieces={1000} gravity={0.1}/>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Title title='פירוט הכנסה חודשית'/>
            <ResultsBreakdown />
            <Box sx={{display: 'flex', justifyContent: 'center', padding: '20px'}}>
              <div onClick={() => setShouldCalculateBudget(false)}>
                <Button variant='filled' color='tertiary' size='large' startIcon={<KeyboardBackspaceIcon />}>
                  חזור למילוי פרטים
                </Button>
              </div>
            </Box>
          </Box>
        </>
      } 
      </Container>
  );
}

export default App;
