import {
  calculateMA
} from './dealKline.js'


export const urlDeal12 = (url) => {
  return 'https://datacenter-web.eastmoney.com/api/data/v1/get?reportName=RPT_DMSK_TS_STOCKEVALUATE&filter=(SECURITY_CODE="' +
    url + '")&columns=ALL&source=WEB&client=WEB&sortColumns=TRADE_DATE&sortTypes=-1'
}
export const urlDeal11 = (url) => {
  return 'https://www.iwencai.com/diag/block-detail?pid=11665&codes=' + url +
    '&codeType=stock&info={"view":{"nolazy":1,"parseArr":{"_v":"new","dateRange":[],"staying":[],"queryCompare":[],"comparesOfIndex":[]},"asyncParams":{"tid":137}}}'
}

export const urlDeal9 = (url) => {
  return "https://data.eastmoney.com/stockcomment/api/" + url + ".json";
}
export const urlDeal8 = (url) => {
  return "https://datacenter-web.eastmoney.com/api/data/v1/get?filter=(SECURITY_CODE%3D%22601318%22)&columns=ALL&source=WEB&client=WEB&reportName=RPT_CUSTOM_STOCK_PK";
}
//首页用到了
export const urlDeal7 = (url) => {
  let num1 = url.indexOf("002") != -1 ? 0 : (url.indexOf("300") != -1 ? 0 : (url.indexOf("000") != -1 ? 0 : 1));
  if (url.indexOf("600") != -1) {
    num1 = 1
  }
  return (
    "https://push2.eastmoney.com/api/qt/stock/fflow/kline/get?lmt=0&klt=1&fields1=f1,f2,f3,f7&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61,f62,f63,f64,f65&secid=" +
    num1 +
    "." +
    url
  );
}
//首页用到了
export const urlDeal6 = (url, num2,type) => {
  let num1 = url.indexOf("002") != -1 ? 0 : (url.indexOf("300") != -1 ? 0 : (url.indexOf("000") != -1 ? 0 : 1));
  if (url.indexOf("600") != -1) {
    num1 = 1
  }
  if (url.indexOf("00000") != -1) { 
    num1 = 1
  }
 
  if (url.indexOf("0000") != -1) {
    num1 = 1
   }
  let url1 =(
    "https://push2his.eastmoney.com/api/qt/stock/fflow/daykline/get?lmt=0&klt=" +
    num2 +
    "&fields1=f1,f2,f3,f7&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61,f62,f63,f64,f65&secid=" +
    num1 +
    "." +
    url
  )
  //console.log("url1", url1);
  if (type) {
    url1='https://push2.eastmoney.com/api/qt/ulist.np/get?fltt=2&secids=' +num1 +
    "." +
    url+'&fields=f61,f62,f184,f66,f69,f72,f75,f78,f81,f84,f87,f64,f65,f70,f71,f76,f77,f82,f83,f164,f166,f168,f170,f172,f252,f253,f254,f255,f256,f124,f6,f278,f279,f280,f281,f282'
  }

  return url1;
}
export const urlDeal5 = (url) => {
  let url1 =
    "https://www.iwencai.com/diag/block-detail?pid=8093&codes=" +
    url +
    '&codeType=stock&info={"view":{"nolazy":1,"parseArr":{"_v":"new","dateRange":[],"staying":[],"queryCompare":[],"comparesOfIndex":[]},"asyncParams":{"tid":137}}}';
  return url1;
}
export const urlDeal4 = (url) => {
  return (
    "https://data.eastmoney.com/stockcomment/stock/" + url + ".html#zlkp"
  );
}
export const urlDeal3 = (url) => {
  return (
    "https://www.iwencai.com/stockpick/search?typed=1&preParams=&ts=1&f=1&qs=index_rewrite&selfsectsn=&querytype=stock&searchfilter=&tid=stockpick&w=" +
    url
  );
}
export const urlDeal2 = (url) => {
  let url1 =
    "https://www.iwencai.com/diag/block-detail?pid=10331&codes=" +
    url +
    '&codeType=stock&info={"view":{"nolazy":1,"parseArr":{"_v":"new","dateRange":[],"staying":[],"queryCompare":[],"comparesOfIndex":[]},"asyncParams":{"tid":137}}}';
  return url1;
}

//1是天数，2是周数，3是月
//涨跌幅，数值
export const urlDeal = (url, type, num2) => {
  let num1 = url.indexOf("002") != -1 ? 0 : (url.indexOf("300") != -1 ? 0 : (url.indexOf("000") != -1 ? 0 : 1));


  if (url.indexOf("600") != -1) {
    num1 = 1
  }

  let num3 = parseInt(type) == 1 ? 362 : 145;
  return (
    "https://push2his.eastmoney.com/api/qt/stock/kline/get?secid=" +
    num1 +
    "." +
    url +
    "&fields1=f1,f2,f3,f4,f5&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&lmt=" + num3 + "&klt=10" +
    type +
    "&fqt=1&end=30000101"
  );
}
//上证指数
export const urlDeal10 = (url) => {
  return "https://push2his.eastmoney.com/api/qt/stock/kline/get?secid=1.000001&fields1=f1,f2,f3,f4,f5&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&lmt=100&klt=101&fqt=1&end=30000101"
}

