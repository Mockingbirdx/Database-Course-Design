<template>
  <el-descriptions direction="vertical" :column="1" border>
    <el-descriptions-item label="数据库连接信息">{{ info_connection }}</el-descriptions-item>
    <el-descriptions-item label="配置信息">{{ info_config }}</el-descriptions-item>
    <el-descriptions-item label="连接时长（小时）" :span="2">
      <el-space>
        <el-input-number v-model="num_connection_input" :min="1" :max="24" />
        <el-button type="primary" @click="onSubmitConnection">修改</el-button>
      </el-space>
    </el-descriptions-item>

    <el-descriptions-item label="数据缓冲区大小">
      <el-space>
        <el-input-number v-model="num_cache_input" :min="100" :max="10000" />
        <el-button type="primary" @click="onSubmitCache">修改</el-button>
      </el-space>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

let info_connection = "......"
let info_config = "......"

// 连接时长
const num_connection_input = ref(1)
const onSubmitConnection = () => {
  ElMessage({
    message: `连接时长已修改至${num_connection_input.value}h`,
    type: 'success',
  })
}

// 缓冲区大小
const num_cache_input = ref(1)
const onSubmitCache = () => {
  ElMessage({
    message: `缓冲区已修改至${num_cache_input.value}MB`,
    type: 'success',
  })
}


</script>

<style scoped>
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 32px;
}
</style>