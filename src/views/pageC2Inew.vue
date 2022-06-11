<template>
    <el-descriptions direction="vertical" :column="1" border>
        <el-descriptions-item label="说明">
            设置阈值参数 x (0 ≤ x ≤ 100)，获取表 C2Inew，其中<br>
            PrbABS6(a, b) 或 PrbABS6(b, a) ≥ x%;<br>
            PrbABS6(a, c) 或 PrbABS6(c, a) ≥ x%;<br>
            PrbABS6(b, c) 或 PrbABS6(c, b) ≥ x%;<br>
        </el-descriptions-item>

        <el-descriptions-item label="查询栏">
            <el-form ref="ruleFormRef" :model="form">
                <el-space>
                    <el-tag size="large">阈值参数 (0 ≤ x ≤ 100)</el-tag>
                    <el-input-number v-model="form.threshold" :min="1" :max="99" />
                    <el-button type="primary" @click="handleSubmit(ruleFormRef)" plain>查询</el-button>
                </el-space>
            </el-form>
        </el-descriptions-item>

        <el-descriptions-item label="tbC2I3">
            <el-table
                :data="tableData.slice((pageConfig.currentPage - 1) * pageConfig.pageSize, pageConfig.currentPage * pageConfig.pageSize)"
                style="width: 100%">
                <el-table-column prop="sectorId1" label="a" width="120" />
                <el-table-column prop="sectorId2" label="b" width="120" />
                <el-table-column prop="sectorId3" label="c" width="120" />
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
        a: '...',
        b: '...',
        c: '...',
    }
]))

let pageConfig = ref(reactive({
    currentPage: 1, // 当前页码
    total: 20, // 总条数
    pageSize: 2 // 每页的数据条数
}))
//每页条数改变时触发 选择一页显示多少行

const handleSizeChange = (val) => {
    console.log(`每页 ${val} 条`);
    pageConfig.value.currentPage = 1;
    pageConfig.value.pageSize = val;
}
//当前页改变时触发 跳转其他页
const handleCurrentChange = (val) => {
    console.log(`当前页: ${val}`);
    pageConfig.value.currentPage = val;
}

// 获取干扰分析数据，并更新表格
const handleSubmit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    let post_data = {
        threshold: form.threshold
    }
    axios({ method: 'GET', url: '/c2i3?x=' + form.threshold })
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