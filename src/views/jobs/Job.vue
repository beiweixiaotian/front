<template>
    <!--  100vh：视图所有的高度   overflow：能去掉上面一片空白-->
  <div style="width: 100%; background-color: #FFFFFF; overflow: hidden">

    <div style="width: 100%; height: 250px; background-color: #F5FAFF">
      <div style="width: auto; height: 200px; margin-left: 300px">
<!--        <div style="font-size: 30px; font-weight: bold; text-align: left; padding: 40px">{{ job_title }}</div>-->
<!--        <div style="font-size: 30px; color: red; font-weight: bold; text-align: left; padding-left: 40px">{{ job_salary }}</div>-->
        <el-row>
          <el-col span="12" >
            <h2 style="text-align: left; padding-left: 20px; padding-top: 40px">{{this.gridData.jobTitle }}</h2>
            <h2 style="text-align: left; padding-left: 20px; color: #EE2C2C">薪资：{{this.gridData.jobSalary }}</h2>
            <span style="padding-left: 20px">{{this.gridData.jobCity}} &nbsp|&nbsp </span>
            <span>{{this.gridData.jobExp}} &nbsp|&nbsp </span>
            <span>{{this.gridData.jobEdu}} &nbsp|&nbsp </span>
            <span>{{this.gridData.companyType}}</span>
          </el-col>
<!--          <el-col span="12" style="margin: 0px 300px; justify-content: right; padding-top: 140px; padding-right: 60px; " >-->
          <el-col span="12" style="position: absolute; left:600px; bottom: 0px; " >
            <a href="#" v-if="this.collectForm.collect===false" @click="Collect(this.collectForm.collect)">
              <img src="../../assets/c1.png" alt="">
            </a>
            <a href="#" v-if="this.collectForm.collect===true" @click="Collect(this.collectForm.collect)">
              <img src="../../assets/c2.png" alt="">
            </a>
            <el-button type="primary" style="position: absolute; left:50px; bottom: 0px; width: 250px;height: 50px;margin-left: 20px;
            font-size: 16px; font-weight: bold" @click="goSubmit">&nbsp投递简历</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="2" style="padding-left: 20px;">
            <h4>职位描述</h4>
          </el-col>
          <el-col span="2">
            <h4 style="padding-left: 20px; font-weight: lighter; word-spacing: 8px" v-html="this.gridData.jobCap"></h4>
          </el-col>
        </el-row>
      </div>
    </div>
    <div style="width: auto; height: auto; margin-left: 200px">
      <h3 style="color: #6a93e2;"></h3>
      <div ref="chart" style="width: 1200px; height: 600px;">

      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import * as echarts from 'echarts';
import axios from "axios";
import {ElMessage} from "element-plus";

export default {
  mounted() {
    axios.post('http://localhost:8080/getJobSalNum', this.formJobName1).then( response=>{
      if (response.data.state === 1){
        this.salary1 = response.data.data;

        axios.post('http://localhost:8080/getJobSalNum', this.formJobName2).then( response=>{
          if (response.data.state === 1){
            this.salary2 = response.data.data;
            axios.post('http://localhost:8080/getJobSalNum', this.formJobName3).then( response=>{
              if (response.data.state === 1){
                this.salary3 = response.data.data;
                axios.post('http://localhost:8080/getJobSalNum', this.formJobName4).then( response=>{
                  if (response.data.state === 1){
                    this.salary4 = response.data.data;
                    axios.post('http://localhost:8080/getJobSalNum', this.formJobName5).then( response=>{
                      if (response.data.state === 1){
                        this.salary5 = response.data.data;
                        axios.post('http://localhost:8080/getJobSalNum', this.formJobName6).then( response=>{
                          if (response.data.state === 1){
                            this.salary6 = response.data.data;
                            let EChart = echarts.init(this.$refs.chart)//找到节点
                            //设置参数
                            let data = [
                              {value:this.salary1, name:'0-5k'},
                              {value:this.salary2, name:'5k-10k'},
                              {value:this.salary3, name:'10k-15k'},
                              {value:this.salary4, name:'15k-20k'},
                              {value:this.salary5, name:'20-30k'},
                              {value:this.salary6, name:'30k以上'},
                            ]
                            let option = {
                              title:{
                                text:"同行业薪资",
                                left:"center",
                              },
                              legend:{
                                left:"left",
                                orient:"vertical",
                              },
                              series:[
                                {//系列映射图形
                                  name:"薪资",
                                  type: "pie",
                                  data,
                                  radius:['40%', '70%'],
                                  label:{
                                    formatter: '{b}: {c}({d}%)'
                                  }
                                }
                              ]
                            }
                            EChart.setOption(option);
                          }else {
                            window.alert(response.data.msg)
                          }
                        })
                      }else {
                        window.alert(response.data.msg)
                      }
                    })
                  }else {
                    window.alert(response.data.msg)
                  }
                })
              }else {
                window.alert(response.data.msg)
              }
            })

          }else {
            window.alert(response.data.msg)
          }
        })
      }else {
        window.alert(response.data.msg)
      }
    })

  },
  name: "Job.vue",
  data() {
      return {
        form:{
          job_no: localStorage.getItem("job_no"),
        },
        formUserJob:{
          userId: localStorage.getItem("user_id"),
          jobId: localStorage.getItem("job_no"),
        },
        collectForm:{
          collect: '',
        },
        formJobName1:{
          job_name: localStorage.getItem("job_name"),
          sal1: 1,
          sal2: 5000,
        },
        formJobName2:{
          job_name: localStorage.getItem("job_name"),
          sal1: 5000,
          sal2: 10000,
        },
        formJobName3:{
          job_name: localStorage.getItem("job_name"),
          sal1: 10000,
          sal2: 15000,
        },
        formJobName4:{
          job_name: localStorage.getItem("job_name"),
          sal1: 15000,
          sal2: 20000,
        },
        formJobName5:{
          job_name: localStorage.getItem("job_name"),
          sal1: 20000,
          sal2: 30000,
        },
        formJobName6:{
          job_name: localStorage.getItem("job_name"),
          sal1: 30000,
          sal2: 1000000,
        },
        salary1:'',//1-5000
        salary2:'',//5000-10000
        salary3:'',//10000-15000
        salary4:'',//15000-20000
        salary5:'',//20000-30000
        salary6:'',//>=30000
        gridData:{
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
        },
      }
  },
  created() {
    // 查询
    axios.post('http://localhost:8080/getJobByNo', this.form).then( response=>{
      if (response.data.state === 1){
        this.gridData = response.data.data;
        axios.post('http://localhost:8080/getUserJobByUserJob', this.formUserJob).then(res=>{
          console.log(res.data.data)
          this.collectForm.collect = (res.data.data === 1);
          console.log(this.collectForm.collect)
        })
      }else {
        window.alert(response.data.msg)
      }
    })
  },
  methods: {
    Collect(collect){
      if (collect === false){
        collect = true;
        ElMessage('收藏成功');
        axios.post('http://localhost:8080/saveUserJob', this.formUserJob).then(response=>{
          this.collectForm.collect = true;
        })
      }
      else if(collect === true){
        collect = false;
        ElMessage('取消收藏');
        axios.post('http://localhost:8080/deleteUserJob', this.formUserJob).then(response=>{
          this.collectForm.collect = false;
        })
      }
    },
    goSubmit() {
      window.open(this.gridData.jobHref);
      axios.post('http://localhost:8080/addUserJob', ).then(response=>{

      })
    }
  }

}
</script>

<script setup>

  import { OfficeBuilding } from '@element-plus/icons-vue'
</script>