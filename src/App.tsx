import React from 'react';
import { useNavigate } from "react-router-dom";

import {Box, Container } from '@mui/material';
import Button from '@mui/material-next/Button';
import CalculateIcon from '@mui/icons-material/Calculate';
import Sections from './Components/Sections';
import { Title } from './Components/Titles/Title';
import { RootState, store } from './store';


const checkIsIncomeInserted = (state: RootState) => {
    const isIncomeGreaterThanZero = Object.values(state.income.members).some(income => income > 0);
    return Object.keys(state.income.members).length > 0 && isIncomeGreaterThanZero;
}

function App() {
  const navigate = useNavigate();
  const [isCalculationButtonEnabled, setIsCalculationButtonEnabled] = 
    React.useState<boolean>(checkIsIncomeInserted(store.getState()));

  store.subscribe(() => {
    const newState = store.getState();
    setIsCalculationButtonEnabled(checkIsIncomeInserted(newState));
  })

  return (
    <Container maxWidth="xl" sx={{ bgcolor: '#98caf3', display: 'block', padding: '50px', height: '100vh' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Title title='קיבוץ מעברות'/>
        <Title title='חישוב תקציב לאחר השינוי'/>
      </Box>
      <Sections />
      <Box sx={{display: 'flex', justifyContent: 'center', padding: '20px'}}>
        <div onClick={() => isCalculationButtonEnabled && navigate('/results')}>
          <Button variant='filled' color="primary" size='large' startIcon={<CalculateIcon />} disabled={!isCalculationButtonEnabled}>
            חשב יתרה חודשית
          </Button>
        </div>
      </Box>
      </Container>
  );
}

export default App;
