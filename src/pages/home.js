import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="h-[100%]">
            <h1>Welcome to the Home Page</h1>

            <Link to="/dashboard" className="bg-slate-200">
                Go to dashboard
            </Link>
        </div>
    );
}

export default Home;
