<template>
  <div class="challenge-content">
    <div class="challenge-item">
      <span class="challenge-item-key">题目描述</span>
      <br>
      <div class="challenge-item-value" v-html="challenge.description">

      </div>
    </div>
    <div class="challenge-item">
      <span class="challenge-item-key">
        <el-button size="small" type="primary" plain v-on:click="getURL">显示题目网址</el-button>
      </span>
      <div class="challenge-item-value">
        <a :href='url' target="_blank">{{ url }}</a>
      </div>
    </div>
    <div class="challenge-item">
      <span class="challenge-item-key">链接失效时间</span>
      <div class="challenge-item-value">
        {{ expired_time }}
      </div>
    </div>
    <div class="challenge-item">
      <span class="challenge-item-key">分数</span>
      <div class="challenge-item-value">
        {{ challenge.value }}
      </div>
    </div>
    <div class="challenge-item">
      <el-form @submit.native.prevent="submit" v-loading="loading">
        <el-form-item>
          <el-input placeholder="gctf{}/flag{}" class="submit-flag" v-model="form.flag"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit" class="float-right">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <div class="challenge-item">
      <span class="challenge-item-key">完成队伍数</span>
      <div class="challenge-item-value">
        <a href="javascript:;" @click="showSolvedTeams(challenge.challenge_id)">{{ challenge.solvedCount }}</a>
      </div>
    </div> -->
  </div>
</template>

<script>
import Challenge from '@/api/Challenge'
export default {
  data () {
    return {
      form: {
        flag: ''
      },
      url: '',
      loading: false,
      expired_time: '',
      challl: this.challenge
    }
  },
  props: ['challenge'],
  methods: {
    async submit () {
      if (!this.form.flag) {
        return this.$handleError({
          message: '请完成输入'
        })
      }
      this.loading = true
      try {
        let result = await Challenge.submitFlag(this.$store.state.user.userName, this.challl.id, this.form.flag, this.$store.state.user.userToken)
        this.form.flag = ''
        // console.log(result)
        if (result.data.succeed) {
          this.$message({
            showClose: true,
            message: '恭喜，队伍积分+' + this.challl.sroce,
            type: 'success'
          })
        } else {
          this.$message({
            showClose: true,
            message: result.data.msg,
            type: 'error'
          })
        }
      } catch (e) {
        this.$handleError(e)
      }
      this.loading = false
    },
    async getURL () {
      this.loading = true
      try {
        let result = await Challenge.startProblem(this.$store.state.user.userName, this.$store.state.user.userToken, this.challl.id)
        this.url = 'http://' + result.data.host_ip + ':' + result.data.host_port
        this.expired_time = result.data.expired
        // console.log(result)
      } catch (e) {
        this.$handleError(e)
      }
      this.loading = false
    }
  }
}
</script>

<style>
  .challenge-body {
    margin: 2rem auto;
    clear: both;
  }

  .challenge-item {
    line-height: 2;
  }

  .challenge-item-key {
    color: #aaa;
    display: inline-block;
    margin-right: 1rem;
  }

  .challenge-item-value {
    display: inline-block;
  }

  .dynamic-flag-badge {
    vertical-align: super;
    font-size: smaller;
    font-weight: normal;
  }

  a {
    text-decoration: none;
    color: #4db3ff;
  }

  a:hover {
    color: #1c8de0;
  }

  .submit-flag input::placeholder {
    font-family: Consolas, monospace;
  }

  .submit-flag input:-ms-input-placeholder {
    font-family: Consolas, monospace;
  }

  .submit-flag input::-webkit-input-placeholder {
    font-family: Consolas, monospace;
  }

  .float-right {
    float: right !important;
  }
</style>
