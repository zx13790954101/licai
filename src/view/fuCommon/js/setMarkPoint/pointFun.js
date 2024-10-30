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
//判断的资金数值，时间,成交额,个股的数值，
export const dealBj = (this_time, deal_data2, this_data, d_data, x_data) => {


  let array1 = [];
  deal_data2.forEach((item, index) => {
    let this_data_item = this_data[index] - this_data[index - 1]
    let deal_data2_item = deal_data2[index] - deal_data2[index - 1];
    let x_data_item = x_data[index] - x_data[index - 1]
    let d_data_item = d_data[index] - d_data[index - 1]
    if (index == 0) return;
    let this_item1 = this_data_item >= 0
    let iflag1_item1 = this_item1 &&
      d_data[index] < 0 &&
      deal_data2_item < 0 &&
      x_data_item > 0 && x_data[index - 1] - x_data[index - 2] < 0 &&
      parseFloat(d_data[index]) < parseFloat(d_data[index - 1])

    let iflag1_item2 = this_item1 &&
      d_data[index] < 0 &&
      deal_data2_item >= 0 && x_data_item > 0 &&
      deal_data2[index - 1] - deal_data2[index - 2] < 0 && d_data[index - 2] > 0

    let iflag1_item3 = this_item1 &&
      d_data[index] > 0 && deal_data2_item < 0 && this_data_item > 10 &&
      d_data[index - 1] < 0
    let iflag1_item4 = this_item1 &&
      d_data[index] > 0 && deal_data2_item >= 0 &&
      x_data_item >= -20 && d_data[index - 1] > 0 &&
      d_data_item < 0 && deal_data2[index - 1] - deal_data2[index - 2] > 0


    let zc = iflag1_item1 || iflag1_item2 || iflag1_item3 || iflag1_item4;
    let iflag2_item1 = !this_item1 && x_data_item < 0 &&
      deal_data2_item <= 0 && d_data[index] < 0 &&
      d_data[index - 2] > 0 && d_data[index] > -10000 && d_data[index - 3] < 0 &&
      d_data[index - 4] < 0

    let iflag2_item2 = this_data_item < 0 && x_data_item >= 0 &&
      parseFloat(d_data[index]) < -100 && deal_data2_item < 0 &&
      deal_data2[index - 1] - deal_data2[index - 2] > 0 &&
      deal_data2[index - 1] - deal_data2[index - 2] < 40 && parseFloat(d_data[index]) > -10000 &&
      d_data[index - 1] < 0

    let iflag2_item3 = this_data_item < 0 && x_data_item >= 0 &&
      d_data[index] < 0 && deal_data2_item < 0 &&
      deal_data2[index - 1] - deal_data2[index - 2] <= 0 &&
      deal_data2[index - 2] - deal_data2[index - 3] < 0 &&
      this_data[index - 2] - this_data[index - 3] < 0


    let iflag2_item4 = this_data_item < 0 && x_data_item >= 0 &&
      d_data[index] >= 0 && deal_data2_item > 0 &&
      x_data[index - 1] - x_data[index - 2] < 0 &&
      d_data[index - 1] < 0

    let iflag1_item5 = this_data_item > 0 && x_data_item >= 0 &&
      d_data[index] <= 0 && deal_data2_item < 0 && d_data_item > 0 &&
      d_data_item / d_data[index - 1] > -0.8 &&
      (this_data[index - 1] - this_data[index - 2]) / this_data[index - 2] > -0.03


    let iflag1_item6 = this_data_item < 0 && x_data_item >= 0 &&
      d_data[index] <= 0 && deal_data2_item < 0 && d_data[index - 1] < 0 &&
      this_data[index - 1] - this_data[index - 2] < 0 && x_data[index - 1] - x_data[index - 2] < 0 &&
      deal_data2[index - 1] - deal_data2[index - 2] < 0 && x_data[index - 2] - x_data[index - 3] > 0

    let jc = iflag1_item6 || iflag2_item1 || iflag2_item2 || iflag2_item3 || iflag2_item4 || iflag1_item5


    if (zc) {
      array1.push(itemFun(1, this_time[index], item));
    } else if (jc) {
      array1.push(itemFun(0, this_time[index], item));
    }

  });

  return array1;
}
export const dealYl = (this_time, deal_data2, this_data, d_data, x_data) => {

  let array1 = [];
  deal_data2.forEach((item, index) => {
    let this_data_item = parseFloat(this_data[index] - this_data[index - 1])
    let deal_data2_item = deal_data2[index] - deal_data2[index - 1];
    let x_data_item = x_data[index] - x_data[index - 1]
    let d_data_item = d_data[index] - d_data[index - 1]
    if (index == 0) return;
    //数值的范围
    if (this_data_item > 0) {
      if (deal_data2_item < 0) {
        if (x_data_item < 0) {
          if (d_data[index] < 0) {
            if (d_data[index - 1] < 0) {
              if (d_data_item < 0) {
                if (this_data[index - 1] - this_data[index - 2] < 0) {
                  array1.push(itemFun(1, this_time[index], item));
                }
              }
            }
          }
        }
      } else {
        if (x_data_item < 0) {

          if (d_data[index] > 0 && d_data[index - 1] > 0) {
            if (x_data[index - 1] - x_data[index - 2] > 0) {
              array1.push(itemFun(1, this_time[index], item));
            }


          } else {
            if (deal_data2[index - 1] - deal_data2[index - 2] < 0) {
              if (x_data[index - 1] - x_data[index - 2] > 0) {
                if (d_data[index - 2] < 0) {
                  if (this_data[index - 1] - this_data[index - 2] > 0.2) {
                    array1.push(itemFun(1, this_time[index], item));
                  }

                }

              }

            }

          }


        } else {
          if (d_data[index] < 0 && d_data[index - 1] < 0) {
            if (d_data_item > 0 && d_data[index - 2] > 0) {
              if (x_data[index - 2] - x_data[index - 3] > 0) {
                array1.push(itemFun(1, this_time[index], item));
              }

            }


          } else {
            if (d_data[index] > 0) {
              if (d_data[index - 1] > 0) {
                if (this_data[index - 1] - this_data[index - 2] > 0) {
                  if (d_data[index - 2] < 0) {
                    array1.push(itemFun(0, this_time[index], item));
                  } else {
                    if (d_data[index - 1] - d_data[index - 2] > 0) {
                      array1.push(itemFun(1, this_time[index], item));
                    } else {
                      array1.push(itemFun(0, this_time[index], item));
                    }

                  }

                }

              }

            }

          }
        }
      }

    } else {

      if (deal_data2_item < 0) {
        if (x_data_item < 0) {
          if (d_data[index] > 0) {
            if (this_data[index - 1] - this_data[index - 2] < 0) {
              array1.push(itemFun(0, this_time[index], item));
            }

          }
        } else {
          if (d_data[index] < 0) {
            if (deal_data2[index - 1] - deal_data2[index - 2] > 0) {
              if (d_data_item < 0) {
                if (d_data[index - 1] < 0) {
                  if (x_data[index - 1] - x_data[index - 2] < 0) {
                    array1.push(itemFun(0, this_time[index], item));
                  }

                }

              }

            }

          }
        }
      }

    }




  });
  return array1;
}


