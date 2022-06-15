<template>
  <el-container class="layout-container-demo" style="height: 100%">
    <el-container>
      <el-header style="text-align: right; font-size: 12px; height: 120px">        
        <el-form :inline="true" :model="formInline" class="demo-form-inline"  ref="ruleFormRef" style="position: relative;top: 20px;" >
            <el-row>
            <el-form-item label="网元名称" >
            <el-select v-model="formInline.sectorname" filterable placeholder="选择或输入基站标识" >
                <el-option
                v-for="item in Nameoptions"
                :key="item.value"
                :label="item.label"
                :value="item.label"
                />
            </el-select>            
            </el-form-item>
            <el-form-item label="属性" >
            <el-select v-model="formInline.attribute" filterable placeholder="选择或输入想查看的属性" >
                <el-option
                v-for="item in AttriOptions"
                :key="item.value"
                :label="item.label"
                :value="item.label"
                />
            </el-select>
            </el-form-item>
            </el-row>
            <el-row>
            <el-form-item label="begin time" required>
            
                <el-form-item prop="begintime">
                    <el-date-picker
                        v-model="formInline.begintime"
                        type="datetime"
                        placeholder="Select date and time"
                    />
                </el-form-item>
            </el-form-item>
            <el-form-item label="end time" required>
                <el-form-item prop="endtime">
                    <el-date-picker
                        v-model="formInline.endtime"
                        type="datetime"
                        placeholder="Select date and time"
                    />
                </el-form-item>
            </el-form-item>

            <el-form-item>
            <el-button type="primary" @click="handleSubmit(ruleFormRef)" plain>Query</el-button>
            <el-button @click="submitDownload">download chart prb hourly</el-button>
            </el-form-item>
            </el-row>
        </el-form>
        <el-divider />
      </el-header>
      <el-main>          
        <el-scrollbar>
            <!--可以用于测试
                <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="avgIntNoise0" label="avgIntNoise0" width="120" />
                <el-table-column prop="avgIntNoise1" label="avgIntNoise1" width="120" />
                <el-table-column prop="avgIntNoise2" label="avgIntNoise2" width="120" />
            </el-table>-->   
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
const AttriOptions =  ref(reactive([]))
const loadOptionData = () => {  
    axios({ method: 'GET', url: '/tbprbnew/sectorname' })
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
            for(var i=0;i<100;i++){
                var b = {value: '', label:''}
                var attriStr='avgIntNoise'.concat(i.toString())
                b.value = attriStr
                b.label = attriStr
                AttriOptions.value.push(b)
            }
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
        startTime:'...',
        enodebName: '...',
        sectorDescription: '...',
        sectorName: '...',
        avgIntNoise0:'...',
        avgIntNoise1:'...',
        avgIntNoise2:'...',
        avgIntNoise3:'...',
        avgIntNoise4:'...',
        avgIntNoise5:'...',
        avgIntNoise6:'...',
        avgIntNoise7:'...',
        avgIntNoise8:'...',
        avgIntNoise9:'...',
        avgIntNoise10:'...',
        avgIntNoise11:'...',
        avgIntNoise12:'...',
        avgIntNoise13:'...',
        avgIntNoise14:'...',
        avgIntNoise15:'...',
        avgIntNoise16:'...',
        avgIntNoise17:'...',
        avgIntNoise18:'...',
        avgIntNoise19:'...',
        avgIntNoise20:'...',
        avgIntNoise21:'...',
        avgIntNoise22:'...',
        avgIntNoise23:'...',
        avgIntNoise24:'...',
        avgIntNoise25:'...',
        avgIntNoise26:'...',
        avgIntNoise27:'...',
        avgIntNoise28:'...',
        avgIntNoise29:'...',
        avgIntNoise30:'...',
        avgIntNoise31:'...',
        avgIntNoise32:'...',
        avgIntNoise33:'...',
        avgIntNoise34:'...',
        avgIntNoise35:'...',
        avgIntNoise36:'...',
        avgIntNoise37:'...',
        avgIntNoise38:'...',
        avgIntNoise39:'...',
        avgIntNoise40:'...',
        avgIntNoise41:'...',
        avgIntNoise42:'...',
        avgIntNoise43:'...',
        avgIntNoise44:'...',
        avgIntNoise45:'...',
        avgIntNoise46:'...',
        avgIntNoise47:'...',
        avgIntNoise48:'...',
        avgIntNoise49:'...',
        avgIntNoise50:'...',
        avgIntNoise51:'...',
        avgIntNoise52:'...',
        avgIntNoise53:'...',
        avgIntNoise54:'...',
        avgIntNoise55:'...',
        avgIntNoise56:'...',
        avgIntNoise57:'...',
        avgIntNoise58:'...',
        avgIntNoise59:'...',
        avgIntNoise60:'...',
        avgIntNoise61:'...',
        avgIntNoise62:'...',
        avgIntNoise63:'...',
        avgIntNoise64:'...',
        avgIntNoise65:'...',
        avgIntNoise66:'...',
        avgIntNoise67:'...',
        avgIntNoise68:'...',
        avgIntNoise69:'...',
        avgIntNoise70:'...',
        avgIntNoise71:'...',
        avgIntNoise72:'...',
        avgIntNoise73:'...',
        avgIntNoise74:'...',
        avgIntNoise75:'...',
        avgIntNoise76:'...',
        avgIntNoise77:'...',
        avgIntNoise78:'...',
        avgIntNoise79:'...',
        avgIntNoise80:'...',
        avgIntNoise81:'...',
        avgIntNoise82:'...',
        avgIntNoise83:'...',
        avgIntNoise84:'...',
        avgIntNoise85:'...',
        avgIntNoise86:'...',
        avgIntNoise87:'...',
        avgIntNoise88:'...',
        avgIntNoise89:'...',
        avgIntNoise90:'...',
        avgIntNoise91:'...',
        avgIntNoise92:'...',
        avgIntNoise93:'...',
        avgIntNoise94:'...',
        avgIntNoise95:'...',
        avgIntNoise96:'...',
        avgIntNoise97:'...',
        avgIntNoise98:'...',
        avgIntNoise99:'...',
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
// 获取干扰分析数据，并更新表格
let urlstr = ""
const handleSubmit = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    
    urlstr = '/tbprbnew';
    
    if(formInline.attribute || formInline.sectorname || formInline.begintime || formInline.endtime){
        urlstr = urlstr + '?'
        if(formInline.attribute){
            if(urlstr == '/tbprbnew?')
                urlstr = urlstr + 'attribute=' +formInline.attribute
            else
                urlstr = urlstr + '&attribute=' + formInline.attribute
        }
        if(formInline.sectorname){
            if(urlstr == '/tbprbnew?')
                urlstr = urlstr + 'sector-name=' +formInline.sectorname
            else
                urlstr = urlstr + '&sector-name=' + formInline.sectorname
        }
        if(formInline.begintime){
            let begintime=formInline.begintime.Format("MM/dd/yyyy HH:mm:ss");
            if(urlstr == '/tbprbnew?')
                urlstr = urlstr + 'begin-time=' + begintime
            else
                urlstr = urlstr + '&begin-time=' + begintime
        }
        if(formInline.endtime){
            let endtime=formInline.endtime.Format("MM/dd/yyyy HH:mm:ss");
            if(urlstr == '/tbprbnew?')
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
                let myChart = echarts.init(document.getElementById("myChart123"));
                // 绘制图表
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

const submitDownload = () => {

  var url = '/tbprb/export-hourly';
  console.log("Start download prbnew")
  let a = document.createElement('a')
  a.href = url
  a.click()
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