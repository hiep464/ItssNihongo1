import ListNanny from '../pages/home/ListNanny';
import Login from '../pages/login/Login';
import SignUp from '../pages/signUp/SignUp';

export const publicRoutes = [
    { path: '/', element: ListNanny },
    { path: '/login', element: Login },
    { path: '/signup', element: SignUp },
];
