import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthentication } from '~/hook/useAuth';
import Header from '~/components/header';
import Footer from '~/components/footer';
import Sidebar from '~/components/sidebar';

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
            <Sidebar/>
            {children}
            <Footer />
        </div>
    );
}
