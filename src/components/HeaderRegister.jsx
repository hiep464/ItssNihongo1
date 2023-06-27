import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import Button from '@mui/material/Button';

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
                        <Avatar alt="Avatar" src={AvatarImg} />
                    </Button>

                    <Box>
                        <Button
                            href="/login"
                            variant="contained"
                            color="success"
                            sx={{ marginRight: 5, paddingLeft: 5, paddingRight: 5 }}
                        >
                            Login
                        </Button>
                        <Button
                            href="/signup"
                            variant="outlined"
                            color="inherit"
                            sx={{ paddingLeft: 5, paddingRight: 5 }}
                        >
                            Signup
                        </Button>
                    </Box>
                </Toolbar>
            </MyAppBar>
        </div>
    );
}
