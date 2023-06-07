import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { styled, alpha } from '@mui/material/styles';

const MyAppBar = styled(AppBar)({
    backgroundColor: '#f2f2f2',
    color: '#1d9a1d',
});
export default function HeaderRegister() {
    return (
        <div>
            <MyAppBar position="static">
                <Toolbar align="center">
                    <Button href="/">
                        <HomeRoundedIcon sx={{ color: '#1d9a1d' }} fontSize="large" />
                    </Button>
                    <Typography ml={2} variant="h5" sx={{ flexGrow: 1 }} align="left">
                        BABY BUDDIES
                    </Typography>
                    <Button href="/login" color="inherit">
                        Login
                    </Button>
                    <Button href="/signup" color="inherit">
                        Signup
                    </Button>
                </Toolbar>
            </MyAppBar>
        </div>
    );
}
