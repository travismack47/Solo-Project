import React from "react";
import {Grid, Typography, Paper, } from "@mui/material";
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="background-imageabout">
    <div id="about-page">
    <Grid container justifyContent="center" spacing={2} sx={{ marginTop: "120px", padding: '50px' }}>
      {/* Grid item for the logos */}
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: "10px", textAlign: "center", backgroundColor: 'slategray' }}>
          <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
            Powered by:
          </Typography>
          <div className="logo-grid"> {/* Add a div for the logo grid */}
            <div className="logo-item">
              <a href="http://www.javascript.com" target="_blank" rel="noopener">
                <img src={'./images/javascriptlogo.png'} alt="JavaScript Logo" className="logo-image" />
              </a>
            </div>
            <div className="logo-item">
              <a href="https://react.dev/" target="_blank" rel="noopener">
                <img src={'./images/reactlogo.png'} alt="React Logo" className="logo-image" />
              </a>
            </div>
            <div className="logo-item">
              <a href="https://redux.js.org/" target="_blank" rel="noopener">
                <img src={'./images/reduxlogo.png'} alt="Redux Logo" className="logo-image" />
              </a>
            </div>
            <div className="logo-item">
              <a href="https://mui.com/" target="_blank" rel="noopener">
                <img src={'./images/materialUIlogo.png'} alt="MaterialUI Logo" className="logo-image" />
              </a>
            </div>
            <div className="logo-item">
              <a href="https://nodejs.org/en" target="_blank" rel="noopener">
                <img src={'./images/nodejslogo.png'} alt="nodeJS Logo" className="logo-image" />
              </a>
            </div>
          </div>
          <Typography variant="h5" align="center" gutterBottom sx={{ mt: 4, color: 'white' }}>
            {/* Contact info */}
            Contact: travismack47@protonmail.com
          </Typography>
        </Paper>
      </Grid>
    </Grid>
    </div>
    </div>
  );
};

export default AboutPage;
