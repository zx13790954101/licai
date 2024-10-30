  

//处理数据
function dealData (listData, markLine, markPoint, timeData) {
  let series1 = [];
  let yAxis1 = [];
  let xAxis1 = [];
  listData.forEach((Element, index) => {
    let item1 = {
      name: Element.name,
      type: "line",
      yAxisIndex: Element.yAxisIndex != undefined ? 0 : index,
      data: Element.num,
      markLine:
        markLine != undefined ? markLine[index] : undefined,
      markPoint:
       markPoint != undefined ? markPoint[index] : undefined,
    };
  
    series1.push(item1);
  
    let item2 = {
      type: "value",
      scale: true,
    };
    yAxis1.push(item2);
    let item3 = {
      type: "category",
      boundaryGap: false,
      axisTick: { show: false },
      data: timeData,
    };
    xAxis1.push(item3);
  });
  return {
    series1,
    yAxis1,
    xAxis1
  }
}

export const initEchart=(name,listData, timeData,dataZoom, markLine, markPoint)=>{
  
  let chartDom = document.getElementById(name);
  let myChart = echarts.init(chartDom);
  let dealData2 = dealData(listData, markLine, markPoint, timeData);

  console.log("dealData2",dealData2)
  let series1 = dealData2.series1;
  let yAxis1 =  dealData2.yAxis1;
  let xAxis1 =  dealData2.xAxis1;
  var option = {
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
    legend: {},
    // color: ["#61a0a8", "#cc0000"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      position: function (pos, params, el, elRect, size) {
        var obj = { top: 10 };
        obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 30;
        return obj;
      },
      // formatter: "{a} <br/>{b} : {c}",
    },
    xAxis: xAxis1[0],
    grid: {
      x: 130,
      x1: 0,
      y: 70,
      y1: 0,
      // bottom: "20",
      // left: "0",
    },
    yAxis: yAxis1,
    series: series1,
  };
  
  if (option && typeof option === "object") {
    myChart.setOption(option, true);
  }

}


export default {
  initEchart,
}


