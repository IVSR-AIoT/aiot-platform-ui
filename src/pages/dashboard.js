import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAdmin, isAuthentication } from '~/hook/useAuth';
function Dashboard() {
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthentication()) {
            navigate('/login');
        } else if (!isAdmin()) {
            navigate('/');
        }
    });
    return (
        <div className="h-screen">
            <h1>this is Dashboard</h1>
        </div>
    );
}

export default Dashboard;
