//处理dealCalculateStopLoss数据

//初始化数据,30天数据
export const initMaxMin30 = (dataLoss) => {
  dataLoss = JSON.parse(JSON.stringify(dataLoss));
  //近30日支撑位
  let max_num_level30 = dataLoss.deal_data2.max_num1;
  let max_num_level_item30 = [];
  let min_num_level30 = dataLoss.deal_data2.min_num1;
  let zcw3_num = dataLoss.deal_data2.zcw3;
  let zsw_num = dataLoss.deal_data2.zsw_array;
  let this_num = dataLoss.this_data_num;
  //最小值
  let min_num_level_item30 = [];
  //计算周期
  let period_30_max_num_level = [];
  let start_period = undefined;
  let period_30_min_num_level = [];
  let start_period2 = undefined;

  max_num_level30.forEach((item, index) => {
    if (index > 0) {
      //判断是不是等于
      if (item != max_num_level30[index - 1]) {
        if (max_num_level30[index - 1] == max_num_level30[index - 2]) {
          //上升阶
          if (item > max_num_level30[index - 1]) {
            if (min_num_level30[index] == min_num_level30[index - 1]) {
              if (zcw3_num[index] < this_num[index]) {
                max_num_level_item30.push({
                  name: "开始下跌",
                  index: index,
                  time: dataLoss.this_data[index],
                  num: max_num_level30[index],
                });
              }
            }
          } else {
          }
        }
        if (start_period != undefined) {
          period_30_max_num_level.push({
            start: start_period,
            end: index,
            //累计次数zc
            period: index - start_period + 1,
            start_num: max_num_level30[start_period],
            end_num: max_num_level30[index],
            start_time: dataLoss.this_data[start_period],
            end_time: dataLoss.this_data[index],
          });
          start_period = undefined;
        }
        //等于判断上升 还是下降
      } else {
        if (min_num_level30[index] == min_num_level30[index - 1]) {
          if (min_num_level30[index - 1] < min_num_level30[index - 2]) {
            if (min_num_level30[index - 1] - min_num_level30[index - 2] < 0)
              if (max_num_level30[index - 1] == max_num_level30[index - 2]) {
                if (zsw_num[index] > this_num[index]) {
                  min_num_level_item30.push({
                    name: "开始触底",
                    index: index,
                    time: dataLoss.this_data[index],
                    num: min_num_level30[index],
                  });
                }
              }
          }
        }

        if (max_num_level30[index - 1] < max_num_level30[index - 2]) {
          if (min_num_level30[index] == min_num_level30[index - 1]) {
            if (max_num_level30[index - 2] == max_num_level30[index - 3]) {
              if (max_num_level30[index - 3] == max_num_level30[index - 4]) {
                if (zsw_num[index] > this_num[index]) {
                  min_num_level_item30.push({
                    name: "开始触底",
                    index: index,
                    time: dataLoss.this_data[index],
                    num: min_num_level30[index],
                  });
                }
              }
            }
          }
        }

        if (max_num_level30[index - 1] == max_num_level30[index - 2]) {
        }

        if (index == max_num_level30.length - 1) {
          start_period = start_period - 1;
          period_30_max_num_level.push({
            start: start_period,
            end: index,
            //累计次数
            period: index - start_period + 1,
            start_num: max_num_level30[start_period],
            end_num: max_num_level30[index],
            start_time: dataLoss.this_data[start_period],
            end_time: dataLoss.this_data[index],
          });
        }
        if (start_period == undefined) {
          start_period = index;
        }
      }

      if (min_num_level30[index] != min_num_level30[index - 1]) {
        if (start_period2 != undefined) {
          period_30_min_num_level.push({
            start: start_period2,
            end: index,
            //累计次数zc
            period: index - start_period2 + 1,
            start_num: min_num_level30[start_period2],
            end_num: min_num_level30[index],
            start_time: dataLoss.this_data[start_period2],
            end_time: dataLoss.this_data[index],
          });
          start_period2 = undefined;
        }
      } else {
        if (index == min_num_level30.length - 1) {
          start_period2 = start_period2 - 1;
          period_30_min_num_level.push({
            start: start_period2,
            end: index,
            //累计次数
            period: index - start_period2 + 1,
            start_num: min_num_level30[start_period2],
            end_num: min_num_level30[index],
            start_time: dataLoss.this_data[start_period2],
            end_time: dataLoss.this_data[index],
          });
        }
        if (start_period2 == undefined) {
          start_period2 = index;
        }
      }
    }
  });

  let adults30 = JSON.parse(JSON.stringify(period_30_max_num_level));
  adults30 = adults30.filter((item) => {
    return item.period >= 5;
  });

  let adults30_item = JSON.parse(JSON.stringify(period_30_max_num_level));
  adults30_item = adults30_item.sort(function (a, b) {
    return new Date(a.start_time).getTime() - new Date(b.start_time).getTime();
  });

  //b-a从大到小，a-b从小到大
  let max_level_data = JSON.parse(JSON.stringify(period_30_max_num_level));
  max_level_data = max_level_data.sort(function (a, b) {
    return a.period - b.period;
  });

  let adults302 = JSON.parse(JSON.stringify(period_30_min_num_level));
  adults302 = adults302.filter((item) => {
    return item.period >= 3;
  });

  //b-a从大到小，a-b从小到大
  let min_level_data = JSON.parse(JSON.stringify(adults302));
  min_level_data = min_level_data.sort(function (a, b) {
    return a.period - b.period;
  });

  return {
    period_30_min_num_level2: {
      name: "计算最小值横盘周期",
      num: adults302,
    },
    period_30_data2: [
      {
        name: "当前",
        num: adults302[adults302.length - 1],
        active: 1,
      },
      {
        name: "上一次的周期值",
        num: adults302[adults302.length - 2],
      },
      {
        name: "最低值的周期值",
        num: min_level_data[min_level_data.length - 1],
      },
    ],

    period_30_max_num_level: {
      name: "计算最大值横盘周期",
      num: period_30_max_num_level,
    },
    period_30_data: [
      {
        name: "当前",
        num: period_30_max_num_level[period_30_max_num_level.length - 1],
        active: 1,
      },
      {
        name: "上一次的周期值",
        num: period_30_max_num_level[period_30_max_num_level.length - 2],
      },
      {
        name: "最大的周期值",
        num: max_level_data[max_level_data.length - 1],
      },
    ],

    max_num_level_item30: {
      name: "最大值开始下跌位置",
      num: max_num_level_item30,
    },
    min_num_level_item30: {
      name: "最小值开始触底位置",
      num: min_num_level_item30,
    },
  };
};
// 处理30日的数据变化
export const deal30Loss = (dataLoss) => {
  let max_data1 = dataLoss.max_data_num.slice(-29);
  let min_data1 = dataLoss.min_data_num.slice(-29);
  let max_num1 = Math.max(...max_data1);
  let min_num1 = Math.min(...min_data1);

  let time_data = dataLoss.this_data.slice(-29);
  let max_time = time_data[29 - max_data1.indexOf(max_num1)];
  let min_time = time_data[29 - min_data1.indexOf(min_num1)];
  let testtext2 = [
    {
      name: "当前价",
      num: dataLoss.this_data_num[dataLoss.this_data_num.length - 1],
      active: "active1",
    },
    {
      name: "近30日最高价(" + max_time + ")",
      num: max_num1,
      time: dataLoss.this_data.slice(-29)[max_data1.indexOf(max_num1)],
      seat: 29 - max_data1.indexOf(max_num1),
      //   time: max_time,
    },
    {
      name: "近30日最低价(" + min_time + ")",
      num: min_num1,
      time: dataLoss.this_data.slice(-29)[min_data1.indexOf(min_num1)],
      seat: 29 - min_data1.indexOf(min_num1),
      //   time: min_time,
    },
    // {
    //   name: "近30日支撑位",
    //   num: zcw3.toFixed(2),
    // },
  ];
  testtext2 = testtext2
    .sort(function (a, b) {
      return a.num - b.num;
    })
    .reverse();

  return testtext2;
};
//获取支撑位
export const dealSeatType = (data) => {
  data = JSON.parse(JSON.stringify(data));
  //股的数值
  let this_data_num = data.this_data_num;
  let deal_data_zcw = seatTtpeItem(
    data.deal_data2.zcw_array,
    this_data_num,
    data.this_data
  );
  deal_data_zcw.name = "支撑位";
  let deal_data_zcw30 = seatTtpeItem(
    data.deal_data2.zcw3,
    this_data_num,
    data.this_data
  );
  deal_data_zcw30.name = "近30日支撑位";

  let deal_data_zsw = seatTtpeItem(
    data.deal_data2.zsw_array,
    this_data_num,
    data.this_data
  );
  deal_data_zsw.name = "止损位";
  let return_array = [];
  return_array.push(deal_data_zcw);
  return_array.push(deal_data_zcw30);
  return_array.push(deal_data_zsw);
  return_array.push({
    name: "当前价",
    num: parseFloat(data.this_data_num.slice(-1)[0]).toFixed(2),
    active: "active",
  });
  return_array = return_array
    .sort(function (a, b) {
      return a.num - b.num;
    })
    .reverse();

  let arr_index = return_array.findIndex((item) => item.active === "active");
  return_array = judgesSeat(return_array, data.this_data_num);
  return return_array;
};
//判断位置,判断当前的趋势，是上升还是下降
function judgesSeat(array_data, this_data) {
  let arr_index = array_data.findIndex((item) => item.active === "active");
  if (this_data[this_data.length - 1] - this_data[this_data.length - 3] > 0) {
    if (arr_index != 0) {
      if (arr_index > 0) {
        array_data[arr_index].type = "上升趋势";
      } else {
        array_data[arr_index].type = "下跌趋势";
      }
    } else {
      array_data[arr_index].type = "上升趋势";
    }
  } else {
    array_data[arr_index].type = "下跌趋势";
  }
  return array_data;
}
//判断 状态
function seatTtpeItem(data, this_data, time) {
  let title_array = [
    "买入(刚突破)",
    "卖出",
    "加仓(刚突破)",
    "减仓",
    "全部卖出(刚跌破)",
    "持有 ",
    "等待",
    "（空仓）未跌破",
  ];
  let length_data = data.length;
  let return_value;
  if (
    parseFloat(data[length_data - 2]) >= parseFloat(this_data[length_data - 2])
  ) {
    return_value =
      this_data[length_data - 1] - data[length_data - 1] > 0 ? 0 : 6;
  } else {
    return_value =
      this_data[length_data - 1] - data[length_data - 1] > 0 ? 7 : 4;
  }
  let number =
    (data[length_data - 1] - this_data[length_data - 1]) /
    this_data[length_data - 1];
  return {
    status_num: return_value,
    type: title_array[return_value],
    num: parseFloat(data[length_data - 1]).toFixed(2),
    number: (number * 100).toFixed(2),
  };
}

export default {
  initMaxMin30,
  dealSeatType,
  deal30Loss,
};
