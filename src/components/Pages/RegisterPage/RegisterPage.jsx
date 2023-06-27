import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Button } from '@mui/material';
import RegisterForm from './RegisterForm';

function RegisterPage() {
  const history = useHistory();

  return (
    <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <RegisterForm />

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
    </Container>
  );
}

export default RegisterPage;
