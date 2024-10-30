function  dealReduce(max_data_num, start_time, end_time){
  let max_data_array = max_data_num.slice(start_time + 1, end_time + 1);
  let reduce_max_datat = max_data_array.reduce(function (num1, num2) {
    return parseFloat(num1) + parseFloat(num2);
  });
  reduce_max_datat = (reduce_max_datat / max_data_array.length).toFixed(2);
  return reduce_max_datat;
}
function dealEndData (data1, data2) {
  let array1 = [];
  data1.forEach((item, index) => {
    item = item.split(",");
    let item1 = [
      item[0],
      parseFloat(item[1]),
      parseFloat(item[2]),
      parseFloat(item[3]),
      parseFloat(item[4]),
      parseFloat(item[5]),
      parseFloat(item[1]) - parseFloat(item[2]) > 0 ? 0 : 1,
    ];
    array1.push(item1);
  });
  return array1;
}
function   splitData(rawData) {
  var datas = [];
  var times = [];
  var vols = [];
  var macds = [];
  var difs = [];
  var deas = [];
  for (var i = 0; i < rawData.length; i++) {
    datas.push(rawData[i]);
    times.push(rawData[i].splice(0, 1)[0]);
    vols.push(rawData[i][4]);
    macds.push(rawData[i][6]);
    difs.push(rawData[i][7]);
    deas.push(rawData[i][8]);
  }
  return {
    datas: datas,
    times: times,
    vols: vols,
    macds: macds,
    difs: difs,
    deas: deas,
  };
}
//计算ma5股票值
function calculateMA(dayCount, data) {
  var result = [];
  data = splitData(dealEndData(data));
  for (var i = 0, len = data.times.length; i < len; i++) {
    if (i < dayCount) {
      result.push("-");
      continue;
    }
    var sum = 0;
    for (var j = 0; j < dayCount; j++) {
      sum += data.datas[i - j][1];
    }
    result.push((sum / dayCount).toFixed(2));
  }
  return result;
}


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

export {
  calculateMA
}