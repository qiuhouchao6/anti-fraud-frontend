<script setup lang="ts">
import { computed, reactive, ref, watchEffect } from 'vue'
import { UserControllerService, UserQueryRequest } from '@/generated'

type SizeProps = 'mini' | 'small' | 'medium' | 'large';
const size = ref<SizeProps>('medium')
const userList = ref([])
const densityList = computed(() => [
  {
    name: '迷你',
    value: 'mini'
  },
  {
    name: '偏小',
    value: 'small'
  },
  {
    name: '中等',
    value: 'medium'
  },
  {
    name: '偏大',
    value: 'large'
  }
])
// 查询参数
const searchParams = ref<UserQueryRequest>({
  pageSize: 10,
  pageNumber: 1,
  userName: '',
  userRole: ''
})

const columns = [
  {
    title: '#id',
    dataIndex: 'id'
  },
  {
    title: '账号',
    dataIndex: 'userAccount'
  },
  {
    title: '用户名',
    dataIndex: 'userName'
  },
  {
    title: '性别',
    slotName: 'gender'
  },
  {
    title: '角色',
    slotName: 'userRole'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime'
  },
  {
    title: '操作',
    slotName: 'optional'
  }
]

const total = ref(0)

const search = () => {
  fetchData()
}

const fetchData = async () => {
  const res = await UserControllerService.listUserVoByPageUsingPost(
    searchParams.value
  )
  if (res.code === 0) {
    userList.value = res.data.records
    total.value = parseInt(res.data.totalRow)
  } else {
    console.error('获取数据失败' + res.message)
  }
}
const onPageChange = (current: number) => {
  searchParams.value = {
    ...searchParams.value,
    pageNumber: current
  }
}

const reset = () => {
  searchParams.value = {
    pageSize: 10,
    pageNumber: 1
  }
}

watchEffect(() => {
  fetchData()
})

const handleSelectDensity = (
  val: string | number | Record<string, any> | undefined
) => {
  size.value = val as SizeProps
}

const doDeleteUser = (record: any) => {
  console.log(record)
}

const doUpdateUser = (record: any) => {
  console.log(record)
}
</script>

<template>
  <div id="userListView">
    <a-card :bordered="false">
      <a-row>
        <a-col :flex="1">
          <a-form
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="number" label="编号">
                  <a-input
                    v-model="searchParams.userName"
                    placeholder="请输入编号"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="name" label="用户名">
                  <a-input
                    v-model="searchParams.userName"
                    placeholder="请输入用户名"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="contentType" label="角色">
                  <a-select
                    v-model="searchParams.userName"
                    options="contentTypeOptions"
                    placeholder="请选择角色"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="filterType" label="性别">
                  <a-select
                    v-model="searchParams.userName"
                    options="filterTypeOptions"
                    placeholder="请选择性别"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="createdTime" label="创建时间">
                  <a-range-picker
                    v-model="searchParams.userName"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="status" label="状态">
                  <a-select
                    v-model="searchParams.userName"
                    options="statusOptions"
                    placeholder="请选择用户状态"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              搜索
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              重置
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="12" style="display: flex">
          <a-space>
            <a-button type="primary">
              <template #icon>
                <icon-plus />
              </template>
              {{ '新增' }}
            </a-button>
            <a-upload action="/">
              <template #upload-button>
                <a-button>
                  {{ '导入' }}
                </a-button>
              </template>
            </a-upload>
          </a-space>
        </a-col>
        <a-col
          :span="12"
          style="display: flex; align-items: center; justify-content: end"
        >
          <a-button>
            <template #icon>
              <icon-download />
            </template>
            {{ '下载' }}
          </a-button>
          <a-tooltip content="刷新">
            <div class="action-icon" @click="search">
              <icon-refresh size="18" />
            </div>
          </a-tooltip>
          <a-dropdown @select="handleSelectDensity">
            <a-tooltip content="密度">
              <div class="action-icon">
                <icon-line-height size="18" />
              </div>
            </a-tooltip>
            <template #content>
              <a-doption
                v-for="item in densityList"
                :key="item.value"
                :value="item.value"
                :class="{ active: item.value === size }"
              >
                <span>{{ item.name }}</span>
              </a-doption>
            </template>
          </a-dropdown>
        </a-col>
      </a-row>
      <a-table
        row-key="id"
        :pagination="{
          showTotal: true,
          pageSize: searchParams.pageSize,
          current: searchParams.pageNumber,
          total,
        }"
        :columns="columns"
        :data="userList"
        :bordered="false"
        :size="size"
        @page-change="onPageChange"
      >
        <template #gender="{ record }">
          <a-tag v-if="record.gender === 0" color="blue"> 男</a-tag>
          <a-tag v-else-if="record.gender === 1" color="pink"> 女</a-tag>
          <a-tag v-else> 未知</a-tag>
        </template>
        <template #userRole="{ record }">
          <a-tag v-if="record.userRole === 'admin'" color="green">
            管理员
          </a-tag>
          <a-tag v-else-if="record.userRole == 'user'"> 用户</a-tag>
        </template>
        <template #optional="{ record }">
          <a-space>
            <a-button
              type="dashed"
              status="warning"
              @click="doUpdateUser(record)"
            >修改
            </a-button>
            <a-button
              type="dashed"
              status="danger"
              @click="doDeleteUser(record)"
            >删除
            </a-button>
          </a-space>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<style scoped>
#userListView {
  min-height: 80vh;
  margin: 2px 2px 2px 2px;
}

:deep(.arco-table-th) {
  &:last-child {
    .arco-table-th-item-title {
      margin-left: 16px;
    }
  }
}

.active {
  color: #0960bd;
  background-color: #e3f4fc;
}

.action-icon {
  margin-left: 12px;
  cursor: pointer;
}
</style>
