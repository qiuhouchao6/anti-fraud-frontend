<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const layout = computed(() => route.meta.layout)

/**
 * 全局初始化函数
 */
const doInit = () => {
  console.log('init')
}

onMounted(() => {
  doInit()
})
</script>

<template>
  <component :is="layout" />
</template>

<style scoped>
</style>
