<template>
  <div class="login-container">
    <h1>图书馆管理员登录 Arco Design</h1>
    <form @submit.prevent="Login">
      <div class="form-group">
        <label for="username">用户名</label>
        <input type="text" id="username" v-model="loginForm.userName" placeholder="请输入用户名" />
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input type="password" id="password" v-model="loginForm.passWord" placeholder="请输入密码" />
      </div>
      <div class="form-group checkbox-group">
        <input type="checkbox" id="remember" v-model="loginForm.remember" />
        <label for="remember">记住我</label>
      </div>
      <button type="submit" class="login-btn" >登录</button>
      <div style="display: flex;justify-content: center">
      <!--<a href="baidu.com" class="forgot-password">忘记密码?</a>-->
        <a href="/register" class="forgot-password">还没有账号？立即注册！</a>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import {bUrl} from "@/api/BaseUrl";
import { Message } from '@arco-design/web-vue';

export default {
  name:"login",
  data() {
    return {
      loginForm: {
        userName: 'admin',
        passWord: '123456',
        remember:''
      },
    };
  },
  methods: {
    Login() {
      axios.post(bUrl()+"/login",this.loginForm).then(res=>{
        console.log(res.data)

        let _status = res.data.status
        if (_status==true){
          //保存用户名到Vuex
          let userName = this.$data.loginForm.userName
          this.$store.dispatch('setValue',userName)
          // 成功登录跳转到home
          Message.success({content: '账号密码正确，登录成功！', showIcon: true});
          this.$router.replace("/home");
          //标志登录通过 用于路由守卫判断比较
          sessionStorage.setItem("logined",true)
        }else {
          Message.error({content: '账号密码错误，登录失败！', showIcon: false});
        }
      }).catch(err=>{
        Message.error({content: '请求网络错误！', showIcon: false});
      })

    },
  },
};
</script>

<style>
.login-container {

  max-width: 600px;
  margin: 80px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  background-color: #f9f9f9;
}

.login-container h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #666;
}

.form-group input[type="text"],
.form-group input[type="password"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.checkbox-group {
  display: flex;
  align-items: center;
}

.checkbox-group input[type="checkbox"] {
  margin-right: 5px;
}

.login-btn {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.login-btn:hover {
  background-color: #0056b3;
}

.forgot-password {
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #007bff;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}
</style>

