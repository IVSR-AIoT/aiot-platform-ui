import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isAdmin, isAuthentication } from '~/hook/useAuth';
import Header from '~/layout/header';
import Footer from '~/layout/footer';
import Sidebar from '~/layout/sidebar';

function AdminRoutes({ children }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAccess = () => {
            if (!isAuthentication()) {
                navigate('/login');
            } else if (!isAdmin()) {
                navigate('/');
            } else {
                setIsLoading(false);
            }
        };

        checkAccess();
    }, [navigate, location]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <Sidebar />
            {children}
            <Footer />
        </div>
    );
}

export default AdminRoutes;
