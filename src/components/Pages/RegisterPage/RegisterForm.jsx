import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, TextField, Button, Typography, Link, InputAdornment } from '@mui/material';
import { AccountBox, Email, EnhancedEncryption } from '@mui/icons-material';
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
    <Container sx={{ height: '670px', width: '420px', }}>
      <img src={Icon} alt="Bear Icon" style={{ width: '125px', height: '125px', margin: 'auto', display: 'block' }} />
      <Typography variant="h4" sx={{ textAlign: 'center', marginBottom: '10px', }}>Register your account</Typography>
      <Typography
        variant="body1"
        sx={{ textAlign: 'center' }}
      >
        Already have an account?{' '}
        <Link component={RouterLink} to='/login'>
          Login
        </Link>
      </Typography>
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email />
            </InputAdornment>
          ),
        }}
        variant="standard" />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        margin="normal"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EnhancedEncryption />
            </InputAdornment>
          ),
        }}
        variant="standard" />
      <TextField
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        margin="normal"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EnhancedEncryption />
            </InputAdornment>
          ),
        }}
        variant="standard" />
      <Button
        variant="outlined"
        onClick={registerUser}
        disableElevation
        sx={{
          marginTop: 2,
          width: '100%',
          backgroundColor: '#0F3057', // A medium shade between your gradient colors
          color: '#E0E0E0', // Light grey for text, ensures readability
          padding: '7px 0',
          fontSize: '17px',
          borderRadius: '8px',
          textTransform: 'none',
          border: '1px solid #305F72', // A border color that's a mix of your gradient colors
          '&:hover': {
            backgroundColor: '#1C415C', // A slightly darker shade for hover
          },
        }}
      >
        Register
      </Button>
      <Typography
        variant="subtitle2"
        display={'block'}
        sx={{
          textAlign: 'center',
          marginTop: '25px', // Adjust this to position it halfway between the Register button and the Terms of Service text
        }}
      >
        Having trouble registering?{' '}
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

export default RegisterForm;
