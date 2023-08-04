import React from 'react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { Button, Typography, Paper, Dialog, DialogTitle, DialogContent } from '@mui/material';
import './LandingPage.css';

function LandingPage() {
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };
  

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
          <Button variant='contained' onClick={onLogin} id='login-btn'>
            Login
          </Button>
          <Button variant='contained' onClick={onRegister} id='register-btn'>
            Register
          </Button>
          <Button variant='text' onClick={openDialog} id='about-btn' className='about-button'>
          About
        </Button>
        <Dialog open={open} onClose={closeDialog}>
          <DialogTitle align='center'>About Tarkov Tracker</DialogTitle>
          <DialogContent>
            <Typography variant='body1' gutterBottom>
              Tarkov Tracker is a minimalistic app that is used to track users' quest progress related to the FPS game Escape
              From Tarkov available to play on PC. This app is able to track and store multiple users' quest progress as well as 
              any notes that they leave on the notes page. The "Traders" dropdown menu has a list of the 7 in-game traders with 
              links to their page and table of quests. Users can mark finished quests as "Complete" on these pages and have their
              progress stored in a database for later access if they ever sign out.
            </Typography>
          </DialogContent>
        </Dialog>
        </Paper>
      </div>
    </div>
  );
}

export default LandingPage;
