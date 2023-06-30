import React from 'react';
import RegisterForm from './RegisterForm';
import { useHistory } from 'react-router-dom';
import { Container, Button, Box } from '@mui/material';
import './RegisterPage.css';

function RegisterPage() {
  const history = useHistory();

  return (
    <div className="register-page">
      <div className="background-image" />
      <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', 
      justifyContent: 'flex-start', height: '100vh' }}>
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255 )',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.3)',
            marginTop: '150px'
          }}
        >
          <RegisterForm />
          <Button
            variant="text"
            color="primary"
            onClick={() => {
              history.push('/login');
            }}
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Box>
      </Container>
    </div>
  );
}

export default RegisterPage;
