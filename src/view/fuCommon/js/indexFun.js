import {
  bxzt_day,
  yl_day,
  gf_day,
  xny_day,
  xp_day,
  mt_day,
  bj_day,
  bxzt_week,
  zzyh_week,
  gf_week,
  xny_week,
  xp_week,
  jg_week,
  qc_week,
  bj_week,
  yl_week,
  mt_week,
  bj_month,
  yl_month,
  bxzt_month,
  gf_month,
  mt_month,
  xp_month,
  xny_month,
  fdc_day,
  fdc_month,
  fdc_week,
  urlDeal
} from "../../../lib/api/section.js";
import {
  splitData,
  getAjax
} from "../../../lib/api/common.js";
//初始化数据
export const initDataShares = (code, num,all_num) => {
  let d1 = null;
  let slice_num = -849;
  if (all_num){
    slice_num = -all_num
  }
  if (num == 2) {

    d1 = getAjax(dealFundCode2(code + ''));
    slice_num = -220
  } else if (num == 3) {
    d1 = getAjax(dealFundCode3(code + ''));
    //月的时间
    slice_num = -100
  } else {
    d1 = getAjax(dealFundCode(code + ''));
  }
  
  let array_data = splitData(d1, 8);
  let new_array = [];
  let new_item = 0;

  let reverse_data = array_data.slice(slice_num);
  let atr_klines=[];
  //处理全部的数据

  reverse_data.forEach((item, index) => {
    let item1 = parseFloat(item);
    new_item = parseFloat(new_item) + parseFloat(item1);

    new_array.push(
      parseFloat(new_item.toFixed(2))
    ) 
  
  })
  const period = 14; // ATR 的周期，可根据需要调整
   let atr_deal_data = {
     date: splitData(d1, 0).slice(slice_num - period),
     high: splitData(d1, 3).slice(slice_num - period),
     low: splitData(d1, 4).slice(slice_num - period),
     close: splitData(d1, 2).slice(slice_num - period)
   }
   let  log_atr_data=[];
  atr_deal_data.date.forEach((item, index) => {
    // 时间0
    // 开盘1// 收盘2// 最高3 // 最低4// 成交量5 // 成交额6// 震幅7// 涨跌幅8 // 涨跌额9// 换手率10
    //，包含 high（最高价）、low（最低价）、close（收盘价）
    atr_klines.push({
      date: atr_deal_data.date[index],
      high: parseFloat(atr_deal_data.high[index]),
      low: parseFloat(atr_deal_data.low[index]),
      close: parseFloat(atr_deal_data.close[index])
    })
    log_atr_data.push({
        date: atr_deal_data.date[index],
        close: parseFloat(atr_deal_data.close[index])
    })
  })

  // 计算对数收益率
  const logReturns = calculateLogReturns(log_atr_data);

  // 计算波动率
  const volatilityArray = calculateVolatility(logReturns, period);

  // 分离日期和波动率
  const {
    dates1,
    volatilityValues
  } = separateDateAndVolatility(volatilityArray);

  // 输出结果
  console.log("日期数组: ", dates1);
  console.log("波动率值数组: ", volatilityValues);


  // 计算14周期的ATR
  // 计算14周期的ATR数组，并生成两个数组：一个是日期，一个是ATR值

  const ATRArray = calculateATR(atr_klines, period);
  // 定义基础网格间隔（可以根据策略调整）
  const baseGridSize = 10;

  // 定义调整系数 multiplier（用于扩大或缩小波动率对网格间隔的影响）
  const multiplier = 2; // 增加 ATR 对网格间隔的影响

  // 调整网格间隔
  //const adjustedGridSizes = adjustGridSize(ATRArray, baseGridSize, multiplier);
// 动态调整网格间隔
const adjustedGridSizes = adjustGridSize2(volatilityArray, baseGridSize, multiplier);

  // 输出调整后的网格间隔
  console.log("调整后的网格间隔3322：", adjustedGridSizes);
  // 分离日期和 ATR 值
  const {
    dates,
    ATRValues
  } = separateDateAndATR(ATRArray);
  let data2 = {
    name: d1.name,
    inflow: new_array.slice(slice_num),
    num: splitData(d1, 2).slice(slice_num),
    array: reverse_data,
    time: splitData(d1, 0).slice(slice_num),
    all_klines: d1.klines.slice(slice_num),
    klines: splitData(d1, 2).slice(slice_num),
    //网格交易
    atr_klines: volatilityValues,
    adjustedGrid: adjustedGridSizes

  };
  return data2
}
//联系转化为了基金代码
function dealFundCode(code) {
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
      data1 = xny_day
      break;
    case '300750':
      data1 = xny_day
      break;
    case '600048':
      data1 = fdc_day
      break;
    default:
      data1 = urlDeal(code, 1)
      break;
  }
  return data1;
}

