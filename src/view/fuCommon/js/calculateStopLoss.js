import {
  calculateMA
} from '../dealKline.js'


//周期数值
let date_num = 22;

function dateFormat(fmt, date) {
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }
  return fmt;
}
//设置截取的数字
export var num2 = 362
export const dealData = (data2, type, name, num, type2, num3) => {
  let that = this;
  let array2 = [];
  let time1 = [];
  let num1 = [];
  num2 = data2.length
  data2.forEach((element2, index2) => {
    if (type == 1) {
      array2.push(parseFloat(element2[6].toFixed(2)));
      time1.push(
        dateFormat("YYYY-mm-dd", new Date(element2[9] * 1000))
      );
      num1.push(parseFloat(element2[1]));
    } else if (type == 2) {
      array2.push(parseFloat(element2.split(",")[8]));
      time1.push(element2.split(",")[0]);

      if (num == 6) {
        num1.push(parseFloat(
          (parseInt(element2.split(",")[num]) / 100000000).toFixed(2)));
      } else {
        num1.push(parseFloat(element2.split(",")[num]));
      }
    }
  });
  let object1 = {
    name: name,
    num: num1,
    time: time1,
    array: array2,
    type_echarts: type2 == undefined ? undefined : 'bar',
    itemStyle: num3 == undefined ? undefined : 2,
  };
  return object1;
}

function dealReduce(max_data_num, start_time, end_time) {


  let max_data_array = max_data_num.slice(start_time + 1, end_time + 1);
  let reduce_max_datat = max_data_array.reduce(function (num1, num2) {
    return parseFloat(num1) + parseFloat(num2);
  });
  reduce_max_datat = (reduce_max_datat / max_data_array.length).toFixed(2);
  return reduce_max_datat;
}
//处理了数据
function moreArray(data) {
  let array1 = []
  for (let i = 0; i < date_num; i++) {
    array1.push(data);

  }
  return array1;
}


export const dealDateData2 = (start_time, end_time, length1, zdf_data_num) => {

  let this_max = [];

  let zdf_min_array = [];
  let zdf_max_array = [];

  let start_time1 = start_time;
  let end_time1 = end_time

  for (let i = 0; i < length1 - date_num; i++) {

    end_time1 = end_time - i
    start_time1 = start_time - i

    let zdf_max_itme1 = Math.max(...zdf_data_num.slice(end_time1 - date_num, end_time1));
    zdf_max_itme1 = zdf_max_itme1 == -Infinity ? parseFloat(zdf_max_itme1.slice(-1)[0]).toFixed(2) : zdf_max_itme1


    let zdf_min_itme1 = Math.min(...zdf_data_num.slice(end_time1 - date_num, end_time1));
    zdf_min_itme1 = zdf_min_itme1 == -Infinity ? parseFloat(zdf_min_itme1.slice(-1)[0]).toFixed(2) : zdf_min_itme1


    zdf_max_array.push(
      zdf_max_itme1
    );
    zdf_min_array.push(
      zdf_min_itme1
    );
  }


  return {
    zdf_max_array: zdf_max_array.concat(moreArray(this_max[zdf_max_array.length - 1])),
    zdf_min_array: zdf_min_array.concat(moreArray(this_max[zdf_min_array.length - 1])),
  }

}

