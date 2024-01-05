<template>
    <div>
        <div class="talentPortrait">
            <!-- <h2> 人才画像</h2> -->
            <el-form :inline="true" :model="form">
                <!-- <el-form-item label="应聘人员简历选择:" class="talentPortrait_parame"></el-form-item> -->
                <el-form-item label="应聘人员简历选择">
                    <el-input v-model="form.value" placeholder="请输入姓名" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">确定</el-button>
                </el-form-item>
            </el-form>
        </div>
        <h1>姓名：{{ name1 }}</h1>
        <h1>总分：{{ Totalscore }}</h1>
        <div ref="main" style="height: 800px">
        </div>
    </div>
</template>

<script setup>
import * as echarts from "echarts"
import { ref, onMounted, computed } from "vue"
// import { appFormDetail, applyTableRequest, upFinallyResult } from "@/service/main/main"
import { appFormDetailPlus } from "@/service/main/main"

// const value = ref()
const form = ref({
    value: ""
})
const name1 = ref("")
const main = ref(null)
const data1 = ref([])
const averageValue = computed(() => {
    if (data1.value.length === 0) {
        return 0 // or any default value if the array is empty
    }
    const sum = data1.value.reduce((total, value) => total + value, 0)
    return sum / data1.value.length
})
const Totalscore = computed(() => averageValue.value)
const onSubmit = () => {
    // 雷达图结果
    return new Promise(resolve => {
        appFormDetailPlus(form.value.value).then(res => {
            data1.value = res.data.data
            name1.value = res.data.name
            updateEchartsConfig()
            resolve(res)
        }).catch(() => {
            //todo
        })
    })
    //todo
}


onMounted(() => {
    const myChart = echarts.init(main.value, "light")

    const option = {
        title: {
            // text: "人才画像"
        },
        tooltip: {},
        legend: {
            // data: ["预算分配（Allocated Budget）", "实际开销（Actual Spending）"]
            data: []
        },
        radar: {
            // shape: 'circle',
            name: {
                textStyle: {
                    color: "#fff",
                    backgroundColor: "#999",
                    borderRadius: 3,
                    padding: [5, 5],
                    fontSize: "20px"
                }
            },
            splitArea: {
                areaStyle: {
                    color: ["#B8D3E4", "#96C5E3", "#7DB5DA", "#72ACD1"]
                }
            },
            indicator: [
                { name: "年龄", max: 100 },//
                { name: "学历", max: 100 },//博士 硕士 本科 大专 高中 初中 小学
                // { name: "专业", max: 100 },
                { name: "期望薪资", max: 100 },
                { name: "工作经历", max: 100 },
                { name: "政治面貌", max: 100 }
            ],
        },
        series: [{
            name: name1.value,
            type: "radar",
            lineStyle: {
                color: "black", // 设置雷达图中数据线的颜色为黑色
            },
            itemStyle: {
                color: "black", // 设置雷达图中数据点的颜色为黑色
            },
            data: [
                {
                    value: data1,
                    name: name1.value
                }
            ]
        }]
    }
    myChart.setOption(option)
})
const updateEchartsConfig = () => {
    const myChart = echarts.getInstanceByDom(main.value)

    // Update series data with dynamic values
    myChart.setOption({
        series: [
            {
                name: name1.value,
                data: [
                    {
                        value: data1.value,
                        name: name1.value,
                    },
                ],
            },
        ],
    })
}
</script>

<style lang="less" scoped>
.talentPortrait {
    background-color: #fff;
    // height: 60px;
    line-height: 60px;
    margin-bottom: 20px;
    padding-left: 10px;

    // .el-form :deep(.talentPortrait_parame) .el-form-item__label {
    //     font-size: 20px !important;
    //     font-weight: bold;
    // }

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