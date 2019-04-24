<template>
<el-row>
  <el-col :span="16" :offset="4">
    <el-card>
      <h2>提交Flag</h2>
      <el-form @submit.native.prevent="submit" v-loading="loading">
        <el-form-item>
          <el-input placeholder="gctf{}/flag{}" class="submit-flag" v-model="form.flag"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit" class="float-right">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-col>
</el-row>
</template>
<style>
  .submit-flag input::placeholder {
    font-family: Consolas, monospace;
  }

  .submit-flag input:-ms-input-placeholder {
    font-family: Consolas, monospace;
  }

  .submit-flag input::-webkit-input-placeholder {
    font-family: Consolas, monospace;
  }
</style>
<script>
import Challenge from '@/api/Challenge'

export default {
  data () {
    return {
      form: {
        flag: ''
      },
      loading: false
    }
  },
  methods: {
    async submit () {
      if (!this.form.flag) {
        return this.$handleError({
          message: '请完成输入'
        })
      }
      this.loading = true
      try {
        let result = await Challenge.submitFlag(this.form.flag)
        this.form.flag = ''
        this.$message({
          showClose: true,
          message: this.$t('恭喜，队伍积分+', [result.score]),
          type: 'success'
        })
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