//计算涨跌幅的数值
function dealDateData(max_data_num, min_data_num, this_data_num, start_time, end_time, length1, zdf_data_num) {

  let array1 = []
  let array2 = [];
  let array3 = [];
  let zsw_array = [];
  let zcw_array = [];
  let max_num1 = [];
  let min_num1 = [];
  let zcw3 = [];
  let this_max = [];

  let zdf_min_array = [];
  let zdf_max_array = [];

  let start_time1 = start_time;
  let end_time1 = end_time

  //绝对值；
  let zbs_array = [];
  //止跌值
  let ji_zhidie = [];
  for (let i = 0; i < length1 - date_num; i++) {

    end_time1 = end_time - i
    start_time1 = start_time - i

    let max_data_array = dealReduce(max_data_num, start_time1, end_time1);
    let min_data_array = dealReduce(min_data_num, start_time1, end_time1);
    let this_data_array = dealReduce(
      this_data_num,
      start_time1,
      end_time1
    );
    array1.push(max_data_array)
    array2.push(min_data_array)
    array3.push(this_data_array)
    zsw_array.push(parseFloat(max_data_array * 0.95).toFixed(2))
    zcw_array.push(parseFloat(
      (max_data_array - min_data_array) *
      0.618 +
      parseFloat(min_data_array)
    ).toFixed(2))


    let max_item1 = Math.max(...max_data_num.slice(end_time1 - date_num, end_time1));
    max_item1 = max_item1 == -Infinity ? parseFloat(max_num1.slice(-1)[0]).toFixed(2) : max_item1
    let min_item1 = Math.min(...min_data_num.slice(end_time1 - date_num, end_time1));
    min_item1 = min_item1 == Infinity ? parseFloat(min_num1.slice(-1)[0]) : min_item1

    let this_max_item1 = Math.max(...this_data_num.slice(end_time1 - date_num, end_time1));
    this_max_item1 = this_max_item1 == Infinity ? parseFloat(min_num1.slice(-1)[0]) : this_max_item1

    //通过计算区间的涨跌幅的值来计算，就是每天的涨跌值
    let zdf_max_itme1 = Math.max(...zdf_data_num.slice(end_time1 - date_num, end_time1));
    zdf_max_itme1 = zdf_max_itme1 == -Infinity ? parseFloat(zdf_max_itme1.slice(-1)[0]) : zdf_max_itme1


    let zdf_min_itme1 = Math.min(...zdf_data_num.slice(end_time1 - date_num, end_time1));
    zdf_min_itme1 = zdf_min_itme1 == -Infinity ? parseFloat(zdf_min_itme1.slice(-1)[0]) : zdf_min_itme1


    let abs_zdf_time = parseFloat((Math.abs(zdf_min_itme1) + Math.abs(zdf_max_itme1)))
    abs_zdf_time = abs_zdf_time == -Infinity ? parseFloat(abs_zdf_time.slice(-1)[0]) : abs_zdf_time.toFixed(2)


    let ji_zhidie_item = 0
    //判断是不是绝对值是不是大于
    //等待新的计算公式
    if (abs_zdf_time > 8) {
      if (abs_zdf_time > 15) {
        if (Math.abs(zdf_min_itme1) > Math.abs(zdf_max_itme1)) {
          ji_zhidie_item = Math.abs(zdf_max_itme1)
        } else {
          ji_zhidie_item = Math.abs(zdf_min_itme1)
        }
      } else {
        if (Math.abs(zdf_min_itme1) > Math.abs(zdf_max_itme1)) {
          ji_zhidie_item = Math.abs(zdf_min_itme1)
        } else {
          ji_zhidie_item = Math.abs(zdf_max_itme1)
        }
      }

    } else {
      if (Math.abs(zdf_min_itme1) > 6 || Math.abs(zdf_max_itme1) > 6) {
        if (Math.abs(zdf_min_itme1) > Math.abs(zdf_max_itme1)) {
          ji_zhidie_item = Math.abs(zdf_min_itme1)/1.5;
        } else {
          ji_zhidie_item = Math.abs(zdf_max_itme1)/1.5;
        }
      } else {
        ji_zhidie_item = abs_zdf_time;
      }

    }


    ji_zhidie_item = ji_zhidie_item == -Infinity ? parseFloat(ji_zhidie_item.slice(-1)[0]) : ji_zhidie_item
    ji_zhidie_item = parseFloat(ji_zhidie_item)

    //判断是不是绝对值是不是大于
    max_num1.push(
      max_item1
    )
    min_num1.push(
      min_item1
    )
    this_max.push(
      this_max_item1
    )

    zdf_max_array.push(
      zdf_max_itme1
    );
    zdf_min_array.push(
      zdf_min_itme1
    );
    zbs_array.push(
      abs_zdf_time
    );
    ji_zhidie.push(
      ji_zhidie_item
    );

    zcw3.push(
      parseFloat((max_item1 - min_item1) * 0.618 + min_item1).toFixed(2)
    )
  }
  return {
    max_array: array1.concat(moreArray(array1[array1.length - 1])),
    min_array: array2.concat(moreArray(array2[array2.length - 1])),
    this_array: array3.concat(moreArray(array3[array3.length - 1])),
    zcw3: zcw3.concat(moreArray(zcw3[zcw3.length - 1])),
    zsw_array: zsw_array.concat(moreArray(zsw_array[zsw_array.length - 1])),
    zcw_array: zcw_array.concat(moreArray(zcw_array[zcw_array.length - 1])),
    max_num1: max_num1.concat(moreArray(max_num1[max_num1.length - 1])),
    min_num1: min_num1.concat(moreArray(min_num1[min_num1.length - 1])),
    this_max: this_max.concat(moreArray(this_max[this_max.length - 1])),
    zdf_max_array: zdf_max_array.concat(moreArray(zdf_max_array[zdf_max_array.length - 1])),
    zdf_min_array: zdf_min_array.concat(moreArray(zdf_min_array[zdf_min_array.length - 1])),
    zbs_array: zbs_array.concat(moreArray(zbs_array[zbs_array.length - 1])),
    ji_zhidie: ji_zhidie.concat(moreArray(ji_zhidie[ji_zhidie.length - 1])),
  }

}
//计算止损位
export const calculateStopLoss2 = (array_all, data1, data2, input_name6, time1) => {

  let that = this;
  let ma5 = calculateMA(5, array_all[0].klines);
  let ma10 = calculateMA(10, array_all[0].klines);
  let ma20 = calculateMA(20, array_all[0].klines);
  let ma30 = calculateMA(30, array_all[0].klines);
  let ma60 = calculateMA(60, array_all[0].klines);
  //                                                   1.43,     -0.23,    -4.19 ,1.04
  //                                                  , 1.85,    -1.90,   -35.27,   
 // 开盘1// 收盘2// 最高3 // 最低4// 成交量5 // 成交额6// 震幅7// 涨跌幅8 // 涨跌额9// 换手率10
  let max_data_num = dealData(data1, 2, "最高值", 3).num;
  let min_data_num = dealData(data1, 2, "最低值", 4).num;
  //当前值数组
  let this_data_num = dealData(data1, 2, "当前值", 2).num;

  let zdf_data_num = dealData(data1, 2, "涨跌幅", 8).num;
  //最高值-收盘价
  let max_spj_array=[];
  //-收盘价-最低4
    let spj_min_array = [];
  //最高值-收盘价
    let max_min_array = [];
    //最高值-收盘价-收盘价-最低4
    let  spj_max_min_array=[];
  //涨跌幅累计
   let zdf_data_array = [];
   let zdf_data_item = 0;
  zdf_data_num.forEach((item, index) => {
    zdf_data_item = parseFloat(zdf_data_item) + parseFloat(item);
    zdf_data_array.push(
      parseFloat(zdf_data_item.toFixed(2))
    )
    //计算
    let zdff_num =index==0?0: this_data_num[index-1]
    let spj_max_type = parseFloat(max_data_num[index] - this_data_num[index]).toFixed(0) 
    let spj_min_type = parseFloat(this_data_num[index] - min_data_num[index]).toFixed(0)
    let spj_max_type2 = spj_max_type==0?
    parseFloat(max_data_num[index] - min_data_num[index]).toFixed(2): -spj_max_type
    
    max_spj_array.push(parseFloat(
     ((spj_max_type2 * 100)/zdff_num).toFixed(2))
    )

    let spj_min_type2 = spj_min_type == 0 ?
      -parseFloat(max_data_num[index] - min_data_num[index]).toFixed(2): 
     spj_min_type
    spj_min_array.push(parseFloat(
     ((spj_min_type2 * 100)
     / zdff_num).toFixed(2))
    )
//绝对值
spj_max_min_array.push(
  Math.abs(parseFloat(((spj_max_type2 * 100) / zdff_num).toFixed(2))) - 
  Math.abs(parseFloat(((spj_min_type2 * 100) /zdff_num).toFixed(2)))
)

    max_min_array.push(parseFloat(
      (parseFloat(max_data_num[index] - min_data_num[index]) * 100
      /zdff_num).toFixed(2))
    )
  })
  let this_data = time1;

  let end_time =
    input_name6 == "" ? this_data[this_data.length - 1] : input_name6;




  //设置最近20个交易日的的最小值
  let start_time = this_data[this_data.indexOf(end_time) - date_num];

  //循环计算开始和结束的时间
  start_time = this_data.indexOf(start_time) + 1;
  end_time = this_data.indexOf(end_time) + 1;
  let max_data_array = dealReduce(max_data_num, start_time, end_time);
  let min_data_array = dealReduce(min_data_num, start_time, end_time);
  let this_data_array = dealReduce(
    this_data_num,
    start_time,
    end_time
  );

  let deal_data2 = dealDateData(max_data_num, min_data_num, this_data_num, start_time, end_time, this_data.length, zdf_data_num)



  //计算大小

  return {
    this_data,
    max_data_array,
    min_data_array,
    this_data_array,
    ma5,
    ma10,
    ma20,
    ma30,
    ma60,
    this_data_num,
    max_data_num,
    min_data_num,
    array_data: [
      ma5[ma5.length - 1],
      ma10[ma10.length - 1],
      ma20[ma20.length - 1],
      ma30[ma30.length - 1],
      ma60[ma60.length - 1],
      //选择日期的当前值
      this_data_num[this_data_num.length - 1],
    ],
    array_end: data1,
    deal_data2: deal_data2,
    zdf_data_num,
    zdf_data_array,
    //最高值-收盘价
    max_spj_array,
    spj_min_array,
    max_min_array,
    spj_max_min_array
  };
}

export default {
  calculateStopLoss2,
  dealData,
}
