import hyRequest from ".."

export function applyTableRequest() {
  return hyRequest.get({
    url: "/application/tableData"
  })
}
export function applyFormRequest() {
  return hyRequest.get({
    url: "/application/formData"
  })
}
export function itwTableRequest() {
  return hyRequest.get({
    url: "/interview/tableData"
  })
}
export function employeeTableRequest() {
  return hyRequest.get({
    url: "/employee/tableData"
  })
}
