import { appFormDetail, applyTableRequest, upFinallyResult } from "@/service/main/main"
import { defineStore } from "pinia"

interface IappState {
  appFormData: any
  appTableData: any
  allDataLength: number,
  appDetailData: object
}
const useApplicationStore = defineStore("application", {
  state: (): IappState => ({
    appFormData: {},
    appTableData: [],
    allDataLength: 0,
    appDetailData: {
      position: ""
    }
  }),
  actions: {
    async fetchapplyTableData (offset, size) {
      const res = await applyTableRequest(offset, size)
      this.appTableData = res.data
      this.allDataLength = res.length
    },
    async fetchapplyDetailData (name) {
      const res = await appFormDetail(name)
      this.appDetailData = res.data
    },
    async upfinallyResultData (name, finallyResult) {
      await upFinallyResult(name, finallyResult)
    }
  }
})
export default useApplicationStore
