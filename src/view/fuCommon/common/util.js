/*
 * @Author: “linzesen” zx2905111@github.com
 * @Date: 2023-03-01 15:30:30
 * @LastEditors: “linzesen” zx2905111@github.com
 * @LastEditTime: 2023-10-09 16:02:11
 * @FilePath: \mask-money\vue-lunar-fullcalendar-master\src\view\fuCommon\common\util.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
//处理数据
//返回来的数据
export const dealDataLine = (data2, type, name, num, type2, num3) => {
  let num2 = 1458;
  let that = this;
  let array2 = [];
  let time1 = [];
  let num1 = [];
  data2.forEach((element2, index2) => {
    // if (index2 > data2.length - num2) {
    if (type == 1) {
      array2.push(parseFloat(element2[6].toFixed(2)));
      time1.push(dateFormat("YYYY-mm-dd", new Date(element2[9] * 1000)));
      num1.push(parseFloat(element2[1]));
    } else if (type == 2) {
      array2.push(parseFloat(element2.split(",")[8]));
      time1.push(element2.split(",")[0]);

      if (num == 6) {
        num1.push(
          (parseInt(element2.split(",")[num]) / 100000000).toFixed(2)
        );
      } else {
        num1.push(parseFloat(element2.split(",")[num]));
      }
    }
    // }
  });
  let object1 = {
    name: name,
    num: num1,
    time: time1,
    array: array2,
    type_echarts: type2 == undefined ? undefined : "bar",
    itemStyle: num3 == undefined ? undefined : 2,
  };
  return object1;
}

function itemFun(num1, this_time, item, name, type) {
  let type1 = ["买进", "卖出", "持有", "加仓", "等待"];
  switch (num1) {
    case 0:
      var type2 = name.indexOf('下跌') != -1 ? {
        color: "green",
      } : {
        color: 'red'
      };
      return {
        name: "买卖操作逻辑",
          value: name ? name : type1[num1],
          xAxis: this_time,
          yAxis: parseFloat(item),
          itemStyle: type2
      };

      break;
    case 1:
      var type2 = name.indexOf('下跌') != -1 ? {
        color: "green",
      } : {
        color: 'red'
      };
      return {
        name: "买卖操作逻辑",
          value: name ? name : type1[num1],
          xAxis: this_time,
          yAxis: parseFloat(item),
        itemStyle: type2
      };
      break;
    default:
      break;
  }
}
//处理数据
export const dealPoint = (data2, num1) => {
  let array_data = [];
  console.log('dealPoint', data2)
  data2.forEach((item, index) => {

    array_data.push(itemFun(num1, item.time, item.num, item.name, item.num1));
  })
  return array_data
}

export default {
  dealDataLine,
  dealPoint
}
