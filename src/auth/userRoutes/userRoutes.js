import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthentication } from '~/hook/useAuth';

export default function UserRoutes({ children }) {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthentication()) {
            navigate('/login');
        }
    }, [navigate]);

    return children;
}
