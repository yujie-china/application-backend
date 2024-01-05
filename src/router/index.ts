import { createRouter, createWebHashHistory } from "vue-router"

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      component: () => import("../views/login/login.vue")
    },
    {
      path: "/main",
      component: () => import("../views/main/main.vue"),
      children: [
        {
          path: "/main/home",
          component: () => import("../views/main/home/home.vue")
        },
        {
          path: "/main/application",
          component: () => import("../views/main/application/application.vue")
        },
        {
          path: "/main/interview",
          component: () => import("../views/main/interview/interview.vue")
        },
        {
          path: "/main/employee",
          component: () => import("../views/main/employee/employee.vue")
        }, {
          path: "/main/talentPortrait",
          component: () => import("../views/main/talentPortrait/talentPortrait.vue")
        }
      ]
    },
    {
      path: "/:pathMatch(.*)",
      component: () => import("../views/not-found/notFound.vue")
    }
  ]
})

// 导航守卫
// 参数: to(跳转到的位置)/from(从哪里跳转过来)
// 返回值: 返回值决定导航的路径(不返回或者返回undefined, 默认跳转)
// 举个栗子: / => /main
// to: /main from: / 返回值: /abc

// router.beforeEach((to) => {
//   // 只有登录成功(token), 才能真正进入到main页面
//   const token = localCache.getCache(LOGIN_TOKEN)
//   if (to.path.startsWith("/main") && !token) {
//     return "/login"
//   }
// })

export default router
