import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Box } from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/selector';

export default function Hired() {
    const [bookings, setBookings] = React.useState([]);
    const user = useSelector(authSelector);

    useEffect(() => {
        if (user.booking) {
            setBookings([...user.booking])
        }
    }, [user]);

    return (
        <div className="main-session hired-container">
            <Box
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
                flexDirection={'column'}
                paddingBottom={'40px'}
            >
                <h1 style={{ textAlign: 'left', width: '80%', padding: '20px 0', fontSize: '40px' }}>Hired staff</h1>
                <TableContainer component={Paper} sx={{ width: '80%' }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell width={400}
                                    sx={{ fontWeight: 600, fontSize: 20 }}
                                >Staff</TableCell>
                                <TableCell width={300} align="left"
                                    sx={{ fontWeight: 600, fontSize: 20 }}
                                >
                                    Hired day
                                </TableCell>
                                <TableCell width={200} align="left"
                                    sx={{ fontWeight: 600, fontSize: 20 }}
                                >
                                    Status
                                </TableCell>
                                <TableCell width={100} align="right"
                                    sx={{ fontWeight: 600, fontSize: 20 }}
                                >
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[...bookings].map((row) => (
                                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        <Box display={'flex'}>
                                            <Avatar
                                                alt="Remy Sharp"
                                                src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
                                            />
                                            <Box marginLeft={'8px'} display={'flex'} flexDirection={'column'}>
                                                <span>{row.full_name || 'Bui Gia Bao'}</span>
                                                <span style={{ color: '#B5B5C3' }}>{row.code || 'CN1111'}</span>
                                            </Box>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="left">
                                        {row.start_day?.split('T')[0].replace(/-/g, '/')}-{row.end_day.split('T')[0].replace(/-/g, '/')}
                                        {/* {console.log(formatDate(row.start_day), formatDate(row.end_day), row.start_day.split('T')[0].replace(/-/g, '/'), row.end_day)} */}
                                    </TableCell>
                                    <TableCell align="left">{row.status}</TableCell>
                                    <TableCell align="right">
                                        <RemoveRedEyeIcon />
                                        <DeleteIcon />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    );
}
