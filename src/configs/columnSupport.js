import { Switch, Tooltip } from 'antd';

export const columns = [
    {
        title: 'Checked',
        dataIndex: 'checked',
        key: 'checked',
        render: (_, record) => {
            return (
                <Tooltip title={'click to open dialog for response issue'} placement='topLeft' color='volcano'>
                    <Switch value={record.isReplied} checkedChildren="Replied" unCheckedChildren="Not Replied" />
                </Tooltip>
            );
        },
        width: 140,
    },
    {
        title: 'Issue Subject',
        dataIndex: 'subject',
        key: 'subject',
        ellipsis: true,
    },
    {
        title: 'User Name',
        dataIndex: 'name',
        key: 'name',
        ellipsis: true,
        width: 120,
    },
    {
        title: 'User ID',
        dataIndex: 'id',
        key: 'id',
        ellipsis: true,
        width: 80,
    },
    {
        title: 'Request Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        ellipsis: true,
        width: 160,
    },
    {
        title: 'Response Date',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        ellipsis: true,
        width: 160,
    },
    {
        title: 'Admin Response',
        dataIndex: 'adminResponse',
        key: 'adminResponse',
        ellipsis: true,
    },
];
