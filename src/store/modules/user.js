const state = {
  userName: '',
  userId: '',
  isLogin: false,
  userToken: '',
  score: 0
}

const getters = {}
const actions = {}
const mutations = {
  setuserName: (state, payload) => {
    state.userName = payload
  },
  setuserId: (state, payload) => {
    state.userId = payload
  },
  setToken: (state, payload) => {
    state.userToken = payload
  },
  setScore: (state, payload) => {
    state.score = payload
  },
  enterAdminMode: state => {
    state.isAdmin = true
  },
  login: state => {
    state.isLogin = true
  },
  logout: state => {
    state.isLogin = false
    state.userName = ''
    state.userToken = ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
