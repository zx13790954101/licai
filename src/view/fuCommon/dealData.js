import {
  getAjax
} from "../../assets/common.js";
//名称导入
import stockName from './json/stock_name.json';
//时间处理
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

//处理个股的大单和中单，买入的情况数据
export const dealBigCapital = (code) => {

  let code_type = 'sh';
  if (code.indexOf("300") != -1) {
    code_type = 'sz'
  } else if (code.indexOf("002") != -1) {
    code_type = 'sz'
  }

  let sina_num = 362;
  if (
    parseInt(new Date().getHours()) >= 9 &&
    parseInt(new Date().getHours()) <= 15
  ) {
    sina_num = 361

  }
  let url_sina =
    "http://vip.stock.finance.sina.com.cn/quotes_service/api/json_v2.php/MoneyFlow.ssl_qsfx_lscjfb?page=1&num=" +
    sina_num + "&sort=opendate&asc=0&daima=" +
    code_type +
    code;
  //设置新浪的资金列表


  let url_sina_this =
    "http://vip.stock.finance.sina.com.cn/quotes_service/api/json_v2.php/MoneyFlow.ssi_ssfx_flzjtj?daima=" +
    code_type + code
  let url_wlstock = (num1) => {
    return "https://www.wlstock.com/ajaxRequrst/StockFundFlowAjax.ashx?act=3&stockNo=" +
      code +
      "&pageIndex=" +
      num1;
  }
  let end_wlstock_data = [];
  //20*5   =100 条
  for (let index = 1; index < 25; index++) {
    let item = JSON.parse(getAjax(url_wlstock(index)).responseText).datas;
    end_wlstock_data = end_wlstock_data.concat(item)
  }


  let each_data = getAjax(url_sina).responseJSON;
  each_data = each_data.reverse()




  let array1_sina = [{
      name: "股票名字",
      num: [],
      time: [],
    },
    // {
    //   name: "超大单",
    //   num: [],
    //   time: [],
    //   type_echarts: "bar",
    //   itemStyle: 2,
    // },
    {
      name: "大单",
      num: [],
      time: [],
      type_echarts: "bar",
      itemStyle: 2,
    },
    {
      name: "小单",
      num: [],
      time: [],
      // type_echarts: "bar",
      // itemStyle: 2,
    },
    // {
    //   name: "散单",
    //   num: [],
    //   time: [],
    // },


  ];


  each_data.forEach((item, index) => {
    array1_sina[0].num.push(parseFloat(item.trade));
    // array1_sina[1].num.push((item.r0_net / 10000).toFixed(2));
    array1_sina[1].num.push(parseFloat((item.r1_net / 10000).toFixed(2)));
    array1_sina[2].num.push(parseFloat((item.r2_net / 10000).toFixed(2)));
    // array1_sina[4].num.push(parseFloat(item.r3_net).toFixed(2));
    array1_sina[0].time.push(item.opendate);
    array1_sina[1].time.push(item.opendate);
    array1_sina[2].time.push(item.opendate);
    // array1_sina[3].time.push(item.opendate);
    // array1_sina[4].time.push(item.opendate);
  });



  let this_sina_data = null
  //判断是不是
  if (
    parseInt(new Date().getHours()) >= 9 &&
    parseInt(new Date().getHours()) <= 15
  ) {

    this_sina_data = getAjax(url_sina_this).responseJSON

    this_sina_data = [
      this_sina_data.trade,
      ((this_sina_data.r0_in - this_sina_data.r0_out) / 10000).toFixed(2),
      ((this_sina_data.r1_in - this_sina_data.r1_out) / 10000).toFixed(2),
      ((this_sina_data.r2_in - this_sina_data.r2_out) / 10000).toFixed(2),
      ((this_sina_data.r3_in - this_sina_data.r3_out) / 10000).toFixed(2),
      dateFormat("YYYY-mm-dd", new Date())
    ]

    array1_sina[0].num.push(parseFloat(this_sina_data[0]));
    array1_sina[1].num.push(parseFloat(this_sina_data[2]));
    array1_sina[2].num.push(parseFloat(this_sina_data[3]));
    // array1_sina[3].num.push(this_sina_data[3]);
    // array1_sina[4].num.push(this_sina_data[4]);
    array1_sina[0].time.push(this_sina_data[5]);

  }

  //显示全部的数据
  //历史流向
  let array1_wlstock = [{
      name: "今日涨跌幅",
      num: [],
      time: [],
    },
    // {
    //   name: "超级机构",
    //   num: [],
    //   time: [],
    //   type_echarts: "bar",
    //   itemStyle: 2,
    // },
    {
      name: "机构",
      num: [],
      time: [],
      type_echarts: "bar",
      itemStyle: 2,
    },
    // {
    //   name: "大户",
    //   num: [],
    //   time: [],
    //   type_echarts: "bar",
    //   itemStyle: 2,
    // },
    {
      name: "中户",
      num: [],
      time: [],
      // type_echarts: "bar",
      // itemStyle: 2,
    },
    {
      name: "散户",
      num: [],
      time: [],
    },
  ]
  end_wlstock_data = end_wlstock_data.reverse()
  end_wlstock_data.forEach((item, index) => {
    array1_wlstock[0].num.push(item.NewPrice);
    // array1_wlstock[1].num.push(((item.AmountBuyCjjg - item.AmountSellCjjg) / 100000000).toFixed(2));
    array1_wlstock[1].num.push(((item.AmountBuyJg - item.AmountSellJg) / 100000000).toFixed(2));
    // array1_wlstock[3].num.push(((item.AmountBuyDh - item.AmountSellDh) / 100000000).toFixed(2));
    array1_wlstock[2].num.push(((item.AmountBuyZh - item.AmountSellZh) / 100000000).toFixed(2));
    array1_wlstock[3].num.push(((item.AmountBuySh - item.AmountSellSh) / 100000).toFixed(2));
    array1_wlstock[0].time.push(item.UpdateTime.slice(0, 10));
    array1_wlstock[1].time.push(item.UpdateTime.slice(0, 10));
    array1_wlstock[2].time.push(item.UpdateTime.slice(0, 10));
    array1_wlstock[3].time.push(item.UpdateTime.slice(0, 10));
    // array1_wlstock[4].time.push(item.UpdateTime.slice(0, 10));
    // array1_wlstock[5].time.push(item.UpdateTime.slice(0, 10));
  })

  return {
    sina_data: array1_sina,
    array1_wlstock: array1_wlstock
  };
}



