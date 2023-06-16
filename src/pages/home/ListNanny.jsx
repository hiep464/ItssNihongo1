import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MessageIcon from '@mui/icons-material/Message';
import Link from '@mui/material/Link';

const defaultTheme = createTheme();
const commonStyles = {
    bgcolor: 'background.paper',
    m: 1,
    borderColor: 'text.primary',
    width: '800px',
    height: '600px',
};
const commonStyle = {
    bgcolor: 'background.paper',
    m: 1.5,
    borderColor: 'text.primary',
    width: '380px',
    height: '570px',
};

export default function ListNanny() {
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
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{ p: 4 }}>
                    {/* Details nanny  */}
                    <Grid item xs={7.5}>
                        <Grid container spacing={2}>
                            <Grid item xs={2.4}>
                                <Stack direction="column" spacing={2} sx={{ marginLeft: '120px', marginTop: '180px' }}>
                                    <Link href="/">
                                        <Avatar sx={{ width: '60px', height: '60px', backgroundColor: '#1a1aff' }}>
                                            <ArrowBackIcon sx={{ fontSize: 30, color: 'white' }} />
                                        </Avatar>
                                    </Link>
                                    <Link href="/" underline="none" sx={{ color: 'white' }}>
                                        <Avatar
                                            sx={{
                                                bgcolor: deepOrange[500],
                                                width: '60px',
                                                height: '60px',
                                                fontSize: 30,
                                                backgroundColor: '#b3b300',
                                            }}
                                        >
                                            B.
                                        </Avatar>
                                    </Link>
                                    <Link href="/">
                                        <Avatar
                                            sx={{
                                                bgcolor: deepOrange[500],
                                                width: '60px',
                                                height: '60px',
                                                backgroundColor: '#ff3300',
                                            }}
                                        >
                                            <MessageIcon sx={{ fontSize: 30, color: 'white' }} />
                                        </Avatar>
                                    </Link>
                                    <Link href="/">
                                        <Avatar
                                            sx={{
                                                bgcolor: deepPurple[500],
                                                width: '60px',
                                                height: '60px',
                                                backgroundColor: '#1a1aff',
                                            }}
                                        >
                                            <ArrowForwardIcon sx={{ fontSize: 30, color: 'white' }} />
                                        </Avatar>
                                    </Link>
                                </Stack>
                            </Grid>

                            <Grid item xs={9.6}>
                                <Box
                                    sx={{
                                        ...commonStyles,
                                        border: 1,
                                        borderRadius: '10px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        margin: 'auto',
                                    }}
                                >
                                    <Box sx={{ ...commonStyle, border: 1 }}>
                                        <Typography
                                            variant="h5"
                                            sx={{ textAlign: 'center', margin: '15px' }}
                                            gutterBottom
                                        >
                                            BABY BUDDIES
                                        </Typography>
                                        <Avatar
                                            sx={{
                                                bgcolor: deepOrange[700],
                                                width: '250px',
                                                height: '250px',
                                                margin: 'auto',
                                            }}
                                            alt="Remy Sharp"
                                            src="data:image/jpeg;base64,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"
                                        />
                                        <Typography variant="h5" sx={{ textAlign: 'center', mt: '10px' }} gutterBottom>
                                            Trần Thị Nga
                                        </Typography>
                                        <Typography variant="h6" sx={{ textAlign: 'center', mt: '10px' }} gutterBottom>
                                            Child Care Staff
                                        </Typography>
                                        <Typography variant="h6" sx={{ textAlign: 'center', mt: '10px' }} gutterBottom>
                                            Phone : 0892382948
                                        </Typography>
                                        <Typography variant="h6" sx={{ textAlign: 'center', mt: '10px' }} gutterBottom>
                                            Female
                                        </Typography>
                                        <Typography variant="h6" sx={{ textAlign: 'center', mt: '10px' }} gutterBottom>
                                            English , Japanese
                                        </Typography>

                                        <Rating
                                            name="size-small"
                                            defaultValue={2}
                                            sx={{ justifyContent: 'flex-end', display: 'flex', marginRight: '15px' }}
                                        />
                                    </Box>
                                    <Box sx={{ ...commonStyle, border: 1 }}>
                                        <Typography
                                            variant="h5"
                                            sx={{ textAlign: 'center', margin: '15px' }}
                                            gutterBottom
                                        >
                                            BABY BUDDIES
                                        </Typography>
                                        <Box sx={{ p: '15px' }}>
                                            <Typography variant="body1" sx={{ textAlign: '' }}>
                                                Name :
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    textAlign: '',
                                                    backgroundColor: '#e0ebeb',
                                                    borderRadius: '20px',
                                                    paddingLeft: '10px',
                                                }}
                                            >
                                                Trần Thị Ngà
                                            </Typography>
                                            <Typography variant="body1" sx={{ textAlign: '' }}>
                                                Gender :
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    textAlign: '',
                                                    backgroundColor: '#e0ebeb',
                                                    borderRadius: '20px',
                                                    paddingLeft: '10px',
                                                }}
                                            >
                                                Female
                                            </Typography>
                                            <Typography variant="body1" sx={{ textAlign: '' }}>
                                                Birthday :
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    textAlign: '',
                                                    backgroundColor: '#e0ebeb',
                                                    borderRadius: '20px',
                                                    paddingLeft: '10px',
                                                }}
                                            >
                                                23/9/2001
                                            </Typography>
                                            <Typography variant="body1" sx={{ textAlign: '' }}>
                                                Address :
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    textAlign: '',
                                                    backgroundColor: '#e0ebeb',
                                                    borderRadius: '20px',
                                                    paddingLeft: '10px',
                                                }}
                                            >
                                                Bách Khoa, Hai Bà Trưng, Hà Nội
                                            </Typography>
                                            <Typography variant="body1" sx={{ textAlign: '' }}>
                                                Experinence :
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    textAlign: '',
                                                    backgroundColor: '#e0ebeb',
                                                    borderRadius: '20px',
                                                    paddingLeft: '10px',
                                                }}
                                                gutterBottom
                                            >
                                                Cooking : 3 Years of experience
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    textAlign: '',
                                                    backgroundColor: '#e0ebeb',
                                                    borderRadius: '20px',
                                                    paddingLeft: '10px',
                                                }}
                                            >
                                                Child Care : 3 Years of experience
                                            </Typography>
                                            <Typography variant="body1" sx={{ textAlign: '' }}>
                                                Language :
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    textAlign: '',
                                                    backgroundColor: '#e0ebeb',
                                                    borderRadius: '20px',
                                                    paddingLeft: '10px',
                                                }}
                                            >
                                                English , Japanese
                                            </Typography>
                                            <Typography variant="body1" sx={{ textAlign: '' }}>
                                                Price :
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    textAlign: '',
                                                    backgroundColor: '#e0ebeb',
                                                    borderRadius: '20px',
                                                    paddingLeft: '10px',
                                                }}
                                            >
                                                500,000 VND /Day
                                            </Typography>
                                            <Typography variant="body1" sx={{ textAlign: '' }}>
                                                Rating :
                                                <Rating
                                                    name="size-small"
                                                    defaultValue={2}
                                                    sx={{
                                                        justifyContent: 'flex-start',
                                                        display: 'flex',
                                                    }}
                                                />
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                    {/* filter nanny  */}
                    <Grid item xs={4.5}>
                        <Box
                            sx={{
                                width: 600,
                                height: 300,
                                backgroundColor: 'primary.dark',
                                '&:hover': {
                                    backgroundColor: 'primary.main',
                                    opacity: [0.9, 0.8, 0.7],
                                },
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    );
}
