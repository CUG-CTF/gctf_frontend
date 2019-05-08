<template>
  <el-row>
    <el-col :span="18" :offset="3">
      <el-card class="notification-container" style="margin-bottom: 2rem;">
        <rank @change="updateTopTeams"></rank>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import Rank from '@/components/User/Ranking'

export default {
  name: 'hello',
  data () {
    return {
      topTeams: []
    }
  },
  components: {
    Rank
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
