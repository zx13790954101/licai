function itemFun(num1, this_time, item) {
  let type1 = ["买进", "卖出", "持有", "加仓", "等待"];
  switch (num1) {
    case 0:
      return {
        name: "买卖操作逻辑",
          value: type1[num1],
          xAxis: this_time,
          yAxis: parseFloat(item),
      };

      break;
    case 1:
      return {
        name: "买卖操作逻辑",
          value: type1[num1],
          xAxis: this_time,
          yAxis: parseFloat(item),
          itemStyle: num1 == 1 ? {
            color: "red",
          } : '',
      };
      break;
    default:
      break;
  }
}

//处理echarts markpoint
//个股的数值，判断的资金数值，时间,成交额
export const dealBj3 = (deal_data, deal_data2, deal_data3, this_time, this_data) => {
  let array1 = [];
  let type1 = ["买进", "卖出", "持有", "加仓", "等待"];
  let data1_max = Math.max(...deal_data);
  let data1_min = Math.min(...deal_data);
  let data1_max2 = Math.max(...deal_data2);
  let data1_min2 = Math.min(...deal_data2);
  //使用比例来计算
  deal_data.forEach((item, index) => {
    //数值的范围
    if (item < data1_min * 0.30) {
      //排除第一个的数据
      if (index != 0) {
        if (this_data[index] - this_data[index - 1] < 0) {
          if (deal_data2[index] - deal_data2[index - 1] > 0) {
            //判断是不是小于0
            //设置字段

            if (deal_data[index - 1] < 0) {
              array1.push(itemFun(0, this_time[index], item));
            }

          }
        }

      }
    } else if (deal_data[index] > data1_max * 0.35) {


    }
  });
  return array1;
}

export const dealYl3 = (deal_data, deal_data2, deal_data3, this_time, this_data) => {
  let array1 = [];
  //使用比例来计算
  deal_data.forEach((item, index) => {
    //数值的范围
    if (item > 0) {
      //排除第一个的数据
      if (this_data[index] - this_data[index - 1] > 0) {
        if (deal_data2[index] - deal_data2[index - 1] > 0) {
          if (deal_data3[index] - deal_data3[index - 1] > 0) {
            array1.push(itemFun(1, this_time[index], item));
          }

        }
      }
    } else {
      if (this_data[index] - this_data[index - 1] < 0) {
        if (deal_data2[index] - deal_data2[index - 1] < 0) {
          if (deal_data3[index] - deal_data3[index - 1] < 0) {
            array1.push(itemFun(0, this_time[index], item));
          }
        }
      }
    }
  });
  return array1;
}


export const dealBx3 = (deal_data, deal_data2, deal_data3, this_time, this_data) => {
  let array1 = [];
  let data1_max = Math.max(...deal_data);
  let data1_min = Math.min(...deal_data);
  let data1_max2 = Math.max(...deal_data2);
  let data1_min2 = Math.min(...deal_data2);
  //使用比例来计算
  deal_data.forEach((item, index) => {
    //数值的范围
    if (item > 0) {
      //排除第一个的数据
      if (this_data[index] - this_data[index - 1] < 0) {
        if (deal_data2[index] - deal_data2[index - 1] > 0) {
          if (deal_data[index - 1] < 0) {
            array1.push(itemFun(0, this_time[index], item));
          }

        }
      }

    } else {
      if (this_data[index] - this_data[index - 1] > 0) {
        if (-(deal_data2[index] - deal_data2[index - 1]) / deal_data2[index - 1] > 2) {
          array1.push(itemFun(1, this_time[index], item));

        }

      }
    }
  });
  return array1;
}



