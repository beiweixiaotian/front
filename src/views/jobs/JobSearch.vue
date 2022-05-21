<template>
  <!--  100vh：视图所有的高度   overflow：能去掉上面一片空白-->
  <div style="width: 100%; background-color: #F7F7F7; overflow: hidden">
    <div style="width: 1100px; height: 2400px; background-color: #FFFFFF; margin: 25px auto">
      <div style="color: #7B68EE; font-size: 30px; font-weight: bold; text-align: center; padding: 40px">岗位搜索</div>

      <el-row>
        <el-col :span="18" style="height: 80px; text-align: center; line-height: 100px">
          <el-form :model="form" style="width: 600px; margin: 10px 240px">
            <el-form-item>
              <el-input type="text" v-model="form.job_title" placeholder="请输入关键字" style="height: 45px; margin-top: 20px"/>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="3" style="height: 80px; text-align: center; margin: 10px 12px; line-height: 10px">
          <el-button color="#7B68EE"  style="width: 100%; height: 45px; margin-top: 20px" @click="search" >搜索</el-button>
        </el-col>
      </el-row>

      <div v-for="v in this.tableData">
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


      <!--  分页-->
      <div style="margin: 30px 0; padding-left: 10px">
        <!--    currentPage是变量 代表当前页  handleSizeChange和handleCurrentChange是两个函数-->
        <el-pagination
            :currentPage="this.form.pageNum"
            :page-size="this.form.pageSize"
            :page-sizes="[5, 10, 20]"
            :small="small"
            :disabled="disabled"
            :background="background"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
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
  name: "JobSearch",
  data() {
    return {
      form: {
        job_title:'',
        pageNum: 1,
        pageSize: 10,
      },

      total: 0,
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
    search() {
      axios.post('http://localhost:8080/getJobByTitle', this.form).then( response=>{

        if (response.data.state === 1){
          this.tableData = response.data.data.content
          this.total = response.data.total
        }else {
          window.alert("无数据")
        }
      })

    },
    // 改变每页个数
    handleSizeChange(pageSize){
      this.form.pageSize = pageSize
      this.search()
    },
    // 改变页数
    handleCurrentChange(pageNum){
      this.form.pageNum = pageNum
      this.search()
    },
    handleClick(jobNo, jobName){
      localStorage.setItem("job_no", jobNo);
      localStorage.setItem("job_name", jobName);
      this.$router.push("/job");
    },
  }

}
</script>

<script setup>
import { Search } from '@element-plus/icons-vue'
import {ArrowUpBold} from '@element-plus/icons-vue'
</script>