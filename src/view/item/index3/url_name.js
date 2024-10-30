function urlname(url, num) {
  var all_url = "https://datacenter-web.eastmoney.com/api/data/v1/get?" +
    "columns=REPORT_DATE,TIME,NATIONAL_SAME,NATIONAL_BASE,NATIONAL_SEQUENTIAL,NATIONAL_ACCUMULATE," +
    "CITY_SAME,CITY_BASE,CITY_SEQUENTIAL,CITY_ACCUMULATE,RURAL_SAME,RURAL_BASE,RURAL_SEQUENTIAL,RURAL_ACCUMULATE&" +
    "pageNumber=1&pageSize=" + num + "&sortColumns=REPORT_DATE&sortTypes=-1&source=WEB&client=WEB&reportName=" + url
  return all_url;
}

function urlname1(url, num) {
  var all_url = "https://datacenter-web.eastmoney.com/api/data/v1/get?" +
    "columns=REPORT_DATE,TIME,BASE,BASE_SAME,BASE_ACCUMULATE&pageNumber=1&pageSize=" + num +
    "&sortColumns=REPORT_DATE&sortTypes=-1&source=WEB&client=WEB&reportName=" + url
  return all_url;
}

function urlname2(url, num) {
  var all_url = "https://datacenter-web.eastmoney.com/api/data/v1/get?" +
    "columns=REPORT_DATE,TIME,DOMESTICL_PRODUCT_BASE,FIRST_PRODUCT_BASE,SECOND_PRODUCT_BASE," +
    "THIRD_PRODUCT_BASE,SUM_SAME,FIRST_SAME,SECOND_SAME,THIRD_SAME&pageNumber=1&pageSize=" +
    num + "&sortColumns=REPORT_DATE&sortTypes=-1&source=WEB&client=WEB&reportName=" + url
  return all_url;
}

function urlname3(num) {
  var all_url =
    "https://datacenter-web.eastmoney.com/api/data/v1/get?reportName=RPTA_WEB_TREASURYYIELD&columns=ALL&sortColumns=SOLAR_DATE&sortTypes=-1&pageNumber=1&pageSize=" +
    num
  return all_url;
}

function urlname4(num) {

  return "https://eniu.com/chart/peindex/sz399300/t/60";
}
//https://data.eastmoney.com/cjsj/cpi.html
//cpi数据
export const cpi = urlname('RPT_ECONOMY_CPI', '30')
//ppi数据
export const ppi = urlname1('RPT_ECONOMY_PPI', '30')
//ppi数据
export const gdp = urlname2('RPT_ECONOMY_GDP', '30')

//中美国债收益率对比图
export const lili = urlname3('758')


//东方财富的沪深300 的pe 的数据来自于      东方财富的电脑版choice
export const choice_pe_dfcf = "https://datacenter-choice.eastmoney.com/choice/api/data/v1/get?source=choice&reportName=" +
  "RPT_INDEX_BASICVALUE_DAILY&columns=SECURITY_INNER_CODE,SECURITY_CODE,TRADE_DATE,SECUCODE,PE_TTM,PB_MRQ,PS_TTM,PCF_TTM,CLOSE_PRICE," +
  "PARENT_BVPS_MRQ,EPS_TTM,PER_OI_TTM,IS_ADJUST&quoteColumns=&filter=(SECUCODE=%22000300.SH%22)&pageNumber=&pageSize=100&sortTypes=-1&sortColumns=TRADE_DATE&client=S"


export const liliFun = (num,page)=>{
  var all_url =
  "https://datacenter-web.eastmoney.com/api/data/v1/get?reportName=RPTA_WEB_TREASURYYIELD&columns=ALL&sortColumns=SOLAR_DATE&sortTypes=-1&pageNumber="+page+"&pageSize=" +
  num
return all_url;
}

//沪深300
export const hushen300 = urlname4()

export default {
  cpi,
  ppi,
  gdp,
  lili,
  liliFun,
  hushen300
}
