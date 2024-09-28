import { useState } from 'react';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isEmpty, setIsEmpty] = useState(false);
    const [isEmptyPass, setIsEmptyPass] = useState(false);
    return (
        <div>
            <h1 className="text-[60px] text-center mt-[50px] text-[#8f8e8e] mb-[30px]">Register</h1>
            <div className="flex justify-center">
                <form className="w-[300px]">
                    <h2 className="text-[#8f8e8e] my-1">EMAIL:</h2>
                    <input
                        onChange={(e) => {}}
                        required
                        className="py-2 px-5 bg-[#ececec] text-[14px] mb-[15px] rounded-md w-[100%] focus:outline-none placeholder:text-[#4d4c4c] placeholder:text-[14px]"
                        type="text"
                        value={username}
                        placeholder="Type your email"
                    />
                    <h2 className="text-[#8f8e8e] my-1">EMAIL:</h2>
                    <input
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setIsEmpty(false);
                        }}
                        required
                        className="py-2 px-5 bg-[#ececec] text-[14px] mb-[15px] rounded-md w-[100%] focus:outline-none placeholder:text-[#4d4c4c] placeholder:text-[14px]"
                        type="text"
                        value={username}
                        placeholder="Type your email"
                    />
                    <h2 className="text-[#8f8e8e] my-1">EMAIL:</h2>
                    <input
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setIsEmpty(false);
                        }}
                        required
                        className="py-2 px-5 bg-[#ececec] text-[14px] mb-[15px] rounded-md w-[100%] focus:outline-none placeholder:text-[#4d4c4c] placeholder:text-[14px]"
                        type="text"
                        value={username}
                        placeholder="Type your email"
                    />
                    <h2 className="text-[#8f8e8e] my-1">EMAIL:</h2>
                    <input
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setIsEmpty(false);
                        }}
                        required
                        className="py-2 px-5 bg-[#ececec] text-[14px] mb-[15px] rounded-md w-[100%] focus:outline-none placeholder:text-[#4d4c4c] placeholder:text-[14px]"
                        type="text"
                        value={username}
                        placeholder="Type your email"
                    />
                </form>
            </div>
        </div>
    );
}
export default Register;
