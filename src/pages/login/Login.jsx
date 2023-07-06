import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';

// TODO remove, this demo shouldn't need to reset the theme.

const MyAppBar = styled(Button)({
    backgroundColor: '#1d9a1d',
    color: 'white',
});
const defaultTheme = createTheme();

export default function Login() {
    const [userInfos, setUserInfos] = useState();
    const [userIdError, setUserIdError] = useState(false);

    const accountIds = [
        '647b77348af6c322511fed58',
        '647b77348af6c322511fed59',
        '647b77348af6c322511fed5a',
        '647b77348af6c322511fed5b',
        '647b77348af6c322511fed5c',
        '647b77348af6c322511fed5d',
        '647b77348af6c322511fed5e',
        '647b77348af6c322511fed5f',
        '647b77348af6c322511fed60',
        '647b77348af6c322511fed61',
        '647b77348af6c322511fed62',
        '647b77348af6c322511fed63',
        '647b77348af6c322511fed64',
        '647b77348af6c322511fed65',
        '647b77348af6c322511fed66',
        '647b77348af6c322511fed67',
        '647b77348af6c322511fed68',
        '647b77348af6c322511fed69',
        '647b77348af6c322511fed6a',
        '647b77348af6c322511fed6b',
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(accountIds[data.get('userId') - 1]);
        const newUserId = '/profile/' + accountIds[data.get('userId') - 1];
        const userId = accountIds[data.get('userId') - 1];
        try {
            const response = await axios.get(`https://babybuddies-be-dev.onrender.com/api/v1/accounts/${userId}`);
            console.log(response);
            if (response.data.result) {
                localStorage.setItem('userId', userId);
                localStorage.setItem('isLogin', true);
                window.location.href = newUserId;
            } else {
                setUserIdError(true);
            }
        } catch (error) {
            console.log(error);
            // Xử lý khi userId không hợp lệ, ví dụ hiển thị thông báo lỗi
        }
        // localStorage.setItem('userId', data.get('userId'));
        // localStorage.setItem('isLogin', true);
        // window.location.href = newUserId;
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        {/* <Typography inpography component="h1" variant="h5" color={'#1d9a1d'}>
                            Log In
                        </Typography> */}
                        <Typography component="h1" variant="h5" color={userIdError ? 'red' : '#1d9a1d'}>
                            {userIdError ? 'Uncorrect userId' : 'Log In'}
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="userId"
                                label="Enter userId"
                                name="userId"
                                autoComplete="userId"
                                autoFocus
                            />

                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />

                            <MyAppBar
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, textTransform: 'none', ':hover': { backgroundColor: '#106510' } }}
                            >
                                Log In
                            </MyAppBar>
                        </Box>
                    </Box>
                </Grid>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
            </Grid>
        </ThemeProvider>
    );
}
