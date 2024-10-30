export const setMarkPoint = (this_num, data1, data2, nx_data, time1) => {
  let array1 = [];
  let type1 = ["买进", "卖出", "持有", "加仓", "等待"];
  this_num.forEach((item, index) => {
    let item_data2 = data2[index] - data2[index - 1];
    let item_data1 = data1[index] - data1[index - 1];
    let item_nx_data = nx_data[index] - nx_data[index - 1];
    let this_item = item - this_num[index - 1];

    if (item - this_num[index - 1] > 0) {
      if (item_nx_data < 0) {
        if (item_data2 < 0) {
          if (data1[index] > 0) {
            if (data2[index - 1] - data2[index - 2] < 0) {
              if (item_data2 / data2[index - 1] < -0.33) {
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

            if (this_num[index - 1] - this_num[index - 2] > 0) {
              if (nx_data[index - 1] - nx_data[index - 2] < 0) {
                if (data1[index - 2] < 0.5) {
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
        } else {
          if (data1[index] > 0) {
            if (data1[index] < 3) {
              if (item_data2 / data2[index - 1] < 0.4) {
                if (data1[index - 1] < 2) {
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
          }
        }
      } else {
        if (data1[index] > 0) {
          if (data2[index] - data2[index - 1] < 0) {
            if (nx_data[index - 1] - nx_data[index - 2] < 0) {
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
          } else {
            if (nx_data[index] - nx_data[index - 1] > 0) {
              if (nx_data[index - 1] - nx_data[index - 2] > 0) {
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
        }
      }
    } else {
      if (parseFloat(data1[index]) < 0) {
        if (item_data2 < 0) {
          if (item_nx_data < 0) {
            if (data1[index - 1] > 0) {
              if (nx_data[index - 1] - nx_data[index - 2] >= -1) {
                if (item_nx_data > -50) {
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
        } else {
          if (item_nx_data < 0) {
            if (data1[index] > -4) {
              if (data1[index - 1] < 1) {
                if (this_num[index - 1] - this_num[index - 2] > 0) {
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
          } else {
            if (data1[index - 2] < 0) {
              if (data2[index - 1] - data2[index - 2] > 0) {
                if (item_data1 > 0) {
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

  return [{
    data: array1,
  }, ];
}
//恒生科技
export const setMarkPoint2 = (this_num, data1, data2, nx_data, time1) => {
  let array1 = [];
  let type1 = ["买进", "卖出", "持有", "加仓", "等待"];
  this_num.forEach((item, index) => {
    let item_data2 = data2[index] - data2[index - 1];
    let item_data1 = data1[index] - data1[index - 1];
    let item_nx_data = nx_data[index] - nx_data[index - 1];
    let this_item = item - this_num[index - 1];

    if (item - this_num[index - 1] > 0) {


      if (data1[index] > 0) {
        if (item_data2 > 0) {
          if (item_nx_data > 0) {
            if (data1[index - 1] > 0) {
              if (nx_data[index - 1] - nx_data[index - 2] < 0) {
                if (data1[index - 2] > 0) {} else {
                  if (data2[index - 1] - data2[index - 2] < 0) {
                    if (item_data1 < 0) {

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
              }

            }

          } else {
            if (data1[index - 1] > 0 && data2[index - 1] - data2[index - 2] < 0) {
              if (data1[index - 2] > 0) {
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
          if (item_nx_data < 0) {
            if (data1[index - 1] > 0 && item_data1 < 0 && data1[index - 2] > 0) {
              if (data1[index - 1] - data1[index - 2] > 0) {
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
        }
      }

    } else {


      if (item_data2 < 0) {
        if (item_nx_data < 0) {

          if (data1[index] < 0 && data1[index - 1] > 0 && data1[index - 2] < 0) {
            if (data2[index - 1] - data2[index - 2] < 0) {
              if (nx_data[index - 1] - nx_data[index - 2] < 0) {
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

        } else {
          if (data1[index] < 0) {
            if (data1[index - 1] > 0) {
              if (data2[index - 1] - data2[index - 2] < 0) {
                if (data1[index - 2] > 0 && data1[index - 3] > 0) {
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
      } else {
        if (item_nx_data < 0) {
          if (nx_data[index - 1] - nx_data[index - 2] < 0) {
            if (data1[index] < 0 && data1[index - 1] < 0 && data1[index - 2] < 0) {
              if (data2[index - 1] - data2[index - 2] > 0) {
                if (data1[index - 3] > 0) {
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
          } else {
            if (data1[index] < 0 && data1[index - 1] < 0) {
              if (data2[index - 1] - data2[index - 2] > 0) {
                if (this_num[index - 1] - this_num[index - 2] < 0) {
                  if (data1[index - 2] > 0 && data1[index] > -2) {
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



    }
  });

  return [{
    data: array1,
  }, ];
}

export default {
  setMarkPoint,
  setMarkPoint2
}
