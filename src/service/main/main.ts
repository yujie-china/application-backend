import hyRequest from "../index"
//列表
export function applyTableRequest (offset, size) {
  return hyRequest.get({
    url: `backend/application/tableData?offset=${offset}&size=${size}`
  })
}

export function itwTableRequest (offset, size) {
  return hyRequest.get({
    url: `backend/interview/tableData?offset=${offset}&size=${size}`
  })
}

//评论
export function upOperateComment (data) {
  return hyRequest.post({
    url: "backend/interview/operate",
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  })
}
export function upResearchComment (data) {
  return hyRequest.post({
    url: "backend/interview/research",
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  })
}
export function upMarketComment (data) {
  return hyRequest.post({
    url: "backend/interview/market",
    data: data,
    headers: {
      "Content-Type": "application/json",
    },
  })
}



export function applyFormRequest () {
  return hyRequest.get({
    url: "/application/formData"
  })
}

export function employeeTableRequest () {
  return hyRequest.get({
    url: "/employee/tableData"
  })
}
