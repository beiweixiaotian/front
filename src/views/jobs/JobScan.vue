<template>
  <!--  100vh：视图所有的高度   overflow：能去掉上面一片空白-->
  <div style="width: 100%; background-color: #F7F7F7; overflow: hidden">
    <div style="width: 1100px; background-color: #FFFFFF; margin: 25px auto">
      <div style="color: #7B68EE; font-size: 30px; font-weight: bold; text-align: center; padding-top: 40px">随便看看</div>
<!--          <el-button color="#7B68EE"  style="width: 100%; height: 45px; margin-top: 20px" @click="search" >换一换</el-button>-->
      <el-row>
        <el-col :span="22" style="height: 50px; text-align: right; padding-right: 0px; line-height: 10px">
          <el-button color="#FFFFFF"  style="height: 45px;"  @click="search" >
            <el-icon size="100"  style="padding-right: 10px">
              <Refresh @click="search" />
            </el-icon>
            <span>换一换</span>
          </el-button>
        </el-col>
<!--        <el-col>-->
<!--          <el-table :data="tableData" :header-cell-style="{background:'#eef1f6',color:'#606266'}" border style="width: 1080px; padding-left: 10px; padding-right: 10px">-->
<!--            <el-table-column prop="jobTitle" label="岗位名称">-->
<!--              <img src="../../assets/logo.png" width="100" height="100">-->
<!--            </el-table-column>-->
<!--            <el-table-column prop="jobCity" label="工作地点" />-->
<!--            <el-table-column prop="companyType" label="公司类型" />-->
<!--            <el-table-column prop="jobSalary" label="薪资" />-->
<!--            <el-table-column prop="jobEdu" label="学历" />-->
<!--            <el-table-column prop="jobExp" label="工作经验" />-->
<!--            <el-table-column label="操作">-->
<!--              <template #default="scope">-->
<!--                <el-button @click="handleClick(scope.row) " type="text" size="big">查看</el-button>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--          </el-table>-->
<!--        </el-col>-->
      </el-row>
      <div v-for="v in this.tableData">
        <el-card  @mouseover="mouseOn(v)" @mouseout="mouseOut(v)" shadow="hover" class="box-card">
          <template #header>
            <div class="card-header">
              <h3 style="text-align: left; padding-left: 20px;">{{v.jobTitle }}</h3>
            </div>

            <el-row>
              <el-col :span="4" style=" text-align: left; ">
                <span style=" font-weight: bold; text-align: left; padding-left: 20px; color: #EE2C2C">薪资：{{v.jobSalary }}</span>
              </el-col>
              <el-col :span="4" style=" text-align: left; ">
                <span style="padding-left: 20px">{{v.jobCity}} &nbsp|&nbsp </span>
              </el-col>
              <el-col :span="2" style=" text-align: left; ">
                <span>{{v.jobExp}} &nbsp|&nbsp </span>
              </el-col>
              <el-col :span="2" style=" text-align: left; ">
                <span>{{v.jobEdu}} &nbsp|&nbsp </span>
              </el-col>
              <el-col :span="2" style=" text-align: left;">
                <span>{{v.companyType}}</span>
              </el-col>
              <el-col :span="2" style=" text-align: left;"/>
              <el-col :span="2" style=" text-align: left;"/>
              <el-col :span="16" style="text-align: left; padding-left: 20px; padding-top: 20px">
                <span class="demo-shadow-text" >{{v.jobCap}}</span>
              </el-col>
              <el-col :span="6" style="height: 80px; text-align: right; padding-left:10px;  line-height: 10px" v-show="v.showButton">
                <el-button color="#7B68EE"  style="width: 100%; height: 45px; " @click="handleClick(v.jobNo, v.jobName)" >申请职位</el-button>
              </el-col>
            </el-row>

          </template>
        </el-card>
      </div>
    </div>
  </div>
  <el-backtop :bottom="100">
    <div
        style="
        height: 100%;
        width: 100%;
        background-color: var(--el-bg-color-overlay);
        box-shadow: var(--el-box-shadow-lighter);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      "
    >
      <el-icon size="40px"><el-icon><ArrowUpBold /></el-icon></el-icon>
    </div>
  </el-backtop>
</template>

<script>

import axios from "axios";
import {ElMessage} from "element-plus";
export default {
  name: "JobScan",
  data() {
    return {
      form: {

      },
      tableData: [
        {
          collect: '',
          showButton: false,
          jobNo:'',
          jobName:'',
          jobCity: '',
          jobTitle:'',
          companyType: '',
          jobSalary: '',
          jobEdu: '',
          jobCap: '',
          jobExp: '',
          jobHref: '',
        }
      ],
    }
  },
  created(){
    this.search()
  },
  methods: {

    mouseOn(button){
      button.showButton = true;
    },
    mouseOut(button){
      button.showButton = false;
    },
    handleClick(jobNo, jobName){
      localStorage.setItem("job_no", jobNo);
      localStorage.setItem("job_name", jobName)
      console.log(localStorage.getItem("job_no"))
      console.log(localStorage.getItem("job_name"))
      this.$router.push("/job");
    },
    search() {
      axios.post('http://localhost:8080/getRanJob', this.form).then( response=>{
        if (response.data.state === 1){
          this.tableData = response.data.data;
        }else {
          // window.alert(response.data.msg)
        }
      })
    },

  }

}
</script>

<script setup>
import { Refresh } from '@element-plus/icons-vue'
import {ArrowUpBold} from '@element-plus/icons-vue'
import { ChatDotRound, ChatLineRound, ChatRound } from '@element-plus/icons-vue'

const value = ref()
const icons = [ChatRound, ChatLineRound, ChatDotRound]
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
const value3 = ref(true)
const checkboxGroup = ref([''])
</script>