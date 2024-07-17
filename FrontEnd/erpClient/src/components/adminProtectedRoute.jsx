import React, { useContext, useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './authProvider';
import AccessDeniedModal from './accessDeniedModal';

const AdminProtectedRoute = ({ element: Component }) => {
    const { auth, loading } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!loading && (!auth.isAuthenticated || !auth.isadmin)) {
            setShowModal(true);
            // Set a timer to redirect after showing the modal for 2 seconds
            const timer = setTimeout(() => {
                setShowModal(false);
                setRedirect(true);
            }, 2000); // Show modal for 2 seconds

            return () => clearTimeout(timer);
        }
    }, [loading, auth]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (auth.isAuthenticated && auth.isadmin) {
        return <Component />;
    }

    if (redirect) {
        return <Navigate to="/" />;
    }

    return <>{showModal && <AccessDeniedModal />}</>;
};

export default AdminProtectedRoute;
