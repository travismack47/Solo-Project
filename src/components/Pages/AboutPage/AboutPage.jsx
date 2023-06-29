import React from "react";
import {
  Grid,
  Typography,
  Paper,
  Link,
} from "@mui/material";
import './AboutPage.css';

const AboutPage = () => {
  return (
    <Grid container justifyContent="center" spacing={2} sx={{ marginTop: "98px" }}>
      {/* Grid item for the logos */}
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: "10px", textAlign: "center", backgroundColor: "darkgray" }}>
          <Typography variant="h4" gutterBottom>
            Powered by:
          </Typography>
          <div className="logo-grid"> {/* Add a div for the logo grid */}
            <div className="logo-item">
              <a href="http://www.javascript.com">
                <img src={'./images/javascriptlogo.png'} alt="JavaScript Logo" className="logo-image"/>
              </a>
            </div>
            <div className="logo-item">
              <a href="https://react.dev/">
                <img src={'./images/reactlogo.png'} alt="React Logo" className="logo-image" />
              </a>
            </div>
            <div className="logo-item">
              <a href="https://redux.js.org/">
                <img src={'./images/reduxlogo.png'} alt="Redux Logo" className="logo-image" />
              </a>
            </div>
            <div className="logo-item">
              <a href="https://mui.com/">
                <img src={'./images/materialUIlogo.png'} alt="MaterialUI Logo" className="logo-image" />
              </a>
            </div>
            <div className="logo-item">
              <a href="https://nodejs.org/en">
                <img src={'./images/nodejslogo.png'} alt="nodeJS Logo" className="logo-image" />
              </a>
            </div>
          </div>
          <Typography variant="h5" align="center" gutterBottom sx={{ mt: 4 }}>
            {/* GitHub link */}
            <Link href="https://github.com/travismack47" target="_blank" rel="noopener">
              GitHub
            </Link>
          </Typography>
          <Typography variant="h5" align="center" gutterBottom sx={{ mt: 4 }}>
            {/* Contact info */}
            Contact info: travismack47@protonmail.com
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AboutPage;
