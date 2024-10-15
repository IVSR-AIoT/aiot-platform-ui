import { Switch } from 'antd';

export const columns = [
    {
        title: 'Checked',
        dataIndex: 'checked',
        key: 'checked',
        render: (_, record) => {
            return <Switch checkedChildren="Replied" unCheckedChildren="Not Replied" value={record.isReplied} />;
        },
    },
    {
        title: 'Issue Subject',
        dataIndex: 'subject',
        key: 'subject',
    },
    {
        title: 'User Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'User ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Request Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
    {
        title: 'Response Date',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
    },
    {
        title: 'Admin Response',
        dataIndex: 'adminResponse',
        key: 'adminResponse',
    },
];
