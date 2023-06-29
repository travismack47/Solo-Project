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
      <Typography variant="h6" className="register-form-title">
        Register User
      </Typography>
      {errors.registrationMessage && (
        <Typography variant="h3" color="error" className="register-form-error">
          {errors.registrationMessage}
        </Typography>
      )}
      <div>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          required
          onChange={(event) => setUsername(event.target.value)}
          fullWidth
          margin="normal"
        />
      </div>
      <div>
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          required
          onChange={(event) => setPassword(event.target.value)}
          fullWidth
          margin="normal"
        />
      </div>
      <div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Register
        </Button>
      </div>
      <div className="register-form-login-link">
        <Typography variant="h6">Already a member?</Typography>
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
    </form>
  );
}

export default RegisterForm;
