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
      let result = await Team.logout(this.$store.state.user.userToken)
      console.log(result)
      this.$store.commit('logout')
      this.$router.push({
        name: 'Index'
      })
      this.$notify({
        title: '提示信息',
        message: '注销成功',
        type: ''
      })
    } catch (e) {
      this.$handleError(e)
    }
  }
}
</script>
