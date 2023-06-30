import React from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import './UserPage.css';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function UserPage() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();
  
  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Logged out',
          'You have been successfully logged out',
          'success'
        ).then(() => {
          dispatch({ type: 'LOGOUT' });
          history.push('/login');
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
        <Button variant="contained" color="primary" onClick={handleLogout} type='logout' id='logout-btn'>
          Log Out
        </Button>
      </div>
    </div>
  );
}

export default UserPage;
