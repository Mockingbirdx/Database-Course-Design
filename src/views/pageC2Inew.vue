<template>
    <el-form ref="ruleFormRef" :model="form">
        <el-row>
            <el-col :span="8" class="col">
                <el-descriptions direction="vertical" :column="1">
                    <el-descriptions-item :span="2">
                        <el-space>
                            <el-tag size="large">阈值参数 x</el-tag>
                            <el-input-number v-model="form.threshold" :min="1" :max="99" />
                            <el-button type="primary" @click="handleSubmit(ruleFormRef)" plain>查询</el-button>
                        </el-space>
                    </el-descriptions-item>
                </el-descriptions>
            </el-col>
            <el-col :span="1"></el-col>
            <el-form-item>

            </el-form-item>
        </el-row>
    </el-form>

    <el-divider />

    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="a" label="a" width="120" />
        <el-table-column prop="b" label="b" width="120" />
        <el-table-column prop="c" label="c" width="120" />
    </el-table>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import axios from 'axios'

const ruleFormRef = ref<FormInstance>()

const form = reactive({
    threshold: '',
})

let tableData = ref(reactive([
    {
        a: '...',
        b: '...',
        c: '...',
    }
]))

// 获取干扰分析数据，并更新表格
const handleSubmit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    let post_data = {
        threshold: form.threshold
    }
    axios({ method: 'GET', url: '/C2Inew/' + form.threshold })
        .then(resp => {
            if (resp.data.code == 308) {
                if (resp.data) {
                    tableData.value = resp.data['data']
                }
                else {
                    ElMessage({
                        message: "查询失败: " + resp.data.msg,
                        type: 'warning',
                    })
                }
                ElMessage({
                    showClose: true,
                    message: '查询到 ' + resp.data['data'].length + ' 条数据',
                    type: 'success',
                })
            }
            else {
                ElMessage({
                    message: "查询失败: " + resp.data.msg,
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