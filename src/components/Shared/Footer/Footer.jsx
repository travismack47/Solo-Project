import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: '#f2f2f2',
        padding: '10px',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Typography variant="subtitle1">Tarkov Tracker</Typography>
      <Typography variant="subtitle1">©️Travis Mack</Typography>
      <div>
        <Link href="https://github.com/travismack47" target="_blank" rel="noopener" color="inherit">
          <GitHubIcon sx={{ mr: 2 }} />
        </Link>
        <Link href="https://www.linkedin.com/in/travismack47/" target="_blank" rel="noopener" color="inherit">
          <LinkedInIcon />
        </Link>
      </div>
    </Box>
  );
}

export default Footer;
