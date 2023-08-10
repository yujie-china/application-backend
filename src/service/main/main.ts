import hyRequest from "../index"
//表格
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
//application详情数据
export function appFormDetail (name) {
  return hyRequest.get({
    url: `backend/application/detailsData?name=${name}`,
    headers: {
      "Content-Type": "application/json",
    },
  })
}


export function employeeTableRequest () {
  return hyRequest.get({
    url: "/employee/tableData"
  })
}
