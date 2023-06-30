import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography } from '@mui/material';
import { useHistory } from 'react-router-dom';
import './RegisterPage.css';
 
function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();

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
    <form className="register-form" onSubmit={registerUser}>
      <Typography variant="h6" className="login-form-title">
        Register
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
        <Button variant="contained" color="primary" type="submit" id='register-btn'>
          Register
        </Button>
      </div>
    </form>
  );
}

export default RegisterForm;