//光伏，成交额，当前的股价  大单，小单
export const dealBx = (this_time, deal_data2, this_data, d_data, x_data) => {


  let array1 = [];
  deal_data2.forEach((item, index) => {
    let this_data_item = this_data[index] - this_data[index - 1]
    let deal_data2_item = deal_data2[index] - deal_data2[index - 1];
    let x_data_item = x_data[index] - x_data[index - 1]
    let d_data_item = d_data[index] - d_data[index - 1];
    let this_item2 = this_data[index - 1] - this_data[index - 2]
    if (index == 0) return;
    //数值的范围
    if (this_data_item > 0) {
      if (d_data[index] < 0) {

        //排除第一个的数据
        //判断是不是小于0s
        //设置字段
        //判断成交额是不是大于0
        if (deal_data2_item > 0) {

          if (x_data_item / x_data[index - 1] > -1) {
            if (d_data_item < 0) {

              if (!(x_data_item < 0 && x_data[index - 1] - x_data[index - 2] < 0)) {

                if (deal_data2[index] - deal_data2[index - 1] > 0) {

                  if (d_data[index - 1] > 0) {} else {

                    if (d_data[index - 1] - d_data[index - 2] > 0) {
                      array1.push(itemFun(1, this_time[index], item));
                    }

                  }

                }

              }

            } else {
              if (this_data[index - 1] - this_data[index - 2] > 0) {
                if (d_data[index - 2] < 0) {
                  if (d_data_item > 0) {
                    if (d_data[index - 1] - d_data[index - 2] > 0) {
                      array1.push(itemFun(1, this_time[index], item));
                    }

                  }

                }

              }

            }

          }


        }

      } else {
        if (deal_data2_item > 0) {
          if (x_data_item > 0) {

            if (x_data[index - 1] - x_data[index - 2] < 0) {

              if (d_data[index - 2] > 0) {
                if (d_data[index - 1] < 0) {
                  array1.push(itemFun(1, this_time[index], item));

                }
              } else {
                if (deal_data2[index - 1] - deal_data2[index - 2] < 0) {
                  if (x_data[index - 2] - x_data[index - 3] < 0) {
                    array1.push(itemFun(1, this_time[index], item));
                  } else {
                    array1.push(itemFun(0, this_time[index], item));
                  }

                }

              }

            }



          }

        }
      }
    } else {

      if (deal_data2_item > 0) {

        if (d_data[index] > 0) {
          if (d_data_item > 0) {

            if (this_item2 < 0) {
              if (d_data[index - 1] < 0) {
                if (d_data[index] < 15000) {
                  if (d_data[index - 2] > 0) {
                    if (x_data[index - 1] - x_data[index - 2] < 0) {
                      array1.push(itemFun(0, this_time[index], item));
                    }
                  }

                }
              }


            }

          }
        } else {
          if (this_item2 < 0) {
            if (d_data_item > 0) {
              if (d_data[index - 2] < 0) {
                array1.push(itemFun(0, this_time[index], item));
              }

            } else {
              if (x_data_item < 0) {
                if (this_data[index - 1] - this_data[index - 2] < 0) {
                  if (d_data[index - 1] < 0) {
                    if (this_data[index - 2] - this_data[index - 3] > 0) {
                      array1.push(itemFun(0, this_time[index], item));
                    }

                  }

                }

              }
            }

          } else {
            if (x_data_item > 0) {
              if (d_data[index - 1] > 0) {
                array1.push(itemFun(0, this_time[index], item));
              }

            }
          }

        }
      } else {

        if (x_data_item < 0) {
          if (x_data[index - 1] - x_data[index - 2] > 0) {
            if (d_data[index] < 0) {
              if (d_data[index - 1] < 0) {
                if (d_data[index - 2] > 0) {
                  if (d_data_item > 0) {}

                }

              }

            } else {
              if (d_data[index - 1] < 0) {

                if (d_data[index - 2] < 0) {
                  array1.push(itemFun(0, this_time[index], item));
                }

              }
            }

          }

        }






      }

    }
  });
  return array1;
}

