import React from 'react';
import styles from './ListNanny.module.scss';
import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, styled } from '@mui/material';

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function DetailNanny() {
    const [nannys, setNannys] = React.useState([]);
    const { id } = useParams();

    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        const fetchData = async () => {
            const reponse = await fetch(
                'https://babybuddies-be-dev.onrender.com/api/v1/home?fbclid=IwAR0YWt_3e9gKOT4E6uDFFe5aQl4lZ6GMheji7DLbuXTORu1V2j5x8JUrDQQ',
            );
            const reponseJSON = await reponse.json();
            setNannys(reponseJSON.result.staffs);
        };
        fetchData();
    }, []);

    const nanny = nannys.find((nanny) => nanny.id === id);
    console.log(nanny);

    function getNannyLanguages(nanny) {
        if (nanny) {
            return nanny.user_language.map(function (lang) {
                return lang.name;
            });
        }
    }
    var nannyLanguages = getNannyLanguages(nanny);
    var nannyLanguagesString = nannyLanguages ? nannyLanguages.join(', ') : '';
    console.log(nanny);

    // format số tiền 100000 => 100,000
    function formatNumber(number) {
        const formattedNumber = number.toLocaleString('en-US');
        return formattedNumber;
    }

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

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const BookingButton = styled(Button)({
        backgroundColor: '#007320',
        fontSize: '24px',
        margin: 5,
        width: '261px',
        height: '48px',

        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#339966',
            color: '#000000',
        },
    });

    const FeedbackButton = styled(Button)({
        backgroundColor: 'red',
        margin: 5,
        fontSize: '24px',
        width: '261px',
        height: '48px',

        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#e64747',
            color: '#000000',
        },
    });

    return (
        <div>
            {nanny && (
                <div>
                    <div className={styles.container1}>
                        <div className={styles.leftBox}>
                            <label className={styles.labelName}>Name</label>
                            <span className={styles.inputField}>
                                <p className={styles.inputFieldText}>{nanny.full_name}</p>
                            </span>

                            <label className={styles.labelName}>Gender</label>
                            <ul>
                                <li className={styles.font24}>{nanny.gender}</li>
                            </ul>

                            <label className={styles.labelName}>Birthday</label>
                            <span className={styles.inputField}>
                                <p className={styles.inputFieldText}>{nanny.birthday}</p>
                            </span>

                            <label className={styles.labelName}>Address</label>
                            <span className={styles.inputField}>
                                <p className={styles.inputFieldText}>{nanny.address}</p>
                            </span>

                            <label className={styles.labelName}>Experience of Cooking</label>
                            <span className={styles.inputField}>
                                <p className={styles.inputFieldText}>{nanny.cook_exp} of experience</p>
                            </span>

                            <label className={styles.labelName}>Experience of Child Care</label>
                            <span className={styles.inputField}>
                                <p className={styles.inputFieldText}>{nanny.care_exp} of experience</p>
                            </span>

                            <label className={styles.labelName}>Languages</label>
                            <span className={styles.inputField}>
                                <p className={styles.inputFieldText}>{nannyLanguagesString}</p>
                            </span>

                            <label className={styles.labelName}>Price</label>
                            <span className={styles.staffPrice}> {formatNumber(nanny.salary)} VND/day</span>
                        </div>

                        <div className={styles.rightBox}>
                            <div className={styles.imgDiv}>
                                <img className={styles.staffImg} src={nanny.image_link} alt="" />
                            </div>
                            <div className={styles.starList}>
                                <Rating
                                    name="read-only"
                                    value={calculateAverageRating(nanny.rating)}
                                    readOnly
                                    precision={0.5}
                                    sx={{ fontSize: '58px' }}
                                />
                            </div>
                            <div className={styles.BookOrReport}>
                                <Box sx={{ marginLeft: 16 }}>
                                    <BookingButton variant="contained">Booking</BookingButton>
                                    <FeedbackButton variant="contained" onClick={handleOpen}>
                                        Feedback
                                    </FeedbackButton>
                                </Box>
                                <Modal
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    {/* Modal Feedback */}
                                    <Box sx={style}>
                                        <Typography id="modal-modal-title" variant="h6" component="h2">
                                            Customer
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            Name :
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            Details :
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            Gender :
                                        </Typography>
                                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                            <Rating value={1} />
                                        </Typography>
                                    </Box>
                                </Modal>
                            </div>
                        </div>
                    </div>
                    <div className={styles.container2}>
                        <span
                            style={{
                                fontWeight: 'bold',
                                marginLeft: '4px',
                                fontSize: '20px',
                                display: 'block',
                                width: '100%',
                            }}
                        >
                            Write comment
                        </span>
                        <textarea
                            style={{
                                boxSizing: 'border-box',
                                width: '100%',
                                height: '102px',
                                backgroundColor: '#94c594',
                                border: 'none',
                            }}
                        ></textarea>
                    </div>
                    <span className={styles.commentText}>previous comment</span>
                    <div className={styles.container3}>
                        {nanny &&
                            nanny.rating.map((item, index) => (
                                <div key={index} className={styles.prevComment}>
                                    <span style={{ fontWeight: 'bold', marginLeft: '16px' }}>
                                        {item.star}
                                        <span className={styles.greenStar2}>&#9733;</span>
                                    </span>
                                    <br />
                                    <span style={{ marginLeft: '16px', display: 'block', marginBottom: '12px' }}>
                                        {item.review}
                                    </span>
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}
