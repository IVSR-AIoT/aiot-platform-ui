import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAdmin } from '~/hook/useAuth';
import { checkLogin } from '~/services/userService';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isEmpty, setIsEmpty] = useState(false);
    const [isEmptyPass, setIsEmptyPass] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (username.trim() === '' || password.trim() === '') {
            if (username.trim() === '') setIsEmpty(true);
            if (password.trim() === '') setIsEmptyPass(true);
            return;
        }
        const User = { username, password };

        try {
            const res = await checkLogin(User);
            localStorage.setItem('token', res.data.accessToken);
            if (res.status === 201) {
                navigate(isAdmin() ? '/dashboard' : '/');
            }
        } catch (err) {
            alert('Incorrect username or password. Type the correct username and password, and try again.');
        }
    };

    return (
        <div className="w-[100%] h-[screen]">
            <h1 className="text-[60px] text-center mt-20 text-[#8f8e8e]">Login</h1>
            <p className="text-[14px] text-center text-[#8f8e8e] my-[20px]">Sign in to continue</p>

            <div className="flex justify-center">
                <form className="w-[300px]">
                    <h2 className="text-[#8f8e8e] my-1">EMAIL:</h2>
                    <input
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setIsEmpty(false);
                        }}
                        required
                        className="py-2 px-5 bg-[#ececec] text-[14px] rounded-md w-[100%] focus:outline-none placeholder:text-[#4d4c4c] placeholder:text-[14px]"
                        type="text"
                        value={username}
                        placeholder="Type your email"
                    />
                    {isEmpty && <p className="text-red-500 text-[14px]">Username is empty</p>}

                    <h2 className="text-[#8f8e8e] mt-6 mb-1">PASSWORD:</h2>
                    <input
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setIsEmptyPass(false);
                        }}
                        required
                        className="px-5 py-2 bg-[#ececec] rounded-md w-[100%] focus:outline-none placeholder:text-[#4d4c4c] placeholder:text-[14px]"
                        type="password"
                        value={password}
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
