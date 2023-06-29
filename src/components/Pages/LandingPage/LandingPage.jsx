import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Typography, Paper } from '@mui/material';
import './LandingPage.css';

function LandingPage() {
  const history = useHistory();

  const onLogin = () => {
    history.push('/login');
  };

  const onRegister = () => {
    history.push('/registration');
  };

  return (
    <div className='background-image3'>
      <div className='landing-page'>
        <Paper elevation={3} className='paper-container'>
          <Typography variant='h5' gutterBottom>
            Welcome to Tarkov Tracker! Please login or register a new account!
          </Typography>
          <Button variant='contained' color='primary' onClick={onLogin} sx={{ mr: '10px', width: 100 }}>
            Login
          </Button>
          <Button variant='contained' color='secondary' onClick={onRegister} sx={{ mr: '10px', width: 100 }}>
            Register
          </Button>
        </Paper>
      </div>
    </div>
  );
}

export default LandingPage;
