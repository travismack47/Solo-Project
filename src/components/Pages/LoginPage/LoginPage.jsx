import React from 'react';
import LoginForm from './LoginForm';
import { useHistory } from 'react-router-dom';
import { Container, Button, Box } from '@mui/material';
import './LoginPage.css';

function LoginPage() {
  const history = useHistory();

  return (
    <div className="login-page">
      <div className="background-imagelogin" />
      <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', 
      justifyContent: 'flex-start', height: '100vh' }}>
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255 )',
            padding: '20px',
            borderRadius: '20px',
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.3)',
            marginTop: '120px',
            width: 'auto',
          }}
        >
          <LoginForm />
        </Box>
      </Container>
    </div>
  );
}

export default LoginPage;
