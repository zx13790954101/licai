//金融等权



function urlname(url, num) {
  var all_url = "https://push2his.eastmoney.com/api/qt/stock/kline/get?secid=" + url + "&fields1=f1,f2,f3,f4,f5&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&lmt=1550&klt=10" + num + "&fqt=1&end=30000101"
  return all_url;
}
//保险
export const bxzt_month = urlname('0.399809', '3')

export const bxzt_day = urlname('0.399809', '1')
export const bxzt_week = urlname('0.399809', '2')
//中证银行
export const zzyh_day = urlname('0.399986', '1')
export const zzyh_week = urlname('0.399986', '2')
export const zzyh_month = urlname('0.399986', '3')
//光伏
export const gf_day = urlname('2.931151', '1')
export const gf_week = urlname('2.931151', '2')
export const gf_month = urlname('2.931151', '3')
//新能源车
export const xnyc_day = urlname('0.399417', '1')
export const xnyc_week = urlname('0.399417', '2')
export const xnyc_month = urlname('0.399417', '3')
//芯片
export const xp_day = urlname('0.980017', '1')
export const xp_week = urlname('0.980017', '2')
export const xp_month = urlname('0.980017', '3')
//国防军工
export const jg_day = urlname('0.399959', '1')
export const jg_week = urlname('0.399809', '2')
export const jg_month = urlname('0.399809', '3')
//汽车整车
export const qc_day = urlname('2.931008', '1')
export const qc_week = urlname('2.931008', '2')
export const qc_month = urlname('2.931008', '3')
//白酒
export const bj_day = urlname('0.399997', '1')
export const bj_week = urlname('0.399997', '2')
export const bj_month = urlname('0.399997', '3')
//医疗
export const yl_day = urlname('0.399989', '1')
export const yl_week = urlname('0.399989', '2')
export const yl_month = urlname('0.399989', '3')

//中证煤炭
export const mt_day = urlname('0.399998', '1')
export const mt_week = urlname('0.399998', '2')
export const mt_month = urlname('0.399998', '3')

//新能源车
export const xny_day = urlname('1.000941', '1')
export const xny_week = urlname('1.000941', '2')
export const xny_month = urlname('1.000941', '3')

//房地产
export const fdc_day = urlname('1.515060', '1')
export const fdc_week = urlname('1.515060', '2')
export const fdc_month = urlname('1.515060', '3')

//1是天数，2是周数，3是月
//涨跌幅，数值
export const urlDeal = function (url, type, num2) {
  let num1 = url.indexOf("002") != -1 ? 0 : (url.indexOf("300") != -1 ? 0 : (url.indexOf("000") != -1 ? 0 : 1));
  if (url.indexOf("600") != -1) {
    num1 = 1
  }


  //判断是不是创业板
  if (url.indexOf("399") != -1) {
    num1 = 0
  }
  if (url.indexOf("NDX") != -1) {
    num1 = 100
  }

  if (url.indexOf("HSTECH") != -1) {
    num1 = 124
  }
  let num3 = 895;
  if (url.indexOf("000001") != -1) {
    num1 = 1
  }

  return (
    "https://push2his.eastmoney.com/api/qt/stock/kline/get?secid=" +
    num1 +
    "." +
    url +
    "&fields1=f1,f2,f3,f4,f5&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&lmt=" + num3 + "&klt=10" +
    type +
    "&fqt=1&end=30000101"
  );
}
