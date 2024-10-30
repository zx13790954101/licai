import dataArray from "./decrease.json"
import {
  dingtalk_baiji_buy,
  dingtalk_baiji_get
}
from "../../../../person/url_name/excel/dingding.js"

import excelUtil from "../../../../person/js/excelUtil.js"

//获取每个版块买入信息
export const dealFlowData = async (name) => {
  let info = null
  let time1 = [];

  try {
    // 等待 switchTime 的结果
    time1 = await switchTime(name);

    if (time1.length > 0) {
      info = time1;
    }

    console.log("infoinfo", info);
    return info; // 直接返回处理后的结果
  } catch (err) {
    console.error("Error:", err);
    return info; // 在发生错误时返回 null
  }
};



async function switchTime(name1) {
  let info = [];
  switch (name1) {
    case "国证芯片":
      info = dataArray.data[0].array;
      break;
    case "新能源":
      info = dataArray.data[1].array;
      break;
    case "中证白酒":
      try {
 
        info = await excelUtil.getExcelData(dingtalk_baiji_buy);
        console.log("dingtalk_baiji_buy",info)
      } catch (error) {
        // 处理错误
        console.error('Error fetching data:', error);
      }
      break;
    default:
      info = [];
  }
  return info;
}

export default {
  dealFlowData
}
