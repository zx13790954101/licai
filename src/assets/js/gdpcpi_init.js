
import cpigdpjson from './cpigdp.json';
function initGdp () {

  var chartDom = document.getElementById('macros1');
  var myChart = echarts.init(chartDom);
  var option;

  option = {
    title: {
      text: 'GDP与CPI',
      subtext: ''
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['GDP', 'CPI']
    },
    toolbox: {
      show: true,
      feature: {
        saveAsImage: {}
      }
    },
    //放大
    dataZoom: [
      {
        type: 'inside',
        start: 80,
        end: 100
      },
      //设置底部的缩小放大的插件
      {
        show: false,
        type: 'slider',
        top: '90%',
        start: 80,
        end: 100
      }
    ],
    xAxis: [
      {
        type: 'category',
        axisLabel: {
          rotate: 0,
          interval: 0
        },
        axisTick: {
          alignWithLabel: true
        },
        boundaryGap: false,
        data: cpigdpjson.date.reverse(),
        axisLabel: {
          formatter: '{value} 季'
        },

      }

    ],
    yAxis: [
      {
        type: 'value',
        splitArea: {
          show: false //y网格区域颜色
        },
        splitLine: {
          show: true, //y网格线
          lineStyle: {
            color: '#a5854b'
          }
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#333333' //Y轴颜色
          }
        },
        nameTextStyle: {
          color: '#f44336'
        },
        axisLabel: {
          formatter: '{value} %'
        },
        axisPointer: {
          snap: true
        }
      },
      {
        type: 'value',
        name: '指数',
        splitLine: {
          show: false
        },
        nameLocation: 'start',
        // min: 0,
        position: 'right',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#e24740'
          }
        },
        axisLabel: {
          formatter: '{value} %'
        }
      }

    ],
    visualMap: [{
      show: false,
      dimension: 0,
      seriesIndex: 0, //设置位置
      pieces: [{
        lte: 6,
        color: 'green'
      }, {
        gt: 6,
        lte: 8,
        color: 'red'
      }, {
        gt: 8,
        lte: 14,
        color: 'green'
      }, {
        gt: 14,
        lte: 17,
        color: 'red'
      }, {
        gt: 17,
        color: 'green'
      }]
    }, {
      show: false,
      dimension: 0,
      seriesIndex: 1,
      pieces: [{
        lte: 5,
        color: 'green'
      }, {
        gt: 5,
        lte: 8,
        color: 'red'
      }, {
        gt: 8,
        lte: 14,
        color: 'green'
      }, {
        gt: 14,
        lte: 17,
        color: 'red'
      }, {
        gt: 17,
        color: 'green'
      }]
    }],
    series: [{
      yAxisIndex: 0,  // 通过这个判断左右
      name: 'GDP',
      seriesIndex: 0,
      type: 'line',
      smooth: true,
      data: cpigdpjson.gdp.reverse(),
      markArea: {
        silent: false,
        //修改折线图的样式
        itemStyle: {
          color: 'rgba(255, 173, 177, 0.4)',

        },
        data: [
          [{
            name: '早高峰',
            xAxis: '07:30'
          }, {
            xAxis: '10:00'
          }],
          [{
            name: '晚高峰',
            xAxis: '17:30'
          }, {
            xAxis: '21:15'
          }]
        ]
      }
    },
    {
      name: 'CPI',
      type: 'line',
      yAxisIndex: 1,
      seriesIndex: 1,
      lineStyle: {
        color: '#03a9f4'
      },
      smooth: true,
      data: cpigdpjson.cpi.reverse(),
      markArea: {
        silent: false,
        //修改折线图的样式
        itemStyle: {
          color: 'rgba(255, 173, 177, 0.4)'
        },
        data: [
          [{
            name: '早高峰',
            xAxis: '07:30'
          }, {
            xAxis: '10:00'
          }],
          [{
            name: '晚高峰',
            xAxis: '17:30'
          }, {
            xAxis: '21:15'
          }]
        ]
      }
    }
    ]
  };


  console.log("json", cpigdpjson)

  if (option && typeof option === "object") {
    myChart.setOption(option, true);
  }
}
export default {
  initGdp
}
