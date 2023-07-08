import React, { Component, useState } from 'react'

import { useParams } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, styled } from '@mui/material';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import axios from 'axios';
import { motion } from "framer-motion"

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function formatNumber(number) {
    const formattedNumber = number?.toLocaleString('en-US');
    return formattedNumber;
}


function BookingForm(props) {
    let nanny = props.nanny;
    const setIsBooking = props.setisbooking;
    const notify = props.notify;
    console.log(nanny, setIsBooking);
    const [message, setMessage] = React.useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());


    const handleBooking = () => {
        console.log(nanny);
        const formData = {
            staffId: nanny.id,
            endDay: startDate,
            message: message,
            total: nanny.salary,
            startDay: endDate,
        };
        notify();
        console.log(formData);
        // axios.post('https://babybuddies-be-dev.onrender.com/api/v1/bookings/store', formData).then(() => {
        //     setMessage('');    
        //     // <button onClick={notify}>Notify!</button>
        // });
    };

    return (
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0, 0.71, 0.2, 1.01]
                }}
            >
                    <Box
                        width={'800px'}
                        backgroundColor={'white'}
                        borderRadius={'6px'}
                        display={'flex'}
                        alignItems={'center'}
                        justifyContent={'center'}
                    >
                        <Box width={'90%'}>
                            <h1 style={{ color: '#007320' }}>Confirm booking</h1>
                            <h4 style={{ color: '#007320' }}>Staff Name</h4>
                            <Box
                                sx={{
                                    backgroundColor: '#d6d6d6',
                                    fontSize: '24px',
                                    borderRadius: '6px',
                                    padding: '2px',
                                }}
                            >
                                {nanny.full_name}
                            </Box>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ width: '49%' }}>
                                    <h4 style={{ color: '#007320' }}>Start day</h4>
                                    <DatePicker
                                        showIcon
                                        selected={startDate} 
                                        onChange={(date) => setStartDate(date)}
                                        className='datepicker'
                                    />
                                </div>
                                <div style={{ width: '49%' }}>
                                    <h4 style={{ color: '#007320' }}>Finish day</h4>
                                    <DatePicker
                                        showIcon 
                                        style={{backgroundColor: 'red'}} 
                                        selected={endDate} 
                                        onChange={(date) => setEndDate(date)} 
                                    />
                                </div>
                            </div>
                            <h4 style={{ color: '#007320' }}>Total price</h4>
                            <Box
                                sx={{
                                    width: '49%',
                                    backgroundColor: '#d6d6d6',
                                    fontSize: '24px',
                                    borderRadius: '6px',
                                    padding: '2px',
                                    marginBottom: '18px',
                                }}
                            >
                                {formatNumber(nanny.salary)} VND
                            </Box>
                            {/* <TextField
                                multiline
                                maxRows={4}
                                sx={{margin: '10px 0', width: '80%'}}
                            /> */}
                            <textarea
                                name="des"
                                id=""
                                cols="30"
                                rows="6"
                                placeholder="Write a sentence you want to send to the staff"
                                value={message}
                                onChange={(e) => {
                                    setMessage(e.target.value);
                                }}
                                style={{ width: '100%', fontSize: '14px', padding: '10px', marginBottom: '10px' }}
                            ></textarea>
                            <Box display={'flex'} justifyContent={'space-around'} paddingBottom={'24px'}>
                                <Button
                                    sx={{
                                        backgroundColor: '#007320',
                                        fontWeight: '600',
                                        borderRadius: '15px',
                                        width: '160px',
                                    }}
                                    variant="contained"
                                    onClick={handleBooking}
                                >
                                    Confirm
                                </Button>
                                <Button
                                    sx={{
                                        backgroundColor: '#E5E5E5',
                                        fontWeight: '600',
                                        color: '#007320',
                                        borderRadius: '15px',
                                        width: '160px',
                                    }}
                                    variant="outline"
                                    onClick={() => {
                                        setMessage('');
                                        setIsBooking(false);
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </Box>
                    </Box>
            </motion.div>
    )
}

export default BookingForm;