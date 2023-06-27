import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { TextField, Button, Typography } from '@mui/material';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  };

  return (
    <form onSubmit={login} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', mt: 4 }}>
      <Typography variant="h2" sx={{ mb: 4 }}>
        Login
      </Typography>
      {errors.loginMessage && (
        <Typography variant="h3" color="error" sx={{ mb: 2 }}>
          {errors.loginMessage}
        </Typography>
      )}
      <div>
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
          sx={{ mb: 2 }}
        />
      </div>
      <div>
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
          sx={{ mb: 2 }}
        />
      </div>
      <div>
        <Button variant="contained" color="primary" type="submit">
          Log In
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
