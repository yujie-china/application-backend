<template>
    <div>
        <div class="gva-search-box">
            <el-form ref="searchForm" :inline="true" :model="searchInfo">
                <el-form-item label="部门">
                    <el-input v-model="searchInfo.path" placeholder="部门" />
                </el-form-item>
                <el-form-item label="状态">
                    <el-input v-model="searchInfo.description" placeholder="状态" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="search" @click="onSubmit">查询</el-button>
                    <el-button icon="refresh" @click="onReset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="gva-table-box">
            <el-table :data="itwTableData">
                <el-table-column type="selection" width="55" />
                <el-table-column align="center" label="序号" min-width="60" prop="ID" />
                <el-table-column align="center" label="姓名" min-width="100" prop="name" />
                <el-table-column align="center" label="性别" min-width="100" prop="sex" />
                <el-table-column align="center" label="年龄" min-width="100" prop="age" />
                <el-table-column align="center" label="联系电话" min-width="150" prop="phone" />
                <el-table-column align="center" label="应聘部门" min-width="150" prop="department" />
                <el-table-column align="center" label="应聘职位" min-width="150" prop="position" />
                <el-table-column align="center" label="应聘渠道" min-width="150" prop="channel" />
                <el-table-column align="center" label="薪资期望" min-width="150" prop="salary" />
                <el-table-column align="center" label="面试结果" min-width="150" prop="result" />
                <el-table-column align="center" fixed="right" label="操作" width="250">
                    <template #default="scope">
                        <el-button icon="document" type="primary" @click="openDialog(scope.$index, scope.row.ID)"
                            link>评价</el-button>

                    </template>

                </el-table-column>
            </el-table>
            <div class="gva-pagination">
                <el-pagination :current-page="page" :page-size="pageSize" :page-sizes="[10, 30, 50, 100]" :total="total"
                    layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange"
                    @size-change="handleSizeChange" />
            </div>
        </div>
        <el-dialog v-model="dialogFormVisible" title="评价">
            <template v-if="itwData.operate==='scheduled'">
                <el-form label-width="auto" :model="itwData">
                    <el-form-item label="部门领导">
                        <el-radio-group v-model="itwData.radio" >
                            <el-radio checked label="scheduled" @change="ChangeScheduled">运营</el-radio>
                            <el-radio label="IT" @change="ChangeIT">研发</el-radio>
                            <el-radio label="market" @change="ChangeMarket">市场</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="面试官姓名">
                        <el-input v-model="itwData.name" />
                    </el-form-item>
                    <el-form-item label="面试时间">
                        <el-col :span="11">
                            <el-date-picker v-model="itwData.day" type="date" label="Pick a date" placeholder="Pick a date"
                                style="width: 100%" />
                        </el-col>
                        <el-col class="text-center" :span="1" style="margin: 0 0.5rem">-</el-col>
                        <el-col :span="11">
                            <el-time-picker v-model="itwData.time" label="Pick a time" placeholder="Pick a time"
                                style="width: 100%" />
                        </el-col>
                    </el-form-item>
                    <el-form-item label="运营面试结果" prop="resource">
                        <el-radio-group v-model="itwData.itwResult">
                            <el-radio label="考虑"></el-radio>
                            <el-radio label="待定"></el-radio>
                            <el-radio label="不考虑"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="运营面试建议">
                        <el-input v-model="itwData.psnOpinions" type="textarea" autosize placeholder="面试官反馈" />
                    </el-form-item>
                </el-form>
            </template>
            <template v-else-if="itwData.operate==='IT'">
                <el-form label-width="auto" v-model="itwData">
                    <el-form-item label="部门领导">
                      <el-radio-group v-model="itwData.radio" >
                        <el-radio checked label="scheduled" @change="ChangeScheduled">运营</el-radio>
                        <el-radio label="IT" @change="ChangeIT">研发</el-radio>
                        <el-radio label="market" @change="ChangeMarket">市场</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="面试官姓名">
                        <el-input v-model="itwData.name" />
                    </el-form-item>
                    <el-form-item label="面试时间">
                        <el-col :span="11">
                            <el-date-picker v-model="itwData.day" type="date" label="Pick a date" placeholder="Pick a date"
                                style="width: 100%" />
                        </el-col>
                        <el-col class="text-center" :span="1" style="margin: 0 0.5rem">-</el-col>
                        <el-col :span="11">
                            <el-time-picker v-model="itwData.time" label="Pick a time" placeholder="Pick a time"
                                style="width: 100%" />
                        </el-col>
                    </el-form-item>
                    <el-form-item label="研发笔试评价" prop="resource">
                      <el-radio-group v-model="itwData.writeResult">
                        <el-radio label="好"></el-radio>
                        <el-radio label="中"></el-radio>
                        <el-radio label="差"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="研发面试结果" prop="resource">
                        <el-radio-group v-model="itwData.itwResult">
                            <el-radio label="考虑"></el-radio>
                            <el-radio label="待定"></el-radio>
                            <el-radio label="不考虑"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="研发面试建议">
                        <el-input v-model="itwData.psnOpinions" type="textarea" autosize placeholder="面试官反馈" />
                    </el-form-item>
                </el-form>
            </template>
            <template v-else-if="itwData.operate==='market'">
              <el-form label-width="auto" v-model="itwData">
                <el-form-item label="部门领导">
                  <el-radio-group v-model="itwData.radio" >
                    <el-radio checked label="scheduled" @change="ChangeScheduled">运营</el-radio>
                    <el-radio label="IT" @change="ChangeIT">研发</el-radio>
                    <el-radio label="market" @change="ChangeMarket">市场</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="面试官姓名">
                  <el-input v-model="itwData.name" />
                </el-form-item>
                <el-form-item label="面试时间">
                  <el-col :span="11">
                    <el-date-picker v-model="itwData.day" type="date" label="Pick a date" placeholder="Pick a date"
                                    style="width: 100%" />
                  </el-col>
                  <el-col class="text-center" :span="1" style="margin: 0 0.5rem">-</el-col>
                  <el-col :span="11">
                    <el-time-picker v-model="itwData.time" label="Pick a time" placeholder="Pick a time"
                                    style="width: 100%" />
                  </el-col>
                </el-form-item>
                <el-form-item label="市场面试结果" prop="resource">
                  <el-radio-group v-model="itwData.itwResult">
                    <el-radio label="考虑"></el-radio>
                    <el-radio label="待定"></el-radio>
                    <el-radio label="不考虑"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="市场面试建议">
                  <el-input v-model="itwData.psnOpinions" type="textarea" autosize placeholder="面试官反馈" />
                </el-form-item>
              </el-form>
            </template>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="clearData">取消</el-button>
                    <el-button type="primary" @click="submitData">
                        提交
                    </el-button>
                </span>
            </template>
        </el-dialog>

    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"
