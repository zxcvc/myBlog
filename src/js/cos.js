import COS from 'cos-js-sdk-v5'
import axios from 'axios'
// axios.defaults.baseURL = '/blog'
async function get_cos() {
  let ret = await axios.get('/api/sts')
  let reconginize = ret.data
  return new COS({
    getAuthorization: (options, callback) => {
      let {
        tmpSecretId,
        tmpSecretKey,
        sessionToken
      } = reconginize.credentials
      let ExpiredTime = reconginize.expiredTime
      callback({
        TmpSecretId: tmpSecretId,
        TmpSecretKey: tmpSecretKey,
        XCosSecurityToken: sessionToken,
        ExpiredTime: ExpiredTime
      })
    }
  })
}
const BUCKET = 'cc-1259403476'
const REGION = 'ap-chengdu'
let cos_promise = get_cos()
export {
    cos_promise,
    BUCKET,
    REGION
}
