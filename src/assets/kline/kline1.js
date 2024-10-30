import {getMarketData,calcMACD,dealDataTo,splitData,dealEndData } from './plug'
var jsondata = getMarketData('sh000001', '2019-01-01', '2022-05-09')
const data = jsondata.map(function (item) {
  return item[2];
});
const dates = jsondata.map(function (item) {
  return item[0];
});


function line () {
  var chartDom = document.getElementById('line1');
  var myChart = echarts.init(chartDom);



//设置气泡的数据
var markdata = [
  {
    name: '最大值', coord: ['2021-01-08', 3570],value:'2021-01-08'
  }
  ]
  

 // data格式: [{"datetime":"2020-12-05","direction":"buy","qty":0.2,"price":115033,"text":"buy 0.2 shares at 115033"}, {}, ...]
var filterData = data => {
    if (!data) return []
    const newDataArray = []
  for (let unit of data) {

      let obj = {}
    if (parseFloat(unit[2]) > parseFloat(unit[1])) {
      obj.yAxis = parseFloat(unit[2])  + 400.000
        obj.symbol = 'path://M649.6 812.8l-114.976 114.944a32 32 0 0 1-45.248 0L374.4 812.8H128a64 64 0 0 1-64-64V160a64 64 0 0 1 64-64h768a64 64 0 0 1 64 64v588.8a64 64 0 0 1-64 64h-246.4z'
      } else {
        obj.yAxis = parseFloat(unit[2])-400
        obj.symbol = 'path://M374.4 211.2l114.976-114.944a32 32 0 0 1 45.248 0L649.6 211.2 896 211.19999999a64 64 0 0 1 64 64.00000001L960 864a64 64 0 0 1-64 64l-768 0a64 64 0 0 1-64-64l0-588.8a64 64 0 0 1 64-64.00000001l246.4 1e-8z'
      }
      obj.symbolSize = 70      
      obj.name = unit[0] + '<br/>' + unit[2]
      obj.xAxis = unit[0]

      if (parseFloat( unit[2]) >parseFloat( unit[1])) {
          obj.itemStyle = {normal: {color: '#d81e06'}}
      } else {
          obj.itemStyle = {normal: {color: '#4caf50'}}
      }
      newDataArray.push(obj)
    }
    return newDataArray
}
  const pointData = filterData([jsondata[100], jsondata[150], jsondata[201]])
  





var option;
option = {
  xAxis: {
    type: 'category',
    data:dates
  },
  yAxis: {
    type: 'value'
  },
  // grid: {
  //   bottom: 90
  // },

  // legend: {},
  // toolbox: {
  //   show: true,
  //   feature: {
  //     dataZoom: {
  //       yAxisIndex: 'none'
  //     },
  //     dataView: { readOnly: false },
  //     magicType: { type: ['line', 'bar'] },
  //     restore: {},
  //     saveAsImage: {}
  //   }
  // },
  //底部的
  dataZoom: [
    {
      textStyle: {
        color: '#8392A5'
      },
      handleIcon:
        'path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
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
  tooltip: {
    trigger: 'axis'
  },
  series: [
    {
      type: 'line',
      data: data,
      itemStyle: {
        color: '#FD1050',
        color0: '#0CF49B',
        borderColor: '#FD1050',
        borderColor0: '#0CF49B'
      },
      // toolbox: {
      //   show: true,
      // },
  
      markPoint: {
        tooltip:{
          trigger:'axis',
        },
        data: pointData,
        // symbol:'',
        // symbolSize: 100, // 容器大小
        label: {
          color: '#ffffff',
          offset:[0,0],
          formatter: function (param) {
            return param.data.coord[0] + ' \n ' + param.data.coord[1]
              + ' \n ' + param.data.coord[1]
              + ' \n ' + param.data.coord[1];
          },
        }
      },
    }
  ]
};




  option && myChart.setOption(option);
}

export default {
  line
}
