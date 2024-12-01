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
