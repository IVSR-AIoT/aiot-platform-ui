import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { isAdmin, isAuthentication } from '~/hook/useAuth';

function AdminRoutes({ children }) {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthentication() || !isAdmin()) {
            navigate('/login');
        }
    }, [navigate]);

    return children;
}

export default AdminRoutes;
