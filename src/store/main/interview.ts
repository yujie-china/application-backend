import { itwTableRequest, upOperateComment, upResearchComment, upMarketComment } from "@/service/main/main"

import { defineStore } from "pinia"

interface IappState {
  itwFormData: any
  itwTableData: any
  allDataLength: number
  operateComment: object
  researchComment: object
  marketComment: object
}
const useInterviewStore = defineStore("interview", {
  state: (): IappState => ({
    itwFormData: {},
    itwTableData: [],
    allDataLength: 0,
    operateComment: {
      main_name: "",
      operate_itw_name: "",
      operate_itw_time: "",
      operate_itw_result: "",
      operate_itw_suggest: ""
    },
    researchComment: {
      main_name: "",
      research_itw_name: "",
      research_itw_time: "",
      research_itw_write_result: "",
      research_itw_result: "",
      research_itw_suggestion: ""
    },
    marketComment: {
      main_name: "",
      market_itw_name: "",
      market_itw_time: "",
      market_itw_result: "",
      market_itw_suggest: ""
    }

  }),
  actions: {
    async fetchitwTableData (offset, size) {
      const res = await itwTableRequest(offset, size)
      this.itwTableData = res.data
      this.allDataLength = res.length
    },
    async upOperateCommentData (data) {
      await upOperateComment(data)
    },
    async upResearchCommentData (data) {
      await upResearchComment(data)
    },
    async upMarketCommentData (data) {
      await upMarketComment(data)
    },
  }
})
export default useInterviewStore
