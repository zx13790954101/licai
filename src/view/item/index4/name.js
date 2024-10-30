//重点全球股市：
// a股市场：上证指数和沪深300指数

// 香港市场：恒生指数、国有企业指数

// 美国市场：道琼斯工业指数、纳斯达克指数、标普500指数

// 英国市场：英国富时100指数

// 法国市场：法国CAC 40指数

// 德国市场：德国DAX指数

// 日本市场：日经225指数
//全球股市指数

function url1 (num1,num2) {
  return 'https://push2his.eastmoney.com/api/qt/stock/kline/get?secid=' + num1 + '&fields1=f1,f2,f3,f4,f5&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&' +
    'lmt=700&klt=101&fqt=1&end=30000101';
}

function url2 (num1,num2) {
  return 'https://api-ddc.wallstcn.com/market/kline?prod_code='+num1+'&tick_count=700&period_type=86400&fields=tick_at,open_px,close_px,high_px,low_px,turnover_volume,turnover_value,average_px,px_change,px_change_rate,avg_px,ma2';
}
export const jshares_url = [
  //上证指数
  url1('1.000001'),
  //香港恒生指数 (HSI)
  url1('100.HSI'),
  //纳斯达克综合指数 (IXIC
  url1('100.NDX'),
  //英国富时100指数 (FTSE)
  url1('100.FTSE'),
   //日经225指数 (N225)
  'http://34.push2his.eastmoney.com/api/qt/stock/kline/get?secid=100.N225&fields1=f1,f2,f3,f4,f5,f6&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&klt=101&fqt=1&end=20500101&lmt=120',
  //MSCI新加坡指数 (MSCISG)
  // url1('100.STI'),
]
//股指期货-https://cn.investing.com/indices/indices-futures

//期货华尔街见闻   https://wallstreetcn.com/markets/indices
//https://wallstreetcn.com/markets/CNA50F.OTC
//https://wallstreetcn.com/markets/codes/HK40F.OTC
//https://wallstreetcn.com/markets/codes/US500F.OTC
//https://wallstreetcn.com/markets/UK100F.OTC
//https://wallstreetcn.com/markets/JP225F.OTC
//
export const stock_url = [
  //富时中国a50
  url2('CNA50F.OTC'),
  //香港恒生指数期货
  url2('HK40F.OTC'),
  //纳斯达克100指数期
 // "https://api.investing.com/api/financialdata/8874/historical/chart/?interval=P1D&pointscount=70",
  url2('US500F.OTC'),
  //英国100期货
   url2('UK100F.OTC'),
  //日经225期货
   url2('JP225F.OTC'),
  //新加坡MSCI期货行情概览
  //"https://api.investing.com/api/financialdata/8897/historical/chart/?interval=P1D&pointscount=70"
]
//期货指数
export const futures_url = [
  //WTI原油期货概览
  url1('102.CL00Y'),
  //动力煤
  url1('115.ZCM'),
  //黄金期货 - 2022年8月 (GCQ2)
  url1('111.JAU00Y'),
  //大豆
  url1('103.ZS00Y'),
  //猪肉
  url1('114.lhm'),
]
//货币指数
export const currency_url = [
  //美元兑换人民币
  url2('USDCNH'),
]


