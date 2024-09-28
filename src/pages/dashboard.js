import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    return (
        <div>
            <h1>Dashboard page</h1>
            <button
                onClick={() => {
                    handleLogout();
                }}
            >
                logout
            </button>
        </div>
    );
}

export default Dashboard;
