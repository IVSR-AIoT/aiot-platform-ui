import { RoutesConfig } from '~/configs/routesConfig';
import Dashboard from '~/pages/dashboard';
import Home from '~/pages/home';
import Login from '~/pages/login';
import Register from '~/pages/register';

const publicRoutes = [
    { path: RoutesConfig.login, component: Login },
    { path: RoutesConfig.register, component: Register },
];

const privateRoutes = [
    { path: RoutesConfig.home, component: Home },
    { path: RoutesConfig.dashboard, component: Dashboard },
];

export { publicRoutes, privateRoutes };