//光伏，涨跌幅，成交额，当前的股价  大单，小单
export const dealGf = (this_time, deal_data2, this_data, d_data, x_data) => {

  let array1 = [];
  deal_data2.forEach((item, index) => {
    let this_data_item = this_data[index] - this_data[index - 1]
    let deal_data2_item = deal_data2[index] - deal_data2[index - 1];
    let x_data_item = x_data[index] - x_data[index - 1]
    let d_data_item = d_data[index] - d_data[index - 1]
    if (index == 0) return;
    //数值的范围
    if (this_data_item > 0) {
      if (d_data[index] < 0) {

        //排除第一个的数据
        //判断是不是小于0s
        //设置字段
        //判断成交额是不是大于0


        if (x_data[index] - x_data[index - 1] < 0) {
          if (deal_data2_item > 0) {
            if (d_data[index - 1] - d_data[index - 2] < 0) {
              if (d_data[index - 1] > 0) {
                if (d_data[index - 3] > 0) {
                  if (deal_data2[index - 1] - deal_data2[index - 2] < 0) {
                    array1.push(itemFun(1, this_time[index], item));
                  }

                }

              } else {
                if (d_data[index - 2] < 0) {

                  if (deal_data2_item > 1) {
                    if (this_data[index - 1] - this_data[index - 2] > 0) {
                      array1.push(itemFun(1, this_time[index], item));
                    }

                  }

                }
              }

            }

          } else {
            if (d_data[index - 1] < 0) {
              if (d_data[index] - d_data[index - 1] < 0) {
                if ((x_data[index] - x_data[index - 1]) / x_data[index - 1] > -0.59) {
                  array1.push(itemFun(1, this_time[index], item));
                }

              }


            }

          }

        } else {
          if (deal_data2_item < 0) {
            array1.push(itemFun(1, this_time[index], item));

          }
        }


      } else {
        if (deal_data2_item > 0) {
          if (x_data_item < 0) {
            if (d_data[index - 1] > 0) {
              if (deal_data2[index - 1] - deal_data2[index - 2] < 0) {
                if (d_data_item > 0) {
                  array1.push(itemFun(1, this_time[index], item));
                }

              }

            }


          }

        }
      }
    } else {

      if (x_data_item < 0) {
        if (deal_data2_item > 0) {

          if (d_data[index] < 0) {
            //  let end1 = parseFloat(deal_data[index - 2]) + parseFloat(deal_data[index - 3])
            if (d_data[index - 1] > 0) {
              if (d_data[index - 3] > 0) {
                array1.push(itemFun(0, this_time[index], item));
              }

            }

          }

        } else {

          if (d_data[index] > 0) {
            //  let end1 = parseFloat(deal_data[index - 2]) + parseFloat(deal_data[index - 3])
            if (deal_data2[index - 1] - deal_data2[index - 2] > 0) {
              if (this_data[index - 1] - this_data[index - 2] < 0) {
                if (d_data[index - 1] > 0) {
                  if (d_data[index] - d_data[index - 1] > 0) {
                    array1.push(itemFun(0, this_time[index], item));
                  }

                }

              }

            }
          }

        }

      } else {
        if (d_data[index] > 0) {
          if (deal_data2_item > 0) {
            if (d_data[index - 1] > 0) {
              if (d_data[index] - d_data[index - 1] > 0) {
                array1.push(itemFun(0, this_time[index], item));
              }

            }



          }
        } else {
          if (this_data[index] - this_data[index - 1] < 0) {
            if (d_data[index - 1] > 0) {
              if (d_data[index - 2] < 0) {
                if (x_data[index - 1] - x_data[index - 2] < 0) {
                  array1.push(itemFun(0, this_time[index], item));
                }

              }

            }

          }
        }
      }


    }
  });
  return array1;
}

