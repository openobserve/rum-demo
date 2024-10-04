import React from "react";
import { Typography, Card, CardContent, Grid, List, ListItem, ListItemText } from "@mui/material";

function Dashboard() {
  const recentActivity = [
    { id: 1, activity: "Logged in from a new device", date: "2024-10-03 10:45 AM" },
    { id: 2, activity: "Updated profile information", date: "2024-10-02 04:15 PM" },
    { id: 3, activity: "Changed password", date: "2024-10-01 11:00 AM" },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Welcome to your Dashboard
            </Typography>
            <Typography>
              Here, you can view recent activity and important metrics.
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              Recent Activity
            </Typography>
            <List>
              {recentActivity.map((item) => (
                <ListItem key={item.id}>
                  <ListItemText
                    primary={item.activity}
                    secondary={item.date}
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Dashboard;

