<template>
  <div>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="login-box"
      :size="formSize"
    >
      <h3>用户注册</h3>
      <el-row>
        <el-form-item label="账号" class="login-item" prop="name">
          <el-input v-model="ruleForm.username" />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="密码" class="login-item" prop="password">
          <el-input v-model="ruleForm.password" />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="重复密码" class="login-item" prop="checkPass">
          <el-input v-model="ruleForm.checkPass" />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">注册</el-button>
          <el-button @click="gotoLogin">返回</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, getCurrentInstance } from "vue";
import { FormInstance } from 'element-plus'
import { useRouter } from "vue-router";
import { ElMessage } from 'element-plus'
import axios from 'axios'

const formSize = ref('default')
const router = useRouter();
const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  username: "",
  password: "",
  checkPass: ""
});

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== ruleForm.password) {
    callback(new Error("两次输入不一致"))
  } else {
    callback()
  }
}

const rules = reactive({
  username: [
    {
      required: true,
      message: "账号不能为空",
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: "密码不能为空",
      trigger: "blur",
    },
  ],
  checkPass: [
    {
      required: true,
      validator: validatePass,
      trigger: 'blur'
    }
  ],
});


const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      let signForm = {}
      signForm['username'] = ruleForm['username']
      signForm['password'] = ruleForm['password']

      axios({
        method: 'POST',
        url: '/sign',
        data: signForm,
      }).then(resp => {
        alert(JSON.stringify(resp))
      })

      ElMessage({
        showClose: true,
        message: '注册成功!',
        type: 'success',
      })
    } else {
      ElMessage({
        showClose: true,
        message: '注册失败',
        type: 'warning',
      })
    }
  })
}

const gotoLogin = () => {
  router.push("/");
}
</script>

<style scoped>
.login-box {
  width: 380px;
  margin: 150px auto;
  border: 1px solid #dcdfe6;
  padding-top: 8px;
  border-radius: 10px;
  box-shadow: 0 0 30px #dcdfe6;
}
.login-item {
  float: left;
}
.el-row {
  margin-bottom: 8px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>