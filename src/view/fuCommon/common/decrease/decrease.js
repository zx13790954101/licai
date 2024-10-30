export const dealFlowData = (data1, data_num) => {


  if (data1.num.length <= data_num) {
    return null
  }
  let list_data = data1.num.slice(-data_num);
  let list_data_inflow = data1.inflow.slice(-data_num);
  list_data_inflow = list_data_inflow.map((item) => {
    return parseFloat(item);
  });
  list_data = list_data.map((item) => {
    return parseFloat(item);
  });

  let max_num = parseFloat(Math.max(...list_data));
  let min_num = parseFloat(Math.min(...list_data));
  let this_num = parseFloat(list_data.slice(-1)[0]);

  let deal_time = data1.time.slice(-data_num);
  let max_time = list_data.findIndex((item) => {
    return item === max_num;
  });

  let date_time = deal_time[max_time];
  let min_time = list_data.findIndex((item) => {
    return item === min_num;
  });

  let date_time1 = deal_time[min_time];

  let end_time1 = null;
  let list_data2 = JSON.parse(JSON.stringify(list_data_inflow));
  if (max_time > min_time) {

    let list_data3 = list_data2.splice(max_time, list_data2.length);
    end_time1 = Math.min(...list_data3);

  } else {


    let list_data3 = list_data2.splice(0, min_time);
    end_time1 = Math.max(...list_data2);


  }
  let end_time = null;

  end_time = list_data_inflow.findIndex((item) => {
    return item === end_time1;
  });


  //计算大小

  let info_array = null;
  let this_num2 = null;

  if (max_time > min_time) {

    this_num2 = list_data_inflow[end_time] - list_data_inflow[max_time]
    let num_index = end_time;
    end_time = Math.abs(max_time - end_time) - 1;
    if (max_time > list_data.length - 4) {

      let zhong_list = list_data_inflow.slice(0, min_time == 0 ? 1 : min_time)

      zhong_list = Math.max(...zhong_list);
      let end_inflow = list_data_inflow.findIndex((item) => {
        return item === zhong_list;
      });
      this_num2 = list_data_inflow[min_time] - list_data_inflow[end_inflow]
      end_time = min_time - end_inflow
      end_time = end_time + '天 开始时间:' + deal_time[min_time] + '到' + deal_time[end_inflow]


    } else {
      end_time = end_time + '天 开始时间:' + deal_time[max_time] + '到' + deal_time[end_time]
    }




  } else {


    let infolw = JSON.parse(JSON.stringify(list_data_inflow));

    let zhong_list = infolw.slice(max_time + 60, min_time - 2)


    let zhong_item = Math.max(...zhong_list)

    if (zhong_list.length == 0) {
      let new_max = infolw.slice(min_time, infolw.length)
      zhong_item = Math.max(...new_max)
    }
    // zhong_item = list_data_inflow.findIndex((item) => {
    //   return item === zhong_item;
    // });
    let num_1 = 0;
    list_data_inflow.forEach((element, index) => {
      if (element == zhong_item) {
        num_1 = index
      }
    });
    zhong_item = num_1
    let infolw2 = JSON.parse(JSON.stringify(list_data_inflow));
    let zhong_list2 = infolw2.slice(max_time + 50, zhong_item + 1)
    let zhong_item2 = Math.min(...zhong_list2)
    zhong_item2 = list_data_inflow.findIndex((item) => {
      return item === zhong_item2;
    });


    if (data_num > 90) {


      this_num2 = list_data_inflow[zhong_item] - list_data_inflow[zhong_item2];
      end_time = Math.abs(zhong_item - zhong_item2) - 1 + '天 开始时间:' +
        deal_time[zhong_item2] + '到' + deal_time[zhong_item];

    } else {


      if (end_time == min_time) {

        let list_data2 = JSON.parse(JSON.stringify(list_data_inflow));
        let list_data3 = list_data2.slice(10, end_time - 3);
        end_time1 = Math.min(...list_data3);

        end_time = list_data_inflow.findIndex((item) => {
          return item === end_time1;
        });


        let max_time3 = Math.max(...list_data3);
        max_time3 = list_data_inflow.findIndex((item) => {
          return item === max_time3;
        });


        this_num2 = list_data_inflow[max_time3] - list_data_inflow[end_time];


        end_time = Math.abs(max_time3 - end_time) - 1 + '天 开始时间:' + deal_time[max_time3] + '到' + deal_time[end_time]
      } else {
        this_num2 = list_data_inflow[end_time] - list_data_inflow[min_time];


        end_time = Math.abs(end_time - min_time) - 1 + '天 开始时间:' + deal_time[end_time] + '到' + deal_time[min_time]
      }



    }


  }


  let this_num_index = deal_time.findIndex((item) => {
    return item === date_time;
  });
  this_num_index = list_data[this_num_index];
  let this_num_index2 = end_time.substring(end_time.indexOf('开始时间:') + 5, end_time.length - 11)

  this_num_index2 = deal_time.findIndex((item) => {
    return item === this_num_index2;
  });


  this_num_index2 = list_data[this_num_index2];



  this_num2 = parseFloat(this_num2);
  this_num = parseFloat(this_num);
  if (this_num == max_num) {
    // this_num = (this_num - min_num) / min_num;
    this_num =
      max_time > min_time ?
      list_data_inflow[max_time] - list_data_inflow[min_time] :
      list_data_inflow[min_time] - list_data_inflow[max_time];
    info_array = [{
        name: "近" + data_num + "上涨至今幅度",
        num: this_num.toFixed(2),
        time: date_time1 + "到现在经历" + (data_num - min_time - 1),
      },
      {
        name: "近" + data_num + "下跌至今幅度",
        num: this_num2.toFixed(2),
        time: end_time,
      },
      {
        name: '40日最小值到现在的涨跌幅:' + (list_data_inflow.length - min_time - 1) + ' 天',
        num: (list_data_inflow[list_data_inflow.length - 1] - list_data_inflow[min_time]).toFixed(2)
      }
    ];
  } else {
    if (this_num != min_num) {
      //  min_num = (this_num - min_num) / min_num;
      // this_num =
      //   max_time > min_time
      //     ? (max_num - min_num) / min_num
      //     : (min_num - max_num) / max_num;
      this_num =
        max_time > min_time ?
        list_data_inflow[max_time] - list_data_inflow[min_time] :
        list_data_inflow[min_time] - list_data_inflow[max_time];



      if (data_num > 40) {
        info_array = [{
            name: "近" + data_num + "日下跌至今跌幅",
            num: this_num.toFixed(2),
            time: date_time +
              "到" +
              date_time1 +
              "到现在经历" +
              (Math.abs(max_time - min_time) - 1),
          },
          {
            name: "近" + data_num + "日下跌至今跌幅",
            num: this_num2.toFixed(2),
            time: end_time,
          },
          {
            name: '40日最小值到现在的涨跌幅:' + (list_data_inflow.length - min_time - 1) + ' 天' + '(' + deal_time[min_time] + ')',
            num: (list_data_inflow[list_data_inflow.length - 1] - list_data_inflow[min_time]).toFixed(2)
          }
        ];
      } else {

        info_array = [{
            name: "近" + data_num + "日涨幅",
            num: this_num.toFixed(2),
            time: date_time +
              "到" +
              date_time1 +
              "现在经历" +
              (Math.abs(max_time - min_time) - 1),
          },
          {
            name: "近" + data_num + "日跌幅",
            num: this_num2.toFixed(2),
            time: end_time,
          },
          {
            name: '40日最小值到现在的涨跌幅:' + (list_data_inflow.length - min_time - 1) + ' 天' + '(' + deal_time[min_time] + ')',
            num: (list_data_inflow[list_data_inflow.length - 1] - list_data_inflow[min_time]).toFixed(2)
          }
        ];
      }
    } else {


      this_num =
        max_time > min_time ?
        list_data_inflow[max_time] - list_data_inflow[min_time] :
        list_data_inflow[min_time] - list_data_inflow[max_time];
      info_array = [{
          name: "近" + data_num + "日下跌至今跌幅2",
          num: this_num.toFixed(2),
          time: date_time + "到现在经历" + (data_num - max_time - 1),
        },
        {
          name: "近" + data_num + "日下跌至今跌幅1",
          num: this_num2.toFixed(2),
          time: end_time,
        },
        {
          name: '40日最小值到现在的涨跌幅:' + (list_data_inflow.length - min_time - 1) + '天' + '(' + deal_time[min_time] + ')',
          num: (list_data_inflow[list_data_inflow.length - 1] - list_data_inflow[min_time]).toFixed(2)
        }
      ];
    }
  }

  return info_array;
}
export default {
  dealFlowData

}
