import { RoutesConfig } from '~/configs/routesConfig';
import Dashboard from '~/pages/dashboard';
import Device from '~/pages/device';
import Home from '~/pages/home';
import Login from '~/pages/login';
import Project from '~/pages/project';
import Register from '~/pages/register';

const publicRoutes = [
    { path: RoutesConfig.login, component: Login },
    { path: RoutesConfig.register, component: Register },
];

const privateRoutes = [
    { path: RoutesConfig.home, component: Home },
    { path: RoutesConfig.project, component: Project },
    { path: RoutesConfig.device, component: Device },
    { path: RoutesConfig.dashboard, component: Dashboard }
];



export { publicRoutes, privateRoutes };
