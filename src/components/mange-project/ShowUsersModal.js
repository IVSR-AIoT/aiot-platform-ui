import { Button, Checkbox, List, Modal, message } from 'antd';
import { useState } from 'react';
import { updateProject } from '~/services/projectServices';
import { getListUser } from '~/services/userService';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export default function ShowUsersModal({
    detailUsersInProject,
    userIdsInProject,
    isOpenUserModal,
    setIsOpenUserModal,
    setUserIdsInProject,
    detailProject,
    setDetailUsersInProject,
}) {
    const [selectedUserIds, setSelectedUserIds] = useState([]);
    const [isAddUserModal, setIsAddUserModal] = useState(true);
    const [userNotInProject, setUserNotInProject] = useState([]);
    const [modal, contextHolder] = Modal.useModal();

    const confirm = (projectId, userId) => {
        modal.confirm({
            title: 'Confirmation',
            icon: <ExclamationCircleOutlined />,
            content: 'Are you sure you want to remove this user from the project?',
            okText: 'Confirm',
            onOk: () => handleRemoveUserFromProject(projectId, userId),
            cancelText: 'Cancel',
        });
    };
    const handleOk = () => {
        setIsOpenUserModal(false);
        setIsAddUserModal(true);
        setSelectedUserIds([]);
        if (!isAddUserModal) {
            UpdateAddUser(detailProject.id);
        }
    };

    const UpdateAddUser = async (projectId) => {
        const updatedProjectData = {
            name: detailProject.name,
            description: detailProject.description,
            userIds: [...selectedUserIds, ...userIdsInProject],
        };

        try {
            await updateProject(projectId, updatedProjectData);
            message.success('Users added to the project successfully!');
            setSelectedUserIds([]);
        } catch (error) {
            message.error('Failed to add users to the project. Please try again.');
        }
    };

    const handleCancel = () => {
        setIsOpenUserModal(false);
        setIsAddUserModal(true);
        setSelectedUserIds([]);
    };

    const handleCheckboxChange = (value) => {
        setSelectedUserIds((prevSelected) => {
            if (prevSelected.includes(value)) {
                return prevSelected.filter((id) => id !== value);
            } else {
                return [...prevSelected, value];
            }
        });
    };

    const handleGetTotalUsers = async () => {
        try {
            const res = await getListUser(2);
            const data = res.items
                .filter((item) => !userIdsInProject.includes(item.id))
                .map((user) => ({ value: user.id, email: user.email, name: user.name }));
            setUserNotInProject(data);
        } catch {}
    };

    const handleRemoveUserFromProject = async (projectId, userId) => {
        const updatedProjectData = {
            name: detailProject.name,
            description: detailProject.description,
            userIds: userIdsInProject.filter((item) => item !== userId),
        };

        try {
            await updateProject(projectId, updatedProjectData);
            message.success('User removed from the project successfully!');
            setDetailUsersInProject((prev) => prev.filter((user) => user.value !== userId));
            setUserIdsInProject((prev) => prev.filter((id) => id !== userId));
        } catch {
            message.error('Failed to remove the user from the project. Please try again.');
        }
    };

    return (
        <Modal
            title={
                <Button
                    type="primary"
                    onClick={() => {
                        setIsAddUserModal(!isAddUserModal);
                        if (isAddUserModal) {
                            handleGetTotalUsers();
                        }
                    }}
                >
                    {isAddUserModal ? 'Switch to Add User View' : 'Return to User List'}
                </Button>
            }
            okText={isAddUserModal ? 'Ok' : 'Add'}
            open={isOpenUserModal}
            onOk={handleOk}
            onCancel={handleCancel}
        >
            {isAddUserModal ? (
                <List
                    dataSource={detailUsersInProject}
                    renderItem={(item) => (
                        <List.Item key={item.email}>
                            <List.Item.Meta
                                title={
                                    <div>
                                        {item.name} - {item.email}
                                    </div>
                                }
                            />
                            <Button danger ghost onClick={() => confirm(detailProject.id, item.value)}>
                                Delete
                            </Button>
                        </List.Item>
                    )}
                />
            ) : (
                <List
                    dataSource={userNotInProject}
                    renderItem={(item) => (
                        <List.Item key={item.email}>
                            <Checkbox
                                value={item.value}
                                className="mr-2"
                                onChange={() => handleCheckboxChange(item.value)}
                                checked={selectedUserIds.includes(item.value)}
                            />

                            <List.Item.Meta
                                title={
                                    <div>
                                        {item.name} - {item.email}
                                    </div>
                                }
                            />
                        </List.Item>
                    )}
                />
            )}
            {contextHolder}
        </Modal>
    );
}
