<template>
  <br />
  <el-form ref="ruleFormRef" :model="form" :rules="rules">
    <el-row>
      <el-col :span="6" class="col">
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username" placeholder="..." />
        </el-form-item>
      </el-col>
      <el-col :span="1"></el-col>
      <el-col :span="6">
        <el-form-item label="类型" prop="type">
          <el-select v-model="form.type" placeholder="...">
            <el-option label="用户" value="用户" />
            <el-option label="管理员" value="管理员" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6" class="col">
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="..." />
        </el-form-item>
      </el-col>
      <el-col :span="1"></el-col>
      <el-form-item>
        <el-button type="primary" @click="handleCreate(ruleFormRef)" plain>创建账户</el-button>
      </el-form-item>
    </el-row>
  </el-form>

  <el-divider />

  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="username" label="账号" width="180" />
    <el-table-column prop="type" label="类型" width="180" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button
          type="danger"
          size="small"
          @click="handleDelete(scope.$index); dialogVisible = true"
        >删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="dialogVisible" title="确定删除此账号吗？" width="30%">
    <div>用户名: {{ tableData[currentIndex].username }}</div>
    <br />
    <div>类型: {{ tableData[currentIndex].type }}</div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">取消</el-button>
        <el-button @click="submitDelete">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'

const ruleFormRef = ref<FormInstance>()

const form = reactive({
  username: '',
  password: '',
  type: '',
})

const rules = reactive({
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur'
    },
    {
      min: 6,
      max: 12,
      message: '用户名长度应处于6~12个字符',
      trigger: 'blur'
    },
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur',
    },
    {
      min: 6,
      max: 12,
      message: '密码长度应处于6~12个字符',
      trigger: 'blur'
    },
  ],
  type: [
    {
      required: true,
      message: '账户类型不能为空',
      trigger: 'blur',
    },

  ],
})


let tableData = ref([
  {
    username: 'Tom1',
    type: '管理员',
  },
  {
    username: 'Tom2',
    type: '管理员',
  },
  {
    username: 'Tom3',
    type: '管理员',
  },
  {
    username: 'Tom4',
    type: '管理员',
  },
])


const handleCreate = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      let post_data = {
        username: form.username,
        type: form.type
      }
      ElMessage({
        message: `账号创建成功! ${post_data}`,
        type: 'success',
      })
    } else {
      ElMessage({
        message: `无法创建账号：请填写正确的信息`,
        type: 'warning',
      })
      return false
    }
  })
}

const dialogVisible = ref(false)
const currentIndex = ref(0)

const handleDelete = (index: number) => {
  currentIndex.value = index
}

const submitDelete = () => {
  dialogVisible.value = false
  tableData.value.splice(currentIndex.value, 1)
  if (currentIndex.value == tableData.value.length) {
    currentIndex.value -= 1
  }

  let post_data = {
    username: tableData.value[currentIndex.value].username,
    type: tableData.value[currentIndex.value].type
  }

  ElMessage({
    message: `账号删除成功:  ${JSON.stringify(post_data)}`,
    type: 'success',
  })
}
</script>

<style scoped>
.col {
  margin-left: 8px;
}
</style>