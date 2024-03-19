import type { RouteRecordRaw } from 'vue-router'
import UserLayout from '@/layouts/UserLayout.vue'
import AccessEnum from '@/access/accessEnum'
import AdminLayout from '@/layouts/AdminLayout.vue'
import EmptyLayout from '@/layouts/EmptyLayout.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '主页',
    component: () => import('@/views/user/UserLoginView.vue'),
    meta: {
      layout: UserLayout
    }
  },
  {
    path: '/user',
    name: '用户',
    children: [
      {
        path: '/user/login',
        name: '用户登录',
        component: () => import('@/views/user/UserLoginView.vue')
      },
      {
        path: '/user/register',
        name: '用户注册',
        component: () => import('@/views/user/UserRegisterView.vue')
      }
    ],
    meta: {
      hideInMenu: true,
      layout: UserLayout
    }
  },
  {
    path: '/admin',
    name: '管理员',
    children: [
      {
        path: '/admin/home',
        name: '管理员主页',
        component: () => import('@/views/admin/AdminHomeView.vue')
      },
      {
        path: '/admin/user/list',
        name: '用户列表',
        component: () => import('@/views/admin/user/UserListView.vue')
      }
    ],
    meta: {
      hideInMenu: true,
      layout: AdminLayout
      // todo 添加权限
      //access: AccessEnum.ADMIN
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/notFound/NotFoundView.vue'),
    meta: {
      hideInMenu: true,
      layout: EmptyLayout
    }
  },
  {
    path: '/:pathMatch(.*)', // 匹配所有路由
    redirect: '/404'
  }
]
