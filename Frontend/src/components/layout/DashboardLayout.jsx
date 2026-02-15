import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Header from '../common/Header';
import { useAuth } from '../../hooks/useAuth';

const DashboardLayout = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="container mx-auto px-4 py-8">
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;
