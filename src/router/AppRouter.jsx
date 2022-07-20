import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { DashboardRoutes } from '../dashboard/routes/DashboardRoutes';
import { useAuthStateChanged } from '../hooks/useAuthStateChanged';
import { Checking } from '../ui/components/Checking';

export const AppRouter = () => {

    const status = useAuthStateChanged();




    if (status === 'checking') {
        return <Checking />
    }


    return (
        <Routes>
            {
                (status === 'authenticated')
                    ? <Route path="/*" element={<DashboardRoutes />} />
                    : <Route path="/auth/*" element={<AuthRoutes />} />

            }
            <Route path="/*" element={<Navigate to="/auth/login" />} />
        </Routes>
    )
}

