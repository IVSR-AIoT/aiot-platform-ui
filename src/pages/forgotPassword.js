import { Input, Button, message } from 'antd';
import { useState } from 'react';
import { forgotPassword } from '~/services/userService';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const data = { email: email };
        try {
            await forgotPassword(data);
            message.success('Submit successful!');
        } catch (error) {
            message.error('Fail to submit email');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-[350px] h-[280px] p-6 shadow-2xl rounded-xl">
                <h2 className="text-[30px] text-center font-bold ">AIOT platform</h2>
                <h1 className="text-[24px] text-center mb-8">Forgot your Password</h1>
                <div className="w-full">
                    <Input
                        className="pt-2"
                        placeholder="Enter your email"
                        value={email}
                        type="email"
                        required
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />

                    <Button type="primary" className="w-full mt-5 mb-3" onClick={handleSubmit}>
                        Submit
                    </Button>
                    <Button
                        type="text"
                        className="w-full"
                        onClick={() => {
                            navigate('/');
                        }}
                    >
                        Back to home
                    </Button>
                </div>
            </div>
        </div>
    );
}
