
import $ from "jquery";
import axios from "axios";
const api_url = {
  msg_url:'https://api.xuangubao.cn/api/pc/bkjMsgs/16961441?TailMark=0&limit=20'
}



//东方财富的北上资金的
export const getXGBmsgData = (callback) => {
  axios({
    method: "get",
    url: api_url.msg_url,
  }).then((res) => {
    callback(res)
    return  res
  });

}

export default {
  getXGBmsgData,
}
