import React from 'react';
import LoginForm from './LoginForm';
import { useHistory } from 'react-router-dom';
import { Container, Button, Box } from '@mui/material';
import './LoginPage.css';

function LoginPage() {
  const history = useHistory();

  return (
    <div className="login-page">
      <div className="background-image" />
      <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.3)',
          }}
        >
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
        </Box>
      </Container>
    </div>
  );
}

export default LoginPage;
