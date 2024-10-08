import { isAdmin } from '~/hook/useAuth';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { deleteProject } from '~/services/projectServices';
import { message, Popconfirm } from 'antd';
import { useNavigate } from 'react-router-dom';
export default function Card({ data, getProjectFunc, onclick }) {
    const navigate = useNavigate();

    const deleteProjectFunc = async () => {
        try {
            const res = await deleteProject(data.project.id);
            message.success('success');
            getProjectFunc();
            return res;
        } catch (error) {
            message.error('failed');
            if (error.status === 401) {
                localStorage.removeItem('accessToken');
                navigate('/login');
            }
        }
    };

    return (
        <div className="w-[80%]  p-4 bg-white border border-gray-200 rounded-lg shadow">
            <div className="flex justify-between h-[40px] border-b-2 items-center">
                <p>{data.project.name}</p>
                {isAdmin() ? (
                    <div className="flex">
                        <Popconfirm
                            title="Delete Project"
                            description="Are you sure you want to delete this project?"
                            onConfirm={deleteProjectFunc}
                            okText="Yes"
                            cancelText="No"
                            placement="topLeft"
                        >
                            <button>
                                <DeleteOutlined className="text-[20px] hover:text-blue-600 transition-colors" />
                            </button>
                        </Popconfirm>
                        <button
                            onClick={() => {
                                onclick(data);
                            }}
                        >
                            <EditOutlined className="text-[20px] hover:text-blue-600 transition-colors ml-3" />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => {
                            onclick(data);
                        }}
                    >
                        <EyeOutlined className="text-[20px] hover:text-blue-600 transition-colors" />
                    </button>
                )}
            </div>
            <p>{data.project.description}</p>
        </div>
    );
}
