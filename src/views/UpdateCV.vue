<template>


  <div style="width: 1100px; height: 800px; background-color: #FFFFFF; margin: 25px auto">
    <!--    <img alt="risklevel" src="../assets/">-->
      <el-menu
          class="el-menu-demo"
          mode="horizontal"
          active-text-color="#7B68EE"
          style="font-weight: bold; margin-bottom: 40px"
          default-active="1"
      >
        <el-menu-item style="font-size: 17px">账户信息</el-menu-item>
      </el-menu>

<!--      <div style="color: #000000; padding: 20px; font-size: 23px; text-align: center">-->
<!--        {{ localStorage.getItem("user_id") }} , 欢迎您！</div>-->

      <el-form ref="userForm" style="width: 530px; margin: 0px auto" :model="form" :rules="rules" label-width="80px" >
      <el-form-item label="用户名">
        <el-input type="text" style="width: 400px" placeholder="请输入真实姓名" v-model="form.user_name"></el-input>
      </el-form-item>
      <el-form-item label="意向城市" >
        <el-select v-model="form.user_pos" style="width: 400px" placeholder="请选择意向城市">
          <el-option label="上海" value="上海"></el-option>
          <el-option label="北京" value="北京"></el-option>
          <el-option label="广州" value="广州"></el-option>
          <el-option label="深圳" value="深圳"></el-option>
          <el-option label="天津" value="天津"></el-option>
          <el-option label="武汉" value="武汉"></el-option>
          <el-option label="西安" value="西安"></el-option>
          <el-option label="成都" value="成都"></el-option>
          <el-option label="南京" value="南京"></el-option>
          <el-option label="杭州" value="杭州"></el-option>
          <el-option label="重庆" value="重庆"></el-option>
          <el-option label="厦门" value="厦门"></el-option>
        </el-select>
      </el-form-item>
<!--        <el-form-item label="意向公司类型" >-->
<!--          <el-select v-model="form.user_pos" style="width: 400px" placeholder="请选择意向城市">-->
<!--            <el-option label="上海" value="上海"></el-option>-->
<!--            <el-option label="北京" value="北京"></el-option>-->
<!--            <el-option label="广州" value="广州"></el-option>-->
<!--            <el-option label="深圳" value="深圳"></el-option>-->
<!--            <el-option label="天津" value="天津"></el-option>-->
<!--            <el-option label="武汉" value="武汉"></el-option>-->
<!--            <el-option label="西安" value="西安"></el-option>-->
<!--            <el-option label="成都" value="成都"></el-option>-->
<!--            <el-option label="南京" value="南京"></el-option>-->
<!--            <el-option label="杭州" value="杭州"></el-option>-->
<!--            <el-option label="重庆" value="重庆"></el-option>-->
<!--            <el-option label="厦门" value="厦门"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
      <el-form-item label="学历" >
        <el-select v-model="form.user_edu" style="width: 400px" placeholder="请选择学历">
          <el-option label="无" value="无"></el-option>
          <el-option label="初中" value="初中"></el-option>
          <el-option label="高中" value="高中"></el-option>
          <el-option label="大专" value="大专"></el-option>
          <el-option label="本科" value="本科"></el-option>
          <el-option label="硕士" value="硕士"></el-option>
          <el-option label="博士" value="博士"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工作经验">
        <el-select v-model="form.user_exp" style="width: 400px" placeholder="请选择工作经验" >
          <el-option label="无经验" value="0"></el-option>
          <el-option label="一年经验" value="1"></el-option>
          <el-option label="两年经验" value="2"></el-option>
          <el-option label="三年经验" value="3"></el-option>
          <el-option label="四年经验" value="4"></el-option>
          <el-option label="五年经验" value="5"></el-option>
          <el-option label="五年以上经验" value="6"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="最低薪资">
        <el-select v-model="form.user_minsal" style="width: 400px" placeholder="请选择最低薪资">
          <el-option label="1k" value="1000"></el-option>
          <el-option label="2k" value="2000"></el-option>
          <el-option label="3k" value="3000"></el-option>
          <el-option label="4k" value="4000"></el-option>
          <el-option label="5k" value="5000"></el-option>
          <el-option label="6k" value="6000"></el-option>
          <el-option label="7k" value="7000"></el-option>
          <el-option label="8k" value="8000"></el-option>
          <el-option label="9k" value="9000"></el-option>
          <el-option label="10k" value="10000"></el-option>
          <el-option label="15k" value="15000"></el-option>
          <el-option label="20k" value="20000"></el-option>
          <el-option label="30k" value="30000"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="最高薪资">
        <el-select v-model="form.user_maxsal" style="width: 400px" placeholder="请选择最高薪资">
          <el-option label="1k" value="1000"></el-option>
          <el-option label="2k" value="2000"></el-option>
          <el-option label="3k" value="3000"></el-option>
          <el-option label="4k" value="4000"></el-option>
          <el-option label="5k" value="5000"></el-option>
          <el-option label="6k" value="6000"></el-option>
          <el-option label="7k" value="7000"></el-option>
          <el-option label="8k" value="8000"></el-option>
          <el-option label="9k" value="9000"></el-option>
          <el-option label="10k" value="10000"></el-option>
          <el-option label="15k" value="15000"></el-option>
          <el-option label="20k" value="20000"></el-option>
          <el-option label="30k" value="30000"></el-option>
          <el-option label="50k" value="50000"></el-option>
          <el-option label="10w" value="100000"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="个人能力">
        <el-input type="textarea" style="width: 400px" placeholder="个人能力" v-model="form.user_cap"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog
        title="温馨提示"
        :visible.sync="dialogVisible"
        width="30%">
      <span>请输入完整的个人信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import {ElMessage} from "element-plus";

