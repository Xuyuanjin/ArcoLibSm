
<template>
  <h2 style="position: absolute; right: 150px;top: 2px">欢迎登录！{{user}}</h2>
  <a-space size="large">
    <a-dropdown trigger="hover">
      <a-avatar :size="45" style="position: absolute; right: 60px; top: 10px;background-color: #3071c9"><icon-code-sandbox /></a-avatar>
      <template #content>
        <a-doption>修改头像</a-doption>
        <a-doption>修改信息</a-doption>
        <a-doption @click="logout">退出登录</a-doption>
      </template>
    </a-dropdown>
  </a-space>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  // props: {
  //   user: {
  //     type: String,
  //     require: true,//传递值是否必填
  //     default: "Admin"
  //   },
  // }

  data(){
    return{
      user: this.$store.state.userName
    }
  },
  methods:{
    logout(){
      this.$router.replace("/")
    }
  }


});
</script>

<style>

</style>