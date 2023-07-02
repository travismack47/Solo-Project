import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Box, AppBar, Toolbar, Button, Modal, Menu, MenuItem } from '@mui/material'; // Importing MaterialUI components
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import logoImage from './tarkovhelmetcropped.png';

function Nav() {
  const user = useSelector((store) => store.user); // Pulling users list from the store //
  const [isOpen, setIsOpen] = useState(false); // State for controlling the Modal open/close //
  const [anchorEl, setAnchorEl] = useState(null); // State for the anchor element of the menu //
  const dispatch = useDispatch();
  const history = useHistory();

  const handleOpen = (event) => { // Handles the opening of the dropdown menu //
    setIsOpen(true);
    setAnchorEl(event.currentTarget); // Sets the modal dropdown to open up where the Traders button element is located //
  };

  const handleClose = () => { // Handles closing of the Modal dropdown // 
    setIsOpen(false);
    setAnchorEl(null);
  };

  const handleMenuItemClick = () => { // Closes the Modal dropdown when a Trader is clicked //
    handleClose();
  };


  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0021f5',
      cancelButtonColor: '#f50000',
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
    <>
      <AppBar position="sticky" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', 
      paddingLeft: '-10px' }}> {/* Keeps the nav bar located at the top of the page */}
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
              <img src={logoImage} alt="Tarkov Tracker Logo" style={{ width: 'auto', height: '50px', marginLeft: '10px',
            marginTop: '5px' }}/>
            </Link>
          </Typography>
          <Box>
            {/* If no user is logged in, show login/register button */}
            {!user.id && ( 
              <Button color="inherit" component={Link} to="/login" sx={{
                '&:hover': {
                  boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)',
                  transition: 'box-shadow 0.3s ease-in-out',
                },
              }}>
                Login / Register
              </Button>
            )}
            {/* If a user is logged in, show these links */}
            {user.id && (
              <>
                <Button color="inherit" component={Link} to="/user" sx={{
                  '&:hover': {
                    boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)',
                    transition: 'box-shadow 0.3s ease-in-out',
                  },
                }}>
                  Home
                </Button>
                <Button color="inherit" onClick={handleOpen} sx={{
                  '&:hover': {
                    boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)',
                    transition: 'box-shadow 0.3s ease-in-out',
                  },
                }}>
                  Traders
                </Button>
                {/* Modal for the dropdown menu */}
                <Modal open={isOpen} onClose={handleClose}>
                  <Menu
                    anchorEl={anchorEl}
                    open={isOpen} // Handles opening of the menu // 
                    onClose={handleClose} // Handles closing of the menu //
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Origin menu point relative to Traders button //
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  >
                    {/* Menu items for each trader */}
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
                <Button color="inherit" component={Link} to="/notes" sx={{
                  '&:hover': {
                    boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)',
                    transition: 'box-shadow 0.3s ease-in-out',
                  },
                }}>
                  Notes
                </Button>
              </>
            )}
            {/* Common link for all users */}
            <Button color="inherit" component={Link} to="/about"  sx={{
              '&:hover': {
                boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)',
                transition: 'box-shadow 0.3s ease-in-out',
              },
            }}
            >
              About
            </Button>
            {/* If a user is logged in, show the logout button */}
            {user.id && <Button color="inherit" onClick={handleLogout} sx={{
              '&:hover': {
                boxShadow: '0 0 8px rgba(255, 255, 255, 0.5)',
                transition: 'box-shadow 0.3s ease-in-out',
              },
            }}>
              Log Out
            </Button>
            }
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Nav;