import {
  bxzt_day,
  yl_day,
  gf_day,
  xny_day,
  xnyc_day,
  xp_day,
  mt_day,
  bj_day,
  fdc_day
} from "./../../lib/api/section.js";
//联系转化为了基金代码
export const dealFundCode = (code) => {
  let data1 = null;
  switch (code) {
    case '600519':
      data1 = bj_day
      break;
    case '603259':
      data1 = yl_day
      break;
    case '601318':
      data1 = bxzt_day
      break;
    case '601012':
      data1 = gf_day
      break;
    case '601898':
      data1 = mt_day
      break;
    case '002371':
      data1 = xp_day
      break;
    case '300274':
      data1 = xnyc_day
      break;
    case '300750':
      data1 = xny_day
      break;
    case '600048':
      data1 = fdc_day
      break;
    default:
      break;
  }
  return data1;
}
export const switchUrlDeal = (type, url, type1) => {
  if (url == "") {
    return ""
  }
  let url1 = ""
  switch (type) {
    case 1:
      url1 = urlDeal(url, type1)
      break;
    case 2:
      url1 = urlDeal2(url)
      break;
    case 3:
      url1 = urlDeal3(url)
      break;
    case 4:
      url1 = urlDeal4(url)
      break;
    case 5:
      url1 = urlDeal5(url)
      break;
    case 6:
      url1 = urlDeal6(url, type1)
      break;
    case 7:
      url1 = urlDeal7(url)
      break;
    case 8:
      url1 = urlDeal8(url)
      break;
    case 9:
      url1 = urlDeal9(url)
      break;
    case 10:
      url1 = urlDeal10(url)
      break;
  }
  return url1;

}
export const btn_array2 = [{
    name: "中国平安",
    tip: "保险主题",
    num: "601318",
  },

  {
    name: "隆基绿能",
    tip: "光伏",
    num: "601012",
  },
  {
    name: "中煤能源",
    tip: "煤炭",
    num: "601898",
  },
  {
    name: "贵州茅台",
    tip: "白酒",
    num: "600519",
  },
  {
    name: "药明康德",
    tip: "医疗",
    num: "603259",
  },
  {
    name: "北方华创",
    tip: "芯片",
    num: "002371",
  },
  {
    name: "阳光电源",
    tip: "新能源",
    num: "300274",
  }, {
    name: "宁德时代",
    tip: "电池",
    num: "300750",
  }, {
    name: "保利发展",
    tip: "房地产",
    num: "600048",
  }
]







function dateFormat(fmt, date) {
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }
  return fmt;
}
//设置截取的数字
export var num2 = 362
export const dealData = (data2, type, name, num, type2, num3) => {
  let that = this;
  let array2 = [];
  let time1 = [];
  let num1 = [];
  num2 = data2.length + 1
  data2.forEach((element2, index2) => {

    if (type == 1) {
      array2.push(parseFloat(element2[6].toFixed(2)));
      time1.push(
        dateFormat("YYYY-mm-dd", new Date(element2[9] * 1000))
      );
      num1.push(parseFloat(element2[1]));
    } else if (type == 2) {
      array2.push(parseFloat(element2.split(",")[8]));
      time1.push(element2.split(",")[0]);

      if (num == 6) {
        num1.push(parseFloat(
          (parseInt(element2.split(",")[num]) / 100000000).toFixed(2)));
      } else {
        num1.push(parseFloat(element2.split(",")[num]));
      }
    } else if (type == 3) {
      array2.push(index2 + 1);
      time1.push(
        dateFormat("YYYY-mm-dd", new Date(element2[9] * 1000))
      );
      num1.push(parseFloat(element2[1]));
    }else if (type == 4) {
      num1.push(parseFloat(
        (parseInt(element2.split(",")[num]) / 100000000).toFixed(2)));
    }else if (type == 5) {
      num1.push(parseFloat(element2.split(",")[num]));
    }

  });


  let object1 = {
    name: name,
    num: num1,
    time: time1,
    array: array2,
    type_echarts: type2 == undefined ? undefined : 'bar',
    itemStyle: num3 == undefined ? undefined : 2,
  };
  return object1;
}

function dealReduce(max_data_num, start_time, end_time) {


  let max_data_array = max_data_num.slice(start_time + 1, end_time + 1);
  let reduce_max_datat = max_data_array.reduce(function (num1, num2) {
    return parseFloat(num1) + parseFloat(num2);
  });
  reduce_max_datat = (reduce_max_datat / max_data_array.length).toFixed(2);
  return reduce_max_datat;
}

