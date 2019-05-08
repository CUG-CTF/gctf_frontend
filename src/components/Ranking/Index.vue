<template>
  <el-row>
    <el-col :span="16" :offset="4">
      <el-card>
        <ranking expand></ranking>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import Ranking from '@/components/User/Ranking'
export default {
  data () {
    return {}
  },
  components: {
    Ranking
  }
}
</script>
