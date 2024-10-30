

import $ from "jquery";
function dateFormat (fmt, date) {
  let ret;
  const opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "m+": (date.getMonth() + 1).toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "M+": date.getMinutes().toString(),         // 分
      "S+": date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
  };
  return fmt;
}
// 功能：将浮点数四舍五入，取小数点后2位
function changeTwoDecimal(x)
{
   var f_x = parseFloat(x);
   if (isNaN(f_x))
   {
      return false;
   }
   f_x = Math.round(f_x *100)/100;

   return f_x;
}

export const dateFormat2=(fmt, date)=> {
  let ret;
  const opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "m+": (date.getMonth() + 1).toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "M+": date.getMinutes().toString(),         // 分
      "S+": date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
  };
  return fmt;
}

export const orchesData = (data, key,type,num) => {
  
  var array_list = [];
  
  const map1 = data.map(item => {
      var end_data=item[key]
      if (key == 'date') {
        end_data =  dateFormat("YYYY-mm-dd ", new Date(item[key] ))
      } else if (key == 'northMoney') {
        end_data= changeTwoDecimal(parseFloat(item[key])/100)
      } else if (key == 'southMoney') {
        end_data=changeTwoDecimal(parseFloat(item[key])/100)
      } else if (key == 'difference') {
        end_data=changeTwoDecimal(parseFloat(item['northMoney'])/100-parseFloat(item['southMoney'])/100)
     //设置时间的变化
      } else if (key == 'TRADE_DATE') {
        end_data =  dateFormat("YYYY-mm-dd ", new Date(item[key] ))
      }else if(type == 'time') {
        end_data =  dateFormat("YYYY-mm-dd ", new Date(item[key] ))
      }else if(type == 'num') {
        end_data=changeTwoDecimal(parseFloat(item[key])/num)
      }
      //array_list.push([item[key]])
      return end_data
  });
  return map1
}


export const getAjax=(url) =>{
  var htmlobj = $.ajax({
    url: url,
    async: false,
  });
  return htmlobj;
}
export default {
  orchesData,
  getAjax,
  dateFormat2
}