function moreArray(data) {
  let array1 = []
  for (let i = 0; i < 20; i++) {
    array1.push(data);

  }
  return array1;
}

function dealDateData(max_data_num, min_data_num, this_data_num, start_time, end_time, length1) {

  let array1 = []
  let array2 = [];
  let array3 = [];
  let zsw_array = [];
  let zcw_array = [];
  let max_num1 = [];
  let min_num1 = [];
  let zcw3 = [];

  let start_time1 = start_time;
  let end_time1 = end_time

  for (let i = 0; i < length1 - 20; i++) {

    end_time1 = end_time - i
    start_time1 = start_time - i

    let max_data_array = dealReduce(max_data_num, start_time1, end_time1);
    let min_data_array = dealReduce(min_data_num, start_time1, end_time1);
    let this_data_array = dealReduce(
      this_data_num,
      start_time1,
      end_time1
    );
    array1.push(max_data_array)
    array2.push(min_data_array)
    array3.push(this_data_array)
    zsw_array.push(parseFloat(max_data_array * 0.95).toFixed(2))
    zcw_array.push(parseFloat(
      (max_data_array - min_data_array) *
      0.618 +
      parseFloat(min_data_array)
    ).toFixed(2))


    let max_item1 = Math.max(...max_data_num.slice(end_time1 - 20, end_time1));

    max_item1 = max_item1 == -Infinity ? parseFloat(max_num1.slice(-1)[0]).toFixed(2) : max_item1

    let min_item1 = Math.min(...min_data_num.slice(end_time1 - 20, end_time1));
    min_item1 = min_item1 == Infinity ? parseFloat(min_num1.slice(-1)[0]) : min_item1



    max_num1.push(
      max_item1
    )
    min_num1.push(
      min_item1
    )
    zcw3.push(
      (max_item1 - min_item1) * 0.618 + min_item1
    )
  }


  return {
    max_array: array1,
    min_array: array2,
    this_array: array3,
    zcw3: zcw3.concat(moreArray(zcw3[zcw3.length - 1])),
    zsw_array: zsw_array.concat(moreArray(zsw_array[zsw_array.length - 1])),
    zcw_array: zcw_array.concat(moreArray(zcw_array[zcw_array.length - 1])),
    max_num1: max_num1.concat(moreArray(max_num1[max_num1.length - 1])),
    min_num1: min_num1.concat(moreArray(min_num1[min_num1.length - 1]))
  }

}
//计算止损位
export const calculateStopLoss2 = (array_all, data1, data2, input_name6, time1) => {

  let that = this;
  let ma5 = calculateMA(5, array_all[0].klines);
  let ma10 = calculateMA(10, array_all[0].klines);
  let ma20 = calculateMA(20, array_all[0].klines);
  let ma30 = calculateMA(30, array_all[0].klines);
  let ma60 = calculateMA(60, array_all[0].klines);
  let max_data_num = dealData(data1, 2, "最高值", 3).num;
  let min_data_num = dealData(data1, 2, "最低值", 4).num;
  //当前值数组
  let this_data_num = dealData(data1, 2, "当前值", 2).num;
  let this_data = time1;

  let end_time =
    input_name6 == "" ? this_data[this_data.length - 1] : input_name6;




  //设置最近20个交易日的的最小值
  let start_time = this_data[this_data.indexOf(end_time) - 20];
  //循环计算开始和结束的时间
  start_time = this_data.indexOf(start_time) + 1;
  end_time = this_data.indexOf(end_time) + 1;

  let max_data_array = dealReduce(max_data_num, start_time, end_time);
  let min_data_array = dealReduce(min_data_num, start_time, end_time);
  let this_data_array = dealReduce(
    this_data_num,
    start_time,
    end_time
  );

  let deal_data2 = dealDateData(max_data_num, min_data_num, this_data_num, start_time, end_time, this_data.length)



  //计算大小

  return {
    this_data,
    max_data_array,
    min_data_array,
    this_data_array,
    ma5,
    ma10,
    ma20,
    ma30,
    ma60,
    this_data_num,
    max_data_num,
    min_data_num,
    array_data: [
      ma5[ma5.length - 1],
      ma10[ma10.length - 1],
      ma20[ma20.length - 1],
      ma30[ma30.length - 1],
      ma60[ma60.length - 1],
      //选择日期的当前值
      this_data_num[this_data_num.length - 1],
    ],
    array_end: data1,
    deal_data2: deal_data2,
  };
}





export default {
  calculateStopLoss2,
  btn_array2,
  dealFundCode,
  dealData,
  switchUrlDeal,
  urlDeal9,
  urlDeal8,
  urlDeal7,
  urlDeal6,
  urlDeal5,
  urlDeal4,
  urlDeal3,
  urlDeal2,
  urlDeal
}
