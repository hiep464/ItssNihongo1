import * as React from 'react';

import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GradeIcon from '@mui/icons-material/Grade';

const cards = [1, 2, 3, 4, 5, 6, 7, 8];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function ListNanny() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                            List Nanny
                        </Typography>

                        {/* <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack> */}
                    </Container>
                </Box>

                <Container sx={{ py: 8 }} maxWidth="lg">
                    {/* End hero unit */}
                    <Grid container spacing={10}>
                        {cards.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={3}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <CardMedia
                                        component="div"
                                        sx={{
                                            // 16:9
                                            pt: '56.25%',
                                        }}
                                        image="https://source.unsplash.com/random?wallpapers"
                                    />
                                    <CardContent sx={{ flexGrow: 1, textAlign: 'left' }}>
                                        <Typography gutterBottom variant="h5" component="h2" sx={{ display: 'flex' }}>
                                            <Typography>Lan , </Typography>
                                            <Typography sx={{ ml: '5px' }}>25</Typography>
                                            <Typography sx={{ ml: '100px', display: 'flex' }}>
                                                <Typography>5</Typography>
                                                <GradeIcon />
                                            </Typography>
                                        </Typography>
                                        <Typography>Morderate</Typography>
                                        <Typography>Đống đa, Hà Nội</Typography>
                                        <Typography>500,000 VND/30mins</Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button href="/login" size="small">
                                            View
                                        </Button>
                                        {/* <Button size="small">Edit</Button> */}
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </ThemeProvider>
    );
}
