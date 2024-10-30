import {
  dealBj,
  dealYl,
  dealBx,
  dealGf,
  dealMt,
  dealXp,
  dealXny,
  dealXnydc,
  dealFdc,
} from "./pointFun.js";
import {
  dealBj2,
  dealYl2,
  dealBx2,
  dealGf2,
  dealMt2,
  dealXp2,
  dealXny2,
} from "./pointFun2.js";

import {
  dealBj3,
  dealYl3,
  dealBx3,
  dealGf3,
  dealMt3,
  dealXp3,
  dealXny3,
} from "./pointFun3.js";
//处理echarts markpoint
//个股的数值，判断的资金数值，时间,成交额
export const setRise = (this_time, deal_data2, code, this_data, d_data, x_data) => {
  let array1 = [];
  let type1 = ["买进", "卖出", "持有", "加仓", "等待"];
  switch (code) {
    case '贵州茅台':
      array1 = dealBj(this_time, deal_data2, this_data, d_data, x_data)
      break;
    case '药明康德':
      array1 = dealYl(this_time, deal_data2, this_data, d_data, x_data)
      break;
    case '中国平安':
      array1 = dealBx(this_time, deal_data2, this_data, d_data, x_data)
      break;
      w
    case '隆基绿能':
      array1 = dealGf(this_time, deal_data2, this_data, d_data, x_data)
      break;
    case '中煤能源':
      array1 = dealMt(this_time, deal_data2, this_data, d_data, x_data)
      break;
    case '北方华创':
      array1 = dealXp(this_time, deal_data2, this_data, d_data, x_data)
      break;
    case '阳光电源':
      array1 = dealXny(this_time, deal_data2, this_data, d_data, x_data)
      break;
    case '宁德时代':
      array1 = dealXnydc(this_time, deal_data2, this_data, d_data, x_data)
      break;
    case '保利发展':
      array1 = dealFdc(this_time, deal_data2, this_data, d_data, x_data)
      break;
    default:
      break;
  }
  //排除个股的数值
  return [{},
    {
      data: array1,
    },
  ];

}
//处理echarts markpoint
//个股的数值，判断的资金数值，时间
//超大单，大单
//code的股票名称
export const setCapital = (deal_data, deal_data2, this_time, this_data, code) => {
  let array1 = [];

  switch (code) {
    case '贵州茅台':
      array1 = dealBj2(deal_data, deal_data2, this_time, this_data)
      break;
    case '药明康德':
      array1 = dealYl2(deal_data, deal_data2, this_time, this_data)
      break;
    case '中国平安':
      array1 = dealBx2(deal_data, deal_data2, this_time, this_data)
      break;
    case '隆基绿能':
      array1 = dealGf2(deal_data, deal_data2, this_time, this_data)
      break;
    case '中煤能源':
      array1 = dealMt2(deal_data, deal_data2, this_time, this_data)
      break;
    case '北方华创':
      array1 = dealXp2(deal_data, deal_data2, this_time, this_data)
      break;
    case '阳光电源':
      array1 = dealXny2(deal_data, deal_data2, this_time, this_data)
      break;
    case '宁德时代':
      array1 = dealXny2(deal_data, deal_data2, this_time, this_data)
      break;
    default:
      break;
  }
  //排除个股的数值
  return [{},
    {
      data: array1,
    },
  ];

}



//处理echarts markpoint
//个股的数值，判断的资金数值，时间
//超大单，大单
//code的股票名称
export const setWlstock = (deal_data, deal_data2, deal_data3, this_time, this_data, code) => {
  let array1 = [];

  switch (code) {
    case '贵州茅台':
      array1 = dealBj3(deal_data, deal_data2, deal_data3, this_time, this_data)
      break;
    case '药明康德':
      array1 = dealYl3(deal_data, deal_data2, deal_data3, this_time, this_data)
      break;
    case '中国平安':
      array1 = dealBx3(deal_data, deal_data2, deal_data3, this_time, this_data)
      break;
    case '隆基绿能':
      array1 = dealGf3(deal_data, deal_data2, deal_data3, this_time, this_data)
      break;
    case '中煤能源':
      array1 = dealMt3(deal_data, deal_data2, deal_data3, this_time, this_data)
      break;
    case '北方华创':
      array1 = dealXp3(deal_data, deal_data2, deal_data3, this_time, this_data)
      break;
    case '阳光电源':
      array1 = dealXny3(deal_data, deal_data2, deal_data3, this_time, this_data)
      break;
    case '宁德时代':
      array1 = dealXny3(deal_data, deal_data2, deal_data3, this_time, this_data)
      break;
    default:
      break;
  }
  //排除个股的数值
  return [{},
    {
      data: array1,
    },
  ];

}




export default {
  setRise,
  setCapital,
  setWlstock
}
