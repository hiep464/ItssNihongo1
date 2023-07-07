import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { publicRoutes } from './routes/Routes';
// import { Fragment } from 'react';
// import GlobalStyles from './components/GlobalStyles';
import { AuthContextProvider } from './context/AuthContext';
import AppRouter from './routes/AppRouter';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from './redux/selector';
import { useEffect } from 'react';
import { loginUser } from './api/auth.api';
import { saveUserInfo } from './redux/slices/auth.slice';

function App() {
    const userId = useSelector(authSelector).userId;
    const dispatch = useDispatch();

    useEffect(() => {
        if (userId) {
            loginUser(userId)
                .then(res => {
                    console.log(res.data.result)
                    const { id, account_status, user_info, username, booking } = res.data.result;
                    dispatch(saveUserInfo({ id, account_status, user_info, username, booking }))
                })
                .catch(err => {

                })
        }

        //eslint-disable-next-line
    }, [userId])

    return (
        <>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </>
    );
}

export default App;
