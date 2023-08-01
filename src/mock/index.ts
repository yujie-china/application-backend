import Mock from "mockjs"

function applicationTableData () {
  return Mock.mock({
    ID: "@increment(1)",
    date: Mock.Random.date("yyyy-MM-dd"),
    name: Mock.Random.cname(),
    sex: Mock.Random.pick(["男", "女"]),
    age: Mock.Random.integer(18, 60),
    phone: Mock.mock(/^1(3|4|5|7|8)\d{9}$/),
    qualifications: Mock.Random.pick(["本科", "硕士", "博士"]),
    school_name: Mock.Random.pick([
      "南昌大学",
      "北京大学",
      "清华大学",
      "复旦大学"
    ]),
    major: Mock.Random.pick(["计算机科学与技术", "电子工程", "经济学", "医学"]),
    department: Mock.Random.pick(["研发部", "市场部", "财务部", "人事部"]),
    position: Mock.Random.pick([
      "前端开发工程师",
      "后端开发工程师",
      "产品经理",
      "销售经理"
    ]),
    employment_status: Mock.Random.pick(["录用", "待定", "拒绝"]),
  })
}
function applicationFormData () {
  return Mock.mock({
    position:
      "@pick(['前端开发工程师', '后端开发工程师', '产品经理', '销售经理'])",
    other_position: "后端开发工程师",
    price: "8000-10000",
    address: "南昌",
    isOffsite: "1",
    isAgain: "1",
    road: "BOSS直聘",
    come_time: "2023-7-26",
    interview_time: "2023-7-26",
    cn_name: "@cname",
    eng_name: "zhangsan",
    sex: "@pick(['男', '女'])",
    birth_address: "广东省",
    location: "广东省",
    Native_place: "广东省",
    nation: "汉族",
    education_level: "本科",
    political: "共青团员",
    phone: /^1(3|4|5|7|8)\d{9}$/,
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
}
function interviewTableData () {
  return Mock.mock({
    ID: "@increment(1)",
    name: "@cname",
    sex: "@pick(['男', '女'])",
    age: "@integer(18, 60)",
    phone: /^1(3|4|5|7|8)\d{9}$/,
    department: "@pick(['研发部', '市场部', '财务部', '人事部'])",
    position:
      "@pick(['前端开发工程师', '后端开发工程师', '产品经理', '销售经理'])",
    channel: "@pick(['微信公众号', '线下活动', '电视广告', '社交媒体'])",
    salary: "@integer(10000, 100000)",
    result: "@pick(['考虑', '接受', '拒绝'])",

  })
}

function employeeTableData () {
  return Mock.mock({
    ID: "@increment(1)",
    name: "@cname",
    sex: "@pick(['男', '女'])",
    ID_card: Mock.Random.id(),
    qualifications: "@pick([\"本科\", \"硕士\", \"博士\"])",
    email: Mock.Random.email("qq.com"),
    phone: /^1(3|4|5|7|8)\d{9}$/,
    address: `${Mock.Random.province()}-${Mock.Random.city()}-${Mock.Random.county()}`,
    department: "@pick(['研发部', '市场部', '财务部', '人事部'])",
    position:
      "@pick(['前端开发工程师', '后端开发工程师', '产品经理', '销售经理'])",

  })
}


// application的表格数据
Mock.mock(/application\/tableData/, "get", () => {
  const data = Mock.mock({
    "data|10": [applicationTableData]
  })
  return data
})
// interview的表格数据
Mock.mock(/interview\/tableData/, "get", () => {
  const data = Mock.mock({
    "data|10": [interviewTableData]
  })
  return data
})
// employee的表格数据
Mock.mock(/employee\/tableData/, "get", () => {
  const data = Mock.mock({
    "data|10": [employeeTableData]
  })
  return data
})
// application的表单数据
Mock.mock(/application\/formData/, "get", () => {
  const data = Mock.mock({
    "data|1": [applicationFormData]
  })
  return data
})
