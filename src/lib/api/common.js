import $ from "jquery";
//东方财富的北上资金的
export const splitData = (data, num) => {
  let array1 = [];
  data.klines.forEach((item, index) => {
    // if (index > data.klines.length - 10) {
    //   array1.push(item.split(",")[num]);
    // }
    if (num == 8) {
      array1.push(parseFloat(item.split(",")[num]));
    } else {
      array1.push(item.split(",")[num]);
    }

  });
  return array1;
}

export const getAjax = (url) => {
  var htmlobj = $.ajax({
    url: url,
    async: false,
  });
  return htmlobj.responseJSON.data;
}

export default {
  splitData,
  getAjax
}