export const dealMt = (this_time, deal_data2, this_data, d_data, x_data) => {
  let array1 = [];
  deal_data2.forEach((item, index) => {
    let this_item = this_data[index] - this_data[index - 1]
    let data2_item = deal_data2[index] - deal_data2[index - 1];
    let x_item = x_data[index] - x_data[index - 1]
    let d_item = d_data[index] - d_data[index - 1]
    let d_big = d_data[index] > 0
    if (index == 0) return;
    //数值的范围
    let iflag1_item1 = this_item > 0 &&
      d_data[index] < 0 && x_item < 0 && data2_item < 0 &&
      deal_data2[index - 1] - deal_data2[index - 2] < 0 &&
      d_data[index - 1] > 0 && d_data[index - 3] > 0
    let iflag1_item2 = this_item > 0 &&
      d_big && x_item > 0 && data2_item > 0 && d_item < 0 &&
      d_data[index - 2] > 0 &&
      this_data[index - 1] - this_data[index - 2] > 0
    let iflag1_item3 = this_item > 0 &&
      d_big && x_item < 0 && data2_item < 0 && d_data[index - 1] > 0 &&
      deal_data2[index - 1] - deal_data2[index - 2] > 0

    let iflag1 = iflag1_item1 || iflag1_item2 || iflag1_item3;

    let iflag2_item1 = this_item < 0 &&
      data2_item > 0 && x_item > 0 && d_data[index] < 0 && d_data[index - 1] > 0
    let iflag2_item2 = this_item <= 0 &&
      data2_item < 0 && x_item < 0 && d_data[index] < 0 && d_data[index - 1] > 0 &&
      deal_data2[index - 1] - deal_data2[index - 2] < 0 && d_data[index - 2] > 0
    let iflag2_item3 = this_item < 0 &&
      data2_item > 0 && x_item > 0 && d_data[index] > 0 && d_data[index - 1] < 0 &&
      deal_data2[index - 1] - deal_data2[index - 2] > 0 && x_data[index - 1] - x_data[index - 2] < 0 &&
      deal_data2[index - 2] - deal_data2[index - 3] < 0
    let iflag2_item4 = this_item < 0 &&
      data2_item > 0 && x_item < 0 && d_data[index] < 0 && deal_data2[index - 1] - deal_data2[index - 2] < 0 &&
      d_data[index - 1] < 0 && x_data[index - 1] - x_data[index - 2] < 0
    let iflag2 = iflag2_item1 || iflag2_item2 || iflag2_item3 || iflag2_item4


    if (iflag1) {
      array1.push(itemFun(1, this_time[index], item));
    } else if (iflag2) {
      array1.push(itemFun(0, this_time[index], item));
    }
  });
  return array1;
}
export const dealXp = (this_time, deal_data2, this_data, d_data, x_data) => {


  let array1 = [];
  deal_data2.forEach((item, index) => {
    let this_data_item = this_data[index] - this_data[index - 1]
    let deal_data2_item = deal_data2[index] - deal_data2[index - 1];
    let x_data_item = parseFloat(x_data[index]) - parseFloat(x_data[index - 1])
    let d_data_item = parseFloat(d_data[index]) - parseFloat(d_data[index - 1])
    if (index == 0) return;
    //数值的范围
    if (this_data_item > 0) {
      if (parseFloat(d_data[index]) < 0) {

        //排除第一个的数据
        //判断是不是小于0s
        //设置字段
        //判断成交额是不是大于0
        if (deal_data2_item > 0) {
          if (x_data_item > 0) {
            if (x_data_item / x_data[index - 1] > -1) {

              if (x_data[index - 1] - x_data[index - 2] > 0) {
                array1.push(itemFun(1, this_time[index], item));
              }

            }
          }



        } else {
          if (x_data[index] - x_data[index - 1] < 0) {
            if (d_data[index - 3] < 0) {
              array1.push(itemFun(1, this_time[index], item));
            }

          }

        }

      } else {
        if (x_data_item < 0) {
          if (deal_data2_item > 0) {
            if (d_data[index - 1] > 0) {
              if (d_data_item < 0) {
                array1.push(itemFun(1, this_time[index], item));
              }


            }

          }

        }
      }
    } else {

      if (x_data_item < 0) {


        if (deal_data2_item > 0) {
          if (d_data[index] < 0) {
            if (d_data[index - 1] > 0) {

              if (d_data[index - 2] < 1000) {
                if (deal_data2[index - 1] - deal_data2[index - 2] > 0) {
                  array1.push(itemFun(0, this_time[index], item));
                }

              }
            }

          }

        } else {
          if (d_data[index] < 0) {

            if (x_data[index - 1] - x_data[index - 2] > 0) {
              if (d_data[index - 1] < 0) {
                if (deal_data2[index - 1] - deal_data2[index - 2] < 0) {
                  if (d_data[index - 2] > 0) {
                    array1.push(itemFun(0, this_time[index], item));
                  }

                }

              } else {

                if (this_data_item / this_data[index - 1] > -0.045) {
                  if (d_data[index - 2] < 0) {
                    if (d_data[index - 1] > 0) {

                      if (this_data[index - 1] - this_data[index - 2] > 0) {

                        if (d_data[index - 3] < 0) {
                          array1.push(itemFun(0, this_time[index], item));
                        }

                      }

                    }

                  }

                }

              }

            }

          }


        }
      } else {
        if (deal_data2_item > 0) {

          if (d_data[index] < -1200) {


          } else {
            if (x_data[index - 1] - x_data[index - 2] < 0) {
              if (d_data[index - 1] < 1000) {
                if (deal_data2[index - 1] - deal_data2[index - 2] > -1) {

                  if (x_data[index - 2] - x_data[index - 3] > 0) {
                    array1.push(itemFun(0, this_time[index], item));
                  } else {

                    if (this_data[index - 1] - this_data[index - 2] < 0) {
                      array1.push(itemFun(0, this_time[index], item));
                    }

                  }

                }

              }

            }

          }
        }
      }


    }
  });
  return array1;
}

