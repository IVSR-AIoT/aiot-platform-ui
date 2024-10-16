import { Link } from 'react-router-dom';
import Header from '~/components/header';

function Home() {
    return (
        <div className="h-[100%]">
            <Header />

            <div className="mt-[60px]">
                <Link to="/dashboard" className="bg-slate-200 ">
                    Go to dashboard
                </Link>
            </div>
        </div>
    );
}

export default Home;
