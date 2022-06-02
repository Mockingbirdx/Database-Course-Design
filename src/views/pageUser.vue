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
    <el-table-column prop="id" label="ID" width="100" />
    <el-table-column prop="username" label="用户名" width="120" />
    <el-table-column prop="type" label="类型" width="120" />
    <el-table-column prop="password" label="密码" width="120" />


    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="danger" size="small" @click="handleDelete(scope.$index); dialogVisible = true">删除</el-button>
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
import axios from 'axios'

const ruleFormRef = ref<FormInstance>()

const form = reactive({
  username: '',
  password: '',
  type: '',
})

let tableData = ref(reactive([
  {
    id: '...',
    username: '...',
    password: '...',
    type: '...',
  }
]))


// 获取用户数据
const updateData = () => {
  axios({ method: 'GET', url: '/users', })
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

updateData();


const handleCreate = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (form.type == '用户') {
        form.type = 'user'
      }
      else {
        form.type = 'admin'
      }
      let post_data = {
        username: form.username,
        password: form.password,
        type: form.type
      }
      axios({ method: 'POST', url: '/users', data: post_data })
        .then(resp => {
          if (resp.data.code == 308) {
            updateData();
            ElMessage({
              showClose: true,
              message: '账号创建成功!',
              type: 'success',
            })
          }
          else {
            ElMessage({
              message: `账号创建失败`,
              type: 'warning',
            })
          }
        });
    } else {
      ElMessage({
        message: `请填写正确的信息`,
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
  dialogVisible.value = false;
  axios({ method: 'DELETE', url: '/users/' + tableData.value[currentIndex.value].id })
    .then(resp => {
      if (resp.data.code == 308) {
        updateData();
        ElMessage({
          showClose: true,
          message: '删除成功',
          type: 'success',
        })
        tableData.value.splice(currentIndex.value, 1)
        if (currentIndex.value == tableData.value.length) {
          currentIndex.value -= 1
        }
      }
      else {
        ElMessage({
          message: '删除失败: ' + resp.data['message'],
          type: 'warning',
        })
      }
    });
}

const rules = reactive({
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur'
    },
    {
      min: 1,
      max: 12,
      message: '用户名长度应处于1~12个字符',
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
      min: 1,
      max: 12,
      message: '密码长度应处于1~12个字符',
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
</script>

<style scoped>
.col {
  margin-left: 8px;
}
</style>