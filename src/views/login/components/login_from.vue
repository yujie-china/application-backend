<template>
    <div class="login_from">
        <div class="login_from_top">
            <div class="tit">
                招聘人员信息
            </div>
        </div>
        <el-form class="common" ref="formLogin" label-position="top" :model="FormData" :rules="rules">
            <el-form-item label="手机号码" prop="phone">
                <el-input placeholder="请输入手机号码" v-model="FormData.phone" class="phone" />
            </el-form-item>
            <el-form-item v-show="isshow" label="密码" prop="pwd">
                <el-input type="password" show-password class="password" v-model="FormData.password" placeholder="请输入密码" />
            </el-form-item>

            <el-form-item v-show="!isshow" label="验证码" prop="code">
                <div class="code">
                    <el-input type="password" show-password class="password" v-model="FormData.code" placeholder="请输入验证码" />
                    <el-button class=" get-btn" @click="HandleNoteCode" color="#0054E6">发送验证码</el-button>
                </div>
            </el-form-item>

            <div class="login_from_info">
                <div class="code_login" v-show="isshow" @click="changeShow">验证码登录</div>
                <div class="code_login" v-show="!isshow" @click="changeShow">密码登录</div>
                <div class="forgot" v-show="isshow">忘记密码？</div>
            </div>
            <el-form-item>
                <el-button type="primary" class="login_btn" @click="goMain()">登录</el-button>
            </el-form-item>
            <div class="aggre_info">登录即表示您已阅读并同意服务条款</div>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue"
import { useRouter } from "vue-router"

const isshow = ref(true)
const changeShow = function () {
    isshow.value = !isshow.value
}

const FormData = ref({
    phone: "12345678912",
    password: "123456",
    code: ""
})

const rules = reactive({
    phone: [{ required: true, message: "手机号码不能为空", trigger: "blur" }],
    pwd: [{ required: true, message: "密码不能为空", trigger: "blur" }],
    code: [{ required: true, message: "验证码不能为空", trigger: "blur" }],
})
const router = useRouter()
function goMain () {
    const url = {
        path: "/main/home"
    }
    router.push(url)
}

</script>

<style lang="less" scoped>
.login_from {
    width: 472px;
    height: 515px;
    background: #FFFFFF;
    box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.5);
    padding: 69px 61px 15px 63px;
    box-sizing: border-box;
    border-radius: 5px;
    position: relative;

    :global(.el-input__inner) {
        height: 43px;
    }

    .login_from_top {
        display: flex;
        justify-content: space-between;


        .tit {
            width: 150px;
            height: 35px;
            font-size: 24px;
            font-weight: bold;
            line-height: 35px;
            margin-bottom: 13px;
        }
    }

    .phone {
        background: #FFFFFF;
        border-radius: 2px;
        border: 1px solid #BFBFBF;
        // margin-bottom: 22px;

        :global(.el-form-item__label) {
            margin-top: 22px;
        }

    }

    .password {
        background: #FFFFFF;
        border-radius: 2px;
        border: 1px solid #BFBFBF;
    }

    .code {
        display: flex;
        flex: 1;

        .get-btn {
            height: 47px;
        }
    }

    .el-form-item__label {
        margin-top: 22px;
    }

    .login_from_info {
        display: flex;
        justify-content: space-between;
        margin-top: 33px;

        .code_login {
            width: 60px;
            height: 17px;
            font-size: 12px;
            color: #1F1F1F;
            line-height: 17px;
        }

        .forgot {
            width: 60px;
            height: 17px;
            font-size: 12px;
            color: #1F1F1F;
            line-height: 17px;
        }
    }

    .login_btn {
        width: 350px;
        height: 45px;
        background: #0054E6;
        border-radius: 2px;
        margin-top: 35px;
    }

    .aggre_info {
        width: 192px;
        height: 17px;
        font-size: 12px;
        color: rgba(0, 0, 0, 0.65);
        line-height: 17px;
        text-align: center;
        margin: 35px auto 0;

    }

    .wx_container {
        display: flex;
        // flex: 1;
        flex-direction: column;
        align-items: center;
        // background-color: #0ff;
        padding-top: 25px;

        .wx_title_label {
            font-size: 16px;
            font-weight: bold;
            color: #000000;
            line-height: 24px;
            padding-bottom: 41px;
        }

        .wx_qrcode {
            width: 196px;
            height: 196px;
            border: 1px solid #000;
        }

        .wx_tip {
            font-size: 12px;
            font-weight: 400;
            color: #1f1f1f;
            line-height: 17px;
            margin-top: 28px;
            margin-bottom: 12px;
        }

        .wx_brand {
            font-weight: 400;
            color: #1f1f1f;
            line-height: 17px;
            margin-bottom: 45px;
        }
    }
}
</style>