import {
  deleteProject,
  getListProjectByQuery,
  getListProjectService,
  getUserInProject
} from '~/services/projectServices'
import Search from 'antd/es/transfer/search'
import { projectColumn } from '~/configs/columnSupport'
import { Table, Button, message, Modal } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'
import UpdateInforModal from '~/components/mange-project/updateInforModal'
import CreateSupportModal from '~/components/manage-support/createSupportModal'
import { ExclamationCircleOutlined, UserAddOutlined } from '@ant-design/icons'
import { formatDate } from '~/configs/utils'
import ShowUsersModal from '~/components/mange-project/ShowUsersModal'
import useDebounce from '~/hook/useDebounce'

export default function ManageProject() {
  const [detailProject, setDetailProject] = useState([])

  const [userIdsInProject, setUserIdsInProject] = useState([])
  const [detailUsersInProject, setDetailUsersInProject] = useState([])

  const [columns, setColumns] = useState([])
  const [isOpenModal, setIsModalOpen] = useState(false)
  const [isOpenUserModal, setIsOpenUserModal] = useState(false)
  const [modal, contextHolder] = Modal.useModal()

  const [query, setQuery] = useState('')

  const debouncedValue = useDebounce(query, 300)

  const confirm = (projectId) => {
    modal.confirm({
      title: 'Delete Project',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure you want to delete this project? This action cannot be undone.',
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: () => handleDeleteProject(projectId)
    })
  }

  const getListProject = useCallback(async () => {
    try {
      let res
      if (debouncedValue.trim() === '') {
        res = await getListProjectService()
      } else {
        res = await getListProjectByQuery(debouncedValue)
      }

      const data = res.map((project, i) => {
        return {
          key: i,
          id: project.id,
          createdAt: formatDate(project.createdAt),
          updatedAt: formatDate(project.updatedAt),
          name: project.name,
          description: project.description,
          adminName: project.createdBy.name
        }
      })
      setColumns(data)
    } catch {
      message.error('Failed to fetch the project list. Please try again.')
    }
  }, [debouncedValue])

  const handleDeleteProject = async (projectId) => {
    try {
      await deleteProject(projectId)
      message.success('Project deleted successfully!')
      getListProject()
    } catch {
      message.error('Failed to delete the project. Please try again.')
    }
  }

  const handleAssignUsersToProject = async (projectId) => {
    try {
      const res = await getUserInProject(projectId)

      const userIds = res.data.map((user) => user.id)
      const detailedUsers = res.data.map((user) => ({
        value: user.id,
        email: user.email,
        name: user.name
      }))

      setDetailUsersInProject(detailedUsers)
      setUserIdsInProject(userIds)
    } catch {}
  }

  useEffect(() => {
    getListProject()
  }, [getListProject])

  const modifiedProjectColumn = useMemo(() => {
    return [
      {
        title: 'Users',
        dataIndex: 'user',
        key: 'user',
        width: 100,
        render: (_, record) => {
          return (
            <div>
              <Button
                type="primary"
                onClick={() => {
                  handleAssignUsersToProject(record.id)
                  setIsOpenUserModal(true)
                  setDetailProject(record)
                }}
              >
                <UserAddOutlined />
              </Button>
            </div>
          )
        }
      },
      ...projectColumn,
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        width: 180,
        render: (_, record) => (
          <div>
            <Button
              type="primary"
              ghost
              className="mr-2"
              onClick={() => {
                handleAssignUsersToProject(record.id)
                setIsModalOpen(true)
                setDetailProject(record)
              }}
            >
              Update
            </Button>
            <Button danger ghost onClick={() => confirm(record.id)}>
              Delete
            </Button>
          </div>
        )
      }
    ] // eslint-disable-next-line
  }, [])

  return (
    <div className="h-screen w-full p-5 bg-[#F0F2F5]">
      <div className="w-[20%] mb-5">
        <Search
          placeholder="input search loading with enterButton"
          loading
          enterButton
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
          }}
        />
      </div>
      <Table columns={modifiedProjectColumn} dataSource={columns} />
      <UpdateInforModal
        setIsModalOpen={setIsModalOpen}
        getListProject={getListProject}
        isOpenModal={isOpenModal}
        detailProject={detailProject}
        usersInProject={userIdsInProject}
      />
      <ShowUsersModal
        isOpenUserModal={isOpenUserModal}
        detailProject={detailProject}
        detailUsersInProject={detailUsersInProject}
        userIdsInProject={userIdsInProject}
        setIsOpenUserModal={setIsOpenUserModal}
        setUserIdsInProject={setUserIdsInProject}
        setDetailUsersInProject={setDetailUsersInProject}
      />
      <CreateSupportModal />
      {contextHolder}
    </div>
  )
}
