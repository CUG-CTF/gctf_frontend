let install = (Vue, options) => {
  Vue.prototype.$handleError = e => {
    if (e.message) {
      Vue.prototype.$message({
        showClose: true,
        type: 'error',
        message: e.message
      })
    }
    if (e.redirect) {
      options.router.push({
        name: e.redirect
      })
    }
    if (e.action === 'logout') {
      options.store.commit('logout')
    }
  }
}
export default install
