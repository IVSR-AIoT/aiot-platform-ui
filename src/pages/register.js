import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateUser } from '~/services/userService';

function Register() {
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        telephone: '',
        name: '',
        password: '',
    });

    const [isEmpty, setIsEmpty] = useState({
        email: false,
        telephone: false,
        name: false,
        password: false,
    });

    const show = useRef();

    const showAlert = () => {
        setIsVisible(true);
        if (show.current) {
            clearTimeout(show.current);
        }
        show.current = setTimeout(() => {
            setIsVisible(false);
        }, 2000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
        setIsEmpty((prev) => ({
            ...prev,
            [name]: false,
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!user.email.trim() || !user.telephone.trim() || !user.name.trim() || !user.password.trim()) {
            setIsEmpty({
                email: !user.email.trim(),
                telephone: !user.telephone.trim(),
                name: !user.name.trim(),
                password: !user.password.trim(),
            });
            return;
        }

        try {
            const res = await CreateUser(user);
            if (res.status === 201) {
                navigate('/login');
            }
        } catch (err) {
            console.error(err);
            showAlert();
        }
    };

    return (
        <div>
            {isVisible && (
                <div
                    className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 absolute top-0 right-0 transition-opacity duration-300"
                    role="alert"
                >
                    <svg
                        className="flex-shrink-0 inline w-4 h-4 me-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <div>
                        <span className="font-medium">Email or telephone already exists!</span>
                    </div>
                </div>
            )}
            <h1 className="text-[60px] text-center mt-[30px] text-[#8f8e8e] mb-[30px]">Register</h1>
            <div className="flex justify-center">
                <form onSubmit={handleRegister} className="w-[300px]">
                    <h2 className="text-[#8f8e8e] mb-1 mt-[15px]">EMAIL:</h2>
                    <input
                        name="email"
                        onChange={handleChange}
                        value={user.email}
                        className="py-2 px-5 bg-[#ececec] text-[14px] rounded-md w-[100%] focus:outline-none placeholder:text-[#4d4c4c] placeholder:text-[14px]"
                        type="text"
                        placeholder="Email"
                    />
                    {isEmpty.email && <p className="text-red-500 text-[14px]">Email is empty</p>}

                    <h2 className="text-[#8f8e8e] mb-1 mt-[15px]">Telephone:</h2>
                    <input
                        name="telephone"
                        onChange={handleChange}
                        value={user.telephone}
                        className="py-2 px-5 bg-[#ececec] text-[14px] rounded-md w-[100%] focus:outline-none placeholder:text-[#4d4c4c] placeholder:text-[14px]"
                        type="text"
                        placeholder="Telephone"
                    />
                    {isEmpty.telephone && <p className="text-red-500 text-[14px]">Telephone is empty</p>}

                    <h2 className="text-[#8f8e8e] mb-1 mt-[15px]">Name:</h2>
                    <input
                        name="name"
                        onChange={handleChange}
                        value={user.name}
                        className="py-2 px-5 bg-[#ececec] text-[14px] rounded-md w-[100%] focus:outline-none placeholder:text-[#4d4c4c] placeholder:text-[14px]"
                        type="text"
                        placeholder="Name"
                    />
                    {isEmpty.name && <p className="text-red-500 text-[14px]">Name is empty</p>}

                    <h2 className="text-[#8f8e8e] mb-1 mt-[15px]">Password:</h2>
                    <input
                        name="password"
                        onChange={handleChange}
                        value={user.password}
                        className="py-2 px-5 bg-[#ececec] text-[14px] rounded-md w-[100%] focus:outline-none placeholder:text-[#4d4c4c] placeholder:text-[14px]"
                        type="password"
                        placeholder="Password"
                    />
                    {isEmpty.password && <p className="text-red-500 text-[14px]">Password is empty</p>}

                    <button
                        type="submit"
                        className="block mt-8 bg-[#535353] text-white text-[14px] font-medium w-[140px] h-[40px] rounded-lg mx-auto"
                    >
                        Sign up
                    </button>
                </form>
            </div>
            <a href="/login" className="flex justify-center mt-10 text-[#8f8e8e]">
                <p>Login?</p>
            </a>
        </div>
    );
}

export default Register;