export const dealXny = (this_time, deal_data2, this_data, d_data, x_data) => {


  let array1 = [];
  deal_data2.forEach((item, index) => {
    let this_data_item = this_data[index] - this_data[index - 1]
    let deal_data2_item = deal_data2[index] - deal_data2[index - 1];
    let x_data_item = parseFloat(x_data[index]) - parseFloat(x_data[index - 1])
    let d_data_item = parseFloat(d_data[index]) - parseFloat(d_data[index - 1])
    if (index == 0) return;
    if (this_data_item < 0) {
      if (deal_data2_item > 0) {
        if (x_data_item < 0) {
          if (d_data[index] < 0 && d_data[index - 1] < 0) {
            if (Math.abs(d_data_item / parseFloat(d_data[index - 1])) < 2) {

              array1.push(itemFun(0, this_time[index], item));
            }

          }
        }
      } else {
        if (x_data_item < 0) {
          if (d_data[index] < 0) {
            if (this_data[index - 1] - this_data[index - 2] > 0) {
              if (this_data[index - 2] - this_data[index - 3] > 0) {
                if (d_data[index - 2] > 0) {
                  array1.push(itemFun(0, this_time[index], item));
                }

              }

            }

          }
        }
      }
    } else {
      if (deal_data2_item > 0) {
        if (x_data_item < 0) {
          if (d_data[index] < 0) {
            if (d_data[index - 1] < 0) {

              if (x_data[index - 1] - x_data[index - 2] < 0) {
                if (d_data[index - 2] > 0) {
                  array1.push(itemFun(1, this_time[index], item));
                }

              }

            } else {
              if (d_data[index - 2] > 20) {
                array1.push(itemFun(1, this_time[index], item));
              }
            }

          }
        } else {
          if (d_data[index] > 0) {
            if (deal_data2[index - 1] - deal_data2[index - 2] < 0) {
              if (x_data[index - 1] - x_data[index - 2] > 0) {
                if (this_data[index - 1] - this_data[index - 2] > 0) {
                  if (d_data[index - 1] > 0) {
                    array1.push(itemFun(1, this_time[index], item));
                  } else {
                    if (d_data[index - 2] > 0) {
                      array1.push(itemFun(1, this_time[index], item));
                    }

                  }

                }

              }

            } else {
              if (d_data[index - 1] < 0) {
                if (d_data[index] + d_data[index - 1] > 0) {
                  array1.push(itemFun(0, this_time[index], item));
                }

              } else {

                if (d_data[index - 1] > 0) {
                  if (this_data[index - 1] - this_data[index - 2] > 0) {
                    array1.push(itemFun(1, this_time[index], item));
                  }

                }

              }

            }

          }
        }
      } else {
        if (x_data_item < 0) {

          if (d_data[index] < 0) {
            if (d_data[index - 1] > 0 && d_data[index - 2] < 0) {
              array1.push(itemFun(1, this_time[index], item));
            }


          }
        }
      }
    }


  });
  return array1;
}


