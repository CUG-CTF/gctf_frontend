<template>
  <div>
    <h1>Welcome to CUG CTF</h1>
    <el-row :gutter="300">
      <el-col :span="8" :offset="8">
        <el-input v-model="text" placeholder="Enter your user name"></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="300">
      <el-col :span="8" :offset="8">
        <el-input v-model="password" placeholder="Enter your password" show-password></el-input>
      </el-col>
    </el-row>
    <el-row>
      <a href="./register">
        <el-button type="primary">注册</el-button>
      </a>
      <a href="/list">
        <el-button>登录</el-button>
      </a>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      text: '',
      password: ''
    }
  }
}
</script>

<style>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
