import axios from "axios";
import * as XLSX from 'xlsx';
import {
  my_financial,
  all_daily_profit,
  daily_profit,
  all_financial
}
from "./../url_name/excel/dingding.js";

export const getExcelData = (url) => {
  // const url = 'https://lippi-space-sz.oss-accelerate.aliyuncs.com/yundisk0/iAEJAqR4bHN4A6h5dW5kaXNrMATOIWbL0wXNE4AGDgfOZtE2tQjOAAb2SA.xlsx?Expires=1725097513&OSSAccessKeyId=LTAIjmWpzHta71rc&Signature=gUU9PTFfOZqzM1teVYwa8KCT7uU%3D&response-content-disposition=attachment%3B%20filename%3D%22%25E4%25BA%25A4%25E6%2598%2593%25E6%2595%25B0%25E6%258D%25AE_%25E4%25BF%25AE%25E6%2594%25B9%25E5%2590%258E.xlsx%22%3B%20filename%2A%3Dutf-8%27%27%25E4%25BA%25A4%25E6%2598%2593%25E6%2595%25B0%25E6%258D%25AE_%25E4%25BF%25AE%25E6%2594%25B9%25E5%2590%258E.xlsx';
  return fetchAndConvertFromDingTalkLink(url)
}
async function fetchAndConvertFromDingTalkLink(url) {
  try {
    // 发送 HTTP 请求获取文件数据
    const response = await axios.get(url, {
      responseType: 'arraybuffer'
    });

    const data = new Uint8Array(response.data);
    const workbook = XLSX.read(data, {
      type: 'array'
    });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    return jsonData;
  } catch (error) {
    console.error('Error fetching or converting the file:', error);
    return null;
  }
}


export const dealPersonData = async (url) => {
  let all_data = await allDailyProfit(); // 使用await等待结果
  console.log('all_data', all_data);
  return all_data;
};



async function allDailyProfit() {
  let info = null;
  try {
    info = await getExcelData(all_daily_profit);
    const dailyProfitInfo = await getDailyProfit(info); // 调用getDailyProfit并等待结果
    return dailyProfitInfo; // 返回处理后的信息
  } catch (error) {
    // 处理错误
    console.error('1111Error fetching data:', error);
  }

}
async function getDailyProfit(frist_info) {
  let info = null;
  try {
    info = await getExcelData(daily_profit);
    const allFinancial = await getAllFinancial();
    return [frist_info, info, allFinancial]
  } catch (error) {
    // 处理错误
    console.error('1111Error fetching data:', error);
  }
}
//全部资金数据_时间展示表 
async function getAllFinancial() {
  let info = null;
  try {
    info = await getExcelData(all_financial);
    return info
  } catch (error) {}
}

export default {
  getExcelData,
  dealPersonData
}
