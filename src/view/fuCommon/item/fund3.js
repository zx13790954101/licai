import {
  dealTime
} from "../dealData.js";
export const dealWeek = (dataList) => {
  let item1 = [];
  let year_time = null;
  let save_month = [];
  let array1 = [];
  //周末的时间
  let month_num = null;
  let num_array_item = [];
  let num_array = [];
  let time_week_item = [];
  let time_week_array = [];

  let num_item = []
  dataList.time.forEach((element, index) => {

    //2021
    if (year_time == element.slice(0, 4)) {
      item1.push(dataList.array[index]);
      save_month.push(element.slice(0, 7));
      num_item.push(dataList.array[index]);
      //二维数组
      if (month_num == element.slice(0, 7)) {
        num_array_item.push(element);
        time_week_item.push(dataList.array[index]);
      } else {
        num_array.push(JSON.parse(JSON.stringify(num_array_item)));
        time_week_array.push(JSON.parse(JSON.stringify(time_week_item)));
        num_array_item = [];
        time_week_item = [];
        time_week_item.push(dataList.array[index]);
        num_array_item.push(element);
        month_num = element.slice(0, 7);
      }

      if (index + 1 == dataList.time.length) {
        time_week_array.push(JSON.parse(JSON.stringify(time_week_item)));
        num_array.push(num_array_item);
        array1.push({
          name: year_time,
          array: dealTime(item1, save_month),
          time: save_month,
          all_array: JSON.parse(JSON.stringify(num_array)),
          all_array2: JSON.parse(JSON.stringify(time_week_array)),
          num_item: num_item
        });
      }
    } else {
      if (year_time !== null) {

        num_array.push(JSON.parse(JSON.stringify(num_array_item)));
        time_week_array.push(JSON.parse(JSON.stringify(time_week_item)));
        let info_item = {
          name: year_time,
          array: dealTime(item1, save_month),
          time: save_month,
          all_array: JSON.parse(JSON.stringify(num_array)),
          all_array2: JSON.parse(JSON.stringify(time_week_array)),
          num_item: num_item
        }
        array1.push(info_item);
      }
      item1 = [];
      year_time = null;
      year_time = element.slice(0, 4);
      save_month = [];
      num_item = []
      save_month.push(element.slice(0, 7));
      num_item.push(dataList.array[index]);
      item1.push(dataList.array[index]);

      //二维数组
      if (month_num != null) {
        num_array.push(JSON.parse(JSON.stringify(num_array_item)));
        //  time_week_array.push(JSON.parse(JSON.stringify(time_week_item)));
      } else {
        month_num = null;
        // num_array_item.push(element);
        //    time_week_item.push(dataList.array[index]);
      }
      month_num = null;
      num_array_item = [];
      time_week_item = [];
      time_week_array = [];

      month_num = element.slice(0, 7);

      num_array = [];
    }
  });


  console.log("end", array1);
  let array_num2 = [];
  let array_num3 = [];

  // if (array1[0].all_array.length != 12) {
  //   let array_num = [];
  //   for (let i = 0; i < 12 - array1[0].all_array.length; i++) {
  //     array_num.push("-");
  //   }
  //   array_num2 = array_num.concat(array1[0].all_array);
  //   array_num3 = array_num.concat(array1[0].all_array2);
  // }
  // array1[0].all_array = array_num2;
  // array1[0].all_array2 = array_num3;
  //   this.datalist_table2 = array1;
  return array1;
}
export const dealMoth = (dataList) => {
  let item1 = [];
  let time1 = null;
  let time2 = [];
  let array1 = [];

  dataList.time.forEach((element, index) => {
    if (time1 == element.slice(0, 4)) {
      item1.push(dataList.array[index]);
      time2.push(element.slice(0, 7));
      if (index + 1 == dataList.time.length) {
        array1.push({
          name: time1,
          array: dealTime(item1, time2),
          time: time2,
        });
      }
    } else {
      if (time1 !== null) {
        array1.push({
          name: time1,
          array: dealTime(item1, time2),
          time: time2,
        });
      } 
    

      item1 = [];
    
      time2 = [];
      time2.push(element.slice(0, 7));
      item1.push(dataList.array[index]);
      //最后一个
      if (index == dataList.time.length - 1) {
        if (time1 != element.slice(0, 4)) {
          time1 = element.slice(0, 4);
          item1.push(dataList.array[index])
          time2.push(element.slice(0, 7))
          if (index + 1 == dataList.time.length) {
            array1.push({
              name: time1,
              array: dealTime(item1, time2),
              time: time2,
            })
          }
        }
      }
      time1 = null
      time1 = element.slice(0, 4);
    }
  });

  // this.datalist_table2 = array1;
  return array1;
}
//处理数据的涨跌幅
export const dealDataUpDown = (dataList) => {

  let dealUpDown = dealUpDown(dataList.array)


}
//处理涨跌幅概率数据
function dealUpDown(data_inflow) {
  let value1 = [];
  let value2 = [];
  let value3 = [];
  let value4 = [];
  let value5 = [];
  let value6 = [];
  let value7 = [];
  let inflow_item = null;
  let inflow_array = []
  //处理数据
  data_inflow.forEach((item, index) => {
    //第一次
    if (index == 0) {

    } else {

    }
    if (item >= 0 && item <= 1) {
      value1.push({
        index: index,
        title: "0到1",
      });
    } else if (item > 1 && item <= 2) {
      value2.push({
        index: index,
        title: "1到2",
      });
    } else if (item > 2) {
      value3.push({
        index: index,
        title: "大于2",
      });
    } else if (item < -3) {
      value4.push({
        index: index,
        title: "小于-3",
      });
    } else if (item < -2) {
      value5.push({
        index: index,
        title: "-2到-3",
      });
    } else if (item < -1) {
      value6.push({
        index: index,
        title: "-1到-2",
      });
    } else if (item < 0) {
      value7.push({
        index: index,
        title: "0到-1",
      });
    }
  });
  return {
    value1,
    value2,
    value3,
    value4,
    value5,
    value6,
    value7,
  };
}
export default {
  dealMoth,
  dealWeek
}
