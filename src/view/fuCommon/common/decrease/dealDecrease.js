import {
  dealFlowData
} from "./decrease.js";

//就是特定的
function dealDayList(data1, num) {
  if (data1.array.length <= num) {
    return [{
      name: '最后',
      num: 0,
      time: data1.time[num],
      this_num: data1.num[0]
    }, {
      name: '最后',
      num: 0,
      time: data1.time[num],
      this_num: data1.num[0]
    }, {
      name: '最后',
      num: 0,
      time: data1.time[num],
      this_num: data1.num[0]
   }]
  }
  //最大的涨值，涨跌值，
  let end_array = data1.array.slice(-num);
  let this_time = data1.time.slice(-num);
  //连续涨跌幅
  let inflow_array = data1.inflow.slice(-num);

  let max_num = Math.max(...end_array);
  let min_num = Math.min(...end_array);

  let max_time = end_array.findIndex((item) => {
    return item === max_num;
  });
  let min_time = end_array.findIndex((item) => {
    return item === min_num;
  });
  //涨跌幅的值___累加涨跌幅区间的最大值也就是最大值
  let max_num2 = Math.max(...inflow_array);
  var min_num2 = Math.min(...inflow_array);
 
  let max_time2 = inflow_array.findIndex((item) => {
    return item === max_num2;
  });
  let min_time2 = inflow_array.findIndex((item) => {
    return item === min_num2;
  });
  let dief_num3 = null;
  let end_num3 = null;
  var min_num233 = null;






  //判断最大在前面还是在后面
  if (max_time2 > min_time2) {
    dief_num3 = max_num2 - min_num2;
    let end_array1 = inflow_array.slice(
      max_time2,
      inflow_array.length + 1
    );

    //
    min_num2 = Math.min(...end_array1);

    end_num3 = min_num2 - max_num2;
    if (end_num3 == 0) {
      end_num3 = min_num
    }
   

    
    if (end_num3.toFixed(2)>min_num) {
      end_num3=min_num
    }
    min_num233 = inflow_array.findIndex((item) => {
      return item === min_num2;
    });

   //最大值3《最小值5
  } else {
    //判断最小值是不是最后一个
    //最大跌幅
    //最大值是0 
    if (max_time2 == 0) {
      //判断最小值前面有没有数值
      if (min_time2 + 1 == inflow_array.length) { 
        dief_num3 = max_num
        end_num3 = min_num2 - max_num2;
       
      } else {
          //最大值之前的涨幅
        let end_array1 = JSON.parse(
          JSON.stringify(inflow_array.slice(min_time2, inflow_array.length))
        );
        end_num3=min_num2-max_num2
        max_num2 = Math.max(...end_array1);
        dief_num3 = max_num2 - min_num2;
        if (max_num > dief_num3) {
          dief_num3=max_num
        }
       
      }
     
   
    } else { 
     

      end_num3=  min_num2-max_num2;
      let end_array1 = inflow_array.slice(0, max_time2 + 1);
      min_num2 = Math.min(...end_array1);
      //最小值后面的最大值
      let end_array2 = inflow_array.slice(-(inflow_array.length-min_time2));
    
      let max_num3 = Math.max(...end_array2);
      let dief_num4 = max_num3 -  Math.min(...inflow_array);
      dief_num3 = max_num2 - min_num2;
    //计算位置
      
      
   
      if (dief_num4 > dief_num3) {
        if (max_num > dief_num4) {
          dief_num3=max_num
        } else {
          dief_num3=dief_num4
        }
      } else {
        if (max_num > dief_num3) {
          dief_num3=max_num
        }
      }

     
    }

    //这个最大幅位置
    min_num233 = inflow_array.findIndex((item) => {
      return item === min_num2;
    });


  }
  //处理数值的返回值的位置，
  let this_num_array = parseFloat(data1.num[data1.num.length - 1]);
  let info_data = [{
      name: num + "天内最大涨跌值",
      num: max_num.toFixed(2),
      time: this_time[max_time],
      this_num: (this_num_array * (100 + parseFloat(max_num.toFixed(2))) / 100).toFixed(2),
    },
    {
      name: num + "天内最大跌幅值",
      num: min_num.toFixed(2),
      time: this_time[min_time],
      this_num: (this_num_array * (100 + parseFloat(min_num.toFixed(2))) / 100).toFixed(2),
    },
    //日期有问题
    {
      name: num + "天内持续涨幅",
      num: dief_num3.toFixed(2),
      time: this_time[min_num233],
      this_num: this_num_array * (100 + parseFloat(dief_num3.toFixed(2))) / 100,
    },
    {
      name: num + "天内持续跌幅",
      num: end_num3.toFixed(2),
      time: this_time[min_num233],
      this_num: this_num_array * (100 + parseFloat(end_num3.toFixed(2))) / 100,
    },
  ];
  return info_data;
}

