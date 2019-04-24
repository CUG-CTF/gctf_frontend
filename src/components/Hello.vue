<template>
  <el-row class="content">
    <el-col :span="24" style="padding-bottom: 2rem;">
      <el-card>
        <countdown></countdown>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card style="margin-bottom: 2rem;">
        <rank @change="updateTopTeams"></rank>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card class="notification-container">
        <notification></notification>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import Rank from '@/components/User/Ranking'
import Countdown from '@/components/Common/Countdown'
import Notification from '@/components/Common/Notification'

export default {
  name: 'hello',
  data () {
    return {
      topTeams: []
    }
  },
  components: {
    Rank,
    Countdown,
    Notification
  },
  methods: {
    /**
       * 更新 Top 20 队伍名单
       * @param topTeams
       */
    updateTopTeams (topTeams) {
      this.topTeams = topTeams
    }
  }
}
</script>
<style scoped>
  .main-notice {
    font-size: 10vh;
  }

  .content {
    height: 92vh;
  }

  .content .el-col {
    padding: 0 1rem;
  }

  .logo-container{
    text-align: center;
  }
  .logo-container img{
    display: block;
    margin: auto;
  }
  .notification-container{
    margin-top: 1rem;
  }
</style>
