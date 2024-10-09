import { publicRoutes, privateRoutes } from './routes/routes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './layout/privateLayout';

function App() {
    return (
        <Router>
            <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;

                    return <Route key={index} path={route.path} element={<Page />} />;
                })}

                {privateRoutes.map((route, index) => {
                    const Page = route.component;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <PrivateRoute>
                                    <Page />
                                </PrivateRoute>
                            }
                        />
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;
