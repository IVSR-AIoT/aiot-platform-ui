import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthentication } from '~/hook/useAuth';
import Header from '~/layout/header';
import Footer from '~/layout/footer';
import Sidebar from '~/layout/sidebar';

export default function UserRoutes({ children }) {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthentication()) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div>
            <Header />
            <Sidebar />
            {children}
            <Footer />
        </div>
    );
}
