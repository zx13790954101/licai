
import $ from "jquery";
import axios from "axios";
const api_url = {
  bzxj_url: "https://datacenter-web.eastmoney.com/api/data/v1/get?reportName=RPT_NORTH_NETBUY&columns=TRADE_DATE,NETBUY,HNETBUY,SNETBUY,DATE_TYPE_CODE,INDEX_PRICE&quoteColumns=&filter=(DATE_TYPE_CODE=%22001%22)&pageNumber=1&pageSize=500&sortTypes=-1&sortColumns=TRADE_DATE&source=WEB&client=WE",
  rzrq_url: "https://datacenter-web.eastmoney.com/api/data/v1/get?reportName=RPTA_RZRQ_LSHJ&columns=ALL&source=WEB&sortColumns=dim_date&sortTypes=-1&pageNumber=1&pageSize=50&filter=&pageNo=1&_=1652497828667",
  gpzh_url: "https://datacenter-web.eastmoney.com/api/data/v1/get?reportName=RPT_STOCK_OPEN_DATA&columns=ALL&pageSize=50&sortColumns=STATISTICS_DATE&sortTypes=-1&source=WEB&client=WEB&_=165250283365",
  zlzj_url: "https://push2.eastmoney.com/api/qt/stock/fflow/kline/get?cb=jQuery112309599494574245497_1652505687339&lmt=0&klt=1&fields1=f1%2Cf2%2Cf3%2Cf7&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61%2Cf62%2Cf63%2Cf64%2Cf65&ut=b2884a393a59ad64002292a3e90d46a5&secid=1.000001&secid2=0.399001&_=1652505687344",
  //白酒url留着东方财富
  baijiu_url: "https://push2.eastmoney.com/api/qt/clist/get?fid=f109&po=1&pz=50&pn=1&np=1&fltt=2&invt=2&ut=b2884a393a59ad64002292a3e90d46a5&fs=b:BK0477&fields=f12,f14,f2,f109,f164,f165,f166,f167,f168,f169,f170,f171,f172,f173,f257,f258,f124,f1,f13",
 //白酒版块资金流的
  baijiu_capital_url: "https://push2his.eastmoney.com/api/qt/stock/fflow/daykline/get?lmt=0&klt=101&fields1=f1,f2,f3,f7&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61,f62,f63,f64,f65&ut=b2884a393a59ad64002292a3e90d46a5&secid=90.BK0477&_=1654048986656",
   
  bszj_url:'https://datacenter-web.eastmoney.com/api/data/v1/get?reportName=RPT_NORTH_NETBUY&columns=TRADE_DATE,NETBUY,HNETBUY,SNETBUY,DATE_TYPE_CODE,INDEX_PRICE&quoteColumns=&filter=(DATE_TYPE_CODE=%22001%22)&pageNumber=1&pageSize=500&sortTypes=-1&sortColumns=TRADE_DATE&source=WEB&client=WEB&_=1654764780551'
}



//东方财富的北上资金的
export const getBxzjData = (callback) => {
  // var htmlobj = $.get({
  //   url:api_url.bzxj_url,
  // },function(result){
  //   console.log("result", result);
  // });
  // console.log("ele", htmlobj);

  axios({
    method: "get",
    url: api_url.bzxj_url,
  }).then((res) => {
    callback(res.data.result.data)
    return  res.data.result.data
  });

}
//股票账户新增
export const getGpzhData = (callback) => {
  // var htmlobj = $.get({
  //   url:api_url.bzxj_url,
  // },function(result){
  //   console.log("result", result);
  // });
  // console.log("ele", htmlobj);

  axios({
    method: "get",
    url: api_url.gpzh_url,
  }).then((res) => {
    callback(res.data.result.data)
    return  res.data.result.data
  });

}
//融资融券交易总量
export const getRzrqData = (callback) => {
  // var htmlobj = $.get({
  //   url:api_url.bzxj_url,
  // },function(result){
  //   console.log("result", result);
  // });
  // console.log("ele", htmlobj);

  axios({
    method: "get",
    url: api_url.rzrq_url,
  }).then((res) => {
    callback(res.data.result.data)
    return  res.data.result.data
  });

}

//https://push2.eastmoney.com/api/qt/clist/get?fid=f164&po=1&pz=50&pn=1&np=1&fltt=2&invt=2&fs=b:BK0477&fields=f12,f14,f2,f109,f164,f165,f166,f167,f168,f169,f170,f171,f172,f173,f257,f258,f124,f1,f13
//白酒版块的数据，来自于东方财富网
export const getBaijiuSection = (callback) => {
  axios({
    method: "get",
    url: api_url.baijiu_url,
  }).then((res) => {

    callback(res.data.data.diff)
    return  res.data.data.diff
  });

}
export const getBaijiuCapitalSection = (callback) => {
  axios({
    method: "get",
    url: api_url.baijiu_capital_url,
  }).then((res) => {

    callback(res.data.data.klines)
    return  res.data.data.diff
  });

}

export const getReportNameBszj = (callback) => {
  axios({
    method: "get",
    url: api_url.bszj_url,
  }).then((res) => {
    console.log(res)
    callback(res.data.result.data)
    return  res.data.result.data
  });

}
export default {
  getBxzjData,
  getRzrqData,
  getGpzhData,
  getBaijiuSection,
  getBaijiuCapitalSection,
  getReportNameBszj
}
