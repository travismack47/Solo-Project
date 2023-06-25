import React from "react";
import { Grid, Typography, List, ListItem, ListItemText, Paper } from "@mui/material";

const AboutPage = () => {
  const items = [
    "JavaScript",
    "HTML",
    "CSS",
    "React",
    "Node.js",
    "Express.js",
    "SQL",
    "Material-UI",
    "Redux",
    "fly.io",
    "PostgresQL",
    "Postman",
  ];

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={8} lg={6}>
        <Paper elevation={3} sx={{ padding: "24px" }}>
          <Typography variant="h4" align="center" gutterBottom>
            Languages/Programs/Packages/Libraries Used:
          </Typography>
          <List sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {items.map((item, index) => (
              <ListItem key={index}>
                <ListItemText primary={item} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AboutPage;
