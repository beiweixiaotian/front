<template>
<!--  display:布局  justify-content:flex水平布局  align-items:flex垂直布局-->
  <div style="height: 125px; width: 100%; min-width: 1100px; line-height: 50px;
   display: flex; justify-content: center; align-items: center">

    <div class="centerFlex" style="height: 115px; width: 1100px">
<!--      logo-->
      <div class="centerFlex" style="flex: 1">
<!--        <img alt="logo" src="../assets/">-->
      </div>
<!--      菜单-->
      <div style="margin-left:10px; flex: 1">
        <el-menu
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            active-text-color="#7B68EE"
            style="font-weight: bold; width: 500px"
            default-active="1"
        >
          <el-menu-item index="1" style="font-size: 23px" @click="goHome">首页</el-menu-item>
          <el-menu-item index="2" style="font-size: 23px" @click="goRecommend">岗位推荐</el-menu-item>
          <el-menu-item index="3" style="font-size: 23px" @click="goSearch">岗位搜索</el-menu-item>
          <el-menu-item index="4" style="font-size: 23px" @click="goScan">随便看看</el-menu-item>

        </el-menu>
      </div>
    </div>
<!--    登录注册-->
    <div style="padding-top: 30px">
      <el-dropdown>
        <span class="el-dropdown-link" style="font-size: 18px">个人中心</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-button style="font-size: 15px; color: black; background: transparent; border: #FFFFFF" @click="cv">个人简历</el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button style="font-size: 15px; color: black; background: transparent; border: #FFFFFF" @click="collect">个人收藏</el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button style="font-size: 15px; color: black; background: transparent; border: #FFFFFF" @click="enroll">退出</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="centerFlex">


    </div>
  </div>
</template>


<script>
  export default {
    data() {
      return {

      }
    },
    methods:{
      handleSelect(key, keyPath){
      },
      cv() {
        this.$router.push("/updatecv")
      },
      collect() {
        this.$router.push("/collections")
      },
      enroll() {
        this.$router.push("/login")
      },
      goHome() {
        this.$router.push("/home")
      },
      goRecommend() {
        this.$router.push("/recommend")
      },
      goSearch() {
        this.$router.push("/search")
      },
      goScan() {
        this.$router.push("/scan")
      },
    }
  }
</script>

<style type="text/css">
  .centerFlex{
    display: flex;
    justify-content: center;
    align-items: center;
  }

</style>