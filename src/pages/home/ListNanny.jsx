import * as React from 'react';

import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';

import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GradeIcon from '@mui/icons-material/Grade';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';

import AddLocationIcon from '@mui/icons-material/AddLocation';

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
    const [nannys, setNannys] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const reponse = await fetch(
                'https://babybuddies-be-dev.onrender.com/api/v1/getdata?fbclid=IwAR05wvwdZd0pOTBFqgnfEEBZKZCufSUf1BewzsNIoU05_IOAMByrcWu1FhA',
            );
            const reponseJSON = await reponse.json();
            setNannys(reponseJSON);
        };
        fetchData();
    }, [nannys]);

    // Tính tuổi
    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    //lấy tên từ họ tên
    function getFirstName(fullName) {
        // Tách chuỗi thành mảng các từ
        var nameArray = fullName.split(' ');

        // Lấy phần tử cuối cùng trong mảng là tên
        var firstName = nameArray[nameArray.length - 1];

        return firstName;
    }

    function getCity(address) {
        // Tách chuỗi thành mảng các phần tử
        var addressArray = address.split(',');

        // Lấy phần tử thứ 3 trong mảng là thành phố
        var district = addressArray[addressArray.length - 2];
        var city = addressArray[addressArray.length - 1];
        var result = district.concat(',', city);
        return result;
    }

    // tính số sao trung bình
    function calculateAverageRating(reviews) {
        var totalStars = 0;
        var totalReviews = reviews.length;

        for (var i = 0; i < totalReviews; i++) {
            totalStars += reviews[i].star;
        }

        var averageRating = totalStars / totalReviews;
        if (totalReviews === 0) return 0;
        else return averageRating;
    }

    if (!nannys) return null;
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            {filter ? (
                <Typography
                    component="div"
                    sx={{
                        position: 'fixed',
                        top: '64px',
                        right: '0',
                        bottom: '0',
                        width: '21vw',
                        backgroundColor: 'rgba(41, 137, 66, 0.7)',
                        height: 'calc(100vh - 46px)',
                        zIndex: '1000',
                        color: 'white',
                        padding: 3,
                    }}
                >
                    <Typography component="h1" sx={{ fontSize: '25px' }}>
                        Filter
                    </Typography>
                    <Typography>
                        {/* <CheckBox> */}
                        <Typography gutterBottom>
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
                        <Typography gutterBottom>
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
                        <Typography gutterBottom>
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
                        <Typography gutterBottom>
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
                            sx={{ width: '80%', marginLeft: '30px', marginTop: '40px' }}
                        />
                    </Typography>
                    <Typography sx={{ marginTop: '10px' }}>
                        <Button
                            variant="contained"
                            sx={{ borderRadius: '20px', padding: '3px 20px', marginLeft: '20px' }}
                        >
                            Apply
                        </Button>
                        <Button
                            onClick={() => {
                                setFilter(false);
                            }}
                            variant="contained"
                            sx={{
                                borderRadius: '20px',
                                padding: '3px 20px',
                                backgroundColor: '#d1d1d1',
                                border: 'none',
                                ml: 10,
                            }}
                        >
                            Cancel
                        </Button>
                    </Typography>
                </Typography>
            ) : (
                ''
            )}
            <main>
                <Container sx={{ py: 8 }} maxWidth="lg">
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Typography variant="h4" sx={{ paddingTop: 1 }} color={'#1d9a1d'}>
                            List Nanny
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                            <IconButton
                                sx={{ marginRight: 8 }}
                                onClick={(e) => {
                                    setFilter(true);
                                }}
                            >
                                <FilterAltIcon sx={{ width: '48px', height: '48px', color: '#1d9a1d' }} />
                            </IconButton>
                        </Box>
                    </Box>
                    {/* End hero unit */}
                    <Grid
                        container
                        spacing={8}
                        bgcolor={'#f2f2f2'}
                        paddingRight={10}
                        paddingBottom={3}
                        borderRadius={5}
                    >
                        {nannys &&
                            nannys.splice(0, 8).map((nanny) => (
                                <Grid item key={nanny.id} xs={12} sm={6} md={3}>
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
                                        <CardContent sx={{ flexGrow: 1, textAlign: 'left' }} color="#063706">
                                            <Typography
                                                gutterBottom
                                                variant="h5"
                                                component="h2"
                                                sx={{ display: 'flex' }}
                                                color={'#10a710'}
                                            >
                                                <Typography>
                                                    {getFirstName(nanny.full_name)},{getAge(nanny.birthday)}
                                                </Typography>

                                                <Typography sx={{ ml: '50px', display: 'flex' }}>
                                                    <Typography>{calculateAverageRating(nanny.rating)}</Typography>
                                                    <GradeIcon />
                                                </Typography>
                                            </Typography>
                                            <Typography color={'#10a710'}>Morderate</Typography>
                                            <Typography color={'#10a710'} sx={{ fontSize: '14px' }}>
                                                <AddLocationIcon fontSize="small" />
                                                {getCity(nanny.address)}
                                            </Typography>
                                            <Typography color={'#000000'}>{nanny.salary} VND/30mins</Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button href="/detail" size="small">
                                                <Typography color={'#10a710'}>View</Typography>
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
