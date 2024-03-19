<template>
  <a-layout class="layout-demo">
    <a-layout-sider collapsible breakpoint="xl">
      <div class="logo ma-a" style="display: flex">
        <img
          src="@/assets/logo.svg"
          alt=""
          style="width: 40px; height: 40px; margin: auto"
        />
        <a class="ma-a" style="margin-left: 5px;margin-top: 10px;">反诈骗后台</a>
      </div>
      <a-menu
        :default-selected-keys="['home']"
        :style="{ width: '100%' }"
        @menu-item-click="onClickMenuItem"
      >
        <a-menu-item key="home">
          <IconHome></IconHome>
          主页
        </a-menu-item>
        <a-sub-menu key="user">
          <template #title>
            <icon-user />
            用户管理
          </template>
          <a-menu-item key="user/list">用户列表</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="system">
          <template #title>
            <icon-computer />
            系统监控
          </template>
          <a-menu-item key="system/onLineUser">在线用户</a-menu-item>
          <a-menu-item key="3_2" disabled>数据监控</a-menu-item>
          <a-menu-item key="3_3" disabled>服务监控</a-menu-item>
          <a-menu-item key="3_4" disabled>缓存监控</a-menu-item>
          <a-menu-item key="3_5" disabled>缓存列表</a-menu-item>
        </a-sub-menu>
      </a-menu>
      <!-- trigger -->
      <template #trigger="{ collapsed }">
        <IconCaretRight v-if="collapsed"></IconCaretRight>
        <IconCaretLeft v-else></IconCaretLeft>
      </template>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="padding-left: 20px"></a-layout-header>
      <a-layout style="padding: 0 24px">
        <a-breadcrumb :style="{ margin: '16px 0' }">
          <a-breadcrumb-item>{{ firstMenu }}</a-breadcrumb-item>
          <a-breadcrumb-item>{{ secondMenu }}</a-breadcrumb-item>
        </a-breadcrumb>
        <a-layout-content>
          <router-view />
        </a-layout-content>
        <a-layout-footer>
          <div style="display: flex; margin: 0 auto">
            <a style="color: #000"> 版权所有© 2023-2024</a>
          </div>
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script setup>
import router from '@/router'
import { ref } from 'vue'

const firstMenu = ref('主页')
const secondMenu = ref('')
const onClickMenuItem = (key) => {
  // 获取key的前缀 / 以前的字符
  const first = key.split('/')[0]
  // 获取key的后缀 / 以后的字符
  const second = key.split('/')[1]
  switch (first) {
    case 'home':
      firstMenu.value = '主页'
      secondMenu.value = ''
      break
    case 'user':
      firstMenu.value = '用户管理'
      switch (second) {
        case 'list':
          secondMenu.value = '用户列表'
          break
        default:
          secondMenu.value = ''
      }
      break
    case 'system':
      firstMenu.value = '系统监控'
      switch (second) {
        case 'onLineUser':
          secondMenu.value = '在线用户'
          break
        default:
          secondMenu.value = ''
      }
      break
  }
  router.push({ path: `/admin/${key}` })
}
</script>
<style scoped>
.layout-demo {
  min-height: 100vh;
  background: var(--color-fill-2);
  border: 1px solid var(--color-border);
}

.layout-demo :deep(.arco-layout-sider) .logo {
  height: 32px;
  margin: 12px 8px;
  background: rgba(255, 255, 255, 0.2);
}

.layout-demo :deep(.arco-layout-header) {
  height: 64px;
  line-height: 64px;
  background: var(--color-bg-3);
}

.layout-demo :deep(.arco-layout-footer) {
  height: 48px;
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  line-height: 48px;
}

.layout-demo :deep(.arco-layout-content) {
  color: var(--color-text-2);
  font-weight: 400;
  font-size: 14px;
  background: var(--color-bg-3);
}

.layout-demo :deep(.arco-layout-footer),
.layout-demo :deep(.arco-layout-content) {
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--color-white);
  font-size: 16px;
  font-stretch: condensed;
}
</style>
