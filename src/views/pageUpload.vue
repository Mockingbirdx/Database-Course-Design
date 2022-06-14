<template>
  <el-space wrap>
    <el-card class="box-card" style="width: 400px">
      <el-row>
        <el-col :span="1">
        </el-col>
        <el-col :span="5">
          <el-tag size="large">表名</el-tag>
        </el-col>

        <el-col :span="16">
          <el-select v-model="file_name.name" class="m-1" placeholder="文件名">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
              v-model="file_name.name" />
          </el-select>
        </el-col>
      </el-row>

      <br>
      <template #header>
        <div class="card-header">
          <span>上传文件</span>
        </div>
      </template>
      <el-upload :on-success="handleSuccess" ref="upload" action="/upload" :limit="1" :on-exceed="handleExceed"
        :auto-upload="false" :data="file_name">
        <template #trigger>
          <el-button type="primary" class="button" plain>选择本地文件</el-button>
        </template>
        <br />
        <el-button type="success" @click="submitUpload" class="button" plain>上传</el-button>
        <br />
        <template #tip>
          <div class="el-upload__tip" style="color: grey">限一次上传一个文件</div>
        </template>
      </el-upload>
    </el-card>
  </el-space>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'

const file_name = ref(reactive({ name: '...' }))
const upload = ref()

const handleExceed = (files: any) => {
  upload.value.handleStart(files[0])
}

const submitUpload = () => {
  upload.value.submit()
  upload.value.clearFiles()
}

const handleSuccess = (resp: any) => {
  console.log(resp)
  if (resp.code == 309) {
    ElMessage({
      showClose: true,
      message: '上传失败: ' + resp.data['message'],
      type: 'error',
    })
  }
  else {
    ElMessage({
      message: `上传成功`,
      type: 'success',
    })
  }
}

// 可上传的文件
const options = [
  {
    value: 'tbcell',
    label: 'tbCell',
  },
  {
    value: 'tbkpi',
    label: 'tbKPI',
  },
  {
    value: 'tbprb',
    label: 'tbPRB',
  },
  {
    value: 'tbmrodata',
    label: 'tbMROData',
  }
]
</script>

<style scoped>
.button {
  margin: 10px;
  width: 100px;
}
</style>