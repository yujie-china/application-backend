import { itwTableRequest } from "@/service/main/main"
import { defineStore } from "pinia"

interface IappState {
  itwFormData: any
  itwTableData: any
}
const useInterviewStore = defineStore("interview", {
  state: (): IappState => ({
    itwFormData: {},
    itwTableData: []
  }),
  actions: {
    async fetchitwTableData () {
      const res = await itwTableRequest()
      this.itwTableData = res.data
    }
  }
})
export default useInterviewStore
