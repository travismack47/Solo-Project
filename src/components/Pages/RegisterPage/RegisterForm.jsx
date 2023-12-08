import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, TextField, Button, Typography, Link } from '@mui/material';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import Icon from './bearcircleicon-removebg-preview.png'
import './RegisterPage.css';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // State for password
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username,
        email,
        password,
        confirmPassword: password,
      },
    });
  };

  return (
    <Container sx={{ height: '610px', width: '400px'}}>
      <img src={Icon} alt="Bear Icon" style={{ width: '125px', height: '125px', margin: 'auto', display: 'block' }} />
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '20px', fontWeight: 'bold'  }}>Account Registration</Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', marginBottom: '20px' }}>Already have an account? <Link component={RouterLink} to='/login'>
      Login
      </Link>
      </Typography>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        margin="normal"
        fullWidth
        variant='standard'
      />
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        fullWidth
        variant='standard'
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        fullWidth
        variant='standard'
      />
      <TextField
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        margin="normal"
        fullWidth
        variant='standard'
      />
      <Button 
  variant="contained" 
  onClick={registerUser}
  sx={{
    marginTop: 3,
    width: '100%',
    backgroundColor: '#1976d2', // Example blue color
    color: 'white',
    padding: '10px 0',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '8px',
    boxShadow: '0px 3px 5px 2px rgba(0, 0, 0, 0.2)',
    '&:hover': {
      backgroundColor: '#1565c0', // Slightly darker shade for hover
      boxShadow: '0px 5px 7px 3px rgba(0, 0, 0, 0.3)',
    },
  }}
>
  Register
</Button>
    </Container>
  );
}

export default RegisterForm;
