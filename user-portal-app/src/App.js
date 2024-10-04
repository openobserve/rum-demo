import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography, Container, Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import { openobserveRum } from "@openobserve/browser-rum";
import { openobserveLogs } from "@openobserve/browser-logs";

function App() {
  const [open, setOpen] = useState(false);

  // Toggle sidebar drawer
  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  // OpenObserve RUM and Logs initialization
  useEffect(() => {
    const options = {
      clientToken: '',
      applicationId: 'web-application-id',
      site: 'localhost:5080',
      service: 'my-web-application',
      env: 'production',
      version: '0.0.1',
      organizationIdentifier: 'default',
      insecureHTTP: true,
      apiVersion: 'v1',
    };

    // Initialize RUM
    openobserveRum.init({
      applicationId: options.applicationId,
      clientToken: options.clientToken,
      site: options.site,
      organizationIdentifier: options.organizationIdentifier,
      service: options.service,
      env: options.env,
      version: options.version,
      trackResources: true,
      trackLongTasks: true,
      trackUserInteractions: true,
      apiVersion: options.apiVersion,
      insecureHTTP: options.insecureHTTP,
      defaultPrivacyLevel: 'allow'
    });

    // Initialize Logs
    openobserveLogs.init({
      clientToken: options.clientToken,
      site: options.site,
      organizationIdentifier: options.organizationIdentifier,
      service: options.service,
      env: options.env,
      version: options.version,
      forwardErrorsToLogs: true,
      insecureHTTP: options.insecureHTTP,
      apiVersion: options.apiVersion,
    });

    // Set user context for RUM
    openobserveRum.setUser({
      id: "1",
      name: "Captain Hook",
      email: "captainhook@example.com",
    });

    // Start session replay recording
    openobserveRum.startSessionReplayRecording();

  }, []);

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            User Portal
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <List>
          <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/profile" onClick={toggleDrawer(false)}>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button component={Link} to="/settings" onClick={toggleDrawer(false)}>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Container>
        <Box my={4}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Box>
      </Container>
    </Router>
  );
}

export default App;

