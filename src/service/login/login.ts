import hyRequest from ".."
import type { IAccount } from "@/types"

export function accountLoginRequest(account: IAccount) {
  return hyRequest.post({
    url: "/login",
    data: account
  })
}

//获取用户详细信息，具体得看接口文档
export function getUserInfoById(id: number) {
  return hyRequest.get({
    url: `/users/${id}`
    // headers: {
    //   Authorization: 'Bearer ' + localCache.getCache(LOGIN_TOKEN)
    // }
  })
}

//获取表单信息，可以看到哪些功能
export function getUserMenusByRoleId(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}
