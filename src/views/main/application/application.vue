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
        <el-table-column align="center" label="序号" min-width="60" prop="id" />
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
        <el-table-column align="center" label="面试结果" min-width="80" prop="result" />
        <el-table-column align="center" fixed="right" label="操作" width="100">
          <template #default="scope">
            <el-button icon="document" type="primary" link @click="openDialog(scope.row.name)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper" :total="allDataLength" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </div>
      <el-dialog v-model="dialogFormVisible" title="详情信息" align-center>
        <el-scrollbar height="700px">
          <el-form class="downForm" size="small" :model="FormData">
            <el-form>
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
                  <el-form-item label="通过何种途径获知该职位">
                    <el-input disabled="disabled" v-model="FormData.road" autocomplete="off" />
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
                <el-col :span="10">
                  <el-form-item label="是否接受出差">
                    <el-radio-group v-model="FormData.is_business_trip" disabled="disabled">
                      <el-radio label="1" size="small">短期</el-radio>
                      <el-radio label="2" size="small">长期</el-radio>
                      <el-radio label="3" size="small">不接受</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form v-if="FormData.friend_name && FormData.friend_name !== '未填数据'">
                <el-row :gutter="24">
                  <el-col :span="24">
                    <el-form-item label="在本公司任职的亲友及原同事"></el-form-item>
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
                </el-row>
              </el-form>

              <el-form v-else>
                <el-row :gutter="24">
                  <el-col :span="8">
                    <el-form-item label="在本公司任职的亲友及原同事"></el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-input disabled="disabled" autocomplete="off" placeholder="无在本公司任职的亲友及原同事" />
                  </el-col>
                </el-row>
              </el-form>
            </el-form>
            <el-form>
              <el-row :gutter="24">
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
                  <el-form-item label="出生日期">
                    <el-input disabled="disabled" v-model="FormData.birth_time" autocomplete="off" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="户口所在地">
                    <el-input disabled="disabled" v-model="FormData.locationCascaderValue" autocomplete="off" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="现居住地">
                    <el-input disabled="disabled" v-model="FormData.livingCascaderValue" autocomplete="off" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="籍贯">
                    <el-input disabled="disabled" v-model="FormData.nativeCascaderValue" autocomplete="off" />
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
                    <el-input disabled="disabled" v-model="FormData.politicalCascaderValue" autocomplete="off" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="手机号">
                    <el-input disabled="disabled" v-model="FormData.phone" autocomplete="off" />
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
                  <el-form-item label="计算机及等级证书等">
                    <el-input disabled="disabled" v-model="FormData.certificate" autocomplete="off" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="是否有驾驶证">
                    <el-input disabled="disabled" v-model="FormData.isCar" autocomplete="off" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="语种">
                    <el-input disabled="disabled" v-model="FormData.language" autocomplete="off" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="水平">
                    <el-input disabled="disabled" v-model="FormData.isLevel" autocomplete="off" />
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form>
                <el-row :gutter="24">
                  <el-col :span="8">
                    <el-form-item label="是否患有影响本职工作的各种疾病">
                      <el-input disabled="disabled" v-model="FormData.sick_level" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>


            </el-form>
            <el-form>
              <el-col :span="24">
                <el-form-item label="三、家庭情况"></el-form-item>
              </el-col>

              <el-form>
                <el-row :gutter="24">
                  <el-col :span="8">
                    <el-form-item label="姓名">
                      <el-input disabled="disabled" v-model="FormData.member_name1" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="关系">
                      <el-input disabled="disabled" v-model="FormData.relations1" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="所在单位">
                      <el-input disabled="disabled" v-model="FormData.workplace1" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="居住地">
                      <el-input disabled="disabled" v-model="FormData.family_home1" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="联系电话">
                      <el-input disabled="disabled" v-model="FormData.family_phone1" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>

              <el-form v-if="FormData.member_name2 && FormData.member_name2 !== '未填数据'">
                <el-row :gutter="24">
                  <el-col :span="8">
                    <el-form-item label="姓名">
                      <el-input disabled="disabled" v-model="FormData.member_name2" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="关系">
                      <el-input disabled="disabled" v-model="FormData.relations2" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="所在单位">
                      <el-input disabled="disabled" v-model="FormData.workplace2" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="居住地">
                      <el-input disabled="disabled" v-model="FormData.family_home2" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="联系电话">
                      <el-input disabled="disabled" v-model="FormData.family_phone2" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>

              <el-form v-if="FormData.member_name3 && FormData.member_name3 !== '未填数据'">
                <el-row :gutter="24">
                  <el-col :span="8">
                    <el-form-item label="姓名">
                      <el-input disabled="disabled" v-model="FormData.member_name3" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="关系">
                      <el-input disabled="disabled" v-model="FormData.relations3" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="所在单位">
                      <el-input disabled="disabled" v-model="FormData.workplace3" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="居住地">
                      <el-input disabled="disabled" v-model="FormData.family_home3" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="联系电话">
                      <el-input disabled="disabled" v-model="FormData.family_phone3" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-form>

            <el-form :gutter="24">
              <el-col :span="24">
                <el-form-item label="四、教育情况"></el-form-item>
              </el-col>
              <el-form>
                <el-row :gutter="24">
                  <el-col :span="8">
                    <el-form-item label="开始时间">
                      <el-input disabled="disabled" v-model="FormData.start_time1" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="结束时间">
                      <el-input disabled="disabled" v-model="FormData.end_time1" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="学校名称">
                      <el-input disabled="disabled" v-model="FormData.school_name1" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="专业">
                      <el-input disabled="disabled" v-model="FormData.major1" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="学习方式">
                      <el-input disabled="disabled" v-model="FormData.study_way1" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="学历">
                      <el-input disabled="disabled" v-model="FormData.qualifications1" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>

              <el-form v-if="FormData.school_name2 && FormData.school_name2 !== '未填数据'">
                <el-row :gutter="24">
                  <el-col :span="8">
                    <el-form-item label="开始时间">
                      <el-input disabled="disabled" v-model="FormData.start_time2" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="结束时间">
                      <el-input disabled="disabled" v-model="FormData.end_time2" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="学校名称">
                      <el-input disabled="disabled" v-model="FormData.school_name2" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="专业">
                      <el-input disabled="disabled" v-model="FormData.major2" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="学习方式">
                      <el-input disabled="disabled" v-model="FormData.study_way2" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="学历">
                      <el-input disabled="disabled" v-model="FormData.qualifications2" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>

              <el-form v-if="FormData.school_name3 && FormData.school_name3 !== '未填数据'">
                <el-row :gutter="24">
                  <el-col :span="8">
                    <el-form-item label="开始时间">
                      <el-input disabled="disabled" v-model="FormData.start_time3" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="结束时间">
                      <el-input disabled="disabled" v-model="FormData.end_time3" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="学校名称">
                      <el-input disabled="disabled" v-model="FormData.school_name3" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="专业">
                      <el-input disabled="disabled" v-model="FormData.major3" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="学习方式">
                      <el-input disabled="disabled" v-model="FormData.study_way3" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="学历">
                      <el-input disabled="disabled" v-model="FormData.qualifications3" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>

              <el-form v-if="FormData.school_name4 && FormData.school_name4 !== '未填数据'">
                <el-row :gutter="24">
                  <el-col :span="8">
                    <el-form-item label="开始时间">
                      <el-input disabled="disabled" v-model="FormData.start_time4" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="结束时间">
                      <el-input disabled="disabled" v-model="FormData.end_time4" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="学校名称">
                      <el-input disabled="disabled" v-model="FormData.school_name4" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="专业">
                      <el-input disabled="disabled" v-model="FormData.major4" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="学习方式">
                      <el-input disabled="disabled" v-model="FormData.study_way4" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="学历">
                      <el-input disabled="disabled" v-model="FormData.qualifications4" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>

            </el-form>

            <el-form>

              <el-col :span="24">
                <el-form-item label="五、主要培训经历"></el-form-item>
              </el-col>
              <el-form v-if="FormData.trainingTime1 && FormData.trainingTime1 !== '未填数据'">
                <el-row :gutter="24">
                  <el-col :span="8">
                    <el-form-item label="培训时间">
                      <el-input disabled="disabled" v-model="FormData.trainingTime1" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="培训地点">
                      <el-input disabled="disabled" v-model="FormData.trainingLocation1" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="培训课程">
                      <el-input disabled="disabled" v-model="FormData.trainingCourse1" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>

              <el-form v-else>
                <el-form-item label="未经历培训"></el-form-item>
              </el-form>

              <el-form v-if="FormData.trainingTime2 && FormData.trainingTime2 !== '未填数据'">
                <el-row :gutter="24">
                  <el-col :span="8">
                    <el-form-item label="培训时间">
                      <el-input disabled="disabled" v-model="FormData.trainingTime2" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="培训地点">
                      <el-input disabled="disabled" v-model="FormData.trainingLocation2" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="培训课程">
                      <el-input disabled="disabled" v-model="FormData.trainingCourse2" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>

              <el-form v-if="FormData.trainingTime3 && FormData.trainingTime3 !== '未填数据'">
                <el-row :gutter="24">
                  <el-col :span="8">
                    <el-form-item label="培训时间">
                      <el-input disabled="disabled" v-model="FormData.trainingTime3" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="培训地点">
                      <el-input disabled="disabled" v-model="FormData.trainingLocation3" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="培训课程">
                      <el-input disabled="disabled" v-model="FormData.trainingCourse3" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>

            </el-form>

            <el-form>

              <el-col :span="24">
                <el-form-item label="六、工作经历"></el-form-item>
              </el-col>

              <el-form v-if="FormData.workstart_time1 && FormData.workstart_time1 !== '未填数据'">
                <el-row :gutter="24">
                  <el-col :span="8">
                    <el-form-item label="任职起始时间">
                      <el-input disabled="disabled" v-model="FormData.workstart_time1" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="任职结束时间">
                      <el-input disabled="disabled" v-model="FormData.workend_time1" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="公司名称">
                      <el-input disabled="disabled" v-model="FormData.company_name1" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="所任职位">
                      <el-input disabled="disabled" v-model="FormData.position1" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="离职待遇">
                      <el-input disabled="disabled" v-model="FormData.treatment1" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="离职原因">
                      <el-input disabled="disabled" v-model="FormData.leave_reason1" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="直接上级及电话">
                      <el-input disabled="disabled" v-model="FormData.superior_phone1" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>

              <el-form v-else>
                <el-form-item label="没有工作经历">
                </el-form-item>
              </el-form>

              <el-form v-if="FormData.workstart_time2 && FormData.workstart_time2 !== '未填数据'">
                <el-row :gutter="24">
                  <el-col :span="8">
                    <el-form-item label="任职起始时间">
                      <el-input disabled="disabled" v-model="FormData.workstart_time2" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="任职结束时间">
                      <el-input disabled="disabled" v-model="FormData.workend_time2" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="公司名称">
                      <el-input disabled="disabled" v-model="FormData.company_name2" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="所任职位">
                      <el-input disabled="disabled" v-model="FormData.position2" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="离职待遇">
                      <el-input disabled="disabled" v-model="FormData.treatment2" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="离职原因">
                      <el-input disabled="disabled" v-model="FormData.leave_reason2" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="直接上级及电话">
                      <el-input disabled="disabled" v-model="FormData.superior_phone2" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>

              <el-form v-if="FormData.workstart_time3 && FormData.workstart_time3 !== '未填数据'">
                <el-row :gutter="24">
                  <el-col :span="8">
                    <el-form-item label="任职起始时间">
                      <el-input disabled="disabled" v-model="FormData.workstart_time3" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="任职结束时间">
                      <el-input disabled="disabled" v-model="FormData.workend_time3" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="公司名称">
                      <el-input disabled="disabled" v-model="FormData.company_name3" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="所任职位">
                      <el-input disabled="disabled" v-model="FormData.position3" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="离职待遇">
                      <el-input disabled="disabled" v-model="FormData.treatment3" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="离职原因">
                      <el-input disabled="disabled" v-model="FormData.leave_reason3" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="直接上级及电话">
                      <el-input disabled="disabled" v-model="FormData.superior_phone3" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>

            </el-form>

            <el-form>

              <el-col :span="24">
                <el-form-item label="七、资格证书"></el-form-item>
              </el-col>

              <el-form v-if="FormData.certificate_name1 && FormData.certificate_name1 !== '未填数据'">
                <el-row :gutter="24">
                  <el-col :span="8">
                    <el-form-item label="证书名称">
                      <el-input disabled="disabled" v-model="FormData.certificate_name1" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="证书编号">
                      <el-input disabled="disabled" v-model="FormData.certificate_id1" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="证书到期日">
                      <el-input disabled="disabled" v-model="FormData.certificate_end_time1" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>

              <el-form v-else>
                <el-form-item label="未获得证书">
                </el-form-item>
              </el-form>

              <el-form v-if="FormData.certificate_name2 && FormData.certificate_name2 !== '未填数据'">
                <el-row :gutter="24">
                  <el-col :span="8">
                    <el-form-item label="证书名称">
                      <el-input disabled="disabled" v-model="FormData.certificate_name2" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="证书编号">
                      <el-input disabled="disabled" v-model="FormData.certificate_id2" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="证书到期日">
                      <el-input disabled="disabled" v-model="FormData.certificate_end_time2" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>

              <el-form v-if="FormData.certificate_name3 && FormData.certificate_name3 !== '未填数据'">
                <el-row :gutter="24">
                  <el-col :span="8">
                    <el-form-item label="证书名称">
                      <el-input disabled="disabled" v-model="FormData.certificate_name3" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="证书编号">
                      <el-input disabled="disabled" v-model="FormData.certificate_id3" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="证书到期日">
                      <el-input disabled="disabled" v-model="FormData.certificate_end_time3" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-form>

            <el-form>
              <el-row :gutter="24">
                <el-col :span="24">
                  <el-form-item label="八、声明"></el-form-item>
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
            <el-form>
              <el-col :span="24">
                <el-form-item label="九、评价"></el-form-item>
              </el-col>
              <el-form v-if="FormData.operate_itw_name">
                <el-row :gutter="24">
                  <el-col :span="24">
                    <el-form-item label="运营评价"></el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="面试官姓名">
                      <el-input disabled="disabled" v-model="FormData.operate_itw_name" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="面试时间">
                      <el-input disabled="disabled" v-model="FormData.operate_itw_time" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="面试结果">
                      <el-input disabled="disabled" v-model="FormData.operate_itw_result" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="面试建议">
                      <el-input disabled="disabled" v-model="FormData.operate_itw_suggest" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>

              <el-form v-if="FormData.research_itw_name">
                <el-row :gutter="24">
                  <el-col :span="24">
                    <el-form-item label="研发评价"></el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="面试官姓名">
                      <el-input disabled="disabled" v-model="FormData.research_itw_name" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="面试时间">
                      <el-input disabled="disabled" v-model="FormData.research_itw_time" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="笔试结果">
                      <el-input disabled="disabled" v-model="FormData.research_itw_write_result" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="面试结果">
                      <el-input disabled="disabled" v-model="FormData.research_itw_result" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="面试建议">
                      <el-input disabled="disabled" v-model="FormData.research_itw_suggestion" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>

              <el-form v-if="FormData.market_itw_name">
                <el-row :gutter="24">
                  <el-col :span="24">
                    <el-form-item label="市场评价"></el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="面试官姓名">
                      <el-input disabled="disabled" v-model="FormData.market_itw_name" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="面试时间">
                      <el-input disabled="disabled" v-model="FormData.market_itw_time" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="面试结果">
                      <el-input disabled="disabled" v-model="FormData.market_itw_result" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="面试建议">
                      <el-input disabled="disabled" v-model="FormData.market_itw_suggest" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>

              <el-form v-if="FormData.operate_itw_name">
                <el-row :gutter="24">
                  <el-col :span="24">
                    <el-form-item label="运营评论"></el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="面试官姓名">
                      <el-input disabled="disabled" v-model="FormData.operate_itw_name" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="面试">
                      <el-input disabled="disabled" v-model="FormData.operate_itw_time" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="面试结果">
                      <el-input disabled="disabled" v-model="FormData.operate_itw_result" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="面试建议">
                      <el-input disabled="disabled" v-model="FormData.operate_itw_suggest" autocomplete="off" />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-form>

            <el-form>
              <el-row :gutter="24">
                <el-col :span="8">
                  <el-form-item label="最终结果">
                    <el-input v-model="FormData.finallyResult" autocomplete="off" :placeholder="FormData.finallyResult" />
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item>
                    <el-button type="primary" @click="submitResults">确定</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-form>
          <el-button type="primary" @click="downloadImage">下载</el-button>
        </el-scrollbar>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useApplicationStore from "@/store/main/application"
