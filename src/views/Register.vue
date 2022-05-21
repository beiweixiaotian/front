<template>
  <div class="background">
    <div class="register-class">
      <div class="register-item">
        <div class="register-title">注册</div>
        <el-form
            :model="form"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            label-position="top"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
                type="text"
                v-model="form.user_id"
                autocomplete="off"
                clearable
                placeholder="请输入账号名"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
                type="password"
                v-model="form.user_pwd"
                autocomplete="off"
                clearable
                placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="重复密码" prop="rep_password">
            <el-input
                type="password"
                v-model="form.rep_password"
                placeholder="请重复密码"
                clearable
                autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item class="form-btn">
            <el-button type="primary" @click="register(form)">注册</el-button>
              <router-link to="/login" style="margin-left: 200px">
                <el-button>登录</el-button>
              </router-link>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {

  name: "Register",

  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.form.user_pwd) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      checked: false,
      form: {
        user_id: '',
        user_pwd: '',
        rep_password:''
      },
      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        user_id: [
          {required: true, message: '账号不可为空', trigger: 'blur'}
        ],
        user_pwd: [
          {required: true, message: '密码不可为空', trigger: 'blur'}
        ],
        rep_password: [
          {validator: validatePass,required: true, message: '请确认密码', trigger: 'blur'}
        ]
      },
      // 对话框显示和隐藏
      dialogVisible: false,
      loading: false
    };
  },
  methods: {


    register(registerForm) {
      // 为表单绑定验证功能
      axios.post('http://localhost:8080/register', this.form).then( response=>{
        if (response.data.state === 1){

          this.$router.push({path: '/login'});
        }
      })
      // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
    }
  },
}
</script>

<style>
.background {
  background: url('~@/assets/login.jpg');
  background-size: cover;
  height: 100%;
}
.register-class {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.register-item {
  width: 500px;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 60px 40px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.8);
}
.register-title {
  text-align: center;
  font-size: 25px;
  padding: 20px 0;
  font-weight: bold;
}
.form-btn {
  text-align: right;
}
.form-btn span {
  margin-left: 20px;
  margin-right: 20px;
}
</style>
