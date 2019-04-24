<template>
<el-row>
  <el-col :span="16" :offset="10">
    <el-card>
      <h2>登录</h2>
      <el-form @keyup.enter.native="submit" v-loading="loading">
        <el-form-item label="Email">
          <el-input type="email" placeholder="Email" v-model="form.email"></el-input>
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
        email: '',
        password: ''
      },
      loading: false
    }
  },
  mounted () {},
  methods: {
    async submit () {
      if (!this.form.email || !this.form.password) {
        return this.$message.error('请完成输入')
      }
      this.loading = true
      try {
        let result = await Team.login(this.form.email, this.form.password)
        if (result['access_token']) {
          localStorage.setItem('jwt', result.access_token)
        }
        result = await Team.getTeamInfo()
        this.$store.commit('setTeamName', result.team_name)
        this.$store.commit('setTeamId', result.team_id)
        this.$store.commit('setToken', result.token)
        this.$store.commit('login')
        if (result.admin) {
          this.$store.commit('enterAdminMode')
        }
        if (this.$route.query && this.$route.query['return']) {
          this.$router.push({
            name: this.$route.query['return']
          })
        } else {
          this.$router.push('/')
        }
      } catch (e) {
        this.$handleError(e)
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
