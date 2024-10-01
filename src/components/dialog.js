import { getListUser } from '~/services/userService';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import Select from 'react-select';
import { createProject, updateProject, getUserInProject } from '~/services/projectServices';
import { isAdmin } from '~/hook/useAuth';

const fetcher = async (roleId) => {
    const res = await getListUser(roleId);
    return res.items.map((user) => ({ value: user.id, label: user.email }));
};

export default function Dialog({ closeDialog, getProjectFunc, data }) {
    const [alert, setAlert] = useState({
        success: false,
        fail: false,
    });
    const [project, setProject] = useState({
        name: '',
        description: '',
        userIds: [],
    });
    const [isEmpty, setIsEmpty] = useState({
        name: true,
        description: true,
        user: true,
    });
    const [selectedUser, setSelectedUser] = useState([]);
    const { data: Users, error, isLoading } = useSWR(2, fetcher);

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
            setProject({
                name: data.project.name,
                description: data.project.description,
            });
        } else {
            setProject({
                name: '',
                description: '',
                userIds: [],
            });
        }
    }, []);

    const setDataForm = (e, field) => {
        setProject((prev) => ({
            ...prev,
            [field]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (project.description.trim() === '' || project.name.trim() === '') {
            if (project.description.trim() === '') {
                setIsEmpty((prev) => ({
                    ...prev,
                    description: false,
                }));
            }
            if (project.name.trim() === '') {
                setIsEmpty((prev) => ({
                    ...prev,
                    name: false,
                }));
            }
            return;
        }
        if (selectedUser.length === 0) {
            setIsEmpty((prev) => ({
                ...prev,
                user: false,
            }));
            return;
        }

        const formData = {
            ...project,
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
            setAlert((prev) => ({
                ...prev,
                success: true,
            }));
            setTimeout(() => {
                closeDialog();
            }, 1000);

            getProjectFunc();
        } catch (err) {
            setAlert((prev) => ({
                ...prev,
                fail: true,
            }));
            closeDialog();
            setTimeout(() => {
                setAlert((prev) => ({
                    ...prev,
                    fail: false,
                }));
            }, 1000);
        }
    };

    if (isLoading) return <p>Loading...</p>;

    if (error) return <p>Failed to load users.</p>;

    return (
        <div className="w-[300px] h-auto bg-slate-300 p-2 relative rounded-lg">
            {alert.success && (
                <div class="p-4 my-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 ">
                    <span class="font-medium">Success alert!</span> Change a few things up and try submitting again.
                </div>
            )}
            {alert.fail && (
                <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400">
                    <span class="font-medium">Danger alert!</span> Change a few things up and try submitting again.
                </div>
            )}
            <h1 className="text-2xl text-center my-3">Project Detail</h1>
            <svg
                onClick={closeDialog}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="size-4 absolute top-0 right-0 mt-1 mr-1 cursor-pointer"
            >
                <path
                    fill-rule="evenodd"
                    d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                    clip-rule="evenodd"
                />
            </svg>

            <form className="mb-[40px]">
                <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Project name:</p>
                <input
                    onChange={(e) => {
                        setDataForm(e, 'name');
                        setIsEmpty((prev) => ({
                            ...prev,
                            name: true,
                        }));
                    }}
                    required
                    value={project.name}
                    name="name"
                    type="text"
                    disabled={!isAdmin()}
                    placeholder="Name"
                    className={`cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5`}
                />
                {!isEmpty.name && <p className="text-red-500 text-[14px]">Name is empty</p>}

                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-[15px]">
                    Select user in project
                </label>
                <Select
                    options={Users}
                    isMulti
                    onChange={setSelectedUser}
                    value={selectedUser}
                    isDisabled={!isAdmin()}
                />

                <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-[15px]">
                    Project description:
                </p>
                <input
                    onChange={(e) => {
                        setDataForm(e, 'description');
                        setIsEmpty((prev) => ({
                            ...prev,
                            description: true,
                        }));
                    }}
                    value={project.description}
                    name="description"
                    type="text"
                    disabled={!isAdmin()}
                    placeholder="Description"
                    className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 focus:outline-none block w-full p-2.5 "
                />
                {!isEmpty.description && <p className="text-red-500 text-[14px]">Description is empty</p>}
            </form>
            <div className="flex justify-center">
                <button
                    disabled={!isAdmin()}
                    onClick={closeDialog}
                    type="button"
                    class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 w-[100px]"
                >
                    Cancel
                </button>
                <button
                    onClick={handleSubmit}
                    type="button"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 w-[100px]"
                >
                    Submit
                </button>
            </div>
        </div>
    );
}
