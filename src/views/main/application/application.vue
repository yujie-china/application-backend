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
        <!-- <el-table-column type="selection" width="55" /> -->
        <el-table-column align="center" label="序号" min-width="60" prop="ID" />
        <el-table-column align="center" label="申请时间" min-width="120" prop="date" />
        <el-table-column align="center" label="姓名" min-width="80" prop="name" />
        <el-table-column align="center" label="性别" min-width="80" prop="sex" />
        <el-table-column align="center" label="年龄" min-width="80" prop="age" />
        <el-table-column align="center" label="联系电话" min-width="120" prop="phone" />
        <el-table-column align="center" label="学历" min-width="120" prop="qualifications" />
        <el-table-column align="center" label="学校" min-width="100" prop="school_name" />
        <el-table-column align="center" label="专业" min-width="160" prop="major" />
        <el-table-column align="center" label="应聘职位" min-width="140" prop="position" />
        <el-table-column align="center" label="在岗状态" min-width="80" prop="state" />
        <el-table-column align="center" label="可到岗时间" min-width="120" prop="time" />
        <el-table-column align="center" label="面试结果" min-width="80" prop="employment_status" />
        <el-table-column align="center" fixed="right" label="操作" width="300">
          <template #default="scope">
            <el-button icon="document" type="primary" link @click="openDialog(scope.$index)">详情</el-button>
            <el-button icon="download" type="primary" link>下载</el-button>
            <el-button icon="share" type="primary" link>转发</el-button>
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
    <el-dialog v-model="dialogFormVisible" title="详情信息" align-center>
      <el-scrollbar height="700px">
        <el-form :model="form" size="small">
          <el-row :gutter="24">
            <el-col :span="24">
              <el-form-item label="一、申请信息"></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请职位">
                <el-input disabled="disabled" v-model="FormData.position" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="其他感兴趣的职位">
                <el-input disabled="disabled" v-model="FormData.other_position" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="期望待遇">
                <el-input disabled="disabled" v-model="FormData.price" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="可到岗日期">
                <el-input disabled="disabled" v-model="FormData.come_time" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否接受异地工作">
                <el-radio-group v-model="FormData.isOffsite" disabled="disabled">
                  <el-radio label="1" size="small">是</el-radio>
                  <el-radio label="2" size="small">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="期望地域">
                <el-input disabled="disabled" v-model="FormData.address" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="在此之前是否来我司面试过">
                <el-radio-group v-model="FormData.isAgain" disabled="disabled">
                  <el-radio label="1" size="small">是</el-radio>
                  <el-radio label="2" size="small">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="面试职位">
                <el-input disabled="disabled" v-model="FormData.position" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="面试时间">
                <el-input disabled="disabled" v-model="FormData.interview_time" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="通过何种途径获知该职位">
                <el-input disabled="disabled" v-model="FormData.road" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="二、个人情况"></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="中文名">
                <el-input disabled="disabled" v-model="FormData.cn_name" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="英文名">
                <el-input disabled="disabled" v-model="FormData.eng_name" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="性别">
                <el-input disabled="disabled" v-model="FormData.sex" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="出生地">
                <el-input disabled="disabled" v-model="FormData.birth_address" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="出生日期">
                <el-input disabled="disabled" v-model="FormData.birth_time" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="户口所在地">
                <el-input disabled="disabled" v-model="FormData.location" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="籍贯">
                <el-input disabled="disabled" v-model="FormData.Native_place" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="民族">
                <el-input disabled="disabled" v-model="FormData.nation" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="最高学历">
                <el-input disabled="disabled" v-model="FormData.education_level" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="政治面貌">
                <el-input disabled="disabled" v-model="FormData.political" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="手机号">
                <el-input disabled="disabled" v-model="FormData.phone" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="固定号码">
                <el-input disabled="disabled" v-model="FormData.fixed_phone" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="身份证号码">
                <el-input disabled="disabled" v-model="FormData.ID_card" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="电子邮箱">
                <el-input disabled="disabled" v-model="FormData.email" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="微信号">
                <el-input disabled="disabled" v-model="FormData.wx" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="婚姻状况">
                <el-input disabled="disabled" v-model="FormData.marital" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="家庭住址">
                <el-input disabled="disabled" v-model="FormData.home_address" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="紧急联系人电话">
                <el-input disabled="disabled" v-model="FormData.emergency_phone" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="现居住地">
                <el-input disabled="disabled" v-model="FormData.living_place" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="三、家庭情况"></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="姓名">
                <el-input disabled="disabled" v-model="FormData.member_name" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="关系">
                <el-input disabled="disabled" v-model="FormData.relations" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所在单位">
                <el-input disabled="disabled" v-model="FormData.workplace" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="居住地">
                <el-input disabled="disabled" v-model="FormData.family_home" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="联系电话">
                <el-input disabled="disabled" v-model="FormData.family_phone" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="四、教育情况"></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="学校名称">
                <el-input disabled="disabled" v-model="FormData.school_name" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开始时间">
                <el-input disabled="disabled" v-model="FormData.edu_start_time" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结束时间">
                <el-input disabled="disabled" v-model="FormData.edu_end_time" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="专业">
                <el-input disabled="disabled" v-model="FormData.major" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="学习方式">
                <el-input disabled="disabled" v-model="FormData.study_way" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="学历">
                <el-input disabled="disabled" v-model="FormData.qualifications" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="五、主要培训经历"></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="培训机构名称">
                <el-input disabled="disabled" v-model="FormData.train_name" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="开始时间">
                <el-input disabled="disabled" v-model="FormData.train_start_time" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="结束时间">
                <el-input disabled="disabled" v-model="FormData.train_end_time" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="专业/科目名称">
                <el-input disabled="disabled" v-model="FormData.major_name" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证书">
                <el-input disabled="disabled" v-model="FormData.train_certificate" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="六、技能"></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="计算机及等级证书等">
                <el-input disabled="disabled" v-model="FormData.skill_certificate" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否有驾驶证及熟练程度">
                <el-input disabled="disabled" v-model="FormData.level" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="七、语言"></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="英语">
                <el-input disabled="disabled" v-model="FormData.english_level" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="其他语言">
                <el-input disabled="disabled" v-model="FormData.other_language" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="八、工作经历"></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="任职起始时间">
                <el-input disabled="disabled" v-model="FormData.work_start_time" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="任职结束时间">
                <el-input disabled="disabled" v-model="FormData.work_end_time" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="公司名称">
                <el-input disabled="disabled" v-model="FormData.company_name" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="公司电话">
                <el-input disabled="disabled" v-model="FormData.company_phone" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="所任职位">
                <el-input disabled="disabled" v-model="FormData.work_position" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="离职待遇">
                <el-input disabled="disabled" v-model="FormData.leave_reason" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="离职原因">
                <el-input disabled="disabled" v-model="FormData.treatment" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="直接上级及电话">
                <el-input disabled="disabled" v-model="FormData.superior_phone" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="九、资格证书"></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="资格证书">
                <el-input disabled="disabled" v-model="FormData.certificate_name" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证书编号">
                <el-input disabled="disabled" v-model="FormData.certificate_id" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证书到期日">
                <el-input disabled="disabled" v-model="FormData.certificate_end_time" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="十、健康状况"></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="是否患有影响本职工作的各种疾病">
                <el-input disabled="disabled" v-model="FormData.health_info" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="十一、在本公司任职的亲友及原同事"></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="姓名">
                <el-input disabled="disabled" v-model="FormData.friend_name" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="关系">
                <el-input disabled="disabled" v-model="FormData.community" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="在何部门任何职位">
                <el-input disabled="disabled" v-model="FormData.office" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="十二、声明"></el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="申请人签字">
                <el-input disabled="disabled" v-model="FormData.application_name" autocomplete="off" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="签署日期">
                <el-input disabled="disabled" v-model="FormData.apply_time" autocomplete="off" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">
              确认
            </el-button>
          </span>
        </template>
      </el-scrollbar>
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
const FormData = ref({
  position: "前端开发工程师",
  other_position: "后端开发工程师",
  price: "8000-10000",
  address: "南昌",
  isOffsite: "1",
  isAgain: "1",
  road: "BOSS直聘",
  come_time: "2023-7-26",
  interview_time: "2023-7-26",
  cn_name: "张三",
  eng_name: "zhangsan",
  sex: "1",
  birth_address: "广东省",
  location: "广东省",
  Native_place: "广东省",
  nation: "汉族",
  education_level: "本科",
  political: "共青团员",
  phone: "18888888888",
  fixed_phone: "020-11811470",
  ID_card: "81000000000000000",
  email: "100000001@qq.com",
  wx: "fffffffff",
  marital: "1",
  home_address: "广东省",
  emergency_phone: "188888888888",
  living_place: "广东省",
  birth_time: "2002-01-01",
  member_name: "李四",
  relations: "母子",
  workplace: "江西",
  family_home: "广东省",
  family_phone: "18888888888",
  school_name: "南昌大学",
  major: "计算机科学与技术",
  study_way: "全日制",
  qualifications: "本科",
  edu_start_time: "2021-09-01",
  edu_end_time: "2025-07-31",
  train_name: "尚硅谷",
  major_name: "前端开发",
  train_certificate: "",
  train_start_time: "2022",
  train_end_time: "2023",
  level: "C1",
  skill_certificate: "英语四级、计算机二级",
  other_language: "俄语",
  english_level: "1",
  company_name: "江西海默技术股份有限公司",
  company_phone: "88888888",
  work_position: "前端开发工程师",
  treatment: "薪资太少",
  leave_reason: "无",
  superior_phone: "18888888888",
  work_start_time: "2021",
  work_end_time: "2023",
  certificate_name: "英语四级",
  certificate_id: "2021000022221111",
  certificate_end_time: "无",
  health_info: "健康",
  friend_name: "无",
  community: "无",
  office: "无",
  application_name: "张三",
  apply_time: "2023-7-26"
})

const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const searchInfo = ref({})
</script>

<style scoped lang="less">
.con {
  position: relative;
}

.logoCon::after {
  content: "";
  position: absolute;
  top: -35px;
  left: 16px;
  width: 95px;
  height: 83px;
  background-image: url('@/assets/img/heyme_logo.png');
  background-size: cover;
}


:deep(.is-horizontal) {
  display: none !important;
}

.title-container {
  display: flex;
  justify-content: center;
  line-height: 80px;
  margin-top: -26px;
}

.title-text {
  text-align: center;
  font-size: 20px;
}

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


