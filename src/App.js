import { publicRoutes, adminRoutes, userRoutes } from './routes/routes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminRoutes from './auth/adminRoutes';
import UserRoutes from './auth/userRoutes';

function App() {
    return (
        <Router>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;

                    return <Route key={index} path={route.path} element={<Page />} />;
                })}

                {userRoutes.map((route, index) => {
                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <UserRoutes>
                                    <Page />
                                </UserRoutes>
                            }
                        />
                    );
                })}

                {adminRoutes.map((route, index) => {
                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <AdminRoutes>
                                    <Page />
                                </AdminRoutes>
                            }
                        />
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;
