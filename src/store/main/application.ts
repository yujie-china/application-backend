import { applyFormRequest, applyTableRequest } from "@/service/main/main"
import { defineStore } from "pinia"

interface IappState {
  appFormData: any
  appTableData: any
}
const useApplicationStore = defineStore("application", {
  state: (): IappState => ({
    appFormData: {},
    appTableData: []
  }),
  actions: {
    async fetchapplyTableData () {
      const res = await applyTableRequest()
      this.appTableData = res.data
    },
    async fetchapplyFormData () {
      const res = await applyFormRequest()
      this.appFormData = res.data
    }
  }
})
export default useApplicationStore
