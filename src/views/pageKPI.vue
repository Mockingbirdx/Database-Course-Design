<template>
  <el-container class="layout-container-demo" style="height: 100%">
    <el-container>
      <el-header style="text-align: right; font-size: 12px; height: 120px">        
        <el-form :inline="true" :model="formInline" class="demo-form-inline"  ref="ruleFormRef" style="position: relative;top: 20px;" >
            <el-row>
            <el-form-item label="sector-name">
            <el-select v-model="formInline.sectorname" filterable placeholder="选择或输入基站标识" >
                <el-option
                v-for="item in Nameoptions"
                :key="item.value"
                :label="item.label"
                :value="item.label"
                />
            </el-select>            
            </el-form-item>
            <el-form-item label="属性">
            <el-select v-model="formInline.attribute" filterable placeholder="选择或输入想查看的属性" >
                <el-option label="rrcComplete" value="rrcComplete" />
                <el-option label="rrcRequest" value="rrcRequest" />
                <el-option label="rrcSuccessPer" value="rrcSuccessPer" />
                <el-option label="erabSuccess" value="erabSuccess" />
                <el-option label="erabTry" value="erabTry" />
                <el-option label="erabSuccessPer" value="erabSuccessPer" />
                <el-option label="enodebTringErabException" value="enodebTringErabException" />
                <el-option label="sectorSwitchOutErabException" value="sectorSwitchOutErabException" />
                <el-option label="erabOfflinePer" value="erabOfflinePer" />
                <el-option label="wirelessOnlinePer" value="wirelessOnlinePer" />
                <el-option label="enodebS1ResetUeContextRelease" value="enodebS1ResetUeContextRelease" />
                <el-option label="ueContextException" value="ueContextException" />
                <el-option label="ueContextSuccess" value="ueContextSuccess" />
                <el-option label="wirelessOfflinePer" value="wirelessOfflinePer" />
                <el-option label="enodebInDiffFreqSwitchOutSuccess" value="enodebInDiffFreqSwitchOutSuccess" />
                <el-option label="enodebInDiffFreqSwitchOutTry" value="enodebInDiffFreqSwitchOutTry" />
                <el-option label="enodebInSameFreqSwitchOutSuccess" value="enodebInSameFreqSwitchOutSuccess" />
                <el-option label="enodebInSameFreqSwitchOutTry" value="enodebInSameFreqSwitchOutTry" />
                <el-option label="enodebBetweenDiffFreqSwitchOutSuccess" value="enodebBetweenDiffFreqSwitchOutSuccess" />
                <el-option label="enodebBetweenDiffFreqSwitchOutTry" value="enodebBetweenDiffFreqSwitchOutTry" />
                <el-option label="enodebBetweenSameFreqSwitchOutSuccess" value="enodebBetweenSameFreqSwitchOutSuccess" />
                <el-option label="enodebBetweenSameFreqSwitchOutTry" value="enodebBetweenSameFreqSwitchOutTry" />
                <el-option label="enbInSwitchSuccessPer" value="enbInSwitchSuccessPer" />
                <el-option label="enbBetweenSwitchSuccessPer" value="enbBetweenSwitchSuccessPer" />
                <el-option label="sameFreqSwitchSuccessPer" value="sameFreqSwitchSuccessPer" />
                <el-option label="diffFreqSwitchSuccessPer" value="diffFreqSwitchSuccessPer" />
                <el-option label="switchSuccessPer" value="switchSuccessPer" />
                <el-option label="sectorPdcpLayerRecvUploadThroughputBit" value="sectorPdcpLayerRecvUploadThroughputBit" />
                <el-option label="sectorPdcpLayerSendDnloadThroughputBit" value="sectorPdcpLayerSendDnloadThroughputBit" />
                <el-option label="rrcReconnect" value="rrcReconnect" />
                <el-option label="rrcReconnectPer" value="rrcReconnectPer" />
                <el-option label="throughRebuildBackEnodebBeteeenSameFreqSwitchOutSuccess" value="throughRebuildBackEnodebBeteeenSameFreqSwitchOutSuccess" />
                <el-option label="throughRebuildBackEnodebBeteeenDiffFreqSwitchOutSuccess" value="throughRebuildBackEnodebBeteeenDiffFreqSwitchOutSuccess" />
                <el-option label="throughRebuildBackEnodebInSameFreqSwitchOutSuccess" value="throughRebuildBackEnodebInSameFreqSwitchOutSuccess" />
                <el-option label="throughRebuildBackEnodebInDiffFreqSwitchOutSuccess" value="throughRebuildBackEnodebInDiffFreqSwitchOutSuccess" />
                <el-option label="enbInSwitchOutSuccess" value="enbInSwitchOutSuccess" />
                <el-option label="enbInSwitchOutTry" value="enbInSwitchOutTry" />
            </el-select>
            </el-form-item>
            </el-row>
            <el-row>
            <el-form-item label="begin time" required>
                <el-form-item prop="begintime">
                <el-date-picker
                    v-model="formInline.begintime"
                    type="date"
                    label="Pick a date"
                    placeholder="Pick a date"
                    style="width: 100%"
                />
                </el-form-item>
            </el-form-item>
            <el-form-item label="end time" required>
                <el-form-item prop="endtime" >
                <el-date-picker
                    v-model="formInline.endtime"
                    type="date"
                    label="Pick a date"
                    placeholder="Pick a date"
                    style="width: 100%"
                />
                </el-form-item>
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
                <el-table-column prop="startTime" label="startTime" width="120" />
                <el-table-column prop="rrcComplete" label="rrcComplete" width="120" />
                <el-table-column prop="rrcRequest" label="rrcRequest" width="120" />
                <el-table-column prop="rrcSuccessPer" label="rrcSuccessPer" width="120" />
                <el-table-column prop="erabSuccess" label="erabSuccess" width="120" />
                <el-table-column prop="erabTry" label="erabTry" width="120" />
                <el-table-column prop="erabSuccessPer" label="erabSuccessPer" width="120" />
                <el-table-column prop="enodebTringErabException" label="enodebTringErabException" width="120" />
                <el-table-column prop="sectorSwitchOutErabException" label="sectorSwitchOutErabException" width="120" />
                <el-table-column prop="erabOfflinePer" label="erabOfflinePer" width="120" />
                <el-table-column prop="wirelessOnlinePer" label="wirelessOnlinePer" width="120" />
                <el-table-column prop="enodebS1ResetUeContextRelease" label="enodebS1ResetUeContextRelease" width="120" />
                <el-table-column prop="ueContextException" label="ueContextException" width="120" />
                <el-table-column prop="ueContextSuccess" label="ueContextSuccess" width="120" />
                <el-table-column prop="wirelessOfflinePer" label="wirelessOfflinePer" width="120" />
                <el-table-column prop="enodebInDiffFreqSwitchOutSuccess" label="enodebInDiffFreqSwitchOutSuccess" width="120" />
                <el-table-column prop="enodebInDiffFreqSwitchOutTry" label="enodebInDiffFreqSwitchOutTry" width="120" />
                <el-table-column prop="enodebInSameFreqSwitchOutSuccess" label="enodebInSameFreqSwitchOutSuccess" width="120" />
                <el-table-column prop="enodebInSameFreqSwitchOutTry" label="enodebInSameFreqSwitchOutTry" width="120" />
                <el-table-column prop="enodebBetweenDiffFreqSwitchOutSuccess" label="enodebBetweenDiffFreqSwitchOutSuccess" width="120" />
                <el-table-column prop="enodebBetweenDiffFreqSwitchOutTry" label="enodebBetweenDiffFreqSwitchOutTry" width="120" />
                <el-table-column prop="enodebBetweenSameFreqSwitchOutSuccess" label="enodebBetweenSameFreqSwitchOutSuccess" width="120" />
                <el-table-column prop="enodebBetweenSameFreqSwitchOutTry" label="enodebBetweenSameFreqSwitchOutTry" width="120" />
                <el-table-column prop="enbInSwitchSuccessPer" label="enbInSwitchSuccessPer" width="120" />
                <el-table-column prop="enbBetweenSwitchSuccessPer" label="enbBetweenSwitchSuccessPer" width="120" />
                <el-table-column prop="sameFreqSwitchSuccessPer" label="sameFreqSwitchSuccessPer" width="120" />
                <el-table-column prop="diffFreqSwitchSuccessPer" label="diffFreqSwitchSuccessPer" width="120" />
                <el-table-column prop="switchSuccessPer" label="switchSuccessPer" width="120" />
                <el-table-column prop="sectorPdcpLayerRecvUploadThroughputBit" label="sectorPdcpLayerRecvUploadThroughputBit" width="120" />
                <el-table-column prop="sectorPdcpLayerSendDnloadThroughputBit" label="sectorPdcpLayerSendDnloadThroughputBit" width="120" />
                <el-table-column prop="rrcReconnect" label="rrcReconnect" width="120" />
                <el-table-column prop="rrcReconnectPer" label="rrcReconnectPer" width="120" />
                <el-table-column prop="throughRebuildBackEnodebBeteeenSameFreqSwitchOutSuccess" label="throughRebuildBackEnodebBeteeenSameFreqSwitchOutSuccess" width="120" />
                <el-table-column prop="throughRebuildBackEnodebBeteeenDiffFreqSwitchOutSuccess" label="throughRebuildBackEnodebBeteeenDiffFreqSwitchOutSuccess" width="120" />
                <el-table-column prop="throughRebuildBackEnodebInSameFreqSwitchOutSuccess" label="throughRebuildBackEnodebInSameFreqSwitchOutSuccess" width="120" />
                <el-table-column prop="throughRebuildBackEnodebInDiffFreqSwitchOutSuccess" label="throughRebuildBackEnodebInDiffFreqSwitchOutSuccess" width="120" />
                <el-table-column prop="enbInSwitchOutSuccess" label="enbInSwitchOutSuccess" width="120" />
                <el-table-column prop="enbInSwitchOutTry" label="enbInSwitchOutTry" width="120" />
            </el-table>
            <div class="echart-container">     
            <div id="myChart123" :style="{width: '1000px', height: '550px'}"></div>
            </div>
        </el-scrollbar>
        <v-chart class="chart" :option="option" />
      </el-main>
    </el-container>
  </el-container>
  
