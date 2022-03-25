<template>
  <el-space wrap>
    <el-card class="box-card" style="width: 400px">
      <template #header>
        <div class="card-header">
          <span>上传文件</span>
        </div>
      </template>
      <el-upload
        ref="upload"
        action="https://jsonplaceholder.typicode.com/posts/"
        :limit="1"
        :on-exceed="handleExceed"
        :auto-upload="false"
      >
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
import { ref } from 'vue'
const upload = ref()

const handleExceed = (files) => {
  upload.value.clearFiles()
  upload.value.handleStart(files[0])
}
const submitUpload = () => {
  upload.value.submit()
}
</script>

<style scoped>
.button {
  margin: 10px;
  width: 100px;
}
</style>