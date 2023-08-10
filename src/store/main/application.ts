import { applyFormRequest, applyTableRequest } from "@/service/main/main"
import { defineStore } from "pinia"

interface IappState {
  appFormData: any
  appTableData: any
  allDataLength: number

}
const useApplicationStore = defineStore("application", {
  state: (): IappState => ({
    appFormData: {},
    appTableData: [],
    allDataLength: 0
  }),
  actions: {
    async fetchapplyTableData (offset, size) {
      const res = await applyTableRequest(offset, size)
      this.appTableData = res.data
      this.allDataLength = res.length
    },
    // async fetchapplyFormData () {
    //   const res = await applyFormRequest()
    //   this.appFormData = res.data
    // }
  }
})
export default useApplicationStore
