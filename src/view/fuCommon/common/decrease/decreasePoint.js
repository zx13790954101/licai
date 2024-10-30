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
  let araay1 = [
    this_data, max_data, min_data, zcw_data, zsw_num
  ]
  for (let index = 0; index < 5; index++) {
    let item_array = [
      araay1[index][index2] - araay1[index][index2 - 1] > 0,
      araay1[index][index2] - araay1[index][index2 - 1] < 0,
      araay1[index][index2] != araay1[index][index2 - 1],
      araay1[index][index2] == araay1[index][index2 - 1]
    ];
    end_araay.push(item_array)
  }
  return end_araay
}

function appraiseNum(zcw3, this_data, time, zsw, min_data, max_data) {
  let array1 = [];
  zcw3.forEach((item, index) => {
    let this_data_type = this_data[index] - this_data[index - 1];
    this_data_type = this_data_type > 0;
    if (this_data_type) {
      if (zcw3[index - 1] == zcw3[index - 2]) {
        if (zcw3[index] != zcw3[index - 1]) {
          if (this_data[index - 1] - this_data[index - 2] > 0) {
            if (this_data[index] > item) {
              if (item - zcw3[index - 1] > 0 &&
                min_data[index] != min_data[index - 1]
              ) {

                // array1.push({
                //   name: "开始下跌",
                //   index: index,
                //   time: time[index],
                //   num: item,
                // });
              }

            }

          }
        }
      }
    } else {
      if (zcw3[index - 1] == zcw3[index - 2]) {
        if (zcw3[index] != zcw3[index - 1] &&
          min_data[index] == min_data[index - 1] &&
          this_data[index] - this_data[index - 1] < 0
        ) {
          array1.push({
            name: "开始触底",
            index: index,
            time: time[index],
            num: item,
          });
        }
      }
    }

  })
  return array1;
}

//初始化数据,止跌的买卖推荐
export const initZhiDie = (dataLoss) => {
  dataLoss = JSON.parse(JSON.stringify(dataLoss));

  //近30日支撑位
  let zhidie = dataLoss.deal_data2.ji_zhidie.reverse();
  let zhidie_array = [];
  let zdf_min = dataLoss.deal_data2.zdf_min_array;
  let zdf_max = dataLoss.deal_data2.zdf_max_array;
  let this_num = dataLoss.this_data_num
  //评价值


  zhidie.forEach((item, index) => {
    if (index > 0) {
      //判断是不是等于
      if (zhidie[index - 1] == zhidie[index - 2]) {
        if (zdf_min[index - 1] == zdf_min[index - 2]) {

          if (zhidie[index] - zhidie[index - 1] > 0) {
            if (zdf_min[index] - zdf_min[index - 1] < 0) {
              if (this_num[index - 1] - this_num[index - 2] < 0) {
                zhidie_array.push({
                  name: "开始买入",
                  index: index,
                  time: dataLoss.this_data[index],
                  num: zhidie[index],
                });
              }
            }
          }

          if (
            this_num[index] - this_num[index - 1] > 0 &&
            zdf_min[index - 2] - zdf_min[index - 3] > 0 &&
            zdf_min[index - 1] == zdf_min[index - 2] &&
            zdf_min[index] == zdf_min[index - 1] &&
            zhidie[index] == zhidie[index - 1] &&
            zhidie[index - 2] - zhidie[index - 3] > 0 &&
            zdf_max[index] == zdf_max[index - 1]
          ) {
            zhidie_array.push({
              name: "开始下跌",
              index: index,
              time: dataLoss.this_data[index],
              num: zhidie[index],
              num1: 1
            });
          }




        }
      } else {

        if (
          this_num[index - 1] - this_num[index - 2] < 0 &&
          this_num[index] - this_num[index - 1] > 0 &&
          this_num[index - 2] - this_num[index - 3] > 0 &&
          zdf_min[index - 2] == zdf_min[index - 3] &&
          zdf_min[index - 1] != zdf_min[index - 2] &&
          zdf_min[index] == zdf_min[index - 1] &&
          zhidie[index] == zhidie[index - 1] &&
          zhidie[index - 1] != zhidie[index - 2] &&
          zdf_max[index] == zdf_max[index - 1] &&
          zdf_max[index - 1] == zdf_max[index - 2] &&
          zdf_max[index - 2] == zdf_max[index - 3]
        ) {
          let type1 = zhidie[index - 1] - zhidie[index - 2] < 0 &&
            zdf_min[index - 1] - zdf_min[index - 2] > 0;
          let type2 = zhidie[index - 1] - zhidie[index - 2] > 0 &&
            zdf_min[index - 1] - zdf_min[index - 2] < 0
          if (type1 || type2) {
            zhidie_array.push({
              name: "开始下跌",
              index: index,
              time: dataLoss.this_data[index],
              num: zhidie[index],
              num1: 1
            });
          }

        }
        //卖出
        if (
          this_num[index - 1] - this_num[index - 2] > 0 &&
          this_num[index - 2] - this_num[index - 3] > 0
        ) {} else {
          if (this_num[index] - this_num[index - 1] > 0 &&
            zdf_min[index - 2] == zdf_min[index - 3] &&
            zdf_min[index] == zdf_min[index - 1] &&
            zdf_min[index - 1] == zdf_min[index - 2] &&
            zhidie[index] == zhidie[index - 1] &&
            zhidie[index - 2] == zhidie[index - 3] &&
            zhidie[index - 1] > zhidie[index - 2] &&
            zdf_max[index] == zdf_max[index - 1]
          ) {
            zhidie_array.push({
              name: "开始下跌",
              index: index,
              time: dataLoss.this_data[index],
              num: zhidie[index],
              num1: 1
            });
          }
        }






      }
    }
  });

  return {
    zhidie_array: {
      name: '止跌买入卖出',
      num: zhidie_array,
    },
  };
}

