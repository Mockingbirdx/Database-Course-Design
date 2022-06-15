<template>
  <el-container class="layout-container-demo" style="height: 100%">
    <el-container>
      <el-header style="text-align: right; font-size: 12px; height: 120px">        
        <el-form :inline="true" :model="formInline" class="demo-form-inline"  ref="ruleFormRef" style="position: relative;top: 20px;" >
            <el-row>
            <el-form-item label="enode-id" >
            <el-select v-model="formInline.eid" filterable placeholder="选择或输入基站标识" clearable >
                <el-option
                v-for="item in IDoptions"
                :key="item.value"
                :label="item.label"
                :value="item.label"
                />
            </el-select>            
            </el-form-item>

            <el-form-item label="enode-name">
            <el-select v-model="formInline.ename" filterable placeholder="选择或输入基站名称" clearable >
                <el-option
                v-for="item in Nameoptions"
                :key="item.value"
                :label="item.label"
                :value="item.label"
                />
            </el-select>  
            </el-form-item>    
            <el-form-item>
            <el-button type="primary" @click="handleSubmit(ruleFormRef)" plain>Query</el-button>
            </el-form-item>
            </el-row>
        </el-form>
        <el-divider />
      </el-header>

      <el-main>
        <el-scrollbar>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="city" label="city" width="120" />
                <el-table-column prop="sectorId" label="sectorId" width="120" />
                <el-table-column prop="sectorName" label="sectorName" width="120" />
                <el-table-column prop="enodebId" label="enodebId" width="120" />
                <el-table-column prop="enodebName" label="enodebName" width="120" />
                <el-table-column prop="earfcn" label="earfcn" width="120" />
                <el-table-column prop="pci" label="pci" width="120" />
                <el-table-column prop="pss" label="pss" width="120" />
                <el-table-column prop="sss" label="sss" width="120" />
                <el-table-column prop="tac" label="tac" width="120" />
                <el-table-column prop="vendor" label="vendor" width="120" />
                <el-table-column prop="longitude" label="longitude" width="120" />
                <el-table-column prop="latitude" label="latitude" width="120" />
                <el-table-column prop="style" label="style" width="120" />
                <el-table-column prop="azimuth" label="azimuth" width="120" />
                <el-table-column prop="height" label="height" width="120" />
                <el-table-column prop="electtilt" label="electtilt" width="120" />
                <el-table-column prop="mechtilt" label="mechtilt" width="120" />
                <el-table-column prop="totletilt" label="totletilt" width="120" />
            </el-table>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>



<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import axios from 'axios'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'



const value = ref('')
const IDoptions =  ref(reactive([{
  value: '',
  label: ''
}]))
const Nameoptions =  ref(reactive([{
  value: '',
  label: ''
}]))
const loadOptionData = () => {
  // Some code
  axios({ method: 'GET', url: '/tbcell/enodeb-id' })
    .then(resp => {
            if (resp.data) {
                IDoptions.value = resp.data['data']
            }
            else {
                ElMessage({
                    message: "拉取失败: " + resp.data.msg,
                    type: 'warning',
                })
            }
            ElMessage({
                showClose: true,
                message: '拉取到 ' + resp.data['data'].length + ' 条数据',
                type: 'success',
            })
        });
    axios({ method: 'GET', url: '/tbcell/enodeb-name' })
    .then(resp => {
            if (resp.data) {
                Nameoptions.value = resp.data['data']
            }
            else {
                ElMessage({
                    message: "拉取失败: " + resp.data.msg,
                    type: 'warning',
                })
            }
            ElMessage({
                showClose: true,
                message: '拉取到 ' + resp.data['data'].length + ' 条数据',
                type: 'success',
            })
        });
}

loadOptionData()

const formInline = reactive({
  sectorid: '',
  sectorname: '',
  eid: '',
  ename: ''
})


const ruleFormRef = ref<FormInstance>()
const form = reactive({
    threshold: '',
})
let tableData = ref(reactive([
    {
        city: '...',
        sectorId: '...',
        sectorName: '...',
        enodebId: '...',
        enodebName: '...',
        earfcn: '...',
        pci: '...',
        pss: '...',
        sss: '...',
        tac: '...',
        vendor: '...',
        longitude: '...',
        latitude: '...',
        style: '...',
        azimuth: '...',
        height: '...',
        electtilt: '...',
        mechtilt: '...',
        totletilt: '...'
    }
]))
// 获取干扰分析数据，并更新表格
const handleSubmit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    
    let urlstr = '/tbcell';
    if(formInline.ename || formInline.eid || formInline.sectorid || formInline.sectorname){
        urlstr = urlstr + '?'
        if(formInline.ename){
            if(urlstr == '/tbcell?')
                urlstr = urlstr + 'enode-name=' +formInline.ename
            else
                urlstr = urlstr + '&enode-name=' + formInline.ename
        }
        if(formInline.eid){
            if(urlstr == '/tbcell?')
                urlstr = urlstr + 'enode-id=' +formInline.eid
            else
                urlstr = urlstr + '&enode-id=' + formInline.eid
        }
        if(formInline.sectorid){
            if(urlstr == '/tbcell?')
                urlstr = urlstr + 'sector-id=' +formInline.sectorid
            else
                urlstr = urlstr + '&sector-id=' + formInline.sectorid
        }
        if(formInline.sectorname){
            if(urlstr == '/tbcell?')
                urlstr = urlstr + 'sector-name=' +formInline.sectorname
            else
                urlstr = urlstr + '&sector-name=' + formInline.sectorname
        }
    }
    console.log(urlstr)
    axios({ method: 'GET', url: urlstr })
        .then(resp => {
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
            /*if (resp.data.code == 308) {
                
            }
            else {
                ElMessage({
                    message: "查询失败: " + resp.data.msg,
                    type: 'warning',
                })
            }*/
        });
}
</script>

<style scoped>

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  
}
.layout-container-demo .el-header {
  position: relative;
  top: 0px;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
  
}
.layout-container-demo .el-menu {
  border-right: none;
}
</style>