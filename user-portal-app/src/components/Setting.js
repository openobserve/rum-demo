import React from "react";
import { Typography, Switch, FormControlLabel, Box } from "@mui/material";

function Settings() {
  return (
    <Box>
      <Typography variant="h4" component="div" gutterBottom>
        Application Settings
      </Typography>
      <FormControlLabel
        control={<Switch color="primary" />}
        label="Enable Notifications"
      />
      <FormControlLabel
        control={<Switch color="primary" />}
        label="Dark Mode"
      />
    </Box>
  );
}

export default Settings;

