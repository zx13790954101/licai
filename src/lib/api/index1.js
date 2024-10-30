import $ from "jquery";
import axios from "axios";
const api_url = {
  market_url: 'http://quote.eastmoney.com/zhuti/api/fenggeindex'
}



//东方财富的北上资金的
export const getMarketData = (callback) => {
  axios({
    method: "get",
    url: api_url.market_url,
  }).then((res) => {
    callback(res)
    return res
  });

}

export default {
  getMarketData,
}
