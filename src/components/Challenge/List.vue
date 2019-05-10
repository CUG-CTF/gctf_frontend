<template>
  <el-card v-loading="loading">
    <el-alert :title="'Team Token: ' + teamToken" type="info" show-icon></el-alert>
    <el-tabs v-model="activeTabName" v-if="available">
      <div v-for="(categoryName, index) in categoryNames" :key="index">
        <el-tab-pane :label="categoryName" :name="categoryName">
          <!-- <span v-if="sortedList[categoryName].length === 0">当前无可用题目</span> -->
          <el-collapse :value="activeChallenges">
            <el-collapse-item v-for="challenge in sortedList[categories[categoryName]]" :key="challenge.id" class="challenge-item">
              <template slot="title">
                <span class="challenge-item-title">{{ challenge.description }}</span>
              </template>
              <challenge-view :challenge="challenge"></challenge-view>
            </el-collapse-item>
          </el-collapse>
        </el-tab-pane>
      </div>
    </el-tabs>
    <el-alert
      v-else
      :title="维护中"
      type="error"
      :description="maintenanceDescription"
      :closable="false"
      show-icon
    ></el-alert>
    <!-- <el-dialog title="成功提交的队伍" :visible.sync="solvedTeamsDialogVisible">
      <el-table data="solvedTeams" v-loading="dialogLoading">
        <el-table-column label="队伍名" prop="teamName"></el-table-column>
        <el-table-column label="提交于" prop="solvedAt"></el-table-column>
      </el-table>
    </el-dialog> -->
  </el-card>
</template>
<style>
.level-title {
  font-size: larger;
}
.challenge-item {
  padding-left: 20px;
}
.challenge-item-title {
  padding-left: 1rem;
  font-size: larger;
}
.challenge-solved .challenge-item-title {
  color: #19806a;
  font-size: larger;
}
.challenge-solved > [role="tab"] {
  border: 1px green solid;
}
</style>
<script>
import Challenge from '@/api/Challenge'
import View from '@/components/Challenge/Index.vue'

export default {
  data () {
    return {
      allProblemList: [],
      sortedList: {},
      categories: [],
      activeTabName: '',
      loading: false,
      available: true,
      startTime: undefined,
      endTime: undefined,
      solvedChallenges: [],
      solvedChallengeIds: [],
      activeChallenges: [],
      solvedTeams: [],
      solvedTeamsDialogVisible: false,
      dialogLoading: false
    }
  },
  async mounted () {
    this.loadChallenges()
  },
  components: {
    ChallengeView: View
  },
  computed: {
    categoryNames () {
      return Object.keys(this.categories)
    },
    teamToken () {
      return this.$store.state.user.userToken
    }
  },
  methods: {
    async loadChallenges () {
      this.loading = true
      try {
        let result = await Challenge.getProblemList(this.$store.state.user.userToken, this.$store.state.user.userName)
        let res = result.data
        this.categories = res.categories
        // console.log(this.categories)
        this.allProblemList = res.problem_list
        this.sortProblem(this.categories, this.allProblemList)
        // console.log('loadChallenges')
        // for (let categoryName in this.categories) {
        //   // console.log(categoryName)
        //   console.log(this.sortedList[this.categories[categoryName]])
        //   // for (let levelName in this.sortedList[this.categories[categoryName]].length) {
        //   //   console.log(this.sortedList[this.categories[categoryName]])
        //   // }
        // }
      } catch (e) {
        this.$handleError(e)
      }
      this.loading = false
      // 标记已经完成的题目
      let allChallenges = []
      let solvedChallengeIds = []
      let unsolvedChallenges = []
      for (let key of Object.keys(this.categories)) {
        for (let cKey of Object.keys(this.categories[key])) {
          allChallenges.push(...this.categories[key][cKey])
        }
      }
      for (let challenge of this.solvedChallenges) {
        if (challenge.status === 'correct') {
          solvedChallengeIds.push(challenge.challenge_id)
        }
      }
      solvedChallengeIds = solvedChallengeIds.filter((c, index, self) => {
        // 去重复
        return self.indexOf(c) === index
      })
      this.solvedChallengeIds = solvedChallengeIds
      unsolvedChallenges = allChallenges.filter(c => {
        return !solvedChallengeIds.includes(c.challenge_id)
      })
      let unsolvedChallengeNames = Array.from(unsolvedChallenges, c => {
        return c.title
      })
      this.activeChallenges = unsolvedChallengeNames
    },
    async showSolvedTeams (challengeId) {
      this.solvedTeamsDialogVisible = true
      this.dialogLoading = true
      this.solvedTeams = []
      try {
        this.solvedTeams = await Challenge.getSolvedTeams(challengeId)
      } catch (e) {
        this.$handleError(e)
      }
      this.dialogLoading = false
    },
    sortProblem (categories, allProblem) {
      for (let index = 0; index < categories.length; index++) {
        this.sortedList[categories[index]] = []
      }
      // console.log(this.sortedList)
      for (let index = 0; index < allProblem.length; index++) {
        // console.log(allProblem[index].category)
        this.sortedList[allProblem[index].category].push(allProblem[index])
      }
      // console.log('test')
      // console.log(this.sortedList['pwn'])
      // console.log(this.sortedList)
    }
  }
}
</script>
