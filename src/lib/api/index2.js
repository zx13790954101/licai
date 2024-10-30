import $ from "jquery";
import axios from "axios";
const api_url = {
  emotion_options_URL: 'https://x-quote.cls.cn/quote/stock/emotion_options?app=CailianpressWeb&fields=up_performance&os=web&sv=7.7.5'
}



//财联社
export const getEmotionOptions = (callback) => {
  axios({
    method: "get",
    url: api_url.emotion_options_URL,
  }).then((res) => {
    callback(res)
    return res
  });

}

export default {
  getEmotionOptions,
}
