import {
  SignalFilled,
  MailOutlined,
  ProjectOutlined,
  PhoneOutlined,
  ProjectFilled,
  SettingOutlined,
  AlertFilled
} from '@ant-design/icons'
export const listItems = [
  {
    key: 'sub1',
    label: 'Project management',
    icon: <ProjectFilled />,
    children: [
      {
        key: '1',
        icon: <AlertFilled />,
        label: 'Alert',
        route: '/alert'
      },
      {
        key: '4',
        icon: <SignalFilled />,
        label: 'Chart',
        route: '/chart'
      },
      {
        key: '2',
        icon: <ProjectOutlined />,
        label: 'Project',
        route: '/project'
      },
      {
        key: '3',
        icon: <PhoneOutlined />,
        label: 'Device',
        route: '/device',
        roleid: 2
      }
    ]
  },
  {
    key: 'sub2',
    label: 'Manage Support',
    route: '/manage-support',
    roleid: 2,
    icon: <MailOutlined />
  },
  {
    key: 'sub3',
    label: 'Manage Project',
    route: '/manage-project',
    roleid: 2,
    icon: <SettingOutlined />
  }
]