import { storeToRefs } from "pinia"
import useInterviewStore from "@/store/main/interview.ts"

const dialogFormVisible = ref(false)
//使用interview仓库
const interviewStore = useInterviewStore()
interviewStore.fetchitwTableData()
const { itwTableData } = storeToRefs(interviewStore)

const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const searchInfo = ref({})

const itwData = ref({
    radio: "scheduled",
    itwResult: "",
    writeResult:"",
    operate: "scheduled",
    psnOpinions: "",
    name: "",
    day: "",
    time: ""
})
let itwActiveIndex = ref(-1)

const ChangeScheduled =  ()=> {
    itwData.value.operate = "scheduled"
}
const ChangeIT=()=>{
  itwData.value.operate = "IT"
}
const ChangeMarket=()=>{
  itwData.value.operate = "market"
}

const openDialog = function (index, id) {
    // if (itwActiveIndex.value !== -1) {
    //     itwTableData.value[itwActiveIndex.value].itwDialogVisible = false
    // }
    // itwActiveIndex.value = index
    // itwTableData.value[itwActiveIndex.value].itwDialogVisible = true
    // console.log(index)
    dialogFormVisible.value = true
}
const clearData = function () {
    itwData.value = {
        radio: "scheduled",
        name: "",
        day: "",
        time: "",
        itwResult: "",
        writeResult:"",
        psnOpinions: "",
        operate: "scheduled"
    }
    dialogFormVisible.value = false
    itwActiveIndex.value = -1
}

const submitData = function () {
    itwData.value = {
        radio: "scheduled",
        name: "",
        day: "",
        time: "",
        itwResult: "",
        writeResult:"",
        psnOpinions: "",
        operate: "scheduled"
    }
    dialogFormVisible.value = false
    itwActiveIndex.value = -1
}
</script>

<style scoped lang="less">
.gva-search-box {
    background-color: #fff;
    height: 60px;
    line-height: 60px;
    margin-bottom: 20px;
    padding-left: 10px;

    :deep(.el-form-item) {
        margin: 0 20px 0 0;
    }
}

.gva-pagination {
    margin-top: 10px;
}

:deep(.el-table__inner-wrapper)::before {
    background-color: transparent;
}
</style>
