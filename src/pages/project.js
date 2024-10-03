import { useEffect, useState } from 'react';
import Dialog from '~/components/dialog';
import { isAdmin } from '~/hook/useAuth';
import { getProject } from '~/services/projectServices';
import Card from '~/components/card';

export default function Project() {
    const [dataProject, setDataProject] = useState(null);
    const [projects, setProjects] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);

    const getProjectData = (data) => {
        console.log(data);
        setDataProject(data);
    };

    const closeDialog = () => {
        if (openDialog) {
            return setOpenDialog(false);
        } else {
            setOpenDialog(true);
        }
    };

    const getProjectFunc = async () => {
        try {
            const res = await getProject();
            setProjects(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProjectFunc();
    }, []);

    return (
        <div className="w-[100%] h-screen mt-[60px]">
            {openDialog && <div className="w-[100%] h-[100%] fixed  inset-0 bg-black opacity-50 z-40"></div>}

            <div>
                <div className="flex justify-end ">
                    {isAdmin() && (
                        <button
                            className="flex justify-center items-center mr-[30px] p-2 bg-slate-300 rounded-2xl mt-3"
                            onClick={() => {
                                setOpenDialog(true);
                                setDataProject(null);
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="size-6"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <p>Add project</p>
                        </button>
                    )}
                </div>
                <div className="flex justify-center absolute top-[50%] left-[50%] -translate-y-2/4 translate-x-[-50%] z-50">
                    {openDialog && (
                        <Dialog closeDialog={closeDialog} getProjectFunc={getProjectFunc} data={dataProject} />
                    )}
                </div>
            </div>

            <div className="flex w-[100%] flex-wrap">
                {projects.map((project, index) => {
                    return (
                        <div key={index} className="w-[20%] flex justify-center  mt-[20px]">
                            <Card
                                data={project}
                                setOpenDialog={setOpenDialog}
                                closeDialog={closeDialog}
                                getProjectData={getProjectData}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
