import React from 'react';
import LoginForm from './LoginForm';
import { useHistory } from 'react-router-dom';
import { Container, Button, Typography } from '@mui/material';

function LoginPage() {
  const history = useHistory();

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <LoginForm />
      <Button
        variant="text"
        color="primary"
        onClick={() => {
          history.push('/registration');
        }}
        sx={{ mt: 2 }}
      >
        Register
      </Button>
    </Container>
  );
}

export default LoginPage;
