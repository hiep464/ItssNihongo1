import DefaultLayout from '../layout/defaultLayout/DefaultLayout';
import RegisterLayout from '../layout/registerLayout/RegisterLayout';
import DetailNanny from '../pages/home/DetailNanny';
import ListNanny from '../pages/home/ListNanny';
import Login from '../pages/login/Login';
import SignUp from '../pages/signUp/SignUp';
import ProfileUser from '../pages/home/ProfileUser';

export const publicRoutes = [
    { path: '/', element: ListNanny, layout: RegisterLayout },
    { path: '/login', element: Login, layout: RegisterLayout },
    { path: '/signup', element: SignUp, layout: RegisterLayout },
    { path: '/home', element: ListNanny, layout: DefaultLayout },
    { path: '/details/:id', element: DetailNanny, layout: DefaultLayout },
    { path: '/profile', element: ProfileUser, layout: DefaultLayout },
];
