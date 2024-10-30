//https://www.zhihu.com/question/325739705/answer/2531691406
//判断是不是
function ifFundata() {

}


//处理分割线
//全部的数据，个人的数据
export const dealMarkLine = (data, item_data, num1, num2) => {


  let end_data = null;
  let num_data5 = parseFloat(item_data);
  let num11 = 0.05;
  let num22 = 0.05
  if (num1) {
    num11 = parseFloat(num1) / 100
  }
  
  if (num2) {
    num22 = parseFloat(num2) / 100
  }
  //网格上限
  let top_data5 = num_data5 * (1 + num11);
  // 网格下限
  let bottom_data5 = num_data5 * (1 - num22) ;
  //
  return {
    top_data5: {
      num: top_data5.toFixed(2),
      name: '上限(' + num11 * 100 + '%)',
      active: 1
    },
    bottom_data5: {
      num: bottom_data5.toFixed(2),
      name: '下限-(' + num22 * 100 + '%)',
      active: 1
    }
  };
}


export const dealMarkPoint = (data) => {

}
export default {
  dealMarkLine,
  dealMarkPoint
}
