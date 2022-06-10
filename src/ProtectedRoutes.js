import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoutes = ({auth}) => {
    return auth === true ? <Outlet /> : <Navigate to='/login' replace />;
}