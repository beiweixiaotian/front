<template>
  <!--  100vh：视图所有的高度   overflow：能去掉上面一片空白-->
  <div style="width: 100%; background-color: #F7F7F7; overflow: hidden">
    <div style="width: 1100px; height: 2400px; background-color: #FFFFFF; margin: 25px auto">

      <div v-for="v in this.tableData" v-loading="loading">
        <el-card @mouseover="mouseOn(v)" @mouseout="mouseOut(v)" shadow="hover" class="box-card">
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
              <el-col :span="8" style="height: 80px; text-align: right; line-height: 10px" v-show="v.showButton">
                <a href="#" v-if="v.collection===false" @click="collect(v.jobNo, v.collection)">
                  <img src="../../assets/c1.png" alt="">
                </a>
                <a href="#" v-if="v.collection===true" @click="collect(v.jobNo, v.collection)">
                  <img src="../../assets/c2.png" alt="">
                </a>
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
import router from "@/router";

export default {
  name: "JobCollection",
  created() {
      this.loading = true
      axios.post('http://localhost:8080/getCollections', this.form).then( response=>{
        if (response.data.state === 1){
          this.tableData = response.data.data;
          console.log(this.tableData)
        }
        this.loading = false
      })
  },
  data() {
    return {
      form: {
        user_id:localStorage.getItem("user_id"),
      },
      formUserJob:{
        userId: localStorage.getItem("user_id"),
        jobId: '',
      },
      loading: false,
      total: 0,
      tableData: [
        {
          collection: true,
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
    collect(jobNo, collect){
      this.formUserJob.jobId = jobNo;
      collect = false;
      ElMessage('取消收藏');
      axios.post('http://localhost:8080/deleteUserJob', this.formUserJob).then(response=>{
        collect = false;
        axios.post('http://localhost:8080/getCollections', this.form).then( response=>{
          if (response.data.state === 1){
            this.tableData = response.data.data;
            console.log(this.tableData)
          }
          this.loading = false
        })
      })
    },
    mouseOn(button){
      if (button.collection === undefined) {
        button.collection = true;
      }
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
<style>

</style>