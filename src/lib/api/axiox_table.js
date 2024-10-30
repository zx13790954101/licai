import $ from "jquery";
import axios from "axios";
import LvshouFetch from "./common";

function getData(url){
  
}

export const getAxios = (url, callback) => {
  let en_data = '';
  axios({
      method: "get",
      url:url,
    }).then((res) => {
      callback(res.data.data)
      en_data= res.data.datax
      return res.data.data
    });
}

export default {
  getAxios,
}
