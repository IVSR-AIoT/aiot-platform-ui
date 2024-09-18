import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { isAdmin } from '~/hook/useAuth';

function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    return (
        <div className="w-[100%] h-[screen]">
            <h1 className="text-[60px] text-center mt-20 text-[#8f8e8e]">Login</h1>
            <p className="text-[14px] text-center text-[#8f8e8e] my-[20px]">Sign in to continue</p>

            <div className="flex justify-center">
                <form className="w-[300px]">
                    <h2 className="text-[#8f8e8e] my-1">EMAIL:</h2>
                    <input
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="py-2 px-5 bg-[#ececec] text-[14px] rounded-md w-[100%] focus:outline-none placeholder:text-[#4d4c4c] placeholder:text-[14px]"
                        type="text"
                        value={username}
                        placeholder="Type your email"
                    />

                    <h2 className="text-[#8f8e8e] mt-6 mb-1">PASSWORD:</h2>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="px-5 py-2 bg-[#ececec] rounded-md w-[100%] focus:outline-none placeholder:text-[#4d4c4c] placeholder:text-[14px]"
                        type="password"
                        value={password}
                        placeholder="Type your password"
                    />

                    <button
                        onClick={isAdmin}
                        type="submit"
                        className="block mt-8 bg-[#535353] text-white text-[14px] font-medium w-[140px] h-[40px] rounded-lg mx-auto"
                    >
                        Sign up
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
