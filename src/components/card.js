import { isAdmin } from '~/hook/useAuth';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { deleteProject } from '~/services/projectServices';
import { toast } from 'react-toastify';
export default function Card({ data, getProjectData, setOpenDialog, getProjectFunc }) {
    const handleOpenDialog = () => {
        getProjectData(data);
        setOpenDialog(true);
    };

    const deleteProjectFunc = async () => {
        try {
            const res = await deleteProject(data.project.id);
            toast.success('success');
            getProjectFunc();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="w-[80%] h-[200px] p-4 bg-white border border-gray-200 rounded-lg shadow">
            <div className="flex justify-between h-[40px] border-b-2">
                <p>{data.project.name}</p>
                {isAdmin() ? (
                    <div className="flex">
                        <button onClick={deleteProjectFunc}>
                            <DeleteOutlined className="text-[20px] hover:text-blue-600 transition-colors" />
                        </button>
                        <button onClick={handleOpenDialog}>
                            <EditOutlined className="text-[20px] hover:text-blue-600 transition-colors" />
                        </button>
                    </div>
                ) : (
                    <button onClick={handleOpenDialog}>
                        <EyeOutlined className="text-[20px] hover:text-blue-600 transition-colors" />
                    </button>
                )}
            </div>
            <p>{data.project.description}</p>
        </div>
    );
}
