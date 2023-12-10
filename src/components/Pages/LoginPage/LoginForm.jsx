import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, TextField, Button, Typography, Link, InputAdornment } from '@mui/material';
import { AccountBox, EncahncedEncryption, EnhancedEncryption } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import Icon from './bearcircleicon-removebg-preview.png';
import './LoginPage.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => { // Function to handle logging a user in // 
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: { // Sending the username and password as the payload // 
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' }); // Error catch for handling any login errors // 
    }
  };

  return (
    <Container sx={{ height: 'auto', width: '420px' }}>
      <img src={Icon} alt="Bear Icon" style={{ width: '125px', height: '125px', margin: 'auto', display: 'block' }} />

      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '10px' }}>Login to your account</Typography>
      {errors.loginMessage && (
        <Typography variant="body1" color="error" sx={{ textAlign: 'center' }}>
          {errors.loginMessage}
        </Typography>
      )}
      <Typography
        variant="body1"
        sx={{ textAlign: 'center' }}
      >
        Don't have an account?{' '}
        <Link component={RouterLink} to='/register'>
          Register
        </Link>
      </Typography>
      <TextField
        label="Username"
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        margin="normal"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountBox />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        margin="normal"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EnhancedEncryption />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
      <Button
        variant="outlined"
        onClick={login}
        disableElevation
        sx={{
          marginTop: 2,
          width: '100%',
          backgroundColor: '#0F3057',
          color: '#E0E0E0',
          padding: '7px 0',
          fontSize: '17px',
          borderRadius: '8px',
          textTransform: 'none',
          border: '1px solid #305F72',
          '&:hover': {
            backgroundColor: '#1C415C',
          },
        }}
      >
        Login
      </Button>
      <Typography
        variant="subtitle2"
        display={'block'}
        sx={{
          textAlign: 'center',
          marginTop: '25px', // Adjust this to position it halfway between the Register button and the Terms of Service text
        }}
      >
        Having trouble logging in?{' '}
        <Link
          href="mailto:travismack47@protonmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact us
        </Link>
      </Typography>

      <Typography
        variant="caption"
        display={'block'}
        gutterBottom
        sx={{
          textAlign: 'center',
          marginTop: '25px', // Adjust this to position it halfway between the Register button and the Terms of Service text
        }}
      >
        By registering, you acknowledge and agree to comply with the{' '}
        <Link component={RouterLink} to='/terms-of-service'>
          Terms of Service
        </Link>
      </Typography>
    </Container>
  );
}

export default LoginForm;
