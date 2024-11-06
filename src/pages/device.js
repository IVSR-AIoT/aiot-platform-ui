import { useState, useEffect, useMemo } from 'react';
import CreateSupportModal from '~/components/manage-support/createSupportModal';
import { deviceListService } from '~/services/deviceService';

import { Button, message, Switch, Table } from 'antd';
import { io } from 'socket.io-client';
import { isUser } from '~/hook/useAuth';
import { formatDate } from '~/configs/utils';
import UpdateDeviceModal from '~/components/updateDeviceModal';

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 160,
    },
    {
        title: 'Device ID',
        dataIndex: 'deviceId',
        key: 'deviceId',
    },
    {
        title: 'Project ID',
        dataIndex: 'projectId',
        key: 'projectId',
    },
    {
        title: 'Date Created',
        dataIndex: 'createdAt',
        key: 'createdAt',
        ellipsis: true,
        width: 150,
    },
    {
        title: 'Date Updated',
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        ellipsis: true,
        width: 150,
    },
];

const Device = () => {
    const [projectIdInDevice, setProjectIdInDevice] = useState([]);
    const [device, setDevice] = useState(null);
    const [dataSource, setDataSource] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const socket = io('ws://localhost:3000/socket');

    useEffect(() => {
        const onConnect = () => console.log('Connected to socket');
        const onDisconnect = () => console.log('Disconnected from socket');

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('refreshApi', getListDevices);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('refreshApi', getListDevices);
        }; // eslint-disable-next-line
    }, []);

    const modifiedColumn = useMemo(
        () => [
            {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                width: 100,
                render: (_, record) => <Switch checked={record.status} />,
            },
            ...columns,
            {
                title: 'Action',
                render: (record) => (
                    <div>
                        <Button
                            type="primary"
                            ghost
                            className="mr-2"
                            onClick={() => {
                                setOpenModal(true);
                                setDevice(record);
                            }}
                        >
                            Update
                        </Button>
                        <Button danger ghost>
                            Delete
                        </Button>
                    </div>
                ),
            },
        ],
        [],
    );

    const getListDevices = async () => {
        try {
            if (isUser()) {
                message.error('Unable to list devices!');
                return;
            }
            const res = await deviceListService();
            const deviceData = res.data;

            setProjectIdInDevice(deviceData.map((item) => item.projectId));
            setDataSource(
                deviceData.map((device, index) => ({
                    key: index,
                    id: device.id,
                    status: device.isActive,
                    name: device.name || device.mac_address,
                    createdAt: formatDate(device.createdAt),
                    updatedAt: formatDate(device.updatedAt),
                    projectId: device.projectId || '',
                    deviceId: device.deviceId,
                })),
            );
        } catch (error) {
            console.error('Failed to fetch device list:', error);
        }
    };

    useEffect(() => {
        getListDevices();
    }, []);

    return (
        <div className="h-screen p-5 bg-[#F0F2F5]">
            <CreateSupportModal />
            <Table
                columns={modifiedColumn}
                dataSource={dataSource}
                pagination
                rowClassName={(record) =>
                    record.status ? '' : 'bg-[#aaa] text-gray-500 pointer-events-none opacity-60'
                }
            />
            <UpdateDeviceModal
                openModal={openModal}
                device={device}
                projectIdInDevice={projectIdInDevice}
                setOpenModal={setOpenModal}
                getListDevices={getListDevices}
            />
        </div>
    );
};

export default Device;
