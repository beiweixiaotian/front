<template>
  <div class="background">
    <div class="login-class" v-loading = 'loading'>

      <div class="login-content">
        <div class="login-item">
          <span class="login-title">岗位推荐系统</span>
        <el-form
            ref="ruleForm"
            :rules="rules"
            :model="form"
            label-width="80px"
        >
          <el-form-item label="用户名" prop="user_id">
            <el-input
                v-model="form.user_id"
                placeholder="请输入用户名"
                clearable
            ></el-input>
          </el-form-item>
            <el-form-item label="密码" prop="user_pwd">
              <el-input
                  v-model="form.user_pwd"
                  placeholder="请输入密码"
                  show-password
                  clearable
              ></el-input>
            </el-form-item>
            <div class="login-btn">
              <el-button style="margin-right: 10px" type="primary" @click="login" >登录</el-button>
                <router-link to="/register">
                <el-button>注册</el-button>
                </router-link>
            </div>
          </el-form>
            </div>
          </div>
      </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {

  name: "Login",
  data() {

    return {
      checked: false,
      form: {
        user_id: '',
        user_pwd: ''
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        user_id: [
          {required: true, message: '用户名不可为空', trigger: 'blur'}
        ],
        user_pwd: [
          {required: true, message: '密码不可为空', trigger: 'blur'}
        ]
      },
      // 对话框显示和隐藏
      dialogVisible: false,
      loading: false
    };
  },
  methods: {
    // toRegister(){
    //   this.$router.push({path: '/register'});
    // },
    login() {

      this.loading = true
      // 为表单绑定验证功能
      axios.post('http://localhost:8080/login', this.form).then( response=>{
        // console.log(response)
        if (response.data.state === 1){
          this.loading = false
          // localStorage.setItem("user", this.user_form)
          localStorage.setItem("user_id", this.form.user_id);
          this.$router.push({path: '/home'});
        }
        else{
          this.loading = false
          window.alert("账户名或密码错误")
        }
      })
      // this.$refs.loginForm.validate((valid) => {
      //   window.alert(this.form.user_id)
      //
      //   if (valid) {
      //     axios.post('http://localhost:8080/login', this.form).then( response=>{
      //       window.alert(response)
      //       console.log(response)
      //       if (response.data.state === 1){
      //         this.loading = false
      //         console.log(response.data);
      //         this.$router.push({path: '/home'});
      //       }
      //       else{
      //         this.loading = false
      //         window.alert("账户名或密码错误")
      //       }
      //     })
      //     // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
      //   } else {
      //     this.dialogVisible = true;
      //   }
      // });
    }
  }
}
</script>

<style>
.background {
  background: url('~@/assets/login.jpg') no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
  position: fixed;
}
.login-class {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.login-content {
  width: 500px;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 60px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  /*background-color: #fff;*/
}
.login-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.el-form {
  width: 400px;
}
.login-title {
  font-size: 25px;
  padding: 20px 0;
  font-weight: bold;
  text-align: center;
}
.login-btn {
  text-align: right;
}

</style>
