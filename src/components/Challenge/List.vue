<template>
  <el-card v-loading="loading">
    <el-alert :title="'Team Token: ' + teamToken" type="info" show-icon></el-alert>
    <el-tabs v-model="activeTabName" v-if="available">
      <div v-for="(categoryName, index) in categoryNames" :key="index">
        <el-tab-pane :label="categoryName" :name="categoryName">
          <span v-if="Object.keys(categories[categoryName]).length === 0">当前无可用题目</span>
          <el-collapse>
            <el-collapse-item
              v-for="levelName in Object.keys(categories[categoryName])"
              class="challenge-container"
              :key="categoryName + levelName"
              :name="categoryName + levelName"
            >
              <template slot="title">
                <span class="level-title">Level - {{ levelName }}</span>
              </template>
              <el-collapse :value="activeChallenges">
                <el-collapse-item
                  v-for="challenge in categories[categoryName][levelName]"
                  :key="challenge.challenge_id"
                  class="challenge-item"
                  :class="{'challenge-solved': solvedChallengeIds.includes(challenge.challenge_id)}"
                  :name="challenge.title"
                >
                  <template slot="title">
                    <span class="challenge-item-title">{{ challenge.title }}</span>
                    <template v-if="solvedChallengeIds.includes(challenge.challenge_id)">['已解决']</template>
                  </template>
                  <challenge-view
                    :challenge="challenge"
                    :placeholders="placeholders"
                    @show="showSolvedTeams"
                  ></challenge-view>
                </el-collapse-item>
              </el-collapse>
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
    <el-dialog title="成功提交的队伍" :visible.sync="solvedTeamsDialogVisible">
      <el-table data="solvedTeams" v-loading="dialogLoading">
        <el-table-column label="队伍名" prop="teamName"></el-table-column>
        <el-table-column label="提交于" prop="solvedAt"></el-table-column>
      </el-table>
    </el-dialog>
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
        let result = await Challenge.getValidChallenges(this.$store.state.user.userToken, this.$store.state.user.userName)
        console.log(result)
      } catch (e) {
        if (e.code === 'under_maintenance') {
          this.available = false
          this.startTime = new Date(e.originalMessage[0])
          this.endTime = new Date(e.originalMessage[1])
        } else {
          this.$handleError(e)
        }
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
    }
  }
}
</script>
