import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

/* 初始路由 */
export default new Router({
  routes: [
    //解决跳转/不显示/home页面
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/login",
      component: () => import("../views/login")
    },
    {
      path: "/",
      component: () => import("../views/layout"),
      children: [
        {
          path: "home",
          component: () => import("../views/home"),
          meta: {
            name: "首页",
            rank: ["admin", "super_editor"],
            path: "/home"
          }
        },
        {
          path: "mine",
          component: () => import("../views/mine/mine.vue"),
          name: "个人中心",
          meta: {
            name: "个人中心",
            rank: ["admin", "super_editor"],
            path: "/mine"
          }
        },
        {
          path: "message",
          component: () => import("../views/mine/mineMessage.vue"),
          name: "消息中心",
          meta: {
            name: "消息中心",
            rank: ["admin", "super_editor"],
            path: "/message"
          }
        },
      
      ]
    }
  ],
  mode: "history"
});





