<template>
<el-row>
  <el-col :span="16" :offset="4">
    <el-card>
      <el-form @keyup.enter.native.prevent="submit" @submit.prevent="submit" v-loading="loading">
      <h2>注册</h2>
      <el-form-item>
        <el-input placeholder='用户名' v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="Email" v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" placeholder='密码' v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" placeholder='确认密码' v-model="form.password2"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submit" type="primary" class="float-right">注册</el-button>
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
        email: '',
        password: '',
        password2: ''
      },
      loading: false
    }
  },
  methods: {
    async submit () {
      if (!this.form.username || !this.form.email || !this.form.password || !this.form.password2) {
        return this.$message({
          showClose: true,
          type: 'warning',
          message: '请完成表格'
        })
      }
      if (this.form.password !== this.form.password2) {
        return this.$message({
          showClose: true,
          type: 'warning',
          message: '密码不一致'
        })
      }
      this.loading = true
      try {
        let result = await Team.register(this.form.username, this.form.email, this.form.password)
        console.log('register test')
        console.log(result)
        if (result.status === 200) {
          this.$router.push({
            name: 'user-login'
          })
          this.$notify({
            title: '提示信息',
            message: '注册成功',
            type: 'success'
          })
        } else {
          this.$notify({
            title: '提示信息',
            message: '注册失败',
            type: 'error'
          })
        }
      } catch (e) {
        this.$message({
          showClose: true,
          type: 'error',
          message: e.message
        })
      }
      this.loading = false
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
  .float-right {
    float: right
  }
</style>
