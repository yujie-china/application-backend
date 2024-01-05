<template>
  <div class="main-menu">
    <!-- 1.logo -->
    <div class="logo">
      <img class="img" src="@/assets/img/heyme_logo.png" alt="">
      <transition name=" fade">
        <h2 v-show="!isFold" class="title">应聘人员管理系统</h2>
      </transition>
    </div>

    <!-- 2.menu -->
    <div class="menu">
      <el-menu :collapse="isFold" text-color="#b7bdc3" active-text-color="#fff" background-color="#001529"
        :default-active="defaultActive" :default-openeds="defaultOpeneds">
        <!-- 1.首页 -->
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <Monitor />
            </el-icon>
            <span>首页</span>
          </template>
          <el-menu-item index="1-1" @click="goHome()">数据总览</el-menu-item>
        </el-sub-menu>

        <!-- 2.应聘管理 -->
        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <Setting />
            </el-icon>
            <span>应聘管理</span>
          </template>
          <el-menu-item index="2-1" @click="goInformation()">应聘人员信息</el-menu-item>

        </el-sub-menu>

        <!-- 3.面试管理 -->
        <el-sub-menu index="3">
          <template #title>
            <el-icon>
              <ShoppingBag />
            </el-icon>
            <span>面试管理</span>
          </template>
          <el-menu-item index="3-1" @click="goInterview()">面试信息管理</el-menu-item>
        </el-sub-menu>

        <!--  4.人才管理     -->
        <el-sub-menu index="4">
          <template #title>
            <el-icon>
              <ShoppingBag />
            </el-icon>
            <span>人员管理</span>
          </template>
          <el-menu-item index="4-1" @click="goTalentPortrait()">人才画像</el-menu-item>
          <!-- <el-menu-item index="4-2" @click="goEmployee()">员工信息管理</el-menu-item> -->
        </el-sub-menu>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
// import useLoginStore from "@/store/login/login"
import { useRouter } from "vue-router"
const defaultActive = "1-1"
const defaultOpeneds = ["1"]
// 0.定义props
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

// 1.获取动态的菜单
// const loginStore = useLoginStore()
// const userMenus = loginStore.userMenus

// 2.监听item的点击
const router = useRouter()
function goHome () {
  const url = "/main/home"
  router.push(url)
}
function goInformation () {
  const url = "/main/application"
  router.push(url)
}
function goInterview () {
  const url = "/main/interview"
  router.push(url)
}
function goEmployee () {
  const url = "/main/employee"
  router.push(url)
}
function goTalentPortrait () {
  const url = "/main/talentPortrait"
  router.push(url)
}

</script>
<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active {
  animation: fade-in 0.4s;
}

.fade-leave-active {
  animation: fade-in 0.4s ease;
}

@keyframes fade-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(0.5);
  }

  100% {
    transform: scale(1);
  }
}


.main-menu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
