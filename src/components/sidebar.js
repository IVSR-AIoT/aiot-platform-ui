import {
    HomeOutlined,
    SignalFilled,
    MailOutlined,
    SettingOutlined,
    ProjectOutlined,
    PhoneOutlined,
    ProjectFilled,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { isAdmin } from '~/hook/useAuth';
const listItems = [
    {
        key: 'sub1',
        label: 'Project management',
        icon: <ProjectFilled />,
        children: [
            {
                key: '1',
                icon: <SignalFilled />,
                roleId: 2,
                label: 'Dashboard',
                route: '/dashboard',
            },
            {
                key: '2',
                icon: <ProjectOutlined />,
                label: 'Project',
                route: '/project',
            },
            {
                key: '3',
                icon: <PhoneOutlined />,
                label: 'Device',
                route: '/device',
            },
        ],
    },
    {
        key: 'sub2',
        label: 'Hello',
        roleId: 2,
        icon: <MailOutlined />,
    },
    {
        key: 'sub3',
        label: 'Navigation Three',
        icon: <SettingOutlined />,
        children: [
            {
                key: '9',
                label: 'Option 9',
            },
            {
                key: '10',
                label: 'Option 10',
            },
            {
                key: '11',
                label: 'Option 11',
            },
            {
                key: '12',
                label: 'Option 12',
            },
        ],
    },
];

const getMenuItems = (isAdmin) => {
    const filteredItem = listItems
        .filter((item) => !item.roleId)
        .map((item) => {
            if (item.children) {
                return {
                    ...item,
                    children: item.children.filter((childItem) => !childItem.roleId),
                };
            }
        });

    return isAdmin ? listItems : filteredItem;
};

const Sidebar = () => {
    const [selectedKey, setSelectedKey] = useState('1');
    const navigate = useNavigate();
    const location = useLocation();
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        setMenuItems(getMenuItems(isAdmin()));
    }, []);

    useEffect(() => {
        const item = menuItems
            .flatMap((item) => item.children || [item])
            .find((item) => item?.route === location.pathname);
        if (item) {
            setSelectedKey(item.key);
        }
    }, [location.pathname, menuItems]);

    const onClick = (e) => {
        const clickItem = menuItems.flatMap((item) => item.children || [item]).find((item) => item.key === e.key);
        if (clickItem) {
            setSelectedKey(clickItem.key);
            navigate(clickItem.route);
        }
    };

    return (
        <Menu
            className="h-max-[100vh overflow-y-auto scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-gray-300"
            onClick={onClick}
            style={{ width: 256 }}
            selectedKeys={[selectedKey]}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={menuItems}
        />
    );
};

export default Sidebar;
