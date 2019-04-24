<template>
  <el-row>
    <el-col :span="16" :offset="4">
      <el-card v-for="bulletin in bulletins" :key="bulletin.bulletin_id" class="bulletin-container">
        <h2>公告</h2>
        <div v-html="bulletin.content">
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<style>
  .bulletin-container{
    margin-bottom: 1rem;
  }
</style>
<script>
import Bulletin from '@/api/Notification'

export default {
  data () {
    return {
      bulletins: []
    }
  },
  async mounted () {
    try {
      this.bulletins = await Bulletin.getAllBulletins()
    } catch (e) {
      this.$handleError(e)
    }
  },
  methods: {

  }
}
</script>
