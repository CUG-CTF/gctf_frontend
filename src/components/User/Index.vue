<template>
<el-col :span="22" :offset="7">
  <el-card v-loading="loading">
    <h2> {{ user.username }} </h2>
    <div>
      <p>总分: {{ user.score }}</p>
      <p>Token: <span class="token">{{ this.$store.state.user.userToken }}</span></p>
    </div>
  </el-card>
</el-col>
</template>
<style scoped>
  .token {
    font-family: Consolas, monospace
  }
</style>
<script>
import Team from '@/api/Team'

export default {
  data () {
    return {
      user: {},
      loading: false
    }
  },
  async mounted () {
    this.loading = true
    try {
      let result = await Team.getUserInfo(this.$store.state.user.userName, this.$store.state.user.userToken)
      this.user = result.data
      // console.log('user')
      // console.log(this.user)
    } catch (e) {
      this.$handleError(e)
    }
    this.loading = false
  },
  methods: {}
}
</script>
