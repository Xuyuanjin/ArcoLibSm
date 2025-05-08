<template>
  <a-menu
      :defaultOpenKeys="['1-2']"
      :defaultSelectedKeys="['1_1']"
      :style="{ width: '100%' }"
      @menuItemClick="onClickMenuItem"
  >

    <a-menu-item key="1_1" @click="toHome">
      <IconHome/>
      首页
    </a-menu-item>
    <a-menu-item key="1_2" @click="toUserM">
      <icon-user-group />
      用户管理
    </a-menu-item>
    <a-menu-item key="1_3" @click="toBookM">
      <icon-layers />
      图书管理
    </a-menu-item>

    <a-sub-menu>
      <template #title>
        <span><IconCalendar/>更多功能</span>
      </template>
      <a-menu-item key="2_1" @click="toAbout">
        <a href="https://blog.1024777.xyz/">个人博客</a>
      </a-menu-item>
      <a-menu-item key="2_2">
        <a href="https://arco.design/">Arco Design</a>
      </a-menu-item>
    </a-sub-menu>

  </a-menu>

</template>

<script>

import {defineComponent} from "vue";
import {Message} from "@arco-design/web-vue";
export default defineComponent({

  // 数据
  data() {
    return{
      collapsed: false
    }

  },
  methods: {
    // 处理菜单点击
    onClickMenuItem(key, keyPath) {
      console.log(key, keyPath);
    },
    // 跳转到首页
    toHome(){
      this.$router.push("/home")
    },
    // 跳转用户管理
    toUserM(){
      this.$router.push("/users")
    },
    // 跳转图书管理
    toBookM(){
      this.$router.push("/books")
    },
    toAbout(){
      Message.info({content: '跳转到博客', showIcon: true})
    }
  },

});
</script>

<style scoped>

</style>