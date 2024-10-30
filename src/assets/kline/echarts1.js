//数据模型 time0 open1 close2 min3 max4 vol5 tag6 macd7 dif8 dea9
//  日期        五日线
//现在还要计算  柱子的颜色，和    macd  dif  dea
//['2015-10-19',18.56,18.25,18.19,18.56,55.00,0,-0.00,0.08,0.09]
//数据的模拟

import $ from "jquery";
var data = splitData([  ['2015-10-16', 18.4, 18.58, 18.33, 18.79, 67.00, 1, 0.04, 0.11, 0.09]]);


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
//处理数据而
function splitData2 (rawData) {
  const categoryData = [];
  const values = [];
  for (var i = 0; i < rawData.length; i++) {
    categoryData.push(rawData[i].splice(0, 1)[0]);
    values.push(rawData[i]);
  }
  return {
    categoryData: categoryData,
    values: values,
  };
}
//分段计算
function fenduans () {
  var markLineData = [];
  var idx = 0; var tag = 0; var vols = 0;
  for (var i = 0; i < data.times.length; i++) {
    //初始化数据
    if (data.datas[i][5] != 0 && tag == 0) {
      idx = i; vols = data.datas[i][4]; tag = 1;
    }
    if (tag == 1) { vols += data.datas[i][4]; }
    if (data.datas[i][5] != 0 && tag == 1) {
      markLineData.push([{
        xAxis: idx,
        yAxis: data.datas[idx][1] > data.datas[idx][0] ? (data.datas[idx][3]).toFixed(2) : (data.datas[idx][2]).toFixed(2),
        value: vols
      }, {
        xAxis: i,
        yAxis: data.datas[i][1] > data.datas[i][0] ? (data.datas[i][3]).toFixed(2) : (data.datas[i][2]).toFixed(2)
      }]);
      idx = i; vols = data.datas[i][4]; tag = 2;
    }

    //更替数据
    if (tag == 2) { vols += data.datas[i][4]; }
    if (data.datas[i][5] != 0 && tag == 2) {
      markLineData.push([{
        xAxis: idx,
        yAxis: data.datas[idx][1] > data.datas[idx][0] ? (data.datas[idx][3]).toFixed(2) : (data.datas[idx][2]).toFixed(2),
        value: (vols / (i - idx + 1)).toFixed(2) + ' M'
      }, {
        xAxis: i,
        yAxis: data.datas[i][1] > data.datas[i][0] ? (data.datas[i][3]).toFixed(2) : (data.datas[i][2]).toFixed(2)
      }]);
      idx = i; vols = data.datas[i][4];
    }
  }
  return markLineData;
}

//MA计算公式
function calculateMA (dayCount) {
  var result = [];
  for (var i = 0, len = data.times.length; i < len; i++) {
    if (i < dayCount) {
      result.push('-');
      continue;
    }
    var sum = 0;
    for (var j = 0; j < dayCount; j++) {
      sum += data.datas[i - j][1];
    }
    result.push((sum / dayCount).toFixed(2));
  }
  return result;
}


var input, macd;
var calcEMA, calcDIF, calcDEA, calcMACD;
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

