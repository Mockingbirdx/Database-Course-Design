<template>
  <el-descriptions direction="vertical" :column="1" border>
    <el-descriptions-item label="数据库连接信息">{{ database_info.connection }}</el-descriptions-item>
    <el-descriptions-item label="配置信息">{{ database_info.config }}</el-descriptions-item>
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
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'

let database_info = ref(reactive(
  {
    connection: "......",
    config: '......'
  }
));


// 获取数据库连接信息
const updateData = () => {
  axios({ method: 'GET', url: '/database-info', })
    .then(resp => {
      if (resp.data["code"] == 308) {
        database_info.value.connection = resp.data["data"]["connection"];
        database_info.value.config = resp.data["data"]["config"];
      }
      else {
        ElMessage({
          showClose: true,
          message: '获取数据库连接信息失败: ' + resp.data['message'],
          type: 'error',
        })
      }
    });
}

updateData();


// 连接时长
const num_connection_input = ref(1)

const onSubmitConnection = () => {
  var post_data = { time: num_connection_input.value };
  axios({
    method: 'POST',
    url: '/database-info/connection',
    data: post_data,
  }).then(resp => {
    if (resp.data['code'] == 308) {
      ElMessage({
        message: `连接时长已修改至${post_data.time}h`,
        type: 'success',
      })
    }
    else {
      ElMessage({
        showClose: true,
        message: '修改失败: ' + resp.data['message'],
        type: 'error',
      })
    }
  })
}

// 缓冲区大小
const num_cache_input = ref(1)
const onSubmitCache = () => {
  var post_data = { cache: num_cache_input.value };
  axios({
    method: 'POST',
    url: '/database-info/cache',
    data: post_data,
  }).then(resp => {
    if (resp.data['code'] == 308) {
      ElMessage({
        message: `缓冲区大小已修改至${post_data.cache}`,
        type: 'success',
      })
    }
    else {
      ElMessage({
        showClose: true,
        message: '修改失败: ' + resp.data['message'],
        type: 'error',
      })
    }
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