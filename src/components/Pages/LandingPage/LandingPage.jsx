import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Typography } from '@mui/material'; // Import Material-UI components
import './LandingPage.css';

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterPage/RegisterForm';

function LandingPage() {
  const history = useHistory();

  const onLogin = () => {
    history.push('/login');
  };

  return (
    <div className='landing-page'>
      <div className='background-image3' />
    </div>
  )

}

export default LandingPage;
