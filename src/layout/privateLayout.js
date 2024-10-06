import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthentication } from '~/hook/useAuth';
import Header from '~/components/header';
import Footer from '~/components/footer';
import Sidebar from '~/components/sidebar';


export default function PrivateRoute({ children }) {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthentication()) {
            navigate('/login');
        }
    });

    return (
        <div className="flex flex-col mt-[60px]">
            <Header />
            <div className="flex">
                <Sidebar className="h-[100%] bg-gray-800" />
                <div className=" w-[85%] ">
                    {children}
                    <Footer />
                </div>
            </div>
          
        </div>
    );
}
