import React from "react";
import { Typography, Switch, FormControlLabel, Box, Grid } from "@mui/material";

function Settings() {
  const [notifications, setNotifications] = React.useState({
    email: true,
    sms: false,
    push: true,
  });

  const handleChange = (event) => {
    setNotifications({ ...notifications, [event.target.name]: event.target.checked });
  };

  return (
    <Box>
      <Typography variant="h4" component="div" gutterBottom>
        Application Settings
      </Typography>

      <Typography variant="h6" component="div" gutterBottom>
        Notification Preferences
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={notifications.email}
                onChange={handleChange}
                name="email"
              />
            }
            label="Email Notifications"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={notifications.sms}
                onChange={handleChange}
                name="sms"
              />
            }
            label="SMS Notifications"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={notifications.push}
                onChange={handleChange}
                name="push"
              />
            }
            label="Push Notifications"
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Settings;

