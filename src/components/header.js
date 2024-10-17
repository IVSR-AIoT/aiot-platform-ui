import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, isAuthentication } from '~/hook/useAuth';
import { UserOutlined } from '@ant-design/icons';
import { modalSupportContext } from '~/hook/useContext';
function Header() {
    const navigate = useNavigate();
    const context = useContext(modalSupportContext)
    
    useEffect(() => {
        if (!isAuthentication()) {
            navigate('/login');
        }
    }, [navigate]);

    const userName = isAuthentication() ? getUser().name : '';

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/login');
    };

    return (
        <div className="h-[60px] w-full bg-blue-500 flex justify-between items-center px-[30px] fixed top-0 z-50  text-white">
            <Link to="/" className="w-[80px] h-full flex items-center justify-center hover:bg-cyan-200 text-center">
                Home
            </Link>
            <button onClick={context.showModal}>Create Issue</button>
            <div className="flex cursor-pointer group h-full w-[90px] justify-center items-center">
                <p className="mr-2">{userName}</p>
                <UserOutlined />
                <ul className="absolute top-[60px] right-[20px] bg-blue-400  shadow-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
                    <li
                        className="w-[120px] h-[40px] flex items-center justify-center p-2 hover:bg-blue-300"
                        onClick={handleLogout}
                    >
                        <p className="flex-1 text-center whitespace-nowrap">Logout</p>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Header;
