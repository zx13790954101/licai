function dealMarkArea(data) {
  let array1 = [];
  let color1 = ["#33333328", "#f5deb306", "#33333328", "#f5deb306"];
  data.forEach((element, index) => {
    let item1 = [{
        name: element.name,
        xAxis: element.xAxis[0],
        itemStyle: {
          color: color1[element.type],
        },
      },
      {
        xAxis: element.xAxis[1],
      },
    ];
    array1.push(item1);
  });
  return array1;
}

function dealTimeDate(data, time, arr01) {
  let array1 = [];
  arr01.forEach((element, index) => {
    let num1 = time.indexOf(element);
    if (num1 == -1) {
      array1.push(array1[index - 1]);
    } else {
      array1.push(data[num1]);
    }
  });
  return {
    num: array1,
    time: arr01,
  };
}
export const dealDateKline = (kline_data, markArea_data) => {
  let item1 = [];
  let new_array = [];
  let time2 = [];
  let this_time = null;
  kline_data.time.forEach((element, index) => {
    //判断
    if (this_time == element.slice(0, 4)) {
      item1.push(kline_data.num[index]);
      time2.push(element.slice(5, 10));
      if (index + 1 == kline_data.time.length) {
        new_array.push({
          name: this_time,
          array: item1,
          num: item1,
          time: time2,
        });
      }
    } else {
      if (this_time !== null) {
        new_array.push({
          name: this_time,
          array: item1,
          num: item1,
          time: time2,
        });
      }

      item1 = [];
      this_time = null;
      this_time = element.slice(0, 4);
      time2 = [];
      time2.push(element.slice(5, 10));
      item1.push(kline_data.num[index]);
    }
  });

  let new_time = [];
  new_array.forEach((element, index) => {
    if (index == 0) {
      new_time = element.time;
    } else {
      new_time = new_time.concat(element.time);
    }
  });

  let arr01 = new_time.filter((x, index, self) => {
    let arrs = [];
    new_time.forEach((item, i) => {
      arrs.push(item);
    });
    return arrs.indexOf(x) === index;
  });

  arr01.sort(function (a, b) {
    //正序a-b
    return new Date(a) - new Date(b);
  });

  let item_this = dealTimeDate(
    new_array[0].num,
    new_array[0].time,
    arr01
  );

  new_array[0].num = item_this.num;
  new_array[0].time = item_this.time;
  console.log("new_array", new_array)
  new_array[1].num.shift()
  new_array[1].time.shift()
  return [
    new_array,
    kline_data.time,
    dealMarkArea(markArea_data)
  ]


}

export default {
  dealDateKline,
}
