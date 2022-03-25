<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="table" label="关系表" width="180" />
    <el-table-column label="下载格式">
      <template #default="scope">
        <el-button
          type="primary"
          plain
          size="small"
          style="width:43px"
          @click="handleDownloadTxt(scope.$index); dialogVisible = true"
        >txt</el-button>
        <el-button
          type="success"
          plain
          size="small"
          style="width:45px"
          @click="handleDownloadExcel(scope.$index); dialogVisible = true"
        >excel</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="dialogVisible" title="确定下载此关系表吗？" width="30%">
    <div>{{ tableData[currentIndex].table }}.{{ currentType }}</div>
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

let tableData = ref([
  {
    table: 'table1',
  },
  {
    table: 'table2',
  },
  {
    table: 'table3',
  },
  {
    table: 'table4',
  },
])

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

  let post_data = {
    table: tableData.value[currentIndex.value].table,
    type: currentType.value
  }

  // 待完善接口

  ElMessage({
    message: JSON.stringify(post_data),
    type: 'success',
  })
}
</script>

<style scoped>
.col {
  margin-left: 8px;
}
</style>