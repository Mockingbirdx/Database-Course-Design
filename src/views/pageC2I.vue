<template>
    <el-descriptions direction="vertical" :column="1" border>
        <el-descriptions-item label="说明">
            设置阈值参数 x (0 ≤ x)，计算存在大于 x 条条目的数据，生成表 tbC2Inew
        </el-descriptions-item>

        <el-descriptions-item label="查询栏">
            <el-form ref="ruleFormRef" :model="form">
                <el-space>
                    <el-tag size="large">测量值对条目数不少于</el-tag>
                    <el-input-number v-model="form.threshold" :min="1" />
                    <el-button type="primary" @click="handleSubmit(ruleFormRef)" plain>查询</el-button>
                </el-space>
            </el-form>
        </el-descriptions-item>

        <el-descriptions-item label="tbC2Inew">
            <el-table
                :data="tableData.slice((pageConfig.currentPage - 1) * pageConfig.pageSize, pageConfig.currentPage * pageConfig.pageSize)"
                style="width: 100%">
                <el-table-column prop="scell" label="主小区" width="120" />
                <el-table-column prop="ncell" label="邻小区" width="120" />
                <el-table-column prop="c2iMean" label="C2I平均值" width="120" />
                <el-table-column prop="std" label="标准差" width="120" />
                <el-table-column prop="prC2I9" label="PrbC2I9" width="120" />
                <el-table-column prop="prbABS6" label="PrbABS6" width="120" />
            </el-table>

            <div class="block" style="margin-top:15px;">
                <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    :current-page="pageConfig.currentPage" :page-sizes="[10, 15, 20]" :page-size="pageConfig.pageSize"
                    layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
                </el-pagination>
            </div>
        </el-descriptions-item>
    </el-descriptions>
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
        SCell: '...',
        NCell: '...',
        mean: '...',
        std: '...',
        PrbC2I9: '...',
        PrbABS6: '...'
    }
]))

let pageConfig = ref(reactive({
    currentPage: 1, // 当前页码
    total: 20, // 总条数
    pageSize: 2 // 每页的数据条数
}))
//每页条数改变时触发 选择一页显示多少行

const handleSizeChange = (val: any) => {
    console.log(`每页 ${val} 条`);
    pageConfig.value.currentPage = 1;
    pageConfig.value.pageSize = val;
}
//当前页改变时触发 跳转其他页
const handleCurrentChange = (val: any) => {
    console.log(`当前页: ${val}`);
    pageConfig.value.currentPage = val;
}

// 获取干扰分析数据，并更新表格
const handleSubmit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    let post_data = {
        threshold: form.threshold
    }
    axios({ method: 'GET', url: '/c2i?x=' + form.threshold })
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