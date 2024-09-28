import { RoutesConfig } from '~/configs/routesConfig';
import Dashboard from '~/pages/dashboard';
import Home from '~/pages/home';
import Login from '~/pages/login';
import Register from '~/pages/register';

const publicRoutes = [
    { path: RoutesConfig.login, component: Login },
    { path: RoutesConfig.register, component: Register },
];

const userRoutes = [{ path: RoutesConfig.home, component: Home }];
const adminRoutes = [{ path: RoutesConfig.dashboard, component: Dashboard }];

export { publicRoutes,userRoutes, adminRoutes };
