<template>
  <div id="app">
    <el-menu default-active="/" class="top-nav" mode="horizontal" :router=true>
      <el-menu-item index="/">
        GCTF
      </el-menu-item>
      <el-menu-item index="/challenge/list">
        Challenge列表
      </el-menu-item>
      <template v-if="inited">
        <template v-if="isLogin">
          <el-menu-item index="/user/logout" class="float-right">
            登出
          </el-menu-item>
          <template v-if="isAdmin">
            <el-menu-item index="/admin/index" class="float-right">
              管理后台
            </el-menu-item>
          </template>
          <el-menu-item index="/user/index" class="float-right">
            {{ teamName }}
          </el-menu-item>
        </template>
        <template v-else>
          <el-menu-item index="/user/register" class="float-right">
            注册
          </el-menu-item>
          <el-menu-item index="/user/login" class="float-right">
            登录
          </el-menu-item>
        </template>
      </template>
      <template v-else></template>
    </el-menu>
    <div class="main-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Auth from '@/util/auth'
import Team from '@/api/Team'

export default {
  name: 'gctf',
  data () {
    return {
      inited: false
    }
  },
  computed: {
    teamName () {
      return this.$store.state.user.userName
    },
    isLogin () {
      return this.$store.state.user.isLogin
    },
    isAdmin () {
      return this.$store.state.user.isAdmin
    }
  },
  async mounted () {
    // 读取配置信息
    // 不应阻塞
    if (!Auth.isLogin()) {
      this.inited = true
    } else {
      try {
        let result = await Team.getuserInfo()
        if (result.admin) {
          this.$store.commit('enterAdminMode')
        }
        this.$store.commit('setuserName', result.username)
        this.$store.commit('login')
        this.inited = true
      } catch (e) {
        this.inited = true
      }
    }
  }
}
</script>

<style scoped>
  .float-right {
    float: right !important;
  }

  .el-menu {
    margin: 0 auto 1rem auto;
    box-shadow: #aaa 1px 1px 1px 0px;
  }
</style>
