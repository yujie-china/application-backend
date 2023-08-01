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
          <el-button type="primary" icon="search">查询</el-button>
          <el-button icon="refresh">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
      <el-table :data="appTableData">
        <el-table-column type="selection" width="55" />
        <el-table-column align="center" label="序号" min-width="60" prop="ID" />
        <el-table-column align="center" label="申请时间" min-width="120" prop="date" />
        <el-table-column align="center" label="姓名" min-width="80" prop="name" />
        <el-table-column align="center" label="性别" min-width="80" prop="sex" />
        <el-table-column align="center" label="年龄" min-width="80" prop="age" />
        <el-table-column align="center" label="联系电话" min-width="120" prop="phone" />
        <el-table-column align="center" label="学历" min-width="120" prop="qualifications" />
        <el-table-column align="center" label="学校" min-width="120" prop="school_name" />
        <el-table-column align="center" label="专业" min-width="140" prop="major" />
        <el-table-column align="center" label="应聘职位" min-width="120" prop="position" />
        <el-table-column align="center" label="面试结果" min-width="120" prop="employment_status" />
        <el-table-column align="center" fixed="right" label="操作" width="250">
          <template #default="scope">
            <el-button icon="document" type="primary" link @click="openDialog(scope.$index)">详情</el-button>
            <el-button icon="download" type="primary" link>下载</el-button>
            <el-button icon="delete" type="primary" link>删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="gva-pagination">
        <el-pagination :current-page="page" :page-size="pageSize" :page-sizes="[10, 30, 50, 100]" :total="total"
          layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange"
          @size-change="handleSizeChange" />
      </div>
    </div>

    <el-dialog v-model="dialogFormVisible" title="详情信息">
      <el-form :model="appFormData[formIndex]" size="small">
        <el-row :gutter="24">
          <el-col :span="24">
            <el-form-item label="一、申请信息"></el-form-item>
          </el-col>
          <el-col :span="12" v-for="(value, key, index) of appFormData" :key="index">
            <el-form-item :label="key">
              <el-input disabled v-model="appFormData[key]" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="clearData">取消</el-button>
          <el-button type="primary" @click="submitData">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import useApplicationStore from "@/store/main/application"
import { storeToRefs } from "pinia"
import { ref, onMounted } from "vue"

//使用application仓库

const applicationStore = useApplicationStore()
applicationStore.fetchapplyTableData()
applicationStore.fetchapplyFormData()

const { appTableData, appFormData } = storeToRefs(applicationStore)

console.log(appFormData)

const dialogFormVisible = ref(false)
const formIndex = ref()

const openDialog = (index) => {
  dialogFormVisible.value = true
  formIndex.value = index
}
const clearData = () => {
  dialogFormVisible.value = false
}

const submitData = () => {
  dialogFormVisible.value = false
}

const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const searchInfo = ref({})
</script>

<style scoped lang="less">
:deep(.el-table__inner-wrapper)::before {
  background-color: transparent;
}

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
</style>
