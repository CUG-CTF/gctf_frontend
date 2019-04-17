<template>
  <div id="app">
    <div>
      <el-menu :default-active="activeIndex" mode="horizontal">
        <el-menu-item index="1">
          <router-link to="/list">CUG CTF</router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link to="/login">Center</router-link>
        </el-menu-item>
        <el-menu-item index="3">
          <router-link to="/about">About</router-link>
        </el-menu-item>
        <el-menu-item index="4">Notification</el-menu-item>
      </el-menu>
    </div>
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
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
