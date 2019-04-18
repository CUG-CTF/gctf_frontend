<template>
  <div id="app">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="GCTF"></el-tab-pane>
      <el-tab-pane label="Login"></el-tab-pane>
      <el-tab-pane label="About"></el-tab-pane>
      <el-tab-pane label="Notification"></el-tab-pane>
    </el-tabs>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<script>
export default {
  data () {
    return {
      activeName: 'zero'
    }
  },
  methods: {
    handleClick (tab) {
      this.$router.push(tab.label.toLowerCase())
    }
  }
}
</script>
