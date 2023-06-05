import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

export default function HeaderRegister() {
    return (
        <div>
            <AppBar position="static">
                <Toolbar align="center">
                    <HomeRoundedIcon fontSize="large" />
                    <Typography ml={2} variant="h5" sx={{ flexGrow: 1 }} align="left">
                        App
                    </Typography>
                    <Button href="/login" color="inherit">
                        Login
                    </Button>
                    <Button color="inherit">Signup</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