import { storeToRefs } from "pinia"
import { ref, toRaw } from "vue"
import html2canvas from "html2canvas"

//使用application仓库
const dialogFormVisible = ref(false)
const searchInfo = ref({})

const currentPage = ref(1)
const pageSize = ref(10)

const applicationStore = useApplicationStore()
const { appTableData, appDetailData, allDataLength } = storeToRefs(applicationStore)

const FormData = appDetailData
const redata = () => {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  applicationStore.fetchapplyTableData(offset, size)
}
const fetchDeatil = (name) => {
  applicationStore.fetchapplyDetailData(name)
}


const cn_name = ref()

const openDialog = async (name) => {
  cn_name.value = name
  fetchDeatil(name)
  const Data = await toRaw(appDetailData._object)
  FormData.value = Data.appDetailData
  dialogFormVisible.value = true
}

redata()

//页码相关的逻辑
function handleSizeChange () {
  redata()
}

function handleCurrentChange () {
  redata()
}


async function submitResults () {
  await applicationStore.upfinallyResultData(cn_name.value, FormData.value.finallyResult)
  redata()
  dialogFormVisible.value = flase
}


async function downloadImage () {
  const formElement = document.querySelector(".downForm") // 获取 el-form 元素
  // console.log(formElement)

  const canvas = document.createElement("canvas")

  // 设置 canvas 宽高
  canvas.width = formElement.offsetWidth
  canvas.height = formElement.offsetHeight

  // 将 el-form 内容绘制到 canvas
  await html2canvas(formElement, { canvas })

  // 将绘制的内容导出为图片
  const imageDataUrl = canvas.toDataURL("image/png")

  // 创建临时链接并下载图片
  const link = document.createElement("a")
  link.href = imageDataUrl
  link.download = "form_image.png"
  link.click()
}
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

.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>