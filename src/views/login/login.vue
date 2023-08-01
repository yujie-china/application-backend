<template>
    <div class="login">
        <div class="wrap_left">
            <div class="wrap_left_title">高效智能的应聘者管理系统</div>
            <div class="wrap_left_info">帮助您轻松管理招聘流程，从繁琐的招聘工作中解放出来，专注于挖掘优秀人才。</div>
            <div class="wrap_left_logo">
                <img src="../../assets/img/logo.png" alt="">
            </div>
        </div>
        <div class="login_from">
            <login_from></login_from>
        </div>
        <div class="Company_info">Copyright @2023 江西海默技术股份有限公司</div>
    </div>
</template>

<script lang="ts" setup>
import login_from from "./components/login_from.vue"

</script>

<style lang="less" scoped>
.login {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    background: url(../../assets/img/login-bg.svg) no-repeat;
    background-size: cover;

    .wrap_left {
        .wrap_left_title {
            height: 35px;
            font-size: 24px;
            font-weight: bold;
            color: #000000;
            line-height: 35px;
            margin-bottom: 30px;
        }

        .wrap_left_info {
            // font-size: 18px;
            // color: #D9D9D9;
            // line-height: 26px;
            // text-align: left;
            // margin-bottom: 53px;
            width: 502px;
            height: 26px;
            font-size: 18px;
            font-weight: 400;
            color: #D9D9D9;
            line-height: 26px;
            margin-bottom: 53px;
        }

        .wrap_left_logo img {
            width: 502px;
            height: 502px;
        }
    }

    .Company_info {
        width: 379px;
        height: 26px;
        font-size: 18px;
        color: #D9D9D9;
        line-height: 26px;
        position: absolute;
        bottom: 23px;
        margin: 0 auto;
    }

}
</style>