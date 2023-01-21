import { useNavigate } from "react-router-dom";

import {Box, Container } from '@mui/material';
import Button from '@mui/material-next/Button';
import CalculateIcon from '@mui/icons-material/Calculate';
import Sections from './Components/Sections';
import { Title } from './Components/Titles/Title';


function App() {
  const navigate = useNavigate();
  return (
    <Container maxWidth="xl" sx={{ bgcolor: '#98caf3', display: 'block', padding: '50px', height: '100vh' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Title title='קיבוץ מעברות'/>
        <Title title='חישוב תקציב לאחר השינוי'/>
      </Box>
      <Sections />
      <Box sx={{display: 'flex', justifyContent: 'center', padding: '20px'}}>
        <div onClick={() => navigate('/results')}>
          <Button variant='filled' color="primary" size='large' startIcon={<CalculateIcon />}>
            חשב יתרה חודשית
          </Button>
        </div>
      </Box>
      </Container>
  );
}

export default App;
