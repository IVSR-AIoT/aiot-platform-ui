import { Switch, Tooltip } from 'antd';

export const columns = [
    {
        title: 'Checked',
        dataIndex: 'checked',
        key: 'checked',
        render: (_, record) => {
            return (
                <Tooltip title={'Click to open dialog for response issue'} placement="topLeft" color="volcano">
                    <Switch checked={record.isReplied} checkedChildren="Replied" unCheckedChildren="Not Replied" />
                </Tooltip>
            );
        },
        width: 120,
    },
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        ellipsis: true,
        width: 70, 
    },
    {
        title: 'Issue Subject',
        dataIndex: 'subject',
        key: 'subject',
        ellipsis: true,
        width: 180, 
    },
    {
        title: 'User Name',
        dataIndex: 'username',
        key: 'username',
        ellipsis: true,
        width: 120,
    },
    {
        title: 'Request Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        ellipsis: true,
        width: 140, 
    },
    {
        title: 'Response Date',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        ellipsis: true,
        width: 140, 
    },
    {
        title: 'Admin Response',
        dataIndex: 'adminName',
        key: 'adminName',
        ellipsis: true,
        width: 150, 
    },
];