//处理时间
export const dealTime = (data, time) => {
  let data1 = [];
  let time1 = [];
  var index1 = 0;
  for (let i = 1; i < 13; i++) {
    let num1 = i < 10 ? "-0" + i : "-" + i;
    let time_item =
      time[index1] == undefined ? "" : time[index1].slice(4, 7) + "";

    if (time_item == num1) {
      data1.push(data[index1]);
      index1 = index1 + 1;
    } else {
      data1.push("--");
    }
  }
  return data1;
}


//https://danjuanfunds.com/djapi/fund/growth/161725?day=3y
//https://fundgz.1234567.com.cn/js/161725.js

let fund_url_day = (code) => {
  return "https://fundgz.1234567.com.cn/js/" +
    code +
    ".js"
}

let fund_url_month = (code) => {
  return "https://danjuanfunds.com/djapi/fund/growth/" +
    code +
    "?day=3y"
}


//联系转化为了基金代码
export const dealFundCode = (name) => {
  let data1 = null;
  switch (code) {
    case '贵州茅台':
      data1 = dealBj3(deal_data, deal_data2, deal_data3, this_time, this_data)
      break;
    case '药明康德':
      data1 = dealYl3(deal_data, deal_data2, deal_data3, this_time, this_data)
      break;
    case '中国平安':
      data1 = dealBx3(deal_data, deal_data2, deal_data3, this_time, this_data)
      break;
    case '隆基绿能':
      data1 = dealGf3(deal_data, deal_data2, deal_data3, this_time, this_data)
      break;
    case '中煤能源':
      data1 = dealMt3(deal_data, deal_data2, deal_data3, this_time, this_data)
      break;
    case '北方华创':
      data1 = dealXp3(deal_data, deal_data2, deal_data3, this_time, this_data)
      break;
    case '阳光电源':
      data1 = dealXny3(deal_data, deal_data2, deal_data3, this_time, this_data)
      break;
    default:
      break;
  }
  return data1;
}



export default {
  dealBigCapital,
  dealTime
}
