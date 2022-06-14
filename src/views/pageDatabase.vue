<template>
  <el-descriptions direction="vertical" :column="1" border>
    <el-descriptions-item label="数据库连接信息">
      <el-tag class="mx-1">url</el-tag><span>&emsp;{{ database_info.url }}<br><br></span>
      <el-tag class="mx-1">port</el-tag> {{ database_info.port }}
    </el-descriptions-item>
    <el-descriptions-item label="配置信息">
      <el-row>
        <el-tag class="mx-1">缓冲区大小</el-tag><span>&nbsp;{{ database_info.cache }}<br><br></span>
      </el-row>
      <el-row>
        <el-tag class="mx-1">连接时长</el-tag><span>&emsp;{{ database_info.time }}</span><br><br>
      </el-row>
      <el-row :gutter="12">
        <el-col span="5">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>tbPRB</span>
              </div>
            </template>
            <div class="text item">
              <span v-for="p in database_info.partition['tbprb']">{{ p['partition_name'] }}分区: {{ p['table_rows']
              }}行<br></span>
            </div>
          </el-card>
        </el-col>

        <el-col span="1"></el-col>

        <el-col span="5">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>tbCell</span>
              </div>
            </template>
            <div class="text item">
              <span v-for="p in database_info.partition['tbcell']">{{ p['partition_name'] }}分区: {{ p['table_rows']
              }}行<br></span>
            </div>
          </el-card>
        </el-col>
        <el-col span="1"></el-col>

        <el-col span="5">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>tbMROData</span>
              </div>
            </template>
            <div class="text item">
              <span v-for="p in database_info.partition['tbmrodata']">{{ p['partition_name'] }}分区: {{ p['table_rows']
              }}行<br></span>
            </div>
          </el-card>
        </el-col>

        <el-col span="1"></el-col>

        <el-col span="5">
          <el-card class="box-card">
            <template #header>
              <div class="card-header">
                <span>tbCellKPI</span>

              </div>
            </template>
            <div class="text item">
              <span v-for="p in database_info.partition['tbcellkpi']">{{ p['partition_name'] }}分区: {{ p['table_rows']
              }}行<br></span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-descriptions-item>
    <el-descriptions-item label="连接时长（小时）" :span="2">
      <el-space>
        <el-input-number v-model="num_connection_input" :min="1" :max="24" />
        <el-button type="primary" @click="onSubmitConnection">修改</el-button>
      </el-space>
    </el-descriptions-item>

    <el-descriptions-item label="数据缓冲区大小（MB）">
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
    url: "......",
    port: '......',
    cache: "......",
    time: "......",
    partition: {
      tbprb: [],
      tbcell: [],
      tbmrodata: [],
      tbcellkpi: []
    }
  },
));


// 获取数据库连接信息
const updateData = () => {
  axios({ method: 'GET', url: '/database-info', })
    .then(resp => {
      if (resp.data["code"] == 308) {
        database_info.value.url = resp.data["data"]["url"];
        database_info.value.port = resp.data["data"]["port"];

        var cache = resp.data["data"]["innodb_buffer_pool_size"]
        cache = Number(cache) / (1024 * 1024)
        database_info.value.cache = cache

        var time = resp.data["data"]["wait_timeout"]
        time = Number(time) / 3600
        database_info.value.time = time

        database_info.value.partition = resp.data["data"]["partition_info"];
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
  axios({
    method: 'POST',
    url: '/database-info/connection?time=' + num_connection_input.value,
  }).then(resp => {
    if (resp.data['code'] == 308) {
      database_info.value.time = String(num_connection_input.value)
      ElMessage({
        message: `连接时长已修改至${database_info.value.time}h`,
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
  axios({
    method: 'POST',
    url: '/database-info/cache?size=' + num_cache_input.value,
  }).then(resp => {
    if (resp.data['code'] == 308) {
      database_info.value.cache = String(num_cache_input.value)
      ElMessage({
        message: `缓冲区大小已修改至${database_info.value.cache}MB`,
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

.box-card {
  width: 250px;
}

.text {
  font-size: 14px;
}

.item {
  padding: 0;
}
</style>