//联系转化为了基金代码-一个星期
function dealFundCode2(code) {
  let data1 = null;
  switch (code) {
    case '600519':
      data1 = bj_week
      break;
    case '603259':
      data1 = yl_week
      break;
    case '601318':
      data1 = bxzt_week
      break;
    case '601012':
      data1 = gf_week
      break;
    case '601898':
      data1 = mt_week
      break;
    case '002371':
      data1 = xp_week
      break;
    case '300274':
      data1 = xny_week
      break;
    case '300750':
      data1 = xny_week
      break;
    case '600048':
      data1 = fdc_week
      break;
    default:
      data1 = urlDeal(code, 2)
      break;
  }
  return data1;
}

//联系转化为了基金代码-一个星期
function dealFundCode3(code) {
  let data1 = null;
  switch (code) {
    case '600519':
      data1 = bj_month
      break;
    case '603259':
      data1 = yl_month
      break;
    case '601318':
      data1 = bxzt_month
      break;
    case '601012':
      data1 = gf_month
      break;
    case '601898':
      data1 = mt_month
      break;
    case '002371':
      data1 = xp_month
      break;
    case '300274':
      data1 = xny_month
      break;
    case '300750':
      data1 = xny_month
      break;
    case '600048':
      data1 = fdc_month
      break;
    default:
      data1 = urlDeal(code, 3)
      break;
  }
  return data1;
}

// 计算 True Range (TR)
function calculateTrueRange(data) {
  const TRArray = [];

  for (let i = 1; i < data.length; i++) {
    const currentHigh = data[i].high;
    const currentLow = data[i].low;
    const previousClose = data[i - 1].close;

    const TR = Math.max(
      currentHigh - currentLow,
      Math.abs(currentHigh - previousClose),
      Math.abs(currentLow - previousClose)
    );

    TRArray.push({
      date: data[i].date,
      TR: TR
    });
  }

  return TRArray;
}

// 计算 ATR
function calculateATR(data, period) {
  const TRArray = calculateTrueRange(data);
  const ATRArray = [];

  // 初始 ATR 为前 period 个 TR 的平均值
  let sumTR = 0;
  for (let i = 0; i < period; i++) {
    sumTR += TRArray[i].TR;
  }
  let initialATR = sumTR / period;

  ATRArray.push({
    date: TRArray[period - 1].date,
    ATR: initialATR
  });

  // 计算后续 ATR 值
  for (let i = period; i < TRArray.length; i++) {
    const previousATR = ATRArray[ATRArray.length - 1].ATR;
    const newATR = ((previousATR * (period - 1)) + TRArray[i].TR) / period;
    ATRArray.push({
      date: TRArray[i].date,
      ATR: parseFloat(newATR).toFixed(2)
    });
  }

  return ATRArray;
}

// 将日期和ATR值分别放入两个数组
function separateDateAndATR(ATRArray) {
  const dates = [];
  const ATRValues = [];

  ATRArray.forEach(item => {
    dates.push(item.date);
    ATRValues.push(item.ATR);
  });

  return {
    dates,
    ATRValues
  };
}
// 根据 ATR 调整网格间隔
function adjustGridSize(ATRArray, baseGridSize, multiplier) {
  const adjustedGridSizes = ATRArray.map(item => {
    // 使用 ATR 乘以一个 multiplier 调整网格大小
    const adjustedGridSize = baseGridSize + item.ATR * multiplier;
    return parseFloat(adjustedGridSize).toFixed(2)
    ;
  });

  return adjustedGridSizes;
}


export default {
  initDataShares
}


// 计算对数收益率
function calculateLogReturns(data) {
  const logReturns = [];

  for (let i = 1; i < data.length; i++) {
    const currentClose = data[i].close;
    const previousClose = data[i - 1].close;
    const logReturn = Math.log(currentClose / previousClose); // 计算对数收益率
    logReturns.push({
      date: data[i].date,
      logReturn: logReturn
    });
  }

  return logReturns;
}

// 计算波动率（使用对数收益率的标准差）
function calculateVolatility(logReturns, period) {
  const volatilityArray = [];

  // 对每一个日期，计算该周期内的波动率
  for (let i = period - 1; i < logReturns.length; i++) {
    const returnsSlice = logReturns.slice(i - period + 1, i + 1); // 取周期内的对数收益率
    const mean = returnsSlice.reduce((acc, curr) => acc + curr.logReturn, 0) / period; // 计算平均值

    // 计算标准差
    const variance = returnsSlice.reduce((acc, curr) => acc + Math.pow(curr.logReturn - mean, 2), 0) / period;
    const volatility = Math.sqrt(variance); // 标准差作为波动率

    volatilityArray.push({
      date: logReturns[i].date,
      volatility: volatility
    });
  }

  return volatilityArray;
}

// 将日期和波动率值分别存入两个数组
function separateDateAndVolatility(volatilityArray) {
  const dates = [];
  const volatilityValues = [];

  volatilityArray.forEach(item => {
    dates.push(item.date);
    volatilityValues.push(item.volatility.toFixed(3));
  });

  return {
    dates,
    volatilityValues
  };
}

// 动态调整网格间隔
function adjustGridSize2(volatilityArray, baseGridSize, multiplier = 1) {
  return volatilityArray.map(item => {
    const adjustedGridSize = baseGridSize + item.volatility * multiplier;
    return  adjustedGridSize.toFixed(2)
  });
}