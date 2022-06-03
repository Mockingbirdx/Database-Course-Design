<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="name" label="关系表" width="180" />
    <el-table-column label="下载格式">
      <template #default="scope">
        <el-button type="primary" plain size="small" style="width:43px"
          @click="handleDownloadTxt(scope.$index); dialogVisible = true">txt</el-button>
        <el-button type="success" plain size="small" style="width:45px"
          @click="handleDownloadExcel(scope.$index); dialogVisible = true">excel</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="dialogVisible" title="确定下载此关系表吗？" width="30%">
    <div>{{ tableData[currentIndex].name }}.{{ currentType }}</div>
    <br />
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">取消</el-button>
        <el-button @click="submitDownload">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'

let tableData = ref([
  { name: "table1" },
  { name: "table2" }
])

// 获取数据库中的表名
const getTables = () => {
  axios({ method: 'GET', url: '/tables', })
    .then(resp => {
      if (resp.data) {
        tableData.value = resp.data['data']
      }
      else {
        ElMessage({
          showClose: true,
          message: '拉取失败: ' + resp.data['message'],
          type: 'error',
        })
      }
    });
}

getTables();

const dialogVisible = ref(false)
const currentIndex = ref(0)
const currentType = ref("excel")

const handleDownloadExcel = (index: number) => {
  currentIndex.value = index
  currentType.value = "excel"
}

const handleDownloadTxt = (index: number) => {
  currentIndex.value = index
  currentType.value = "txt"
}

const submitDownload = () => {
  dialogVisible.value = false

  var url = '/tables/';
  if (currentType.value == "txt") {
    url += 'txt/'
  }
  else {
    url += 'excel/'
  }
  url += tableData.value[currentIndex.value].name

  axios({ method: 'GET', url: url })
    .then(resp => {
      if (resp.data.code != 308) {
        ElMessage({
          message: "下载失败: " + resp.data.msg,
          type: 'warning',
        })
      }
    });
}
</script>

<style scoped>
.col {
  margin-left: 8px;
}
</style>