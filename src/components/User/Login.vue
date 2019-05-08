<template>
  <el-row>
    <el-col :span="16" :offset="10">
      <el-card>
        <h2>登录</h2>
        <el-form @keyup.enter.native="submit" v-loading="loading">
          <el-form-item label="用户名">
            <el-input type="text" placeholder="用户名" v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" placeholder="密码" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click.prevent="submit" type="primary" class="float-right">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import Team from '@/api/Team'

export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      loading: false
    }
  },
  mounted () {},
  methods: {
    async submit () {
      if (!this.form.username || !this.form.password) {
        return this.$message.error('请完成输入')
      }
      this.loading = true
      try {
        let result = await Team.login(this.form.username, this.form.password)
        // console.log(result.data)
        this.$store.commit('setuserName', result.data.username)
        this.$store.commit('setToken', result.data.token)
        this.$store.commit('login')
        // result = await user.getuserInfo()
        // if (false) {
        //   this.$store.commit('enterAdminMode')
        // }
        this.$router.push({ path: '/' })
        this.$notify({
          title: '提示信息',
          message: '登录成功',
          type: 'success'
        })
      } catch (e) {
        this.$notify({
          title: '提示信息',
          message: '登录失败',
          type: 'error'
        })
        this.form.password = ''
      }
      this.loading = false
    }
  }
}
</script>

<style scoped>
.float-right {
  float: right !important;
}
</style>
