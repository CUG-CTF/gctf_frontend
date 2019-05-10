import Model from './model'

class User extends Model {
  /**
   * 登陆
   * @param username
   * @param password
   * @returns {Promise}
   */
  login (username, password) {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await this.request('POST', '/login', {
          username: username,
          password: password
        })
        resolve(result)
      } catch (e) {
        reject(e)
      }
    })
  }

  /**
   * 登出
   * @returns {Promise}
   */
  logout (token, username) {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await this.request('POST', '/user/logout', {
          token: token,
          username: username
        }, {
          needAuth: true
        })
        resolve(result)
      } catch (e) {
        reject(e)
      }
    })
  }

  /**
   * 注册
   * @param username
   * @param email
   * @param password
   * @returns {Promise}
   */
  register (username, email, password) {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await this.request('POST', '/register', {
          username: username,
          password: password,
          email: email
        })
        resolve(result)
      } catch (e) {
        reject(e)
      }
    })
  }

  /**
   * 获取用户信息
   * @returns {Promise}
   */
  getUserInfo (username, token) {
    return new Promise(async (resolve, reject) => {
      try {
        let result = await this.request('POST', '/user/userinfo', {
          token: token,
          username: username
        })
        // console.log(result)
        resolve(result)
      } catch (e) {
        reject(e)
      }
    })
  }

  /**
   * 获得排行
   * @returns {Promise}
   */
  getRanking () {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.request('GET', '/get_users_rank', {}))
      } catch (e) {
        reject(e)
      }
    })
  }

  /**
   * 获得用户信息（多选）
   * @param teamId
   * @returns {Promise}
   */
  select (teamId) {
    return new Promise(async (resolve, reject) => {
      try {
        resolve(await this.request('GET', '/select', {
          teamId: teamId
        }))
      } catch (e) {
        reject(e)
      }
    })
  }
}

export default new User()
