import * as React from 'react';

import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
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

import AddLocationIcon from '@mui/icons-material/AddLocation';
import axios from 'axios';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import TakeoutDiningIcon from '@mui/icons-material/TakeoutDining';
import { Link } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import TranslateIcon from '@mui/icons-material/Translate';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

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

const languages = [
    { name: 'Korean', active: false },
    { name: 'English', active: true },
    { name: 'Japanese', active: true },
    { name: 'Chinese', active: false },
    { name: 'French', active: false },
    { name: 'Spanish', active: false },
];
const cooking = [
    { name: '1 years', active: false },
    { name: '2 years', active: false },
    { name: '3 years', active: true },
    { name: '4 years', active: false },
    { name: '5 years', active: false },
    { name: '> 5 years', active: false },
];
const childCare = [
    { name: '1 years', active: false },
    { name: '2 years', active: false },
    { name: '3 years', active: true },
    { name: '4 years', active: false },
    { name: '5 years', active: false },
    { name: '> 5 years', active: false },
];
const price = [
    { name: 100000, active: false },
    { name: 200000, active: false },
    { name: 300000, active: false },
    { name: 400000, active: false },
    { name: 500000, active: true },
];

export default function ListNanny() {
    const [filter, setFilter] = React.useState(false);
    const [nannys, setNannys] = React.useState([]);
    const [language, setLanguage] = React.useState('');
    const [rating, setRating] = React.useState('');
    const [experience, setExperience] = React.useState('');
    const [salary, setSalary] = React.useState('');
    const [reload, setReload] = React.useState(0);
    const [progress, setProgress] = React.useState(50);

    React.useEffect(() => {
        const fetchData = async () => {
            const reponse = await fetch(
                'https://babybuddies-be-dev.onrender.com/api/v1/home?fbclid=IwAR0YWt_3e9gKOT4E6uDFFe5aQl4lZ6GMheji7DLbuXTORu1V2j5x8JUrDQQ',
            );
            const reponseJSON = await reponse.json();
            setNannys(reponseJSON.result.staffs);
        };
        fetchData();
    }, [reload]);

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
        let formData = {
            rating: rating,
            userLanguage: language,
            // cookExp: `${experience} years`,
            // careExp: `${experience} years`,
            salary: salary,
        };

        if (!rating) {
            delete formData.rating;
        }
        if (!language) {
            delete formData.userLanguage;
        }
        if (!salary) {
            delete formData.salary;
        }

        setFilter(false);
        if (rating || language || salary)
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

    // format số tiền 100000 => 100,000
    function formatNumber(number) {
        const formattedNumber = number.toLocaleString('en-US');
        return formattedNumber;
    }

    //pagination
    // const data = Array.from({ length: 100 }, (_, index) => `Item ${index + 1}`);

    const ItemsPerPage = 8;

    const [currentPage, setCurrentPage] = React.useState(1);

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * ItemsPerPage;
    const endIndex = startIndex + ItemsPerPage;
    const currentItems = nannys.slice(startIndex, endIndex);

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
                        width: '50vw',
                        backgroundColor: 'rgba(41, 137, 66, 0.7)',
                        height: 'calc(100vh - 46px)',
                        zIndex: '1000',
                        backgroundColor: 'white',
                        padding: 1,
                    }}
                >
                    <Box borderRadius={'8px'} border={'1px solid #a4a4a4'} paddingBottom={'40px'}>
                        <Typography
                            component="h3"
                            sx={{
                                fontSize: '20px',
                                color: 'black',
                                fontWeight: '600',
                                marginLeft: '14px',
                                marginTop: '14px',
                            }}
                        >
                            Interests
                        </Typography>

                        <Typography component="div">
                            <Button
                                size="small"
                                sx={{
                                    borderRadius: '16px',
                                    backgroundColor: '#ebebeb',
                                    color: 'black',
                                    marginLeft: '14px',
                                }}
                                startIcon={<TranslateIcon sx={{ color: '#a744be' }} />}
                            >
                                Language
                            </Button>
                            <Box margin={'10px'} display={'flex'} flexWrap={'wrap'}>
                                {languages.map((item, key) => {
                                    return (
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            key={key}
                                            sx={{
                                                borderRadius: '16px',
                                                color: 'black',
                                                width: '22%',
                                                margin: '6px 10px',
                                                textTransform: 'none',
                                                borderColor: item?.active ? 'black' : '#abaeb1',
                                            }}
                                            startIcon={
                                                <CheckCircleRoundedIcon
                                                    sx={{
                                                        color: 'primary.main',
                                                        display: item?.active ? 'flex' : 'none',
                                                    }}
                                                />
                                            }
                                        >
                                            {item?.name}
                                        </Button>
                                    );
                                })}
                            </Box>
                        </Typography>

                        <Typography component="div">
                            <Button
                                size="small"
                                sx={{
                                    borderRadius: '16px',
                                    backgroundColor: '#ebebeb',
                                    color: '#ff6624',
                                    marginLeft: '14px',
                                }}
                                startIcon={<OutdoorGrillIcon sx={{ color: '#ff6624' }} />}
                            >
                                Cooking
                            </Button>
                            <Box margin={'10px'} display={'flex'} flexWrap={'wrap'}>
                                {cooking.map((item, key) => {
                                    return (
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            key={key}
                                            sx={{
                                                borderRadius: '16px',
                                                color: 'black',
                                                width: '22%',
                                                margin: '6px 10px',
                                                textTransform: 'none',
                                                borderColor: item?.active ? 'black' : '#abaeb1',
                                            }}
                                            startIcon={
                                                <CheckCircleRoundedIcon
                                                    sx={{
                                                        color: 'primary.main',
                                                        display: item?.active ? 'flex' : 'none',
                                                    }}
                                                />
                                            }
                                        >
                                            {item?.name}
                                        </Button>
                                    );
                                })}
                            </Box>
                        </Typography>

                        <Typography component="div">
                            <Button
                                size="small"
                                sx={{
                                    borderRadius: '16px',
                                    backgroundColor: '#ebebeb',
                                    color: 'primary.main',
                                    marginLeft: '14px',
                                }}
                                startIcon={<OutdoorGrillIcon sx={{ color: 'primary.main' }} />}
                            >
                                Child Care
                            </Button>
                            <Box margin={'10px'} display={'flex'} flexWrap={'wrap'}>
                                {childCare.map((item, key) => {
                                    return (
                                        <Button
                                            variant="outlined"
                                            key={key}
                                            size="small"
                                            sx={{
                                                borderRadius: '16px',
                                                color: 'black',
                                                width: '22%',
                                                margin: '6px 10px',
                                                textTransform: 'none',
                                                borderColor: item?.active ? 'black' : '#abaeb1',
                                            }}
                                            startIcon={
                                                <CheckCircleRoundedIcon
                                                    sx={{
                                                        color: 'primary.main',
                                                        display: item?.active ? 'flex' : 'none',
                                                    }}
                                                />
                                            }
                                        >
                                            {item?.name}
                                        </Button>
                                    );
                                })}
                            </Box>
                        </Typography>

                        <Typography component="div">
                            <Button
                                size="small"
                                sx={{
                                    borderRadius: '16px',
                                    backgroundColor: '#ebebeb',
                                    color: '#b70f0a',
                                    marginLeft: '14px',
                                }}
                                startIcon={<OutdoorGrillIcon sx={{ color: '#b70f0a' }} />}
                            >
                                Price
                            </Button>
                            <Box margin={'10px'} display={'flex'} flexWrap={'wrap'}>
                                {price.map((item, key) => {
                                    return (
                                        <Button
                                            variant="outlined"
                                            key={key}
                                            size="small"
                                            sx={{
                                                borderRadius: '16px',
                                                color: 'black',
                                                width: '22%',
                                                margin: '6px 10px',
                                                borderColor: item?.active ? 'black' : '#abaeb1',
                                            }}
                                            startIcon={
                                                <CheckCircleRoundedIcon
                                                    sx={{
                                                        color: 'primary.main',
                                                        display: item?.active ? 'flex' : 'none',
                                                    }}
                                                />
                                            }
                                        >
                                            {item?.name}
                                        </Button>
                                    );
                                })}
                            </Box>
                        </Typography>

                        <Typography component="div" sx={{ float: 'right', marginRight: '14px' }}>
                            <Button
                                variant="contained"
                                sx={{ borderRadius: '20px', padding: '3px 20px', marginLeft: '20px' }}
                                onClick={handleFilter}
                            >
                                Submit
                            </Button>
                            <Button
                                onClick={() => {
                                    setFilter(false);
                                    setRating('');
                                    setLanguage('');
                                    setExperience('');
                                    setSalary('');
                                    setReload(reload + 1);
                                }}
                                variant="contained"
                                sx={{
                                    borderRadius: '20px',
                                    padding: '3px 20px',
                                    backgroundColor: '#929292',
                                    border: 'none',
                                    ml: 4,
                                }}
                            >
                                Cancel
                            </Button>
                        </Typography>
                    </Box>
                </Typography>
            ) : (
                ''
            )}
            <main>
                <Container sx={{ py: 2 }} maxWidth="lg">
                    <Box display={'flex'} height={'64px'} justifyContent={'space-between'}>
                        <Typography
                            variant="h4"
                            sx={{ paddingTop: 8, marginLeft: 4 }}
                            color={'#137913'}
                            fontWeight="bold"
                        >
                            The list of Staff
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                            <IconButton
                                sx={{ marginRight: 8, marginTop: 12 }}
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
                        spacing={2}
                        paddingTop={6}
                        paddingRight={6}
                        paddingLeft={4}
                        paddingBottom={3}
                        borderRadius={5}
                        border="1px solid #1d9a1d"
                    >
                        {currentItems.map((nanny) => (
                            <Grid item key={nanny.id} xs={12} sm={6} md={3}>
                                <Link href="detail" underline="none">
                                    <Card
                                        sx={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            cursor: 'pointer',
                                            border: '1px solid #1d9a1d',
                                            borderRadius: '10px',
                                        }}
                                    >
                                        <Box>
                                            <CardMedia
                                                component="div"
                                                sx={{
                                                    pt: '56.25%',
                                                    overflow: 'hidden',
                                                    border: '1px solid #1d9a1d',
                                                    borderRadius: '10px',
                                                    margin: '10px',
                                                }}
                                                image="https://source.unsplash.com/random?wallpapers"
                                            />
                                        </Box>
                                        <CardContent sx={{ flexGrow: 1, textAlign: 'left' }} color="#063706">
                                            <Typography
                                                variant="h5"
                                                component="h2"
                                                sx={{ display: 'flex', justifyContent: 'space-between' }}
                                                color={'#137913'}
                                            >
                                                <Typography fontWeight="bold">
                                                    {getFirstName(nanny.full_name)},{getAge(nanny.birthday)}
                                                </Typography>

                                                <Typography sx={{ display: 'flex' }} fontWeight="bold">
                                                    <Typography>{calculateAverageRating(nanny.rating)}</Typography>
                                                    <GradeIcon />
                                                </Typography>
                                            </Typography>
                                            <Typography color={'#10a710'} display="flex" justifyContent="space-between">
                                                <Typography color={'#10a710'}>
                                                    <AutoGraphIcon />
                                                    {nanny.care_exp}
                                                </Typography>
                                                <Typography color={'#10a710'}>
                                                    <TakeoutDiningIcon />
                                                    {nanny.cook_exp}
                                                </Typography>
                                            </Typography>

                                            <Typography color={'#10a710'} display="flex" justifyContent="space-between">
                                                <GTranslateIcon />
                                                {nanny.user_language.map((language) => (
                                                    <Typography key={language.id}>{language.name} </Typography>
                                                ))}
                                            </Typography>

                                            <Typography color={'#10a710'} sx={{ fontSize: '14px' }}>
                                                <AddLocationIcon fontSize="small" />
                                                {getCity(nanny.address)}
                                            </Typography>
                                            <Typography
                                                display="flex"
                                                justifyContent="space-between"
                                                alignItems="center"
                                            >
                                                <Typography color={'#000000'} fontWeight="bold">
                                                    {formatNumber(nanny.salary)} VND/day
                                                </Typography>

                                                <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                                                    <CircularProgress
                                                        variant="determinate"
                                                        value={progress}
                                                        // color="success"
                                                        sx={{ color: 'red' }}
                                                    />
                                                    <Box
                                                        sx={{
                                                            top: 0,
                                                            left: 0,
                                                            bottom: 0,
                                                            right: 0,
                                                            position: 'absolute',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="caption"
                                                            component="div"
                                                            color="black"
                                                            fontWeight="bold"
                                                        >
                                                            {`${Math.round(progress)}%`}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>

                    <Stack spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
                        <Pagination
                            count={Math.ceil(nannys.length / ItemsPerPage)}
                            page={currentPage}
                            onChange={handlePageChange}
                        />
                    </Stack>
                </Container>
            </main>
        </ThemeProvider>
    );
}