//收盘价-最高值-最低价-最高值-收盘价
export const initMaxMinSpj = (dataLoss) => {
  dataLoss = JSON.parse(JSON.stringify(dataLoss));

  //近30日支撑位
  let this_num = dataLoss.this_data_num
  let maxMinSpj_array = [];
  let max_spj_array = dataLoss.max_spj_array;
  let spj_min_array = dataLoss.spj_min_array;
  let spj_max_min_array = dataLoss.spj_max_min_array
  //评价值


  spj_max_min_array.forEach((item, index) => {
    if (index > 0) {
      //判断是不是等于
       if (this_num[index] - this_num[index - 1] > 0 &&
        this_num[index-1] - this_num[index - 2] > 0
       ){
        if (spj_max_min_array[index]<0){
          if (spj_max_min_array[index] - spj_max_min_array[index - 1] > 0
            && spj_max_min_array[index-1] - spj_max_min_array[index - 2] < 0) {
              maxMinSpj_array.push({
                name: "开始下跌111",
                index: index,
                time: dataLoss.this_data[index],
                num: spj_max_min_array[index],
                num1: 1
              });

          }
        }
        
       }else{

       }
    }
  });

  return {
    zhidie_array: {
      name: '收盘价-最高值-最低价',
      num: maxMinSpj_array,
    },
  };
}
//10天内连续
export const init10TimeData = (dataLoss) => {
  dataLoss = JSON.parse(JSON.stringify(dataLoss));

  //近30日支撑位
  let this_num = dataLoss.this_num
  let diefu_data_array = [];
  let diefu_data10 = dataLoss.diefu_data10;
  //评价值
console.log("diefu_data10", diefu_data10)

  diefu_data10.forEach((item, index) => {
    if (index > 0) {
      //判断是不是等于
          if (
            this_num[index - 1] - this_num[index - 2] > 0 &&
             parseFloat(diefu_data10[index]) > parseFloat(diefu_data10[index - 1]) &&
             parseFloat(diefu_data10[index - 1]) == parseFloat(diefu_data10[index - 2]) &&
             parseFloat(diefu_data10[index - 2]) == parseFloat(diefu_data10[index - 3])&&
             parseFloat(diefu_data10[index - 3]) == parseFloat(diefu_data10[index - 4]) &&
             parseFloat(diefu_data10[index - 4]) == parseFloat(diefu_data10[index - 5])
            ) {
              diefu_data_array.push({
                name: "开始下跌",
                index: index,
                time: dataLoss.time[index],
                num: this_num[index],
                num1: 1
              });
      } else {
      }
    }
  });

  return {
    zhidie_array: {
      name: '收盘价-最高值-最低价',
      num: diefu_data_array,
    },
  };
}

export default {
  initZhiDie,
  initMaxMinSpj,
  init10TimeData
}
