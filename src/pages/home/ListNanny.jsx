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
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';

const cards = [1, 2, 3, 4, 5, 6, 7, 8];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const marks = [
    {
        value: 100000,
        label: '100,000',
    },
    {
        value: 300000,
        label: '300,000',
    },
    {
        value: 1000000,
        label: '1000,000',
    },
    {
        value: 2500000,
        label: '2,500,000',
    },
];

function valuetext(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// (value) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export default function ListNanny() {
    const [filter, setFilter] = React.useState(false);

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            {
                filter ? 
                <Typography
                    component="div"
                    sx={{
                        position: 'fixed',
                        top: '64px',
                        right: '0',
                        bottom: '0',
                        width: '30vw',
                        backgroundColor: 'rgba(41, 137, 66, 0.7)',
                        height: 'calc(100vh - 46px)',
                        zIndex: '1000',
                        color: 'white',
                    }}
                >
                    <Typography component="h3">Filter</Typography>
                    <Typography>
                        {/* <CheckBox> */}
                        <Typography>
                            <Typography component="h4">Language</Typography>
                            <Typography component="div">
                                <Checkbox {...label} sx={{ height: '18px', width: '18px' }} /> Japanese
                            </Typography>
                            <Typography>
                                <Checkbox {...label} sx={{ height: '18px', width: '18px' }} /> English
                            </Typography>
                            <Typography>
                                <Checkbox {...label} sx={{ height: '18px', width: '18px' }} /> Korea
                            </Typography>
                            <Typography>
                                <Checkbox {...label} sx={{ height: '18px', width: '18px' }} /> Chinese
                            </Typography>
                        </Typography>
                        {/* Rating */}
                        <Typography>
                            <Typography component="h4">Rating</Typography>
                            <Typography>
                                <Checkbox {...label} sx={{ height: '18px', width: '18px' }} /> 5*
                            </Typography>
                            <Typography>
                                <Checkbox {...label} sx={{ height: '18px', width: '18px' }} /> 4*
                            </Typography>
                            <Typography>
                                <Checkbox {...label} sx={{ height: '18px', width: '18px' }} /> 3*
                            </Typography>
                            <Typography>
                                <Checkbox {...label} sx={{ height: '18px', width: '18px' }} /> 2*
                            </Typography>
                            <Typography>
                                <Checkbox {...label} sx={{ height: '18px', width: '18px' }} /> 1*
                            </Typography>
                        </Typography>
                        {/* Experience */}
                        <Typography>
                            <Typography component="h4">Experience</Typography>
                            <Typography>
                                <Checkbox {...label} sx={{ height: '18px', width: '18px' }} /> Newbie
                            </Typography>
                            <Typography>
                                <Checkbox {...label} sx={{ height: '18px', width: '18px' }} /> Morderate
                            </Typography>
                            <Typography>
                                <Checkbox {...label} sx={{ height: '18px', width: '18px' }} /> Year of experience
                            </Typography>
                        </Typography>
                        {/* Address */}
                        <Typography>
                            <Typography component="h4">Address</Typography>
                            <Typography>
                                <Checkbox {...label} sx={{ height: '18px', width: '18px' }} /> Đống Đa
                            </Typography>
                            <Typography>
                                <Checkbox {...label} sx={{ height: '18px', width: '18px' }} /> Hai Bà Trưng
                            </Typography>
                            <Typography>
                                <Checkbox {...label} sx={{ height: '18px', width: '18px' }} /> Cầu Giấy
                            </Typography>
                            <Typography>
                                <Checkbox {...label} sx={{ height: '18px', width: '18px' }} /> Tây Hồ
                            </Typography>
                            <Typography>
                                <Checkbox {...label} sx={{ height: '18px', width: '18px' }} /> Thanh Xuân
                            </Typography>
                        </Typography>
                    </Typography>
                    <Typography>
                        <Slider
                            aria-label="Always visible"
                            defaultValue={100000}
                            getAriaValueText={valuetext}
                            step={10000}
                            marks={marks}
                            valueLabelDisplay="on"
                            min={100000}
                            max={2500000}
                            sx={{width: '80%', marginLeft: '30px'}}
                        />
                    </Typography>
                    <Typography>
                        <Button variant="contained" sx={{ borderRadius: '20px', padding: '3px 20px' }}>
                            Apply
                        </Button>
                        <Button
                            onClick={() => {setFilter(false)}}
                            variant="contained"
                            sx={{ borderRadius: '20px', padding: '3px 20px', backgroundColor: '#d1d1d1', border: 'none' }}
                        >
                            Cancel
                        </Button>
                    </Typography>
                </Typography>
                : ''
            }
            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography
                            textAlign="left"
                            component="h1"
                            variant="h2"
                            align="left"
                            color="text.primary"
                            gutterBottom
                        >
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
                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                            <IconButton onClick={() => {setFilter(true)}}>
                                <FilterAltIcon sx={{ width: '48px', height: '48px', color: '#177904' }} />
                            </IconButton>
                        </Box>
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
                                        <Button href="/detail" size="small">
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
