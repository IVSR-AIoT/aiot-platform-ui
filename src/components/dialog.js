import { getListUser } from '~/services/userService';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import Select from 'react-select';
import { createProject, updateProject, getUserInProject } from '~/services/projectServices';
import { isAdmin } from '~/hook/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
const fetcher = async (roleId) => {
    const res = await getListUser(roleId);
    return res.items.map((user) => ({ value: user.id, label: user.email }));
};

export default function Dialog({ closeDialog, getProjectFunc, data }) {
    const [projectForm, setProjectForm] = useState({
        name: '',
        description: '',
        userIds: [],
    });
    const [selectedUser, setSelectedUser] = useState([]);
    const { data: Users } = useSWR(2, fetcher);

    const getUser = async () => {
        try {
            const res = await getUserInProject(data.project.id);
            const users = res.data.map((user) => ({ value: user.id, label: user.email }));
            setSelectedUser(users);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        if (data) {
            getUser();
            setProjectForm({
                name: data.project.name,
                description: data.project.description,
            });
        } else {
            setProjectForm({
                name: '',
                description: '',
                userIds: [],
            });
        }
    }, []);

    const setDataForm = (e, field) => {
        setProjectForm((prev) => ({
            ...prev,
            [field]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            ...projectForm,
            userIds: selectedUser.map((user) => {
                return user.value;
            }),
        };

        try {
            if (data) {
                await updateProject(data.project.id, formData);
            } else {
                await createProject(formData);
            }
            toast.success('success');
            closeDialog();
            getProjectFunc();
        } catch (err) {
            toast.error('error');
        }
    };

    return (
        <div className="w-[300px] h-auto bg-slate-300 p-4 relative rounded-lg">
            <h1 className="text-2xl text-center my-3">Project Detail</h1>

            <FontAwesomeIcon
                onClick={closeDialog}
                icon={faXmark}
                class="size-5 absolute top-0 right-0 mt-2 mr-2 cursor-pointer"
            />

            <form className="mb-[40px]">
                <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project name:</p>
                <input
                    onChange={(e) => {
                        setDataForm(e, 'name');
                    }}
                    required
                    value={projectForm.name}
                    name="name"
                    type="text"
                    disabled={!isAdmin()}
                    placeholder="Name"
                    className={`cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5 ${
                        !isAdmin() ? `cursor-not-allowed` : ''
                    }`}
                />

                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-[15px]">
                    Select user in project
                </label>
                <Select
                    styles={{
                        control: (provided) => ({
                            ...provided,
                            cursor: 'pointer', 
                        }),
                    }}
                    options={Users}
                    isMulti
                    onChange={setSelectedUser}
                    value={selectedUser}
                    isDisabled={!isAdmin()}
                />

                <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-[15px]">
                    Project description:
                </p>
                <textarea
                    onChange={(e) => {
                        setDataForm(e, 'description');
                    }}
                    rows={4}
                    value={projectForm.description}
                    name="description"
                    disabled={!isAdmin()}
                    placeholder="Description"
                    className={`cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5 ${
                        !isAdmin() ? `cursor-not-allowed` : ''
                    }`}
                />
            </form>
            {isAdmin() && (
                <div className="flex justify-center">
                    <button
                        onClick={closeDialog}
                        type="button"
                        class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 w-[100px]"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={!isAdmin()}
                        onClick={handleSubmit}
                        type="button"
                        className={`text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 w-[100px] ${
                            !isAdmin() ? `cursor-not-allowed` : ''
                        }`}
                    >
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
}
