import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { TextField, Button, Typography, styled } from '@mui/material';
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

  const StyledLoginButton = styled(Button)(({ theme }) => ({
    color: '#00ccf4',
    backgroundColor: 'transparent',
    padding: '6px 12px',
    fontSize: '0.875rem',
    fontWeight: 500,
    border: '2px solid transparent',
    borderRadius: '4px',
    transition: 'border-color 0.3s ease',
  
    '&:hover': {
      borderColor: '#000',
    },
  }));

  return (
    <form className="login-form" onSubmit={login}>
      <Typography variant="h6" className="login-form-title">
        Login
      </Typography>
      {errors.loginMessage && (
        <Typography variant="h3" color="error" className="login-form-error">
          {errors.loginMessage}
        </Typography>
      )}
      <div className="login-form-container">
        <TextField
          label="Username"
          type="text"
          name="username"
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          variant="outlined"
          size="medium"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          variant="outlined"
          size="medium"
          fullWidth
          margin="normal"
        />
      <StyledLoginButton type='submit'>
        Login
      </StyledLoginButton>  
      </div>
    </form>
  );
}

export default LoginForm;
