<template>
<div></div>
</template>
<script>
import Team from '@/api/Team'

export default {
  data () {
    return {
      loading: false
    }
  },
  async mounted () {
    this.loading = true
    try {
      console.log(this.$store.state.user.userToken)
      console.log(this.$store.state.user.teamName)
      await Team.logout(this.$store.state.user.userToken, this.$store.state.user.userName)
      // console.log(result)
      this.$store.commit('logout')
      this.$router.push({
        name: 'Index'
      })
      this.$notify.info({
        title: '提示信息',
        message: '注销成功'
      })
    } catch (e) {
      this.$handleError(e)
    }
  }
}
</script>