//计算涨跌幅数值
export const initData = (this_data, day_list, this_time) => {
  let end_araay = [];
  let end_araay40 = [];


  //折线图的数据处理
  let array_10_num = [];
  let array_40_num = [];
  let array_10_num_f = [];
  let array_10_num_z = [];
  let array_40_num_f = [];

  let array_40_num_z = [];


  let array_20_num_z=[];
  let array_20_num_f=[];

  //折线图的股票的数值
  let array_10_this_zhang = [];
  let array_40_this_num = [];

  let num_length = day_list.array.length;
  this_data.forEach((Element, index) => {
    let all_data = {
      array: day_list.array.slice(0, num_length - index),
      time: day_list.time.slice(0, num_length - index),
      inflow: day_list.inflow.slice(0, num_length - index),
      num: day_list.num.slice(0, num_length - index),
    }
    //现在处理文件
    let item = dealDayList(all_data, 10);
    let new_item20 = dealDayList(all_data, 20);

   // let item40 = dealFlowData(all_data, 40);
   let item40 = dealDayList(all_data, 40);
    end_araay40.push(item40)
    end_araay.push(item)

    array_10_num.push(item[0].num);
    let item40_2 = item40 != null ? item40[1].num : 0;
    array_40_num.push(item40_2);

     array_10_this_zhang.push(parseFloat(item[0].this_num));

     array_10_num_z.push(item != null ? item[2].num : 0)
     array_10_num_f.push(item[3] ? item[3].num : 0)

    //  array_40_num_z.push(item40 !=null? item40[0].num : 0)
    //  array_40_num_f.push(item40 !=null ? item40[1].num : 0);
     array_40_num_z.push(item40 !=null? item40[2].num : 0)
     array_40_num_f.push(item40[3] ? item40[3].num : 0);

     array_20_num_z.push(new_item20 != null ? new_item20[2].num : 0)
     array_20_num_f.push(new_item20[3] ? new_item20[3].num : 0)
  })
  // array_10_num_z = array_10_num_z.reverse()
  // array_10_num_f = array_10_num_f.reverse()
  // array_10_num_z=array_10_num_z.reverse()
  // array_10_num_z=array_10_num_z.reverse()
  return [{
      num: array_10_num.reverse(),
      name: '10天最大涨幅'
    }, {
      num: array_10_this_zhang,
      name: '10天最大涨幅数值'
    },
    {
      num: end_araay,
      name: '10天最大涨幅详情'
    },
    {
      num: array_40_num,
      name: '40天最大涨幅'
    },
    {
      num: end_araay40,
      name: '40天最大涨幅详情'
    },
    //涨跌幅列表
    {
      num: array_10_num_z.reverse(),
      name: '10天内持续涨幅'
    },
    {
      num: array_10_num_f.reverse(),
      name: '10天内持续跌幅'
    },{
      num: array_40_num_z.reverse(),
      name: '40天内持续涨幅'
    },
    {
      num: array_40_num_f.reverse(),
      name: '40天内持续跌幅'
    }, {
      num: array_20_num_z.reverse(),
      name: '20天内持续涨幅'
    }, {
      num: array_20_num_f.reverse(),
      name: '20天内持续跌幅'
    },

  ]


}

export default {
  initData

}
