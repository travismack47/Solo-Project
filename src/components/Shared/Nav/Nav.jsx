import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, AppBar, Toolbar, Button, Modal, Menu, MenuItem } from '@mui/material';
import { Logout, Info, Group } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import logoImage from './tarkovhelmetcropped.png';

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleOpen = (event) => {
    setIsOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setIsOpen(false);
    setAnchorEl(null);
  };

  const handleMenuItemClick = () => {
    handleClose();
  };

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
    <>
      <AppBar position="fixed" sx={{
        width: '80px',
        height: '100vh',
        flexDirection: 'column',
        backgroundColor: 'rgba(0, 0, 0, 1)',
        left: 0,
      }}>
        <Toolbar sx={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '100%',
          paddingTop: '10px',
          justifyContent: 'space-between',
          height: '100%',
        }}>
          <Box>
            <Link to="/home" style={{ textDecoration: 'none', color: 'inherit', display: 'block', width: '100%', textAlign: 'center' }}>
              <img src={logoImage} alt="Tarkov Tracker Logo" style={{ width: 'auto', height: '50px', marginBottom: '20px' }}/>
            </Link>
          </Box>
          <Box sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginBottom: '20px',
          }}>
            <Button color="inherit" onClick={handleOpen} sx={{
              width: '100%',
              justifyContent: 'flex-start',
              '&:hover': {
                boxShadow: 'inset 0 0 8px rgba(255, 255, 255, 0.5)',
                transition: 'box-shadow 0.3s ease-in-out',
              },
            }}>
              <Group />
            </Button>
            <Modal open={isOpen} onClose={handleClose}>
              <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem component={Link} to="/jaeger" onClick={handleMenuItemClick}>
                  Jaeger
                </MenuItem>
                <MenuItem component={Link} to="/mechanic" onClick={handleMenuItemClick}>
                  Mechanic
                </MenuItem>
                <MenuItem component={Link} to="/peacekeeper" onClick={handleMenuItemClick}>
                  Peacekeeper
                </MenuItem>
                <MenuItem component={Link} to="/prapor" onClick={handleMenuItemClick}>
                  Prapor
                </MenuItem>
                <MenuItem component={Link} to="/ragman" onClick={handleMenuItemClick}>
                  Ragman
                </MenuItem>
                <MenuItem component={Link} to="/skier" onClick={handleMenuItemClick}>
                  Skier
                </MenuItem>
                <MenuItem component={Link} to="/therapist" onClick={handleMenuItemClick}>
                  Therapist
                </MenuItem>
              </Menu>
            </Modal>

            <Button color="inherit" component={Link} to="/about" sx={{
              width: '100%',
              justifyContent: 'flex-start',
              '&:hover': {
                boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)',
                transition: 'box-shadow 0.3s ease-in-out',
              },
            }}>
              <Info />
            </Button>
            <Button color="inherit" onClick={handleLogout} sx={{
              width: '100%',
              justifyContent: 'flex-start',
              '&:hover': {
                boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)',
                transition: 'box-shadow 0.3s ease-in-out',
              },
            }}>
              <Logout />
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Nav;
