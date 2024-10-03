import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkLogin } from '~/services/userService';

function Login() {
    const [form, setForm] = useState({
        username: '',
        password: '',
    });
    const [isVisible, setIsVisible] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);
    const [isEmptyPass, setIsEmptyPass] = useState(false);
    const navigate = useNavigate();

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

    const handleLogin = async (e) => {
        e.preventDefault();
        if (form.username.trim() === '' || form.password.trim() === '') {
            if (form.username.trim() === '') setIsEmpty(true);
            if (form.password.trim() === '') setIsEmptyPass(true);
            return;
        }

        try {
            const res = await checkLogin(form);
            localStorage.setItem('token', res.data.accessToken);
            if (res.status === 201) {
                navigate('/');
            }
        } catch (err) {
            showAlert();
        }
    };

    return (
        <div className="w-[100%] h-[screen]">
            {isVisible && (
                <div
                    className={`flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 absolute top-0 right-0 transition-opacity duration-300`}
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
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">
                            Incorrect username or password. Type the correct username and password, and try again.
                        </span>
                    </div>
                </div>
            )}
            <h1 className="text-[60px] text-center mt-20 text-[#8f8e8e]">Login</h1>
            <p className="text-[14px] text-center text-[#8f8e8e] my-[20px]">Sign in to continue</p>

            <div className="flex justify-center">
                <form className="w-[300px]">
                    <h2 className="text-[#8f8e8e] my-1">EMAIL:</h2>
                    <input
                        onChange={(e) => {
                            setForm({
                                ...form,
                                username: e.target.value,
                            });
                            setIsEmpty(false);
                        }}
                        required
                        className="py-2 px-5 bg-[#ececec] text-[14px] rounded-md w-[100%] focus:outline-none placeholder:text-[#4d4c4c] placeholder:text-[14px]"
                        type="text"
                        value={form.username}
                        placeholder="Type your email"
                    />
                    {isEmpty && <p className="text-red-500 text-[14px]">Username is empty</p>}

                    <h2 className="text-[#8f8e8e] mt-6 mb-1">PASSWORD:</h2>
                    <input
                        onChange={(e) => {
                            setForm({
                                ...form,
                                password: e.target.value,
                            });
                            setIsEmptyPass(false);
                        }}
                        required
                        className="px-5 py-2 bg-[#ececec] rounded-md w-[100%] focus:outline-none placeholder:text-[#4d4c4c] placeholder:text-[14px]"
                        type="password"
                        value={form.password}
                        placeholder="Type your password"
                    />
                    {isEmptyPass && <p className="text-red-500 text-[14px]">Password is empty</p>}

                    <button
                        onClick={handleLogin}
                        type="submit"
                        className="block mt-8 bg-[#535353] text-white text-[14px] font-medium w-[140px] h-[40px] rounded-lg mx-auto"
                    >
                        Sign up
                    </button>
                </form>
            </div>
            <a href="/register" className="flex justify-center mt-10 text-[#8f8e8e]">
                <p>Create new account?</p>
            </a>
        </div>
    );
}

export default Login;
