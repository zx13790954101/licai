import {
  getAjax
} from "../../../assets/common.js";
//名称导入

//处理个股的大单和中单，买入的情况数据
export const dealReportName = (code) => {

  let url1 = 'https://datacenter-web.eastmoney.com/api/data/v1/get?reportName=RPTA_WEB_RZRQ_GGMX&columns=ALL&source=WEB&sortColumns=date&sortTypes=-1&'+
    'pageNumber=1&pageSize=100&filter=(scode="' + code + '")&pageNo=2&p=2&pageNum=1'
  
  let each_data = JSON.parse(getAjax(url1).responseText).result.data;

  //RZRQYECZ-融资融券余额差值
  //RZJME-融资融券净买入万
  //RQJMG-融资融券净买出万
  let RZRQYECZ = new Array();
  let RZJME =new Array();
  let RQJMG = new Array();
  let num1 = new Array();
  let time1=new Array()
  each_data = each_data.reverse()
  each_data.forEach((item, index) => {

    RZRQYECZ.push((item.RZRQYECZ/100000000 ).toFixed(2))
    RZJME.push((item.RZJME/10000000).toFixed(2))
    RQJMG.push((item.RQJMG / 10000).toFixed(2))
    num1.push(item.SPJ);
    time1.push(item.DATE.slice(0,10))
  });

console.log("each_data",each_data)

  return {
    all_data: each_data,
    time:time1,
    list: [
      
      {
        num: num1,
        name: '数值',
        
      },{
      num: RZRQYECZ,
      name: '融资融券余额差值',
      
    },{
      num: RZJME,
      name: '融资融券净买入万(亿)',
      
    },{
      num: RQJMG,
      name: '融资融券净买出万',
      
    }]
  };
}

export default {
  dealReportName
}
