import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import { styled, alpha } from '@mui/material/styles';
import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import AvatarImg from './img/avatar.png';

const MyAppBar = styled(AppBar)({
    backgroundColor: '#f2f2f2',
    color: '#1d9a1d',
});
export default function HeaderRegister() {
    return (
        <div>
            <MyAppBar position="static">
                <Toolbar align="center" sx={{ justifyContent: 'space-between' }}>
                    <Button href="/">
                        <Avatar alt="Avatar" src="./img/avatar.png" />
                    </Button>

                    <Box>
                        <Button href="/login" color="inherit">
                            Login
                        </Button>
                        <Button href="/signup" color="inherit">
                            Signup
                        </Button>
                    </Box>
                </Toolbar>
            </MyAppBar>
        </div>
    );
}
