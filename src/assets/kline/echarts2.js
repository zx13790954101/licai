//数据模型 time0 open1 close2 min3 max4 vol5 tag6 macd7 dif8 dea9
//  日期        五日线
//现在还要计算  柱子的颜色，和    macd  dif  dea
//['2015-10-19',18.56,18.25,18.19,18.56,55.00,0,-0.00,0.08,0.09]
//数据的模拟
import {
  getMarketData,
  calcMACD,
  dealDataTo,
  splitData,
  dealEndData
} from './plug'

// prettier-ignore
var rawData = [
  ['2015/12/31', '3570.47', '3539.18', '-33.69', '-0.94%', '3538.35', '3580.6', '176963664', '25403106', '-']
].reverse();



var jsondata = getMarketData('sh000001', '2020-01-05', '2022-03-24')

// console.log(jsondata)
//   var  macd = calcMACD(12, 26, 9, dealDataTo(jsondata), "close");

//   rawData = splitData(dealEndData(jsondata, macd))

rawData = jsondata

//设置气泡的数据
var markdata = [{
  name: '最大值',
  coord: ['2021-01-08', 3570],
  value: '2021-01-08'
}]

function calculateMA(dayCount, data) {
  var result = [];
  for (var i = 0, len = data.length; i < len; i++) {
    if (i < dayCount) {
      result.push('-');
      continue;
    }
    var sum = 0;
    for (var j = 0; j < dayCount; j++) {
      sum += +data[i - j][1];
    }
    result.push(sum / dayCount);
  }
  return result;
}
const dates = rawData.map(function (item) {
  return item[0];
});
const data = rawData.map(function (item) {
  return [+item[1], +item[2], +item[3], +item[4]];
});

console.log("calculateMA", rawData)
var option = {
  legend: {
    data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30'],
    inactiveColor: '#777'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      animation: false,
      type: 'cross',
      lineStyle: {
        color: '#376df4',
        width: 2,
        opacity: 1
      }
    }
  },

  xAxis: {
    type: 'category',
    data: dates,
    axisLine: {
      lineStyle: {
        color: '#8392A5'
      }
    }
  },
  yAxis: {
    scale: true,
    axisLine: {
      lineStyle: {
        color: '#8392A5'
      }
    },
    splitLine: {
      show: false
    }
  },
  grid: {
    bottom: 80
  },
  dataZoom: [{
      textStyle: {
        color: '#8392A5'
      },
      handleIcon: 'path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
      dataBackground: {
        areaStyle: {
          color: '#8392A5'
        },
        lineStyle: {
          opacity: 0.8,
          color: '#8392A5'
        }
      },
      brushSelect: true
    },
    {
      type: 'inside'
    }
  ],
  series: [{
      type: 'candlestick',
      name: 'Day',
      data: data,
      itemStyle: {
        color: '#FD1050',
        color0: '#0CF49B',
        borderColor: '#FD1050',
        borderColor0: '#0CF49B'
      },
      markPoint: {
        data: markdata,
        symbolSize: 100, // 容器大小
        label: {
          color: '#ffffff',
          formatter: function (param) {

            return param != null ? param.value : '';
          },
        }
      },
    },
    {
      name: 'MA5',
      type: 'line',
      data: calculateMA(5, data),
      smooth: true,
      showSymbol: false,
      lineStyle: {
        width: 1
      }
    },
    {
      name: 'MA10',
      type: 'line',
      data: calculateMA(10, data),
      smooth: true,
      showSymbol: false,
      lineStyle: {
        width: 1
      }
    },
    {
      name: 'MA20',
      type: 'line',
      data: calculateMA(20, data),
      smooth: true,
      showSymbol: false,
      lineStyle: {
        width: 1
      }
    },
    {
      name: 'MA30',
      type: 'line',
      data: calculateMA(30, data),
      smooth: true,
      showSymbol: false,
      lineStyle: {
        width: 1
      }
    }
  ]
};



function klineInit() {
  //  开盘 ，收盘价  最高 ，最低
  var dom = document.getElementById('kline2');
  var myChart = echarts.init(dom, 'dark');
  //设置开启深色模式
  myChart.setOption(option);
}

export default {
  klineInit
}
