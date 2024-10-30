//初始化数据,30天数据
export const initMaxMinLarge = (dataLoss) => {
  dataLoss = JSON.parse(JSON.stringify(dataLoss));
  //近30日支撑位
  let max30 = dataLoss.deal_data2.max_num1;
  let max_num_level_item30 = [];
  let min30 = dataLoss.deal_data2.min_num1;
  let zcw3_num = dataLoss.deal_data2.zcw3;
  let zsw_num = dataLoss.deal_data2.zsw_array;
  let this_num = dataLoss.this_data_num;
  let zcw_num = dataLoss.deal_data2.zcw_array;
  //最小值
  let min_num_level_item30 = [];
  //计算周期
  let period_30_max_num_level = [];
  let start_period = undefined;
  let appraise_30_num_level = [];
  appraise_30_num_level = appraiseNum(
    dataLoss.deal_data2.zcw3,
    dataLoss.this_data_num,
    dataLoss.this_data,
    zsw_num,
    min30,
    max30,
    zcw_num
  );
  max30.forEach((item, index) => {
    if (index > 0) {
      //判断是不是等于
      if (item != max30[index - 1]) {
        if (max30[index - 1] == max30[index - 2]) {
          //上升阶
          if (item > max30[index - 1]) {
            if (min30[index] == min30[index - 1]) {
              if (
                zcw3_num[index] < this_num[index] &&
                this_num[index] - this_num[index - 1] > 0 &&
                this_num[index - 1] - this_num[index - 2] < 0 &&
                max30[index] - this_num[index] < 5
              ) {
                max_num_level_item30.push({
                  name: "开始下跌11",
                  index: index,
                  time: dataLoss.this_data[index],
                  num: max30[index],
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
            start_num: max30[start_period],
            end_num: max30[index],
            start_time: dataLoss.this_data[start_period],
            end_time: dataLoss.this_data[index],
          });
          start_period = undefined;
        }
        //等于判断上升 还是下降
      } else {
        if (min30[index] == min30[index - 1]) {
          if (min30[index - 1] < min30[index - 2]) {
            if (min30[index - 1] - min30[index - 2] < 0)
              if (max30[index - 1] == max30[index - 2]) {
                if (zsw_num[index] > this_num[index]) {
                  // min_num_level_item30.push({
                  //   name: "开始触底11",
                  //   index: index,
                  //   time: dataLoss.this_data[index],
                  //   num: min30[index],
                  // });
                }
              }
          }
        }

        if (max30[index - 1] < max30[index - 2]) {
          if (min30[index] == min30[index - 1]) {
            if (max30[index - 2] == max30[index - 3]) {
              if (max30[index - 3] == max30[index - 4]) {
                if (zsw_num[index] > this_num[index]) {
                  min_num_level_item30.push({
                    name: "开始触底12",
                    index: index,
                    time: dataLoss.this_data[index],
                    num: min30[index],
                  });
                }
              }
            }
          }
        }

        if (max30[index - 1] == max30[index - 2]) {
        }

        if (index == max30.length - 1) {
          if (
            item ==
            period_30_max_num_level[period_30_max_num_level.length - 1].end_num
          ) {
            console.log("最后重点位置", dataLoss.this_data[index]);
            let end_data =
              period_30_max_num_level[period_30_max_num_level.length - 1];
            period_30_max_num_level.push({
              start: end_data.end,
              end: index,
              //累计次数
              period: index - end_data.end + 1,
              start_num: max30[end_data.end],
              end_num: max30[index],
              start_time: dataLoss.this_data[end_data.end],
              end_time: dataLoss.this_data[index],
            });
          }
        }
        if (start_period == undefined) {
          start_period = index;
        }
      }
    }
  });
  let adults30 = period_30_max_num_level.filter((item) => {
    return item.period >= 10;
  });
  return {
    period_30_max_num_level: {
      name: "计算最大值横盘周期",
      num: adults30,
    },
    max_num_level_item30: {
      name: "最大值开始下跌位置",
      num: max_num_level_item30,
    },
    min_num_level_item30: {
      name: "最小值开始触底位置",
      num: min_num_level_item30,
    },
    appraise_30_num_level: {
      name: "近30日支撑位位置变化",
      num: appraise_30_num_level,
    },
  };
};

//根据类型判断状态
function typeOfState(data, index, type) {
  switch (key) {
    case value:
      break;

    default:
      break;
  }
}
//处理多数据
function dealMdata(this_data, max_data, min_data, zcw_data, zsw_num, index2) {
  let end_araay = [];
  let araay1 = [this_data, max_data, min_data, zcw_data, zsw_num];
  for (let index = 0; index < 5; index++) {
    let item_array = [
      araay1[index][index2] - araay1[index][index2 - 1] > 0,
      araay1[index][index2] - araay1[index][index2 - 1] < 0,
      araay1[index][index2] != araay1[index][index2 - 1],
      araay1[index][index2] == araay1[index][index2 - 1],
    ];
    end_araay.push(item_array);
  }
  return end_araay;
}

function appraiseNum(zcw3, this_data, time, zsw, min_data, max_data, zcw) {
  let array1 = [];
  zcw3.forEach((item, index) => {
    let this_data_type = this_data[index] - this_data[index - 1];
    this_data_type = this_data_type > 0;
    if (this_data_type) {
      if (zcw3[index] != zcw3[index - 1]) {
        if (
          max_data[index] != max_data[index - 1] &&
          zcw3[index] > zcw[index] &&
          this_data[index] - zcw3[index] > 0 &&
          zcw3[index - 1] - parseInt(zcw[index - 1]) > 1 &&
          max_data[index - 1] == max_data[index - 2]
        ) {
          // array1.push({
          //   name: "开始下跌21",
          //   index: index,
          //   time: time[index],
          //   num: item,
          //   num1: 1,
          // });
        }
      } else {
        if (
          zcw3[index - 1] == zcw3[index - 2] &&
          zcw[index] != zcw[index - 1] &&
          this_data[index] > zcw[index] &&
          this_data[index] - zcw3[index] > 0 &&
          zcw3[index] - zcw[index] > 0 &&
          this_data[index - 1] - this_data[index - 2] > 0
        ) {
          // array1.push({
          //   name: "开始下跌22",
          //   index: index,
          //   time: time[index],
          //   num: item,
          //   num1: 1,
          // });
        }
      }

      if (
        this_data[index] > zsw[index] &&
        this_data[index - 1] < zsw[index - 1] &&
        this_data[index - 1] < this_data[index - 2]
      ) {
        // array1.push({
        //   name: "开始买入11",
        //   index: index,
        //   time: time[index],
        //   num: item,
        // });
      }
      if (
        this_data[index] > zcw3[index] &&
        this_data[index] > zcw[index] &&
        max_data[index] == max_data[index - 1] &&
        zcw[index - 1] <= zcw[index - 2] &&
        this_data[index - 2] < zcw3[index - 2]
      ) {
        array1.push({
          name: "开始买入21",
          index: index,
          time: time[index],
          num: item,
        });
      }
    } else {
      if (
        max_data[index] == max_data[index - 1] &&
        max_data[index - 1] == max_data[index - 2] &&
        max_data[index - 2] == max_data[index - 3]
      ) {
        if (
          this_data[index - 1] - this_data[index - 2] < 0 &&
          zcw3[index] < zcw3[index - 1] &&
          zcw3[index - 1] == zcw3[index - 2] &&
          zcw3[index - 2] == zcw3[index - 3] &&
          parseInt(zsw[index - 1]) - parseInt(this_data[index - 1]) > 0
        ) {
          // array1.push({
          //   name: "开始触底21",
          //   index: index,
          //   time: time[index],
          //   num: item,
          // });
        }
      }
    }
  });
  return array1;
}

//初始化数据,30天数据
export const initMaxMinSection = (dataLoss) => {
  dataLoss = JSON.parse(JSON.stringify(dataLoss));

  //近30日支撑位
  let max30 = dataLoss.deal_data2.max_num1;
  let max_num_level_item30 = [];
  let min30 = dataLoss.deal_data2.min_num1;
  let zcw3_num = dataLoss.deal_data2.zcw3;
  let zsw_num = dataLoss.deal_data2.zsw_array;
  let zcw_num = dataLoss.deal_data2.zcw_array;
  let this_num = dataLoss.this_data_num;
  //最小值
  let min_num_level_item30 = [];
  //计算周期
  let period_30_max_num_level = [];
  let start_period = undefined;
  //评价值
  let appraise_30_num_level = [];
  appraise_30_num_level = appraiseNum(
    dataLoss.deal_data2.zcw3,
    dataLoss.this_data_num,
    dataLoss.this_data,
    zsw_num,
    min30,
    max30,
    zcw_num
  );

  max30.forEach((item, index) => {
    let typeOf1 = dealMdata(this_num, max30, min30, zcw3_num, zsw_num, index);

    if (index > 0) {
      let this_active_num = (
        ((min30[index] - this_num[index]) / (max30[index] - min30[index])) *
        100
      ).toFixed(1);

      if (
        Math.abs(this_active_num) < 2 &&
        this_num[index - 2] - this_num[index - 3] > 0
      ) {
        // max_num_level_item30.push({
        //   name: "开始触底31",
        //   index: index,
        //   time: dataLoss.this_data[index],
        //   num: max30[index],
        // });
      }

      //判断是不是等于
      if (max30[index] != max30[index - 1]) {
        if (max30[index - 1] == max30[index - 2]) {
          let max_this_num = (max30[index] - this_num[index]) / this_num[index];
          if (min30[index] == min30[index - 1]) {
            if (zcw3_num[index] < this_num[index]) {
              if (
                min30[index - 1] == min30[index - 2] &&
                max30[index - 1] != min30[index - 3] &&
                this_num[index - 1] - this_num[index - 2] > 0 &&
                this_num[index] - this_num[index - 1] > 0
              ) {
                if (max30[index] - max30[index - 1] > 0) {
                } else {
                  max_num_level_item30.push({
                    name: "开始下跌",
                    index: index,
                    time: dataLoss.this_data[index],
                    num: max30[index],
                  });
                }
              }
            }
          }
        }

        if (start_period != undefined) {
          period_30_max_num_level.push({
            start: start_period,
            end: index,
            //累计次数zc
            period: index - start_period + 1,
            start_num: max30[start_period],
            end_num: max30[index],
            start_time: dataLoss.this_data[start_period],
            end_time: dataLoss.this_data[index],
          });
          start_period = undefined;
        }
        //等于判断上升 还是下降
      } else {
        if (index == max30.length - 1) {
          if (
            item ==
            period_30_max_num_level[period_30_max_num_level.length - 1].end_num
          ) {
            let end_data =
              period_30_max_num_level[period_30_max_num_level.length - 1];
            period_30_max_num_level.push({
              start: end_data.end,
              end: index,
              //累计次数
              period: index - end_data.end + 1,
              start_num: max30[end_data.end],
              end_num: max30[index],
              start_time: dataLoss.this_data[end_data.end],
              end_time: dataLoss.this_data[index],
            });
          }
        }
        if (start_period == undefined) {
          start_period = index;
        }
      }
    }
  });

  return {
    period_30_max_num_level: {
      name: "计算最大值横盘周期",
      num: period_30_max_num_level,
    },
    max_num_level_item30: {
      name: "最大值开始下跌位置",
      num: max_num_level_item30,
    },
    min_num_level_item30: {
      name: "最小值开始触底位置",
      num: min_num_level_item30,
    },
    appraise_30_num_level: {
      name: "近30日支撑位位置变化",
      num: appraise_30_num_level,
    },
  };
};
export default {
  initMaxMinLarge,
  initMaxMinSection,
};
