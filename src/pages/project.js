import { useEffect, useState } from 'react';
import Dialog from '~/components/dialog';
import { isAdmin } from '~/hook/useAuth';
import { getProject } from '~/services/projectServices';
import Card from '~/components/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Project() {
    const [detailProject, setDetailProject] = useState(null);
    const [totalProjects, setTotalProjects] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate()

    const getProjectData = (data) => {
        setDetailProject(data);
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
            setTotalProjects(res.data);
        } catch (error) {
            console.log(error);
            if(error.status === 401){
                toast.error("Unauthorized");
                
                localStorage.removeItem("accessToken")
                navigate("/login")
            }
        }
    };

    useEffect(() => {
        getProjectFunc();
    }, []);

    return (
        <div>
            {openDialog && <div className=" h-screen fixed inset-0 bg-black opacity-50 z-40"></div>}

            <div>
                <div className="flex justify-end ">
                    {isAdmin() && (
                        <button
                            className="flex justify-center items-center mr-[30px] p-2 bg-slate-300 rounded-2xl mt-3"
                            onClick={() => {
                                setOpenDialog(true);
                                setDetailProject(null);
                            }}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                            <p className="ml-2">Add project</p>
                        </button>
                    )}
                </div>
                <div className="flex justify-center absolute top-[50%] left-[50%] -translate-y-2/4 translate-x-[-50%] z-50">
                    {openDialog && (
                        <Dialog closeDialog={closeDialog} getProjectFunc={getProjectFunc} data={detailProject} />
                    )}
                </div>
            </div>

            <div className="flex flex-wrap h-screen">
                {totalProjects.map((project, index) => {
                    return (
                        <div key={index} className="w-[20%] flex justify-center  mt-[20px]">
                            <Card
                                data={project}
                                setOpenDialog={setOpenDialog}
                                closeDialog={closeDialog}
                                getProjectData={getProjectData}
                                getProjectFunc={getProjectFunc}
                            />
                        </div>
                    );
                })}
            </div>

        </div>
    );
}
