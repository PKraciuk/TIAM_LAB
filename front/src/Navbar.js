// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Navbar({ isLoggedIn, onLogout }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenu}>
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose} component={Link} to="/">Home</MenuItem>
                    <MenuItem onClick={handleClose} component={Link} to="/data">Data</MenuItem>
                    <MenuItem onClick={handleClose} component={Link} to="/bootstrap">Bootstrap</MenuItem>
                </Menu>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    My App
                </Typography>
                <Box>
                    {!isLoggedIn && <Button color="inherit" component={Link} to="/login">Login</Button>}
                    {!isLoggedIn && <Button color="inherit" component={Link} to="/register">Register</Button>}
                    {isLoggedIn && <Button color="inherit" onClick={onLogout}>Logout</Button>}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
