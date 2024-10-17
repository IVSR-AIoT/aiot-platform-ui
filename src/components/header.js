import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, isAuthentication } from '~/hook/useAuth';
import { UserOutlined } from '@ant-design/icons';
import { navigation } from '~/configs/headerConfig';
function Header() {
    const navigate = useNavigate();

    const userName = getUser()?.name;

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/login');
    };

    return (
        <div className="h-[60px] w-full bg-[#48B3D5] flex justify-between items-center px-[30px] fixed top-0 z-50 text-white ">
            <div className="h-full flex">
                {navigation.map((item, index) => {
                    return (
                        <Link
                            to={item.route}
                            key={index}
                            className="w-20 text-center transition-colors duration-200 hover:bg-blue-200 hover:text-blue-800 leading-[60px]"
                        >
                            {item.title}
                        </Link>
                    );
                })}
            </div>
            <div className="relative group">
                {isAuthentication() ? (
                    <div className="flex justify-between items-center cursor-pointer w-[65px] h-[60px]">
                        <p className="h-full leading-[60px]">{userName}</p>
                        <UserOutlined />
                    </div>
                ) : (
                    <div className="flex justify-between w-[120px] cursor-pointer items-center">
                        <Link to="/login" className="text-white hover:text-blue-200 transition-colors duration-200">
                            Login
                        </Link>
                        <div className="h-5 w-[1px] bg-white"></div>
                        <Link to="/register" className="text-white hover:text-blue-200 transition-colors duration-200">
                            SignUp
                        </Link>
                    </div>
                )}
                <ul className="absolute top-[60px] right-0 shadow-2xl text-gray-800 bg-gray-200 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ">
                    <li
                        className="w-[120px] h-[40px] px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={handleLogout}
                    >
                        Logout
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Header;
