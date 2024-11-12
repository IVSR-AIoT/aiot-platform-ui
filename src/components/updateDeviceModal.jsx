import { Form, Input, message, Modal, Select } from 'antd'
import { getListProjectService } from '~/services/projectServices'
import { useEffect, useState } from 'react'
import { updateDeviceService } from '~/services/deviceService'
import { isUser } from '~/hook/useAuth'

export default function UpdateDeviceModal({
  openModal,
  setOpenModal,
  device,
  getListDevices,
  projectIdInDevice
}) {
  const [form] = Form.useForm()
  const [selectOptions, setSelectOptions] = useState([])
  const listProjects = async () => {
    if (isUser()) {
      return
    }
    try {
      const res = await getListProjectService()
      setSelectOptions(res.map((project) => ({ label: project.name, value: project.id })))
    } catch (error) {
      console.log(error)
      message.error('Failed to load project list. Please try again later.')
    }
  }

  useEffect(() => {
    listProjects()
  }, [])

  const onFinish = async (value) => {
    value.projectId = value.projectId ? value.projectId : null
    try {
      await updateDeviceService(device?.id, value)
      message.success('Device updated successfully!')
      getListDevices()
    } catch {
      message.error('Failed to update the device. Please try again.')
    }

    form.resetFields()
  }

  useEffect(() => {
    if (device) {
      const projectId = selectOptions?.find((item) => device.projectId === item.value)
      form.setFieldsValue({ name: device.name || '', projectId: projectId })
    }
  })

  const handleOk = () => {
    form.submit()
    setOpenModal(false)
  }

  const handleCancel = () => {
    setOpenModal(false)
    form.resetFields()
  }

  return (
    <Modal
      title={<h1 className="font-semibold text-[20px]">Update Project</h1>}
      open={openModal}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{
          span: 5
        }}
        wrapperCol={{
          span: 18
        }}
      >
        <Form.Item label={<h1 className="font-medium">Device Name</h1>} name={'name'}>
          <Input />
        </Form.Item>
        <Form.Item label={<h1 className="font-medium">Select Project</h1>} name={'projectId'}>
          <Select options={selectOptions} allowClear />
        </Form.Item>
      </Form>
    </Modal>
  )
}
