import React from 'react';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { Button, Typography, Paper, Dialog, DialogTitle, DialogContent, ButtonBase, styled } from '@mui/material';
import './LandingPage.css';

function LandingPage() {
  const history = useHistory();
  const [open, setOpen] = useState(false);

  const StyledButton = styled(ButtonBase)(({ theme }) => ({ // Overriding Material UI default styling to custom style the buttons // 
    padding: '10px 20px',
    margin: '10px',
    borderRadius: '10px',
    fontWeight: 'bold',
    fontSize: '13px',
    transition: 'all 0.3s ease',
    border: '2px solid transparent',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
      borderColor: 'transparent',
    },
  }));
  
  const LoginButton = styled(StyledButton)({ // Styling the "Login" button // 
    color: '#e63946',  // Deep coral red
    borderColor: '#e63946',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: '#e63946',
      color: '#fff',
    },
  });
  
  const RegisterButton = styled(StyledButton)({ // Styling the "Register" button // 
    color: '#fcbf49',  // Mustard yellow
    borderColor: '#fcbf49',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: '#fcbf49',
      color: '#fff',
    },
  });
  
  const AboutButton = styled(StyledButton)({ // Styling the "About" button // 
    color: '#6b5064',  // Warm plum purple
    borderColor: '#6b5064',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: '#6b5064',
      color: '#fff',
    },
  });
  
  
  
  const openDialog = () => { // Function to open the "About" dialogue // 
    setOpen(true);
  };

  const closeDialog = () => { // Function to close the "About" dialogue // 
    setOpen(false);
  };


  const onLogin = () => { // Function to bring user to login page if login is clicked // 
    history.push('/login');
  };

  const onRegister = () => { // Function to bring user to register page if register is clicked // 
    history.push('/registration');
  };

  return (
    <div className='background-image3'>
      <div className='landing-page'>
        <Paper elevation={3} className='paper-container'>
          <Typography variant='h5' gutterBottom>
            Welcome to Tarkov Tracker! Please login or register a new account!
          </Typography>
          <LoginButton onClick={onLogin}>
            Login
          </LoginButton>
          <RegisterButton onClick={onRegister}>
            Register
          </RegisterButton>
          <AboutButton onClick={openDialog}>
            About
          </AboutButton>
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
