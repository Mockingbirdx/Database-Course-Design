import { createRouter, createWebHashHistory } from 'vue-router'

import { ElMessage } from "element-plus"

import login from '../views/login.vue'
import sign from '../views/sign.vue'
import index from '../views/index.vue'

import pageDatabase from '../views/pageDatabase.vue'
import pageUser from '../views/pageUser.vue'
import pageUpload from '../views/pageUpload.vue'
import pageDownload from '../views/pageDownload.vue'
import pageSector from '../views/pageSector.vue'
import page_eNodeB from '../views/page_eNodeB.vue'
import pageKPI from '../views/pageKPI.vue'
import pagePRB from '../views/pagePRB.vue'
import pageC2I from '../views/pageC2I.vue'
import pageC2Inew from '../views/pageC2Inew.vue'

const routes = [
  {
    path: '/',
    name: '登录页',
    component: login,
    isAuth: false,
    meta: { isAuth: false }
  },
  {
    path: '/sign',
    name: '注册页',
    component: sign,
    isAuth: false,
    meta: { isAuth: false }
  },
  {
    path: '/navigation-1',
    name: '系统管理',
    redirect: '/Database',
    component: index,
    isAuth: true,
    children: [
      {
        path: '/Database',
        name: '数据库配置信息',
        component: pageDatabase,
        meta: { isAuth: true, admin: true }
      },
    ]
  },

  {
    path: '/navigation-2',
    name: '用户管理',
    component: index,
    redirect: '/User',
    isAuth: true,
    children: [
      {
        path: '/User',
        name: '用户注册信息',
        component: pageUser,
        meta: { isAuth: true, admin: false }
      },
    ]
  },
  {
    path: '/navigation-3',
    name: '数据管理',
    component: index,
    isAuth: false,
    redirect: '/Upload',
    children: [
      {
        path: '/Upload',
        name: '数据导入',
        component: pageUpload,
        meta: { isAuth: true, admin: false }
      },
      {
        path: '/Download',
        name: '数据导出',
        component: pageDownload,
        meta: { isAuth: true, admin: false }
      }
    ]
  },
  {
    path: '/navigation-4',
    name: '业务查询',
    component: index,
    redirect: '/Sector',
    isAuth: false,
    children: [
      {
        path: '/Sector',
        name: '小区配置信息查询',
        component: pageSector,
        meta: { isAuth: true, admin: false }
      },
      {
        path: '/eNodeB',
        name: '基站eNodeB信息查询',
        component: page_eNodeB,
        meta: { isAuth: true, admin: false }
      },
      {
        path: '/KPI',
        name: '小区KPI指标信息查询',
        component: pageKPI,
        meta: { isAuth: true, admin: false }
      },
      {
        path: '/PRB',
        name: 'PRB信息统计与查询',
        component: pagePRB,
        meta: { isAuth: true, admin: false }
      }
    ]
  },
  {
    path: '/navigation-5',
    name: '业务分析',
    component: index,
    redirect: 'C2I',
    isAuth: false,
    children: [
      {
        path: '/C2I',
        name: '主邻小区干扰分析',
        component: pageC2I,
        meta: { isAuth: true, admin: false }
      },
      {
        path: '/C2Inew',
        name: '重叠覆盖干扰分析',
        component: pageC2Inew,
        meta: { isAuth: true, admin: false }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

let loginPage = '/'
router.beforeEach((to, from, next) => {
  console.log(localStorage.type + '  ' + to.path)

  // 校验进入页面是否需要权限
  if (to.meta.isAuth) {
    var type = localStorage.getItem('type')
    // 登录状态过期自动跳转到登录页
    if (type === 'none' || type === null) {
      ElMessage({
        type: 'error',
        message: '登录状态已失效，请重新登录',
        showClose: true
      })
      router.replace(loginPage)
    }
    else if (type === 'user' && to.meta.admin === true) {
      ElMessage({
        type: 'error',
        message: '没有该页的访问权限!',
        showClose: true
      })
      router.replace(loginPage)
    }
  }
  next()
})

export default router
