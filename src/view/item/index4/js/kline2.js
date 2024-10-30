//处理数据
  

function  setMarkPoint(this_num, data1, data2, time1) {
  let array1 = [];
  let type1 = ["买进", "卖出", "持有", "加仓", "等待"];
  this_num.forEach((item, index) => {
    let item_data2 = data2[index] - data2[index - 1];
    let item_data1 = data1[index] - data1[index - 1];
    if (item - this_num[index - 1] > 0) {
      if (item_data2<0) {
        if (data1[index] > 0) {

          if (data2[index - 1] - data2[index - 2] > 0) {

            if (data1[index - 1] > 0) {
              let item1 = {
                name: "买卖操作逻辑",
                value: type1[1],
                xAxis: time1[index],
                yAxis: parseFloat(item),
                itemStyle: {
                  color: "red",
                },
              };
              array1.push(item1);
            }
         
          }
       
        }
      } else {
        if (data1[index] > 0) { 
          if (this_num[index - 1] - this_num[index - 2]>0) {
            let item1 = {
              name: "买卖操作逻辑",
              value: type1[1],
              xAxis: time1[index],
              yAxis: parseFloat(item),
              itemStyle: {
                color: "red",
              },
            };
            array1.push(item1);
          }

        }
      }

    } else {
      if (data1[index] < 0) {
        if (item_data2 < 0) { 

          if (this_num[index - 1]-this_num[index-2] > 0) {
            
            if (data2[index - 1] - data2[index - 2] > 0) {
              if (data1[index] < -1) {
                let item1 = {
                  name: "买卖操作逻辑",
                  value: type1[0],
                  xAxis: time1[index],
                  yAxis: parseFloat(item),
                };
                array1.push(item1);
              }
              
            }
           
          } else {
            if (item_data2<-1.5) {
              if (data2[index - 1] - data2[index - 2] > 0) {
                if (data1[index - 3] < 0) {
                  let item1 = {
                    name: "买卖操作逻辑",
                    value: type1[0],
                    xAxis: time1[index],
                    yAxis: parseFloat(item),
                  };
                  array1.push(item1);
                }
               
              }
             
            }
          }

         
        }
       }
    }
  });

  return [
    {
      data: array1,
    },
  ];
}



function dealData (listData, markLine, markPoint, timeData) {
    let series1 = [];
    let yAxis1 = [];
    let xAxis1 = [];
    let dataset1 = [];
    let markPoint1=setMarkPoint(listData[0].num,listData[1].num,listData[2].num,listData[0].time)
    listData.forEach((Element, index) => {
      let item1 = {
        name: Element.name,
        type: "line",
        // yAxisIndex: Element.yAxisIndex != undefined ? 0 : index,
        data: Element.num,
        yAxisIndex: index,
        markLine: markLine != undefined ? markLine[index] : undefined,
        markPoint: markPoint != undefined ? markPoint[index] : undefined,
      };
      let itemStyle2 =
      Element.itemStyle == undefined
        ? ""
        : {
            normal: {
              color: function (params) {
                var index_color = params.value[1];
                if (index_color > 0) {
                  return "#7cffb2";
                } else {
                  return "#f72c5b";
                }
              },
            },
          };
    //设置新的折线图的列表
    if (itemStyle2 == "") {
      if (Element.linestylecolor != undefined) {
        itemStyle2 = Element.linestylecolor;
      }
      }
      
      // series1.push(item1);
      series1.push({
        type: Element.type_echarts ? "bar" : "line",
        name: Element.name,
        datasetIndex: index,
        yAxisIndex: index,
        showSymbol: true,
        
        label: {
          position: "top",
          show: index == 2 ? true : false // 在折线拐点上显示数据
        },
        itemStyle: itemStyle2,
        markPoint: markPoint1 != undefined ? markPoint1[index] : undefined
      });
      let item2 = {
        type: "value",
        scale: true,

      };
      yAxis1.push(item2);
      let item3 = {
        type: "category",
        boundaryGap: false,
        axisTick: {
          show: false
        },
        data: Element.time,
      };
      xAxis1.push(item3);
      let item4 = [];
      Element.time.forEach((Element2, index2) => {
        let item5 = [Element2, Element.num[index2]];
        item4.push(item5);
      });

      dataset1.push({
        source: item4,
      });
    });
    return {
      series1,
      yAxis1,
      xAxis1,
      dataset1
    }
  }

  export const initEchart = (name, listData, timeData, dataZoom, markLine, markPoint) => {

    let chartDom = document.getElementById(name);
    let myChart = echarts.init(chartDom);
    let dealData2 = dealData(listData, markLine, markPoint, timeData);


    let series1 = dealData2.series1;
    let yAxis1 = dealData2.yAxis1;
    let xAxis1 = dealData2.xAxis1;
    let dataset1 = dealData2.dataset1;
    var option = {
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
          brushSelect: true,
          start: 90,
          end: 100
        },
        {
          type: 'inside',
          start: 90,
          end: 100
        }
      ],
      legend: {},
      // color: ["#61a0a8", "#cc0000"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
        },
        position: function(pos, params, el, elRect, size) {
          var obj = {
            top: 10
          };
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
      dataset: dataset1
    };

    if (option && typeof option === "object") {
      myChart.setOption(option, true);
    }

  }


  export default {
    initEchart,
  }
