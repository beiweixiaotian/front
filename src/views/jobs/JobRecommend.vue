<template>
  <!--  100vh：视图所有的高度   overflow：能去掉上面一片空白-->
  <div style="width: 100%; background-color: #F7F7F7; overflow: hidden">
    <div style="width: 1100px; height: 2400px; background-color: #FFFFFF; margin: 25px auto">
      <div style="color: #7B68EE; font-size: 30px; font-weight: bold; text-align: center; padding: 40px">岗位推荐</div>


      <el-row style="width: 600px; margin: 0px auto">

        <el-col :span="10">
          <el-button color="#7B68EE"  style="width: 40%; height: 45px; margin-top: 20px" @click="search" >简历推荐</el-button>
        </el-col>
        <el-col :span="4"></el-col>
        <el-col :span="10">
          <el-button color="#7B68EE"  style="width: 40%; height: 45px; margin-top: 20px" @click="recommend" >收藏推荐</el-button>
        </el-col>
      </el-row>
<!--      <el-form :model="form" style="width: 500px; margin: 0px auto">-->

<!--        <el-form-item>-->
<!--          <el-button color="#7B68EE"  style="width: 100%; height: 45px; margin-top: 20px" @click="search" >简历推荐</el-button>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-button color="#7B68EE"  style="width: 100%; height: 45px; margin-top: 20px" @click="recommend" >收藏推荐</el-button>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
      <div style="color: #7B68EE; font-size: 15px; font-weight: bold; text-align: left; padding-left: 40px; padding-top: 20px">
        您适合的职业为:
      </div>
      <el-row style="text-align: left; padding-left: 40px; padding-top: 20px; padding-bottom: 20px" v-loading="loading">
        <div v-for="v in this.jobs_name">
          <el-col style="color: #7B68EE; font-size: 15px; font-weight: bold;">{{v}}&nbsp|&nbsp</el-col>
        </div>
      </el-row>
      <div v-for="v in this.tableData" v-loading="loading">
        <el-card  @click="handleClick(v.jobNo, v.jobName)" @mouseover="mouseOn(v)" @mouseout="mouseOut(v)" shadow="hover" class="box-card">
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
              <el-col :span="6" style="height: 80px; text-align: right; line-height: 10px" v-show="v.showButton">
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

export default {
  name: "JobRecommend",
  data() {
    return {
      form: {
        user_id:localStorage.getItem("user_id"),
      },
      loading: false,
      total: 0,
      jobs_name:[

      ],
      tableData: [
        {
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
  methods: {
    mouseOn(button){
      button.showButton = true;
    },
    mouseOut(button){
      button.showButton = false;
    },
    handleClick(jobNo, jobName){
      localStorage.setItem("job_no", jobNo);
      localStorage.setItem("job_name", jobName);
      this.$router.push("/job");
    },
    recommend(){
      this.loading = true
      axios.post('http://localhost:8080/getRecommend', this.form).then( response=>{
        if (response.data.state === 1){
          this.tableData = response.data.data;
          this.jobs_name = response.data.jobs;
          console.log(this.jobs_name);
        }
        this.loading = false
      })
    },
    search() {
      this.loading = true
      axios.post('http://localhost:8080/getJob', this.form).then( response=>{
        if (response.data.state === 1){
          this.tableData = response.data.data;
          this.jobs_name = response.data.jobs;
          console.log(this.jobs_name);
        }
        this.loading = false
      })
    },
    // 改变每页个数
    handleSizeChange(pageSize){
      this.form.pageSize = pageSize
      this.search()
    },
    // 改变页数
    handleCurrentChange(pageNum){
      this.form.currentPage = pageNum
      this.search()
    }
  }

}
</script>

<script setup>
import { OfficeBuilding } from '@element-plus/icons-vue'
import {ArrowUpBold} from '@element-plus/icons-vue'
</script>