</template>



<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import axios from 'axios'
import * as echarts from 'echarts'
import {onMounted} from "vue";



const value = ref('')

const Nameoptions =  ref(reactive([]))

const loadOptionData = () => {  
    axios({ method: 'GET', url: '/tbcellkpi/sectorname' })
    .then(resp => {
            if (resp.data) {
                    Nameoptions.value=resp.data['data']
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
  sectorname: '',
  attribute: '',
  begintime: '',
  endtime: ''
})

const ruleFormRef = ref<FormInstance>()
const form = reactive({
    threshold: '',
})
let tableData = ref(reactive([
    {
    startTime: '...',
    enodebName : '...',
    sectorDescription : '...',
    sectorName: '...',
    rrcComplete: '...',
    rrcRequest : '...',
    rrcSuccessPer : '...',
    erabSuccess : '...',
    erabTry  : '...',
    erabSuccessPer : '...',
    enodebTringErabException : '...',
    sectorSwitchOutErabException : '...',
    erabOfflinePer : '...',
    wirelessOnlinePer: '...',
    enodebS1ResetUeContextRelease : '...',
    ueContextException : '...',
    ueContextSuccess : '...',
    wirelessOfflinePer : '...',
    enodebInDiffFreqSwitchOutSuccess: '...',
    enodebInDiffFreqSwitchOutTry : '...',
    enodebInSameFreqSwitchOutSuccess: '...',
    enodebInSameFreqSwitchOutTry : '...',
    enodebBetweenDiffFreqSwitchOutSuccess : '...',
    enodebBetweenDiffFreqSwitchOutTry : '...',
    enodebBetweenSameFreqSwitchOutSuccess : '...',
    enodebBetweenSameFreqSwitchOutTry : '...',
    enbInSwitchSuccessPer : '...',
    enbBetweenSwitchSuccessPer: '...',
    sameFreqSwitchSuccessPer : '...',
    diffFreqSwitchSuccessPer : '...',
    switchSuccessPer : '...',
    sectorPdcpLayerRecvUploadThroughputBit : '...',
    sectorPdcpLayerSendDnloadThroughputBit : '...',
    rrcReconnect : '...',
    rrcReconnectPer : '...',
    throughRebuildBackEnodebBeteeenSameFreqSwitchOutSuccess  : '...',
    throughRebuildBackEnodebBeteeenDiffFreqSwitchOutSuccess : '...',
    throughRebuildBackEnodebInSameFreqSwitchOutSuccess : '...',
    throughRebuildBackEnodebInDiffFreqSwitchOutSuccess : '...',
    enbInSwitchOutSuccess: '...',
    enbInSwitchOutTry : '...'   
    }
]))
//将Date转换为字符串
Date.prototype.Format = function (fmt) {
    var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "H+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
let extractByKey = function(arr,key,resultType='String',separator=',') {
    let resultArr = [];
    arr.map(item => {
        if(item[key]) resultArr.push(item[key]);
    })
    if(resultType==='Array') return resultArr;
    else if(resultType==='String')return resultArr.join(separator)
    else throw new Error("resultType无效");
}
let myChart = ref()
// 获取干扰分析数据，并更新表格
const handleSubmit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    
    let urlstr = '/tbcellkpi';
    
    if(formInline.attribute || formInline.sectorname || formInline.begintime || formInline.endtime){
        urlstr = urlstr + '?'
        if(formInline.attribute){
            if(urlstr == '/tbcellkpi?')
                urlstr = urlstr + 'attribute=' +formInline.attribute
            else
                urlstr = urlstr + '&attribute=' + formInline.attribute
        }
        if(formInline.sectorname){
            if(urlstr == '/tbcellkpi?')
                urlstr = urlstr + 'sector-name=' +formInline.sectorname
            else
                urlstr = urlstr + '&sector-name=' + formInline.sectorname
        }
        if(formInline.begintime){
            let begintime=formInline.begintime.Format("MM/dd/yyyy HH:mm:ss");
            if(urlstr == '/tbcellkpi?')
                urlstr = urlstr + 'begin-time=' + begintime
            else
                urlstr = urlstr + '&begin-time=' + begintime
        }
        if(formInline.endtime){
            let endtime=formInline.endtime.Format("MM/dd/yyyy HH:mm:ss");
            if(urlstr == '/tbcellkpi?')
                urlstr = urlstr + 'end-time=' + endtime
            else
                urlstr = urlstr + '&end-time=' + endtime
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
                var sites = []    
                var attridata = []
                for(var i=0;i<tableData.value.length;i++){
                    sites.push(tableData.value[i].startTime);
                    attridata.push(tableData.value[i][formInline.attribute])
                }
                // 绘制图表
                myChart=echarts.init(document.getElementById("myChart123"));

                myChart.setOption({
                    xAxis: {
                        name:'date',
                        data: sites
                    },
                    yAxis:{
                        name: formInline.attribute
                    },
                    series: [
                    {
                        name: formInline.attribute,
                        type: "line",
                        data: attridata,
                        itemStyle : { normal: {label : {show: true}}}                 
                    }
                    ],
                    toolbox: {
                        show: true,
                        feature: {
                            saveAsImage: {
                                show:true,
                                excludeComponents :['toolbox'],
                                pixelRatio: 2
                            }
                        }
                    }
                });
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