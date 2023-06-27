import React from 'react';
import LogOutButton from '../../Shared/LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { Typography, Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <Box
      alignItems="center"
      justifyContent="center"
    >
      <Box textAlign="center">
        {/* Welcome message */}
        <Typography variant="h2" gutterBottom>
          Welcome, {user.username}!
        </Typography>
        {/* User ID */}
        <Typography variant="body1" gutterBottom>
          Your ID is: {user.id}
        </Typography>
        {/* Log out button */}
        <Button variant="contained" color="primary" onClick={handleLogout} type='logout'>
        Log Out
        </Button>
      </Box>
    </Box>
  );
}

// this allows us to use <UserPage /> in other components
export default UserPage;
