import { Button, Form, Input, message, Modal, Select } from 'antd';
import { useEffect, useState } from 'react';
import { isAdmin, isUser } from '~/hook/useAuth';
import { createProject, getUserInProject, updateProject } from '~/services/projectServices';
import { getListUser } from '~/services/userService';

function Dialog({ getProjectFunc, data, onclose }) {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [totalUser, setTotalUser] = useState([]);
    const [userInProject, setUserInProject] = useState([]);

    const onCreate = async (value) => {
        value.description = value.description || '';
        value.userIds = value.userIds || [];

        try {
            if (data) {
                const res = await updateProject(data.project.id, value);
            } else {
                const res = await createProject(value);
            }
            form.resetFields();
            message.success('Project created successfully');
            setOpen(false);
            getProjectFunc();
            onclose();
        } catch (error) {
            message.error('Failed to create project');
        }
    };

    const handleCancel = () => {
        setOpen(false);
        onclose();
        form.resetFields();
    };

    const getTotalUser = async () => {
        try {
            const res = await getListUser(2);
            const users = res.items.map((item) => ({
                label: item.email,
                value: item.id,
            }));
            setTotalUser(users);
        } catch (error) {
            message.error('Error in getting user list');
        }
    };

    const getUserByProjectId = async (projectId) => {
        try {
            const res = await getUserInProject(projectId);
            const projectUsers = res.data.map((item) => item.id);
            setUserInProject(projectUsers);
        } catch (error) {
            console.log(error);
            message.error('Error in getting project users');
        }
    };

    useEffect(() => {
        if (data) {
            getUserByProjectId(data.project.id);
        } else {
            getTotalUser();
        }
    }, [data]);

    useEffect(() => {
        if (data && userInProject.length > 0) {
            form.setFieldsValue({
                name: data.project.name,
                description: data.project.description,
                userIds: userInProject,
            });
        }
    }, [userInProject, data]);

    return (
        <>
            {isAdmin() && (
                <Button type="primary" onClick={() => setOpen(true)}>
                    Add project
                </Button>
            )}

            <Modal
                open={open || !!data}
                title={isUser() ? 'View project' : (data ? 'Edit project' : 'Create a new project')}
                okText={isAdmin() ? 'Submit' : null}
                cancelText={isAdmin() ? 'Cancel' : null}
                onCancel={handleCancel}
                onOk={form.submit}
                destroyOnClose
            >
                <Form
                    layout="vertical"
                    form={form}
                    name="form_in_modal"
                    initialValues={{
                        name: '',
                        description: '',
                        userIds: [],
                    }}
                    onFinish={onCreate}
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the name of the project!',
                            },
                        ]}
                    >
                        <Input placeholder="Name" disabled={isUser()} className="cursor-pointer" />
                    </Form.Item>

                    <Form.Item name="userIds" label="Users in Project">
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="Select or add users"
                            options={totalUser}
                            value={userInProject}
                            onChange={(value) => setUserInProject(value)}
                            autoClearSearchValue={true}
                            disabled={isUser()}
                            className="cursor-pointer"
                        />
                    </Form.Item>

                    <Form.Item name="description" label="Description">
                        <Input.TextArea placeholder="Description" disabled={isUser()} className="cursor-pointer" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default Dialog;
