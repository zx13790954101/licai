import $ from "jquery";
var input, macd;
var calcEMA, calcDIF, calcDEA, calcMACD;
/*
 * 计算DIF快线，用于MACD
 * @param {number} short 快速EMA时间窗口
 * @param {number} long 慢速EMA时间窗口
 * @param {array} data 输入数据
 * @param {string} field 计算字段配置
 */
calcDIF = function (short, long, data, field) {
  var i, l, dif, emaShort, emaLong;
  dif = [];
  emaShort = calcEMA(short, data, field);
  emaLong = calcEMA(long, data, field);
  for (i = 0, l = data.length; i < l; i++) {
    dif.push(emaShort[i] - emaLong[i]);
  }
  return dif;
};
calcDEA = function (mid, dif) {
  return calcEMA(mid, dif);
};
/*
 * K线数据
 * 开盘价，收盘价，最低价，最高价
 */
/*
 * 计算EMA指数平滑移动平均线，用于MACD
 * @param {number} n 时间窗口
 * @param {array} data 输入数据
 * @param {string} field 计算字段配置
 */
calcEMA = function (n, data, field) {
  var i, l, ema, a;
  a = 2 / (n + 1);
  if (field) {
    //二维数组
    ema = [data[0][field]];
    for (i = 1, l = data.length; i < l; i++) {
      ema.push(a * data[i][field] + (1 - a) * ema[i - 1]);
    }
  } else {
    //普通一维数组
    ema = [data[0]];
    for (i = 1, l = data.length; i < l; i++) {
      ema.push(a * data[i] + (1 - a) * ema[i - 1]);
    }
  }
  return ema;
};
/*
* 计算MACD
* @param {number} short 快速EMA时间窗口
* @param {number} long 慢速EMA时间窗口
* @param {number} mid dea时间窗口
* @param {array} data 输入数据
* @param {string} field 计算字段配置
*/
calcMACD = function (short, long, mid, data, field) {
  var i, l, dif, dea, macd, result;
  result = {};
  macd = [];
  dif = calcDIF(short, long, data, field);
  dea = calcDEA(mid, dif);
  for (i = 0, l = data.length; i < l; i++) {
    macd.push((dif[i] - dea[i]) * 2);
  }
  result.dif = dif;
  result.dea = dea;
  result.macd = macd;
  return result;
};
//获取大盘指数
function getMarketData (name, date1, date2) {
  var htmlobj = $.ajax({
    url:
      'https://api.doctorxiong.club/v1/stock/kline/day?code=' +
      name +
      '&startDate=' +
      date1 +
      '&endDate=' +
      date2,
    async: false,
  });

  return JSON.parse(htmlobj.responseText).data
}
function calcMACD(short, long, mid, data, field) {
  var i, l, dif, dea, macd, result;
  result = {};
  macd = [];
  dif = calcDIF(short, long, data, field);
  dea = calcDEA(mid, dif);
  for (i = 0, l = data.length; i < l; i++) {
    macd.push((dif[i] - dea[i]) * 2);
  }
  result.dif = dif;
  result.dea = dea;
  result.macd = macd;
  return result;
};

function dealDataTo (data) {
  let array1 = [];
  data.forEach(item => {

    let item1 = {
      open: item[1],
      close: item[2],
      low: item[3],
      high: item[4],
      date: item[0],
      num: item[5]
    }
    array1.push(item1)
  });
  return array1
}

//数组处理
function splitData (rawData) {
  var datas = [];
  var times = [];
  var vols = [];
  var macds = []; var difs = []; var deas = [];
  for (var i = 0; i < rawData.length; i++) {
    datas.push(rawData[i]);
    times.push(rawData[i].splice(0, 1)[0]);
    vols.push(rawData[i][4]);
    macds.push(rawData[i][6]);
    difs.push(rawData[i][7]);
    deas.push(rawData[i][8]);
  }
  return {
    datas: datas,
    times: times,
    vols: vols,
    macds: macds,
    difs: difs,
    deas: deas
  };
}

function dealEndData (data1, data2) {
  let array1 = [];
  data1.forEach((item, index) => {
    let item1 = [
      item[0],
      parseFloat(item[1]),
      parseFloat(item[2]),
      parseFloat(item[3]),
      parseFloat(item[4]),
      parseFloat(item[5]),
      parseFloat(item[1]) - parseFloat(item[2]) > 0 ? 0 : 1,
      data2.macd[index],
      data2.dif[index],
      data2.dea[index],
    ]
    array1.push(item1)
  });
  return array1
}
export  {
  getMarketData,
  calcMACD,
  dealDataTo,
  splitData,
  dealEndData
}
