/**
 * @desc ajax结果统一处理
 * @author chenweiliang@lvshou.com(Ocean)
 */
// import { Toast } from 'mint-ui'

// 登录失效状态码
const expireCodies = [1011, 1012, 1013, 1014]

//关闭接口的报错的提醒
const resultCallback = (vm, data, warning) => {
  console.log("resultCallback");
  return new Promise((resolve, reject) => {

    if (parseInt(data.code) === 200) {
      var return_data = data['data'];
      return_data.msg = data.msg
      resolve(return_data || true)
    } else if (parseInt(data.code) === 401) {
      // 判断是否登录
      // if (isAppOfAct()) {
      //   if (!urlGet("sess_token")) {
      //     window.location.href = "https://hxsapp_showloginpage";
      //     return;
      //   }
      // } else {
      //   reject(data)
      // }
    } else if (expireCodies.includes(+data.code)) { // 登录信息过期
      // mintToast((data && data.msg && data.msg !== '') ? data.msg : 'API 接口出错!')
      reject(data)
    } else if ([502, 602, 600].includes(+data.code)) {
      reject(data)
    } else {
      if (warning) {
        //   mintToast((data && data.msg && data.msg !== '') ? data.msg : 'API 接口出错!')
      }
      // 使用reject 更好区分返回结果
      reject(data)
    }
  })
}

export default resultCallback
