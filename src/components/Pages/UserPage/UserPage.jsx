import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button, styled, ButtonBase } from '@mui/material';
import { useDispatch } from 'react-redux';
import './UserPage.css';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function UserPage() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const StyledButton = styled(ButtonBase)(({ theme }) => ({
    padding: '10px 20px',
    margin: '10px',
    borderRadius: '10px',
    fontWeight: 'bold',
    fontSize: '13px',
    transition: 'all 0.3s ease',
    border: '2px solid transparent',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
      borderColor: 'transparent',
    },
  }));

  const LogOutButton = styled(StyledButton)({
    color: '#e63946',  // Deep coral red
    borderColor: '#e63946',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: '#e63946',
      color: '#fff',
    },
  });
  
  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f50000',
      cancelButtonColor: '#0021f5',
      confirmButtonText: 'Yes, log out!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Logged out',
          'You have been successfully logged out',
          'success'
        ).then(() => {
          dispatch({ type: 'LOGOUT' });
          history.push('/');
        });
      }
    });
  };

  return (
    <div className='login-page'>
      <div className='background-image2' />
      <div className="container"> 
        <Typography variant="h2" gutterBottom color={'white'}>
          Welcome, {user.username}!
        </Typography>
      <LogOutButton onClick={handleLogout}>
        Log Out
      </LogOutButton>
      </div>
    </div>
  );
}

export default UserPage;
