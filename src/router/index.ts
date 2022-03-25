import { createRouter, createWebHashHistory } from 'vue-router'

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
  },
  {
    path: '/sign',
    name: '注册页',
    component: sign,
  },
  {
    path: '/navigation-1',
    name: '系统管理',
    redirect: '/Database',
    component: index,
    children: [
      {
        path: '/Database',
        name: '数据库配置信息',
        component: pageDatabase
      },
    ]
  },
  {
    path: '/navigation-2',
    name: '用户管理',
    component: index,
    redirect: '/User',
    children: [
      {
        path: '/User',
        name: '用户注册信息',
        component: pageUser
      },
    ]
  },
  {
    path: '/navigation-3',
    name: '数据管理',
    component: index,
    redirect: '/Upload',
    children: [
      {
        path: '/Upload',
        name: '数据导入',
        component: pageUpload
      },
      {
        path: '/Download',
        name: '数据导出',
        component: pageDownload
      }
    ]
  },
  {
    path: '/navigation-4',
    name: '业务查询',
    component: index,
    redirect: '/Sector',
    children: [
      {
        path: '/Sector',
        name: '小区配置信息查询',
        component: pageSector
      },
      {
        path: '/eNodeB',
        name: '基站eNodeB信息查询',
        component: page_eNodeB
      },
      {
        path: '/KPI',
        name: '小区KPI指标信息查询',
        component: pageKPI
      },
      {
        path: '/PRB',
        name: 'PRB信息统计与查询',
        component: pagePRB
      }
    ]
  },
  {
    path: '/navigation-5',
    name: '业务分析',
    component: index,
    redirect: 'C2I',
    children: [
      {
        path: '/C2I',
        name: '主邻小区C2I干扰分析',
        component: pageC2I
      },
      {
        path: '/C2Inew',
        name: '重叠覆盖干扰小区三元组分析',
        component: pageC2Inew
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
