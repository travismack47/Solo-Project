import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import { Typography, Box, AppBar, Toolbar, Button, Modal, Menu, MenuItem } from '@mui/material'; // Importing MaterialUI components
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

function Nav() {
  const user = useSelector((store) => store.user);
  const [isOpen, setIsOpen] = useState(false); // State for controlling the Modal open/close //
  const [anchorEl, setAnchorEl] = useState(null); // State for the anchor element of the menu //
  const dispatch = useDispatch();

  const handleOpen = (event) => { // Handles the opening of the dropdown menu //
    setIsOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => { // Handles closing of the Modal dropdown // 
    setIsOpen(false);
    setAnchorEl(null);
  };

  const handleMenuItemClick = () => { // Closes the Modal dropdown when a Trader is clicked //
    handleClose();
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/home" style={{ textDecoration: 'none', color: 'inherit' }}>
            Tarkov Quest Tracker
          </Link>
        </Typography>
        <Box>
          {/* If no user is logged in, show login/register button */}
          {!user.id && (
            <Button color="inherit" component={Link} to="/login">
              Login / Register
            </Button>
          )}
          {/* If a user is logged in, show these links */}
          {user.id && (
            <>
              <Button color="inherit" component={Link} to="/user">
                Home
              </Button>
              <Button color="inherit" onClick={handleOpen}>
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
                  <MenuItem component={Link} to="/prapor" onClick={handleMenuItemClick}>
                    Prapor
                  </MenuItem>
                  <MenuItem component={Link} to="/therapist" onClick={handleMenuItemClick}>
                    Therapist
                  </MenuItem>
                  <MenuItem component={Link} to="/peacekeeper" onClick={handleMenuItemClick}>
                    Peacekeeper
                  </MenuItem>
                  <MenuItem component={Link} to="/jaeger" onClick={handleMenuItemClick}>
                    Jaeger
                  </MenuItem>
                  <MenuItem component={Link} to="/skier" onClick={handleMenuItemClick}>
                    Skier
                  </MenuItem>
                  <MenuItem component={Link} to="/mechanic" onClick={handleMenuItemClick}>
                    Mechanic
                  </MenuItem>
                  <MenuItem component={Link} to="/ragman" onClick={handleMenuItemClick}>
                    Ragman
                  </MenuItem>
                </Menu>
              </Modal>
              <Button color="inherit" component={Link} to="/notes">
                Notes
              </Button>
            </>
          )}
          {/* Common link for all users */}
          <Button color="inherit" component={Link} to="/about">
            About
          </Button>
          {/* If a user is logged in, show the logout button */}
          {user.id && <Button color="inherit" onClick={handleLogout} component={Link} to="/login">
            Log Out
          </Button>
          }
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Nav;
