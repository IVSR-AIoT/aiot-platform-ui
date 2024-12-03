export const handleCountStatus = (response) => {
  let active = 0,
    inactive = 0
  response.forEach((item) => {
    if (item?.isActive) {
      active += 1
    } else {
      inactive += 1
    }
  })
  return [active, inactive]
}

export const countObjectAndSensor = (deviceArr, notiArr) => {
  return deviceArr.map((device) => {
    const totalMessage = notiArr.filter((item) => item.device_id === device.value)

    const objectArr = totalMessage.flatMap((item) =>
      item.external_messages.filter((msg) => msg.type === 'object')
    )
    const sensorArr = totalMessage.flatMap((item) =>
      item.external_messages.filter((msg) => msg.type === 'sensor')
    )

    return {
      ...device,
      numberObject: objectArr.length,
      numberSensor: sensorArr.length
    }
  })
}

export const countHumanAndVehicle = (deviceArr, objArr) => {
  return deviceArr.map((device) => {
    const totalMessage = objArr.filter((item) => item.device_id === device.value)
    const humanArr = totalMessage.flatMap((msg) =>
      msg.object_list.filter((item) => item.object.type === 'human')
    )
    const vehicleArr = totalMessage.flatMap((msg) =>
      msg.object_list.filter((item) => item.object.type === 'vehicle')
    )
    return {
      ...device,
      numberHuman: humanArr.length,
      numberVehicle: vehicleArr.length
    }
  })
}

export const filterDevice = (deviceArr, selectedDeviceArr) => {
  return deviceArr.filter((device) => {
    return selectedDeviceArr.includes(device.value)
  })
}
