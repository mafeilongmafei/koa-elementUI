<template>
  <router-view/>
</template>
<script>
import {getUfo } from "./untils/auth.js";
import { SET_TOKEN } from "./store/muations-Type.js";

export default {
  name : "app",
  created() {
    this.addStateUserInfo()
  },
  methods : {
    //每次刷新时,把cookie中的数据放到state中
    addStateUserInfo() {
      let obj = {};
      obj.user = getUfo();
      this.$store.commit(SET_TOKEN, obj);
    },
  }
};
</script>
<style lang='less'>
</style>