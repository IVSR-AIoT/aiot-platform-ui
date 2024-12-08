import { useCallback, useEffect, useState } from 'react'
import Dialog from '~/components/project/dialog'
import { getListProjectService, getProject } from '~/services/projectServices'
import ProjectCard from '~/components/project/card'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'
import CreateSupportModal from '~/components/manage-support/createSupportModal'
import { isUser } from '~/hook/useAuth'

export default function Project() {
  const [totalProjects, setTotalProjects] = useState([])
  const navigate = useNavigate
  const [selectedProject, setSelectedProject] = useState(null)
  const handleGetProject = (data) => {
    setSelectedProject(data)
  }
  const handleCloseDialog = () => {
    setSelectedProject(null)
  }

  const getProjectFunc = useCallback(async () => {
    try {
      if (isUser()) {
        const res = await getProject()
        setTotalProjects(res.data)
      } else {
        const res = await getListProjectService()
        setTotalProjects(res)
      }
    } catch (error) {
      message.error(error)
      if (error.status === 401) {
        localStorage.removeItem('accessToken')
        navigate('/')
      }
    }
  }, [navigate])
  useEffect(() => {
    getProjectFunc()
  }, [getProjectFunc])

  return (
    <div className="h-screen bg-[#F0F2F5] p-5">
      <div>
        <Dialog
          data={selectedProject}
          onclose={handleCloseDialog}
          getProjectFunc={getProjectFunc}
        />
      </div>

      <div className="grid lg:grid-cols-5 md:grid-cols-2 place-content-center place-items-center gap-4 mt-5">
        {totalProjects.map((project, index) => {
          return (
            <ProjectCard
              key={index}
              data={project}
              getProjectFunc={getProjectFunc}
              onclick={handleGetProject}
            />
          )
        })}
      </div>
      <CreateSupportModal />
    </div>
  )
}
