import Model from './model'

class Bulletin extends Model {
  /**
   * 获得所有公告
   * @returns {Promise}
   */
  getAllBulletins () {
    return new Promise(async (resolve, reject) => {
      try {
        let bulletins = await this.request('GET', '/Notification/list')
        resolve(bulletins)
      } catch (e) {
        reject(e)
      }
    })
  }
}
export default new Bulletin()
