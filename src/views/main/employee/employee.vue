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
        <el-form-item>
          <el-button type="primary" icon="Edit" @click="onAdditional">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
      <el-table :data="tableData">
        <!-- <el-table-column type="selection" width="55" /> -->
        <el-table-column align="center" label="序号" min-width="60" prop="ID" />
        <el-table-column align="center" label="姓名" min-width="80" prop="name" />
        <el-table-column align="center" label="性别" min-width="60" prop="sex" />
        <el-table-column align="center" label="身份证号码" min-width="200" prop="ID_card" />
        <el-table-column align="center" label="学历" min-width="60" prop="qualifications" />
        <el-table-column align="center" label="邮箱" min-width="200" prop="email" />
        <el-table-column align="center" label="手机号码" min-width="150" prop="phone" />
        <el-table-column align="center" label="联系地址" min-width="250" prop="address" />
        <el-table-column align="center" label="职务" min-width="150" prop="position" />
        <el-table-column align="center" label="部门" min-width="150" prop="department" />
        <el-table-column align="center" fixed="right" label="操作" width="200">
          <el-button icon="document" type="primary" @click="openDialog" link>编辑</el-button>
          <el-button icon="delete" type="danger" @click="deleteItem" link>删除</el-button>
        </el-table-column>
      </el-table>
      <div class="gva-pagination">
        <el-pagination :current-page="page" :page-size="pageSize" :page-sizes="[10, 30, 50, 100]" :total="total"
          layout="total, sizes, prev, pager, next, jumper" @current-change="handleCurrentChange"
          @size-change="handleSizeChange" />
      </div>
    </div>

    <el-dialog v-model="dialogFormVisible" title="编辑">

      <el-form label-width="auto" v-model="FormData">
        <el-row gutter="24">
          <el-col :span="12">
            <el-form-item label="姓名">
              <el-input v-model="FormData.empname" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别">
              <el-input v-model="FormData.sex" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="身份证号码">
              <el-input v-model="FormData.ID_card" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学历">
              <el-input v-model="FormData.qualifications" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱">
              <el-input v-model="FormData.email" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码">
              <el-input v-model="FormData.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系地址">
              <el-input v-model="FormData.address" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职务">
              <el-input v-model="FormData.position" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门">
              <el-input v-model="FormData.department" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

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
import { ref } from "vue"
const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const searchInfo = ref({})
const dialogFormVisible = ref(false)
const FormData = ref({
  empname: "",
  sex: "",
  ID_card: "",
  qualifications: "",
  email: "",
  phone: "",
  address: "",
  position: "",
  department: ""
})

const openDialog = function () {
  dialogFormVisible.value = true
}
const tableData = ref([])
import { employeeTableRequest } from "@/service/main/main.ts"
employeeTableRequest().then((res) => {
  tableData.value = res.data
})

const clearData = function () {
  FormData.value = {
    empname: "",
    sex: "",
    ID_card: "",
    qualifications: "",
    email: "",
    phone: "",
    address: "",
    position: "",
    department: ""
  }
  dialogFormVisible.value = false
}
const submitData = function () {
  FormData.value = {
    empname: "",
    sex: "",
    ID_card: "",
    qualifications: "",
    email: "",
    phone: "",
    address: "",
    position: "",
    department: ""
  }
  dialogFormVisible.value = false
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
@/service/table/form