export default {
  name: "UpdateCV",
  data() {
    let validatePass = (rule, value, callback) => {
      if (parseInt(value) < parseInt(this.form.user_minsal)) {
        callback(new Error('请选择正确的薪资'));
      } else {
        callback();
      }
    };
    return {
      form: {
        user_id: localStorage.getItem("user_id"),
        user_name: '',
        user_pos: '',
        user_cap: '',
        user_edu: '',
        user_exp: '',
        user_minsal: '',
        user_maxsal: '',
      },
      user:{
        user_id: localStorage.getItem("user_id"),
      },
      // user_form: {
      //   user_id:'',
      //   user_pos:'',
      //   user_maxsal:'',
      //   user_minsal:'',
      //   user_name:'',
      //   user_pwd:'',
      //   user_cap:'',
      //   user_edu:'',
      //   user_exp:'',
      //   user_has_job:'',
      // },

      rules: {
        user_name: [
          {required: true, message: '请填写真实姓名', trigger: 'blur'}
        ],
        user_pos: [
          {required: true, message: '请填写意向城市', trigger: 'blur'}
        ],
        user_cap: [
          {required: true, message: '请描述个人能力，这是推荐的基础', trigger: 'blur'}
        ],
        user_edu: [
          {required: true, message: '请完善学历', trigger: 'blur'}
        ],
        user_exp: [
          {required: true, message: '请填写工作经验', trigger: 'blur'}
        ],
        user_minsal: [
          {required: true, message: '请填写最低薪资要求', trigger: 'blur'}
        ],
        user_maxsal: [
          {validator: validatePass,required: true, message: '请填写最高薪资要求', trigger: 'blur'}
        ]
      },
      // 对话框显示和隐藏
      dialogVisible: false
    }
  },
  created() {
    // axios.post('http://localhost:8080/updateUser', this.user).then(response=>{
    //       this.form = response.data.user
    // })
  },
  methods: {
    onSubmit(userForm) {
        axios.post('http://localhost:8080/updateUser', this.form).then( response =>{
          this.$router.push('/home');
          ElMessage('修改成功');
        })
      // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
    }
  }

}
</script>

<style lang="scss" scoped>

</style>