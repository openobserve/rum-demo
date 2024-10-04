import React, { useState } from "react";
import { Typography, TextField, Button, Box, IconButton, InputAdornment, Avatar, Grid } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';

function Profile() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ name: false, email: false });

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    setErrors({ ...errors, name: event.target.value === "" });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors({ ...errors, email: !/\S+@\S+\.\S+/.test(event.target.value) });
  };

  const handleSubmit = () => {
    if (name === "" || !/\S+@\S+\.\S+/.test(email)) {
      setErrors({ name: name === "", email: !/\S+@\S+\.\S+/.test(email) });
    } else {
      alert("Profile updated successfully!");
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="div" gutterBottom>
        Profile Settings
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Avatar sx={{ width: 100, height: 100 }}>
            <PersonIcon style={{ fontSize: 50 }} />
          </Avatar>
        </Grid>
        <Grid item xs={9}>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={handleNameChange}
            error={errors.name}
            helperText={errors.name && "Name is required"}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={handleEmailChange}
            error={errors.email}
            helperText={errors.email && "Enter a valid email"}
          />
        </Grid>
      </Grid>

      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        margin="normal"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={handlePasswordChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Save Changes
      </Button>
    </Box>
  );
}

export default Profile;

