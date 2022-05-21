<!--框架界面-->
<template>
  <div>
    <!--  头部  -->
    <Header/>
    <div style="display: flex">
      <!--   内容区域   -->
      <router-view style="flex: 1"/>
    </div>
  </div>
</template>

<script>
  import Header from "../components/Header";
  export default {
    name: "Layout",
    components: {
      Header
    }
  }
</script>

<style scoped>

</style>