export const dealGf3 = (deal_data, deal_data2, deal_data3, this_time, this_data) => {
  let array1 = [];
  let data1_max = Math.max(...deal_data);
  let data1_min = Math.min(...deal_data);
  let data1_max2 = Math.max(...deal_data2);
  let data1_min2 = Math.min(...deal_data2);
  //使用比例来计算
  deal_data.forEach((item, index) => {
    //数值的范围
    if (item > 0) {
      //排除第一个的数据
      if (this_data[index] - this_data[index - 1] > 0) {
        if (deal_data2[index] - deal_data2[index - 1] < 0) {
          array1.push(itemFun(0, this_time[index], item));


          if (deal_data[index - 1] > -3000) {
            if (deal_data[index - 1] < 11000) {
              let num1 = parseFloat(deal_data2[index] - deal_data2[index - 1]) / deal_data2[index - 1]
              if (-num1 > 0.8 && -num1 < 3) {

              }

            }

          }



        }
      }

    } else {
      if (this_data[index] - this_data[index - 1] > 0) {
        if (-(deal_data2[index] - deal_data2[index - 1]) / deal_data2[index - 1] > 2) {
          //array1.push(itemFun(1, this_time[index], item));

        }

      }
    }
  });
  return array1;
}

export const dealMt3 = (deal_data, deal_data2, deal_data3, this_time, this_data) => {
  let array1 = [];
  let data1_max = Math.max(...deal_data);
  let data1_min = Math.min(...deal_data);
  let data1_max2 = Math.max(...deal_data2);
  let data1_min2 = Math.min(...deal_data2);
  //使用比例来计算
  deal_data.forEach((item, index) => {
    //数值的范围
    if (item > 0) {
      //排除第一个的数据
      if (this_data[index] - this_data[index - 1] < 0) {
        if (deal_data2[index] - deal_data2[index - 1] > 0) {
          if (deal_data[index - 1] < 0) {
            array1.push(itemFun(0, this_time[index], item));
          }

        }
      }

    } else {
      if (this_data[index] - this_data[index - 1] > 0) {
        if (-(deal_data2[index] - deal_data2[index - 1]) / deal_data2[index - 1] > 2) {
          array1.push(itemFun(1, this_time[index], item));

        }

      }
    }
  });
  return array1;
}


export const dealXp3 = (deal_data, deal_data2, deal_data3, this_time, this_data) => {
  let array1 = [];
  let data1_max = Math.max(...deal_data);
  let data1_min = Math.min(...deal_data);
  let data1_max2 = Math.max(...deal_data2);
  let data1_min2 = Math.min(...deal_data2);
  //使用比例来计算
  deal_data.forEach((item, index) => {
    //数值的范围
    if (item > 0) {
      //排除第一个的数据
      if (this_data[index] - this_data[index - 1] < 0) {
        if (deal_data2[index] - deal_data2[index - 1] > 0) {
          if (deal_data[index - 1] < 0) {
            array1.push(itemFun(0, this_time[index], item));
          }

        }
      }

    } else {
      if (this_data[index] - this_data[index - 1] > 0) {
        if (-(deal_data2[index] - deal_data2[index - 1]) / deal_data2[index - 1] > 2) {
          array1.push(itemFun(1, this_time[index], item));

        }

      }
    }
  });
  return array1;
}
export const dealXny3 = (deal_data, deal_data2, deal_data3, this_time, this_data) => {
  let array1 = [];
  let data1_max = Math.max(...deal_data);
  let data1_min = Math.min(...deal_data);
  let data1_max2 = Math.max(...deal_data2);
  let data1_min2 = Math.min(...deal_data2);
  //使用比例来计算
  deal_data.forEach((item, index) => {
    //数值的范围
    if (item > 0) {
      //排除第一个的数据
      if (this_data[index] - this_data[index - 1] < 0) {
        if (deal_data2[index] - deal_data2[index - 1] > 0) {
          if (deal_data[index - 1] < 0) {
            array1.push(itemFun(0, this_time[index], item));
          }

        }
      }

    } else {
      if (this_data[index] - this_data[index - 1] > 0) {
        if (-(deal_data2[index] - deal_data2[index - 1]) / deal_data2[index - 1] > 2) {
          array1.push(itemFun(1, this_time[index], item));

        }

      }
    }
  });
  return array1;
}

export default {
  dealBj3,
  dealYl3,
  dealBx3,
  dealGf3,
  dealMt3,
  dealXp3,
  dealXny3
}
