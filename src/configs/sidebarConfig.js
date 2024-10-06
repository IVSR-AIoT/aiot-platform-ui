 import {
    faBuilding,
    faChartBar,
    faCircleInfo,
    faCircleQuestion,
    faCloud,
    faGear,
    faListCheck,
    faLocationArrow,
    faMobile,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

export const menuItems = [
    {
        title: 'Project',
        icon: faBuilding,
        subItems: [
            { label: 'Dashboard', route: 'dashboard', icon: faChartBar },
            { label: 'My Project', route: 'project', icon: faListCheck },
            { label: 'Device', route: 'device', icon: faMobile },
        ],
    },
    {
        title: 'Navigator',
        icon: faLocationArrow,
        roleId: 2,
        subItems: [
            { label: 'Option 1', route: '', icon: faUser },
            { label: 'Option 2', route: '', icon: faUser },
            { label: 'Option 3', route: '', icon: faUser },
            { label: 'Option 4', route: '', icon: faUser },
            { label: 'Option 5', route: '', icon: faUser },
            { label: 'Option 6', route: '', icon: faUser },
        ],
    },
    {
        title: 'Documentation',
        roleId: 2,
        icon: faCloud,
        route: 'documentation',
    },
    {
        title: 'Settings',
        icon: faGear,
        route: 'settings',
    },
    {
        title: 'Help',
        icon: faCircleInfo,
        subItems: [
            { label: 'FAQ', route: 'faq', icon: faCircleQuestion },
            { label: 'Contact Support', route: 'support', icon: faCloud },
        ],
    },
];
 