/*
* 计算DEA慢线，用于MACD
* @param {number} mid 对dif的时间窗口
* @param {array} dif 输入数据
*/
calcDEA = function (mid, dif) {
  return calcEMA(mid, dif);
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
//当前的时间
//var this_date = new Date(yyyy,mth,dd);

var jsondata = getMarketData('sh000001', '2021-01-01', '2022-03-09')
macd = calcMACD(12, 26, 9, dealDataTo(jsondata), "close");

// console.log(data)
// console.log(splitData(dealEndData(jsondata, macd)))
data = splitData(dealEndData(jsondata, macd))




var option = {
  title: [
    {
      text: 'K线周期图表(matols.com)',
      left: 0
    },
    {
      text: '买入卖出量',
      left: 0,
      top:610
    },{
      text: 'macd',
      left: 0,
      top:780
    },
  ], 
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line'
    },
    // backgroundColor: 'rgba(50,50,50,0.7)', // 提示框浮层的背景颜色。
    // borderColor: '#333', // 提示框浮层的边框颜色。
    formatter: function (param) {	//自定义tooltip内容 
      // console.log("param", param)
      if (param.length > 4) {
        var html2 = param[0].axisValue + '<br>'
          + '今日:' + param[0].data[2] + '<br>'
          + '开盘价：' + param[0].data[1] + '<br>'
          + '收盘价：' + param[0].data[2] + '<br>'
          + '最高价：' + param[0].data[3] + '<br>'
          + '最低价：' + param[0].data[4] + '<br>'
          + '5日线:' + param[1].value + '<br>'
          + '10日线:' + param[2].value + '<br>'
          + '20日线:' + param[3].value + '<br>'
          + '30日线:' + param[4].value
        return html2;
      }

    }
  },
  legend: {
    data: ['KLine', 'MA5', 'MA10', 'MA20', 'MA30']
  },
  //调整位置
  grid: [{
    left: '9%',
    right: '5%',
    height: '60%'
  }, {
    left: '9%',
    right: '5%',
    top: '69%',
    height: '7%'
  }, {
    left: '9%',
    right: '5%',
    top: '82%',
    height: '12%'
  }],
  xAxis: [{
    type: 'category',
    data: data.times,
    scale: true,
    boundaryGap: false,
    axisLine: { onZero: false },
    splitLine: { show: false },
    splitNumber: 20,
    min: 'dataMin',
    max: 'dataMax'
  }, {
    type: 'category',
    gridIndex: 1,
    data: data.times,
    axisLabel: { show: false }
  }, {
    type: 'category',
    gridIndex: 2,
    data: data.times,
    axisLabel: { show: false }
  }],
  yAxis: [{
    scale: true,
    splitArea: {
      show: false
    }
  }, {
    gridIndex: 1,
    splitNumber: 3,
    axisLine: { onZero: false },
    axisTick: { show: false },
    splitLine: { show: false },
    axisLabel: { show: true }
  }, {
    gridIndex: 2,
    splitNumber: 4,
    axisLine: { onZero: false },
    axisTick: { show: false },
    splitLine: { show: false },
    axisLabel: { show: true }
  }],
  dataZoom: [{
    type: 'inside',
    xAxisIndex: [0, 0],
    start: 20,
    end: 100
  }, {
    show: true,
    xAxisIndex: [0, 1],
    type: 'slider',
    top: '95%',
    start: 20,
    end: 100
  }, {
    show: false,
    xAxisIndex: [0, 2],
    type: 'slider',
    start: 20,
    end: 100
  }],
  series: [{
    name: 'K线周期图表(matols.com)',
    type: 'candlestick',
    data: data.datas,
    itemStyle: {
      normal: {
        color: '#ef232a',
        color0: '#14b143',
        borderColor: '#ef232a',
        borderColor0: '#14b143'
      }
    },
    // markArea: {
    //   silent: true,
    //   itemStyle: {
    //     normal: {
    //       color: 'Honeydew'
    //     }
    //   },
    //   data: fenduans()
    // },
    markPoint: {
      data: [
        { name: '最大值',value:3544.48,xAxis:'auto',yAxis:'3544.48' },
        // { type: 'max', name: '最大值' },
        // { type: 'min', name: '最小值' }
      ],
      label: {
        formatter: function (e) {
             console.log("markpoint",e)
            return '{c}'
        }
      }
    },
    //文字
    markLine: {
      // label: {
      //   normal: {
      //     position: 'middle',
      //     textStyle: { color: 'Blue', fontSize: 0 }
      //   }
      // },
      // data: fenduans(),
      // symbol: ['circle', 'none']

    }
  }, {
    name: 'MA5',
    type: 'line',
    data: calculateMA(5),
    smooth: true,
    lineStyle: {
      normal: {
        opacity: 1
      }
    }
  }, {
    name: 'MA10',
    type: 'line',
    data: calculateMA(10),
    smooth: true,
    lineStyle: {
      normal: {
        opacity: 1
      }
    }
  }, {
    name: 'MA20',
    type: 'line',
    data: calculateMA(20),
    smooth: true,
    lineStyle: {
      normal: {
        opacity: 1
      }
    }
  }, {
    name: 'MA30',
    type: 'line',
    data: calculateMA(30),
    smooth: true,
    lineStyle: {
      normal: {
        opacity: 1
      }
    }
  }, {
    name: 'Volumn',
    type: 'bar',
    xAxisIndex: 1,
    yAxisIndex: 1,
    data: data.vols,
    itemStyle: {
      normal: {
        color: function (params) {
          var colorList;
          if (data.datas[params.dataIndex][1] > data.datas[params.dataIndex][0]) {
            colorList = '#ef232a';
          } else {
            colorList = '#14b143';
          }
          return colorList;
        },
      }
    }
  }, {
    name: 'MACD',
    type: 'bar',
    xAxisIndex: 2,
    yAxisIndex: 2,
    data: data.macds,
    itemStyle: {
      normal: {
        color: function (params) {
          var colorList;
          if (params.data >= 0) {
            colorList = '#ef232a';
          } else {
            colorList = '#14b143';
          }
          return colorList;
        },
      }
    }
  }, {
    name: 'DIF',
    type: 'line',
    xAxisIndex: 2,
    yAxisIndex: 2,
    data: data.difs
  }, {
    name: 'DEA',
    type: 'line',
    xAxisIndex: 2,
    yAxisIndex: 2,
    data: data.deas
  }
  ]
};



//
//data=getMarketData('sh000001','2021-12-01', '2022-01-27')


function klineInit () {
  //  开盘 ，收盘价  最高 ，最低
  var dom = document.getElementById('kline');
  var myChart = echarts.init(dom, 'dark');
  //设置开启深色模式
  myChart.setOption(option);
}

export default {
  klineInit
}
