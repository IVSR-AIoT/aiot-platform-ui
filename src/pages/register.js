import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateUser } from '~/services/userService';
import { message } from 'antd';
import { Link } from 'react-router-dom';
function Register() {
    const navigate = useNavigate();
    const [registerForm, setRegisterForm] = useState({
        email: '',
        telephone: '',
        name: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await CreateUser(registerForm);
            console.log(res)
            message.success('success');
            navigate('/login');
        } catch (err) {
            console.log(err);
            message.error('Fail to register');
        }
    };

    return (
        <div>
            <div>
                <h1 className="text-[60px] text-center mt-[30px] text-[#8f8e8e] mb-[30px]">Register</h1>
                <div className="flex justify-center">
                    <form onSubmit={handleRegister} className="w-[300px]">
                        <h2 className="text-[#8f8e8e] mb-1 mt-[15px]">EMAIL:</h2>
                        <input
                            name="email"
                            onChange={handleChange}
                            value={registerForm.email}
                            className="py-2 px-5 bg-[#ececec] text-[14px] rounded-md w-[100%] focus:outline-none placeholder:text-[#4d4c4c] placeholder:text-[14px]"
                            type="text"
                            placeholder="Email"
                        />

                        <h2 className="text-[#8f8e8e] mb-1 mt-[15px]">Telephone:</h2>
                        <input
                            name="telephone"
                            onChange={handleChange}
                            value={registerForm.telephone}
                            className="py-2 px-5 bg-[#ececec] text-[14px] rounded-md w-[100%] focus:outline-none placeholder:text-[#4d4c4c] placeholder:text-[14px]"
                            type="text"
                            placeholder="Telephone"
                        />

                        <h2 className="text-[#8f8e8e] mb-1 mt-[15px]">Name:</h2>
                        <input
                            name="name"
                            onChange={handleChange}
                            value={registerForm.name}
                            className="py-2 px-5 bg-[#ececec] text-[14px] rounded-md w-[100%] focus:outline-none placeholder:text-[#4d4c4c] placeholder:text-[14px]"
                            type="text"
                            placeholder="Name"
                        />

                        <h2 className="text-[#8f8e8e] mb-1 mt-[15px]">Password:</h2>
                        <input
                            name="password"
                            onChange={handleChange}
                            value={registerForm.password}
                            className="py-2 px-5 bg-[#ececec] text-[14px] rounded-md w-[100%] focus:outline-none placeholder:text-[#4d4c4c] placeholder:text-[14px]"
                            type="password"
                            placeholder="Password"
                        />

                        <button
                            type="submit"
                            className="block mt-8 bg-[#535353] text-white text-[14px] font-medium w-[140px] h-[40px] rounded-lg mx-auto"
                        >
                            Sign up
                        </button>
                    </form>
                </div>
                <Link to="/login" className="flex justify-center mt-10 text-[#8f8e8e]">
                    <p>Login?</p>
                </Link>
            </div>
        </div>
    );
}

export default Register;
