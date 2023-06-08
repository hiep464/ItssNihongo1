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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import AddLocationIcon from '@mui/icons-material/AddLocation';
import axios from 'axios';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const marks = [
    {
        value: 100000,
        label: '100,000',
    },
    {
        value: 1000000,
        label: '1,000,000',
    },
    {
        value: 2500000,
        label: '2,500,000',
    },
];

function valuetext(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function postData(url, data) {
    return axios
        .post(url, data)
        .then((response) => {
            console.log(response);
            return response.data;
        })
        .catch((error) => {
            console.error(error);
        });
}

export default function ListNanny() {
    const [filter, setFilter] = React.useState(false);
    const [nannys, setNannys] = React.useState([]);
    const [language, setLanguage] = React.useState('');
    const [rating, setRating] = React.useState('');
    const [experience, setExperience] = React.useState('');
    const [salary, setSalary] = React.useState('');

    React.useEffect(() => {
        const fetchData = async () => {
            const reponse = await fetch(
                'https://babybuddies-be-dev.onrender.com/api/v1/getdata?fbclid=IwAR05wvwdZd0pOTBFqgnfEEBZKZCufSUf1BewzsNIoU05_IOAMByrcWu1FhA',
            );
            const reponseJSON = await reponse.json();
            setNannys(reponseJSON);
        };
        fetchData();
    }, []);

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

    const handleFilter = () => {
        const formData = {
            rating: rating,
            language: language,
            cookExp: experience,
            careExp: experience,
            salary: salary,
        };
        setFilter(false);
        postData('https://babybuddies-be-dev.onrender.com/api/v1/search/matching', formData)
            .then((data) => setNannys(data))
            .catch((error) => console.error(error));
        console.log(language, rating, experience, salary);
    };

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
                        padding: 1,
                    }}
                >
                    <Typography component="h3" sx={{ fontSize: '20px' }}>
                        Filter
                    </Typography>
                    {/* <Typography>
                        <Typography gutterBottom>
                            <Typography component="h4">Language</Typography>
                            <Typography component="div">
                                <Checkbox {...label} sx={{ height: '14px', width: '14px' }} /> Japanese
                            </Typography>
                            <Typography>
                                <Checkbox
                                    checked={false}
                                    onChange={(e) => {
                                        console.log(e.target.value);
                                    }}
                                    {...label}
                                    sx={{ height: '14px', width: '14px' }}
                                    value={'English'}
                                />{' '}
                                English
                            </Typography>
                            <Typography>
                                <Checkbox {...label} sx={{ height: '14px', width: '14px' }} /> Korea
                            </Typography>
                            <Typography>
                                <Checkbox {...label} sx={{ height: '14px', width: '14px' }} /> Chinese
                            </Typography>
                        </Typography>
                        <Typography gutterBottom>
                            <Typography component="h4">Rating</Typography>
                            <Typography>
                                <Checkbox {...label} sx={{ height: '14px', width: '14px' }} /> 5*
                            </Typography>
                            <Typography>
                                <Checkbox {...label} sx={{ height: '14px', width: '14px' }} /> 4*
                            </Typography>
                            <Typography>
                                <Checkbox {...label} sx={{ height: '14px', width: '14px' }} /> 3*
                            </Typography>
                            <Typography>
                                <Checkbox {...label} sx={{ height: '14px', width: '14px' }} /> 2*
                            </Typography>
                            <Typography>
                                <Checkbox {...label} sx={{ height: '14px', width: '14px' }} /> 1*
                            </Typography>
                        </Typography>
                        <Typography gutterBottom>
                            <Typography component="h4">Experience</Typography>
                            <Typography>
                                <Checkbox {...label} sx={{ height: '14px', width: '14px' }} /> Newbie
                            </Typography>
                            <Typography>
                                <Checkbox {...label} sx={{ height: '14px', width: '14px' }} /> Morderate
                            </Typography>
                            <Typography>
                                <Checkbox {...label} sx={{ height: '14px', width: '14px' }} /> Year of experience
                            </Typography>
                        </Typography>
                        <Typography gutterBottom>
                            <Typography component="h4">Address</Typography>
                            <Typography>
                                <Checkbox {...label} sx={{ height: '14px', width: '14px' }} /> Đống Đa
                            </Typography>
                            <Typography>
                                <Checkbox {...label} sx={{ height: '14px', width: '14px' }} /> Hai Bà Trưng
                            </Typography>
                            <Typography>
                                <Checkbox {...label} sx={{ height: '14px', width: '14px' }} /> Cầu Giấy
                            </Typography>
                            <Typography>
                                <Checkbox {...label} sx={{ height: '14px', width: '14px' }} /> Tây Hồ
                            </Typography>
                            <Typography>
                                <Checkbox {...label} sx={{ height: '14px', width: '14px' }} /> Thanh Xuân
                            </Typography>
                        </Typography>
                    </Typography> */}

                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Language</FormLabel>
                        <RadioGroup
                            onChange={(e) => {
                                setLanguage(e.target.value);
                            }}
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel
                                value="Japanese"
                                control={
                                    <Radio
                                        sx={{ width: '10px', height: '10px', marginLeft: '10px', marginRight: '4px' }}
                                    />
                                }
                                label="Japanese"
                            />
                            <FormControlLabel
                                value="English"
                                control={
                                    <Radio
                                        sx={{ width: '10px', height: '10px', marginLeft: '10px', marginRight: '4px' }}
                                    />
                                }
                                label="English"
                            />
                            <FormControlLabel
                                value="Korean"
                                control={
                                    <Radio
                                        sx={{ width: '10px', height: '10px', marginLeft: '10px', marginRight: '4px' }}
                                    />
                                }
                                label="Korean"
                            />
                            <FormControlLabel
                                value="Chinese"
                                control={
                                    <Radio
                                        sx={{ width: '10px', height: '10px', marginLeft: '10px', marginRight: '4px' }}
                                    />
                                }
                                label="Chinese"
                            />
                        </RadioGroup>
                        <FormLabel id="demo-radio-buttons-group-label">Rating</FormLabel>
                        <RadioGroup
                            onChange={(e) => {
                                setRating(e.target.value);
                            }}
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel
                                value="5"
                                control={
                                    <Radio
                                        sx={{ width: '10px', height: '10px', marginLeft: '10px', marginRight: '4px' }}
                                    />
                                }
                                label="5*"
                            />
                            <FormControlLabel
                                value="4"
                                control={
                                    <Radio
                                        sx={{ width: '10px', height: '10px', marginLeft: '10px', marginRight: '4px' }}
                                    />
                                }
                                label="4*"
                            />
                            <FormControlLabel
                                value="3"
                                control={
                                    <Radio
                                        sx={{ width: '10px', height: '10px', marginLeft: '10px', marginRight: '4px' }}
                                    />
                                }
                                label="3*"
                            />
                            <FormControlLabel
                                value="2"
                                control={
                                    <Radio
                                        sx={{ width: '10px', height: '10px', marginLeft: '10px', marginRight: '4px' }}
                                    />
                                }
                                label="2*"
                            />
                            <FormControlLabel
                                value="1"
                                control={
                                    <Radio
                                        sx={{ width: '10px', height: '10px', marginLeft: '10px', marginRight: '4px' }}
                                    />
                                }
                                label="1*"
                            />
                        </RadioGroup>
                        <FormLabel id="demo-radio-buttons-group-label">Experience</FormLabel>
                        <RadioGroup
                            onChange={(e) => {
                                setExperience(e.target.value);
                            }}
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel
                                value="1"
                                control={
                                    <Radio
                                        sx={{ width: '10px', height: '10px', marginLeft: '10px', marginRight: '4px' }}
                                    />
                                }
                                label="Newbie"
                            />
                            <FormControlLabel
                                value="2"
                                control={
                                    <Radio
                                        sx={{ width: '10px', height: '10px', marginLeft: '10px', marginRight: '4px' }}
                                    />
                                }
                                label="Morderate"
                            />
                            <FormControlLabel
                                value="3"
                                control={
                                    <Radio
                                        sx={{ width: '10px', height: '10px', marginLeft: '10px', marginRight: '4px' }}
                                    />
                                }
                                label="Year of experience"
                            />
                        </RadioGroup>
                        <FormLabel id="demo-radio-buttons-group-label">Adress</FormLabel>
                        <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group">
                            <FormControlLabel
                                value="1"
                                control={
                                    <Radio
                                        sx={{ width: '10px', height: '10px', marginLeft: '10px', marginRight: '4px' }}
                                    />
                                }
                                label="Đống Đa"
                            />
                            <FormControlLabel
                                value="2"
                                control={
                                    <Radio
                                        sx={{ width: '10px', height: '10px', marginLeft: '10px', marginRight: '4px' }}
                                    />
                                }
                                label="Hai Bà Trưng"
                            />
                            <FormControlLabel
                                value="3"
                                control={
                                    <Radio
                                        sx={{ width: '10px', height: '10px', marginLeft: '10px', marginRight: '4px' }}
                                    />
                                }
                                label="Cầu giấy"
                            />
                            <FormControlLabel
                                value="3"
                                control={
                                    <Radio
                                        sx={{ width: '10px', height: '10px', marginLeft: '10px', marginRight: '4px' }}
                                    />
                                }
                                label="Tây Hồ"
                            />
                            <FormControlLabel
                                value="3"
                                control={
                                    <Radio
                                        sx={{ width: '10px', height: '10px', marginLeft: '10px', marginRight: '4px' }}
                                    />
                                }
                                label="Thanh Xuân"
                            />
                        </RadioGroup>
                    </FormControl>

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
                            sx={{ width: '80%', marginLeft: '30px' }}
                            onChange={(e) => {
                                setSalary(e.target.value);
                            }}
                        />
                    </Typography>
                    <Typography>
                        <Button
                            variant="contained"
                            sx={{ borderRadius: '20px', padding: '3px 20px', marginLeft: '20px' }}
                            onClick={handleFilter}
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
                    <Box display={'flex'} height={'64px'} justifyContent={'space-between'}>
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
                                {!filter ? (
                                    <FilterAltIcon sx={{ width: '48px', height: '48px', color: '#1d9a1d' }} />
                                ) : (
                                    ''
                                )}
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
                        {
                            // nannys &&
                            // nannys.splice(0, 8)
                            nannys.map((nanny) => (
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
                            ))
                        }
                    </Grid>
                </Container>
            </main>
        </ThemeProvider>
    );
}
