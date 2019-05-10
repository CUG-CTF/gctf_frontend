<template>
    <el-col :span="20" :offset="2">
    <h2>排名</h2>
    <div class='tab'>
      <template v-if='allTableData.length>0'>
      <el-table border style="width: 100%"
      :data='allTableData.slice((currentPage - 1)*pagesize, currentPage*pagesize)'>
        <el-table-column type="index" label="#" align="center" sortable>
        </el-table-column>
        <el-table-column label="队伍名" align="center" prop='username'>
        </el-table-column>
        <el-table-column label="分数" align="center" prop='score'>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change='handleSizeChange'
        @current-change='handleCurrentChange'
        :current-page="currentPage"
        :page-size="pagesize"
        layout='total, prev, pager, next'
        :total="allTableData.length"
        align="center"
      >
      </el-pagination>
      </template>
      <template v-else>
        <span v-if="!loading">Not Available</span>
      </template>
    </div>
    </el-col>
</template>
<style>
  .ranking-container {
    width: 100%;
  }
</style>
<script>
import Team from '@/api/Team'

export default {
  data () {
    return {
      allTableData: [],
      currentPage: 1,
      pagesize: 10,
      loading: false
    }
  },
  created () {
    this.handleUserList()
  },
  methods: {
    handleSizeChange: function (size) {
      this.pagesize = size
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    async handleUserList () {
      let result = await Team.getRanking()
      // console.log('test')
      // console.log(result.data)
      this.allTableData = result.data
    }
  }
}
</script>
