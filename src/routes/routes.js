import { RoutesConfig } from '~/configs/routesConfig';
import Dashboard from '~/pages/dashboard';
import Home from '~/pages/home';
import Login from '~/pages/login';
import Project from '~/pages/project';
import Register from '~/pages/register';

const publicRoutes = [
    { path: RoutesConfig.login, component: Login },
    { path: RoutesConfig.register, component: Register },
];

const userRoutes = [
    { path: RoutesConfig.home, component: Home },
    { path: RoutesConfig.project, component: Project },
];
const adminRoutes = [{ path: RoutesConfig.dashboard, component: Dashboard }];

export { publicRoutes, userRoutes, adminRoutes };
