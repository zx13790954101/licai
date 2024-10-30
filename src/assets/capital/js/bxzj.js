
//https://legulegu.com/stockdata/hu-shen-gang-tong-data?token=eb2f56465cef5eedd5bfa8107350f792
//数据来源
import bxzjjson from '../json/bxzj.json';
function dateFormat(fmt, date) {
  let ret;
  const opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "m+": (date.getMonth() + 1).toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "M+": date.getMinutes().toString(),         // 分
      "S+": date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
  };
  return fmt;
}
// 功能：将浮点数四舍五入，取小数点后2位
function changeTwoDecimal(x)
{
   var f_x = parseFloat(x);
   if (isNaN(f_x))
   {
      return false;
   }
   f_x = Math.round(f_x *100)/100;

   return f_x;
}
const orchesData = (data, key) => {
  
  var array_list = [];
  
  const map1 = data.map(item => {
      var end_data=item[key]
      if (key == 'date') {
        end_data =  dateFormat("YYYY-mm-dd ", new Date(item[key] ))
      } else if (key == 'northMoney') {
        end_data= changeTwoDecimal(parseFloat(item[key])/100)
      } else if (key == 'southMoney') {
        end_data=changeTwoDecimal(parseFloat(item[key])/100)
      } else if (key == 'difference') {
        end_data=changeTwoDecimal(parseFloat(item['northMoney'])/100-parseFloat(item['southMoney'])/100)
      }
      //array_list.push([item[key]])
      return end_data
  });
  return map1
}
const northMoney = orchesData(bxzjjson, 'northMoney').reverse()
const  southMoney=orchesData(bxzjjson,'southMoney').reverse()
const date_time = orchesData(bxzjjson, 'date').reverse()
const difference = orchesData(bxzjjson, 'difference').reverse()
export const bxzj = () => {

  var chartDom = document.getElementById('bxzj');
  var myChart = echarts.init(chartDom);
  
  var option;
  option = {
    dataZoom: [
      {
        show: true,
        start: 100,
        end: 0,
      },
    ],
    color:["#cc0000","#61a0a8"],
    title: {
      text: '沪深港通资金流向',
      left: 'left'
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c}'
    },
    legend: {
      left: 'center'
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: date_time
    },
    // grid: {
    //   x: 0,
    //   x1: 0,
    //   y: 0,
    //   y1:0
    // },
    // grid: {
    //   left: '0%',
    //   right: '0%',
    //   bottom: '0%',
    //   containLabel: true
    // },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '差额',
        type: 'bar',
        data: difference,
        itemStyle:{
          normal:{
            color:function(params){
              let ty = params.value;
              if (ty > 0) {
                return '#cc0000'
              } else {
                return '#61a0a8'
              }
           
            },
            label: {
              show: true,
              position:'center'
            }
          }
        }
      },
      {
        name: '北向资金',
        type: 'line',
        data: northMoney
      },
      {
        name: '南向资金',
        type: 'line',
        data: southMoney
      }
    ]
  };


  if (option && typeof option === "object") {
    myChart.setOption(option, true);
  }
}
export default {
  bxzj,
  bxzjjson
}
