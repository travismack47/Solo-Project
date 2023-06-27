import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, TextField, Button, Typography } from '@mui/material';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        borderRadius: '10px',
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.3)',
      }}
      component="form"
      onSubmit={registerUser}
    >
      <Typography variant="h6">Register User</Typography>
      {errors.registrationMessage && (
        <Typography
          sx={{
            color: 'red',
          }}
          role="alert"
        >
          {errors.registrationMessage}
        </Typography>
      )}
      <div>
        <TextField
          style={{
            marginTop: '10px',
            width: '100%',
          }}
          label="Username"
          variant="outlined"
          value={username}
          required
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        <TextField
          style={{
            marginTop: '10px',
            width: '100%',
          }}
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          required
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <Button
          style={{
            marginTop: '10px',
            padding: '8px 16px',
            borderRadius: '5px',
          }}
          type="submit"
          variant="contained"
          color="primary"
        >
          Register
        </Button>
        <h3>Already a member?</h3>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          history.push('/login');
        }}
        sx={{ marginTop: '10px' }}
      >
        Login
      </Button>
      </div>
    </Box>
  );
}

export default RegisterForm;