export const dealXnydc = (this_time, deal_data2, this_data, d_data, x_data) => {


  let array1 = [];
  deal_data2.forEach((item, index) => {
    let this_data_item = this_data[index] - this_data[index - 1]
    let this_data_item2 = this_data[index-1] - this_data[index - 2]
    let deal_data2_item = deal_data2[index] - deal_data2[index - 1];
    let deal_data2_item2 = deal_data2[index-1] - deal_data2[index - 2];
    let x_data_item = parseFloat(x_data[index]) - parseFloat(x_data[index - 1])
    let x_data_item2 = parseFloat(x_data[index-1]) - parseFloat(x_data[index - 2])
    let d_data_item = parseFloat(d_data[index]) - parseFloat(d_data[index - 1])
    if (index == 0) return;
    if (this_data_item < 0) {
      if (d_data[index] < 0 && d_data[index - 1] < 0) {
        if (x_data_item > 0 && x_data_item2<0) {
          if (deal_data2_item > 0 && deal_data2_item2<0) {
             if (this_data_item2 < 0) {
                array1.push(itemFun(0, this_time[index], item));
             }
           
          }
        }
      }else{
        if (d_data[index] > 0 && d_data[index - 1] > 0) {
         if (x_data_item < 0 && x_data_item2 < 0) {
           if (deal_data2_item > 0 && deal_data2_item2 > 0) {
             if (this_data_item2 < 0) {
               array1.push(itemFun(0, this_time[index], item));
             }

           }
         }
        }
      }

    } else {
      if (d_data[index] > 0 && d_data[index - 1] > 0 && d_data[index - 2] > 0) {
        if (x_data_item < 0 && x_data_item2 > 0) {
          if (deal_data2_item > 0 && deal_data2_item2 < 0) {
              array1.push(itemFun(1, this_time[index], item));

          }
        }
      
      }else{
          if (d_data[index] > 0 && d_data[index - 1] < 0 && d_data[index - 2] < 0) {
              if (x_data_item > 0 && x_data_item2 < 0) {
                if (deal_data2_item < 0 ) {
                  array1.push(itemFun(1, this_time[index], item));

                }
              }

          }
          
      }
    }

  });
  return array1;
}
export const dealFdc = (this_time, deal_data2, this_data, d_data, x_data) => {


  let array1 = [];
  deal_data2.forEach((item, index) => {
    let this_data_item = this_data[index] - this_data[index - 1]
    let this_data_item2 = this_data[index-1] - this_data[index - 2]
    let deal_data2_item = deal_data2[index] - deal_data2[index - 1];
    let deal_data2_item2 = deal_data2[index-1] - deal_data2[index - 2];
    let x_data_item = parseFloat(x_data[index]) - parseFloat(x_data[index - 1])
    let x_data_item2 = parseFloat(x_data[index-1]) - parseFloat(x_data[index - 2])
    let d_data_item = parseFloat(d_data[index]) - parseFloat(d_data[index - 1])
    if (index == 0) return;
    if (this_data_item < 0) {
      if (d_data[index] < 0 && d_data[index - 1] < 0) {
        if (x_data_item > 0 && x_data_item2<0) {
          if (deal_data2_item > 0 && deal_data2_item2<0) {
             if (this_data_item2 < 0) {
                array1.push(itemFun(0, this_time[index], item));
             }
           
          }
        }
      }else{
        if (d_data[index] > 0 && d_data[index - 1] > 0) {
         if (x_data_item < 0 && x_data_item2 < 0) {
           if (deal_data2_item > 0 && deal_data2_item2 > 0) {
             if (this_data_item2 < 0) {
               array1.push(itemFun(0, this_time[index], item));
             }

           }
         }
        }
      }

    } else {
      if (d_data[index] > 0 && d_data[index - 1] > 0 && d_data[index - 2] > 0) {
        if (x_data_item < 0 && x_data_item2 > 0) {
          if (deal_data2_item > 0 && deal_data2_item2 < 0) {
              array1.push(itemFun(1, this_time[index], item));

          }
        }
      
      }else{
          if (d_data[index] > 0 && d_data[index - 1] < 0 && d_data[index - 2] < 0) {
              if (x_data_item > 0 && x_data_item2 < 0) {
                if (deal_data2_item < 0 ) {
                  array1.push(itemFun(1, this_time[index], item));

                }
              }

          }
          
      }
    }

  });
  return array1;
}





export default {
  dealBj,
  dealYl,
  dealBx,
  dealGf,
  dealMt,
  dealXp,
  dealXny,
  dealXnydc,
  dealFdc

}
