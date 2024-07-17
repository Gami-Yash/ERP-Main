import React, { useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './authProvider';
import AccessDeniedModal from './accessDeniedModal';

const ProtectedRoute = ({ element: Component }) => {
    const { auth, loading } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!loading && !auth.isAuthenticated) {
            setShowModal(true);
            const timer = setTimeout(() => {
                setShowModal(false);
                setRedirect(true);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [loading, auth]);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (redirect) {
        return <Navigate to="/" />;
    }

    if (auth.isAuthenticated) {
        return <Component />;
    }

    return <>{showModal && <AccessDeniedModal />}</>;
};

export default ProtectedRoute;
