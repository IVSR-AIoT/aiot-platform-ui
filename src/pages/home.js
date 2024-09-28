import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    return (
        <div>
            <h1> Home page</h1>
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

export default Home;
