import { Navigate, Outlet } from 'react-router-dom';

export const PrivateLogin = () => {
    const isAuth = localStorage.getItem('isAuth')
    console.log(isAuth)
    if (isAuth === 'true') {
        return <Navigate to="/home" />;
    }
    return <Outlet/>;
}

export const PrivateRoutes = () => {
    const isAuth = localStorage.getItem('isAuth');
    console.log(isAuth)
    if (isAuth === 'false') {
        return <Navigate to="/login" />;
    }
    return <Outlet />;
};
