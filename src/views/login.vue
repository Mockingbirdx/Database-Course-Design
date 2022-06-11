<template>
  <div>
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="login-box" :size="formSize">
      <h3>欢迎登录</h3>
      <el-row>
        <el-form-item label="账号" class="login-item" prop="username">
          <el-input v-model="ruleForm.username" />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="密码" class="login-item" prop="password">
          <el-input v-model="ruleForm.password" />
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="账户" prop="type">
          <el-radio-group v-model="ruleForm.type" class="login-radio">
            <el-radio label="用户" />
            <el-radio label="管理员" />
          </el-radio-group>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
          <el-button @click="gotoSign">注册</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
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
  type: "",
});

const rules = reactive({
  username: [
    {
      required: true,
      message: "账号不能为空",
      trigger: "blur",
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
      message: "密码不能为空",
      trigger: "blur",
    },
  ],
  type: [
    {
      required: true,
      message: "请选择账户类型",
    },
  ],
});


const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  if (ruleForm.type === '用户') {
    ruleForm.type = 'user'
  }
  else {
    ruleForm.type = 'admin'
  }
  await formEl.validate((valid, fields) => {
    if (valid) {
      axios({
        method: 'POST',
        url: '/login',
        data: ruleForm,
      }).then(resp => {
        if (resp.data['code'] == 308) {
          ElMessage({
            showClose: true,
            message: '登陆成功!',
            type: 'success',
          })
          localStorage.setItem('type', ruleForm.type);
          if (ruleForm.type == 'user') {
            router.push("/navigation-3");
          }
          else {
            router.push("/navigation-1");
          }

        }
        else {
          ElMessage({
            showClose: true,
            message: '登陆失败: ' + resp.data['message'],
            type: 'error',
          })
        }
        console.log(("登录: " + JSON.stringify(resp.data)))
      })
    }
    else {
      ElMessage({
        showClose: true,
        message: '请填写正确的信息',
        type: 'warning',
      })
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}

const gotoSign = () => {
  router.push("/sign");
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

.login-radio {
  margin-left: 0px;
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