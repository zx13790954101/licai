(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{"1xi3":function(t){t.exports=JSON.parse('{"gdp":{"data":["0.4","4.8","4.0","4.9","7.9","18.3","6.5","4.9","3.2","-6.8","6.0","6.0"],"time":["2022-07-15","2022-04-18","2022-01-17","2021-10-18","2021-07-15","2021-04-16","2021-01-18","2020-10-19","2020-07-16","2020-04-17","2020-01-21","2019-10-18"]},"cpi":{"data":[2.7,2.5,2.1,2.1,1.5,0.9,0.9,1.5,2.3,1.5,0.7,0.8,1,1.1,1.3,0.9,0.4,-0.2,-0.3,0.2,-0.5,0.5,1.7,2.4,2.7,2.5,2.4,3.3,4.3,5.2,5.4,4.5],"time":["2022-08-10","2022-07-11","2022-06-10","2022-05-11","2022-04-11","2022-03-09","2022-02-16","2022-01-12","2021-12-09","2021-11-10","2021-10-14","2021-09-09","2021-08-09","2021-07-09","2021-06-09","2021-05-11","2021-04-12","2021-03-10","2021-02-10","2021-01-11","2020-12-09","2020-11-10","2020-10-15","2020-09-09","2020-08-10","2020-07-09","2020-06-10","2020-05-12","2020-04-10","2020-03-10","2020-02-10","2020-01-09"],"relay_time":["2022-08-10","2022-07-09","2022-06-10","2022-05-11","2022-04-11","2022-03-09","2022-02-16","2022-01-12","2021-12-09","2021-11-10","2021-10-14","2021-09-09","2021-08-09","2021-07-09","2021-06-09","2021-05-11","2021-04-11","2022-03-10","2021-02-10","2021-01-11","2020-12-09","2020-11-10","2020-10-15","2020-09-09","2020-08-10","2020-07-09","2020-06-10","2020-05-12","2020-04-10","2020-03-10","2020-02-10","2020-01-09"]},"ppi":{"data":[4.2,6.1,6.4,8,8.3,8.8,9.1,10.3,12.9,13.5,10.7,9.5,9,8.8,9,6.8,4.4,1.7,0.3,-0.4,-1.5,-2.1,-2.1,-2,-2.4,-3,-3.7,-3.1,-1.5,-0.4,0.1,-0.5],"time":["2022-08-10","2022-07-11","2022-06-10","2022-05-11","2022-04-11","2022-03-09","2022-02-16","2022-01-12","2021-12-09","2021-11-10","2021-10-14","2021-09-09","2021-08-09","2021-07-09","2021-06-09","2021-05-11","2021-04-12","2021-03-10","2021-02-10","2021-01-11","2020-12-09","2020-11-10","2020-10-15","2020-09-09","2020-08-10","2020-07-09","2020-06-10","2020-05-12","2020-04-10","2020-03-10","2020-02-10","2020-01-09"],"relay_time":["2022-07-15","2022-04-18","2022-01-17","2021-10-18","2021-07-15","2021-04-16","2021-01-18","2020-10-19","2020-07-16"]}}')},"3N01":function(t,e,a){"use strict";a.r(e);var n=a("5ZO0"),i=a.n(n);for(var s in n)["default"].indexOf(s)<0&&function(t){a.d(e,t,(function(){return n[t]}))}(s);e.default=i.a},"5ZO0":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("jpq8"),i=o(a("YGYv")),s=o(a("1xi3")),r=o(a("Q4vW"));a("ZnzN");function o(t){return t&&t.__esModule?t:{default:t}}e.default={data:function(){return{urlList:[{url:"https://data.eastmoney.com/cjsj/yzgptjnew.html",title:"股票账户统计一览"}],listData4:null,areaStyle1:[],timeData4:null,title4:null,title4_1:null,width_all:null,hushen300_pe:"https://danjuanapp.com/djapi/index_eva/pe_history/SH000300?day=all"}},props:{array1:Object},created:function(){var t=this.array1,e=this.dealData2(t.klines,2,t.name,2),a=(0,n.getAjax)(this.url1("107.FXP")).responseJSON.data,i=this.dealData2(a.klines,2,a.name,2),o=(0,n.getAjax)(this.url1("107.XPP")).responseJSON.data,l=this.dealData2(o.klines,2,o.name,2);this.title4="上证指数";s.default.cpi.time;var u=JSON.parse((0,n.getAjax)(r.default.cpi).responseText).result.data,c=JSON.parse((0,n.getAjax)(r.default.ppi).responseText).result.data,d=(this.dealData5(u).time.reverse(),this.dealData6(c).time.reverse(),JSON.parse((0,n.getAjax)(r.default.liliFun("758",1)).responseText).result.data),p=JSON.parse((0,n.getAjax)(r.default.liliFun("758",2)).responseText).result.data,f=this.dealData4(d,2).cn.concat(this.dealData4(p,2).cn);f=f.slice(0,e.time.length);this.dealData7((0,n.getAjax)(this.hushen300_pe).responseJSON.data.index_eva_pe_growths);console.log("array5",a);i.num;e.num=e.num.slice(-i.num.length),e.time=e.time.slice(-i.num.length),this.areaStyle1=[null,{},null];var m=[{name:"二倍做空FTSE中国50指数",num:i.num.slice(-e.time.length),time:e.time,yAxisIndex:1,linestylecolor:{normal:{lineStyle:{color:"#4caf50"}}}},{name:"二倍做多FTSE中国50指数",num:l.num.slice(-e.time.length),yAxisIndex:1,time:e.time,linestylecolor:{normal:{lineStyle:{color:"#f44336"}}}}];this.listData4=m,this.timeData4=e.time},mounted:function(){this.width_all=document.querySelector(".kline1").offsetWidth+"px"},components:{histogram:i.default},methods:{url1:function(t,e){return"https://push2his.eastmoney.com/api/qt/stock/kline/get?secid="+t+"&fields1=f1,f2,f3,f4,f5&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&lmt=1078&klt=101&fqt=1&end=30000101"},dateFormat:function(t,e){var a=void 0,n={"Y+":e.getFullYear().toString(),"m+":(e.getMonth()+1).toString(),"d+":e.getDate().toString(),"H+":e.getHours().toString(),"M+":e.getMinutes().toString(),"S+":e.getSeconds().toString()};for(var i in n)(a=new RegExp("("+i+")").exec(t))&&(t=t.replace(a[1],1==a[1].length?n[i]:n[i].padStart(a[1].length,"0")));return t},dealData7:function(t,e){var a=this,n=[],i=[];return t.forEach((function(t,e){n.push(t.pe.toFixed(2)),i.push(a.dateFormat("YYYY-mm-dd",new Date(t.ts)))})),{pe:n,time:i}},dealData6:function(t,e){var a=[],n=[],i=[];return t.forEach((function(t,e){a.push(t.BASE),n.push(t.BASE_SAME),i.push(t.REPORT_DATE.slice(0,10))})),{dy:a,hb:n,time:i}},dealData5:function(t,e){var a=[],n=[],i=[];return t.forEach((function(t,e){a.push(t.NATIONAL_SAME),n.push(t.NATIONAL_SEQUENTIAL),i.push(t.REPORT_DATE.slice(0,10))})),{tb:a,hb:n,time:i}},dealData4:function(t,e){var a=[],n=[],i=[],s=[];return t.forEach((function(t,e){null!=t.EMM00166466&&(a.push(t.EMM00166466.toFixed(2)),n.push(t.SOLAR_DATE.slice(0,10))),null!=t.EMG00001310&&(i.push(t.EMG00001310.toFixed(2)),s.push(t.SOLAR_DATE.slice(0,10)))})),{cn:a,us:i,time1:n,time2:n}},dealData2:function(t,e,a,n){var i=[],s=[];return t.forEach((function(t,e){var a=1==t.length?t:t.split(",");i.push(a[0]),s.push(a[n])})),{name:a,num:s,time:i,array:[]}},dealData:function(t,e,a){var n=[],i=0;return t.forEach((function(t,s){-1!=e.indexOf(t)?(n.push(parseFloat(a[e.indexOf(t)])),i=parseFloat(a[e.indexOf(t)])):n.push(i)})),n}}}},"7AeN":function(t,e,a){var n=a("LboF"),i=a("jmNI");"string"==typeof(i=i.__esModule?i.default:i)&&(i=[[t.i,i,""]]);var s={insert:"head",singleton:!1};n(i,s);t.exports=i.locals||{}},"L3S/":function(t,e,a){"use strict";a.r(e);var n=a("efBr"),i=a("3N01");for(var s in i)["default"].indexOf(s)<0&&function(t){a.d(e,t,(function(){return i[t]}))}(s);a("PGC7");var r=a("KHd+"),o=Object(r.a)(i.default,n.a,n.b,!1,null,"697a1399",null);e.default=o.exports},PGC7:function(t,e,a){"use strict";a("7AeN")},Q4vW:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=e.cpi="https://datacenter-web.eastmoney.com/api/data/v1/get?columns=REPORT_DATE,TIME,NATIONAL_SAME,NATIONAL_BASE,NATIONAL_SEQUENTIAL,NATIONAL_ACCUMULATE,CITY_SAME,CITY_BASE,CITY_SEQUENTIAL,CITY_ACCUMULATE,RURAL_SAME,RURAL_BASE,RURAL_SEQUENTIAL,RURAL_ACCUMULATE&pageNumber=1&pageSize="+"30"+"&sortColumns=REPORT_DATE&sortTypes=-1&source=WEB&client=WEB&reportName="+"RPT_ECONOMY_CPI",i=e.ppi=function(t,e){return"https://datacenter-web.eastmoney.com/api/data/v1/get?columns=REPORT_DATE,TIME,BASE,BASE_SAME,BASE_ACCUMULATE&pageNumber=1&pageSize="+e+"&sortColumns=REPORT_DATE&sortTypes=-1&source=WEB&client=WEB&reportName="+t}("RPT_ECONOMY_PPI","30"),s=e.gdp=function(t,e){return"https://datacenter-web.eastmoney.com/api/data/v1/get?columns=REPORT_DATE,TIME,DOMESTICL_PRODUCT_BASE,FIRST_PRODUCT_BASE,SECOND_PRODUCT_BASE,THIRD_PRODUCT_BASE,SUM_SAME,FIRST_SAME,SECOND_SAME,THIRD_SAME&pageNumber=1&pageSize="+e+"&sortColumns=REPORT_DATE&sortTypes=-1&source=WEB&client=WEB&reportName="+t}("RPT_ECONOMY_GDP","30"),r=e.lili=function(t){return"https://datacenter-web.eastmoney.com/api/data/v1/get?reportName=RPTA_WEB_TREASURYYIELD&columns=ALL&sortColumns=SOLAR_DATE&sortTypes=-1&pageNumber=1&pageSize="+t}("758"),o=(e.choice_pe_dfcf="https://datacenter-choice.eastmoney.com/choice/api/data/v1/get?source=choice&reportName=RPT_INDEX_BASICVALUE_DAILY&columns=SECURITY_INNER_CODE,SECURITY_CODE,TRADE_DATE,SECUCODE,PE_TTM,PB_MRQ,PS_TTM,PCF_TTM,CLOSE_PRICE,PARENT_BVPS_MRQ,EPS_TTM,PER_OI_TTM,IS_ADJUST&quoteColumns=&filter=(SECUCODE=%22000300.SH%22)&pageNumber=&pageSize=100&sortTypes=-1&sortColumns=TRADE_DATE&client=S",e.liliFun=function(t,e){return"https://datacenter-web.eastmoney.com/api/data/v1/get?reportName=RPTA_WEB_TREASURYYIELD&columns=ALL&sortColumns=SOLAR_DATE&sortTypes=-1&pageNumber="+e+"&pageSize="+t}),l=e.hushen300="https://eniu.com/chart/peindex/sz399300/t/60";e.default={cpi:n,ppi:i,gdp:s,lili:r,liliFun:o,hushen300:l}},ZnzN:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getReportNameBszj=e.getBaijiuCapitalSection=e.getBaijiuSection=e.getRzrqData=e.getGpzhData=e.getBxzjData=void 0;i(a("EVdn"));var n=i(a("vDqi"));function i(t){return t&&t.__esModule?t:{default:t}}var s="https://datacenter-web.eastmoney.com/api/data/v1/get?reportName=RPT_NORTH_NETBUY&columns=TRADE_DATE,NETBUY,HNETBUY,SNETBUY,DATE_TYPE_CODE,INDEX_PRICE&quoteColumns=&filter=(DATE_TYPE_CODE=%22001%22)&pageNumber=1&pageSize=500&sortTypes=-1&sortColumns=TRADE_DATE&source=WEB&client=WE",r="https://datacenter-web.eastmoney.com/api/data/v1/get?reportName=RPTA_RZRQ_LSHJ&columns=ALL&source=WEB&sortColumns=dim_date&sortTypes=-1&pageNumber=1&pageSize=50&filter=&pageNo=1&_=1652497828667",o="https://datacenter-web.eastmoney.com/api/data/v1/get?reportName=RPT_STOCK_OPEN_DATA&columns=ALL&pageSize=50&sortColumns=STATISTICS_DATE&sortTypes=-1&source=WEB&client=WEB&_=165250283365",l="https://push2.eastmoney.com/api/qt/clist/get?fid=f109&po=1&pz=50&pn=1&np=1&fltt=2&invt=2&ut=b2884a393a59ad64002292a3e90d46a5&fs=b:BK0477&fields=f12,f14,f2,f109,f164,f165,f166,f167,f168,f169,f170,f171,f172,f173,f257,f258,f124,f1,f13",u="https://push2his.eastmoney.com/api/qt/stock/fflow/daykline/get?lmt=0&klt=101&fields1=f1,f2,f3,f7&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61,f62,f63,f64,f65&ut=b2884a393a59ad64002292a3e90d46a5&secid=90.BK0477&_=1654048986656",c="https://datacenter-web.eastmoney.com/api/data/v1/get?reportName=RPT_NORTH_NETBUY&columns=TRADE_DATE,NETBUY,HNETBUY,SNETBUY,DATE_TYPE_CODE,INDEX_PRICE&quoteColumns=&filter=(DATE_TYPE_CODE=%22001%22)&pageNumber=1&pageSize=500&sortTypes=-1&sortColumns=TRADE_DATE&source=WEB&client=WEB&_=1654764780551",d=e.getBxzjData=function(t){(0,n.default)({method:"get",url:s}).then((function(e){return t(e.data.result.data),e.data.result.data}))},p=e.getGpzhData=function(t){(0,n.default)({method:"get",url:o}).then((function(e){return t(e.data.result.data),e.data.result.data}))},f=e.getRzrqData=function(t){(0,n.default)({method:"get",url:r}).then((function(e){return t(e.data.result.data),e.data.result.data}))},m=e.getBaijiuSection=function(t){(0,n.default)({method:"get",url:l}).then((function(e){return t(e.data.data.diff),e.data.data.diff}))},E=e.getBaijiuCapitalSection=function(t){(0,n.default)({method:"get",url:u}).then((function(e){return t(e.data.data.klines),e.data.data.diff}))},_=e.getReportNameBszj=function(t){(0,n.default)({method:"get",url:c}).then((function(e){return console.log(e),t(e.data.result.data),e.data.result.data}))};e.default={getBxzjData:d,getRzrqData:f,getGpzhData:p,getBaijiuSection:m,getBaijiuCapitalSection:E,getReportNameBszj:_}},efBr:function(t,e,a){"use strict";a.d(e,"a",(function(){return n})),a.d(e,"b",(function(){return i}));var n=function(){var t=this,e=t._self._c;return e("div",{staticClass:"kline kline1"},[null!=t.width_all?e("histogram",{ref:"kline33",attrs:{name:"_kline33",link:"https://data.eastmoney.com/hsgtcg/gzcglist.html?t2=101&t3=1",title:t.title4,thame:"dark",listData:t.listData4,timeData:t.timeData4,areaStyle:t.areaStyle1,width1:t.width_all,height1:"700px",value:""}}):t._e(),t._v(" "),e("el-card",{staticClass:"box-card"},[e("div",{staticClass:"flex-c"},[e("div",{staticClass:"flex-item"},[e("span",[t._v("\n          对应的链接地址\n          "),e("el-link",{attrs:{type:"danger",href:"https://www.macroview.club/data"}},[t._v("对应的cpi与ppi的数据地址")])],1),t._v(" "),e("el-divider"),t._v(" "),e("el-tooltip",{attrs:{content:"https://data.eastmoney.com/cjsj/zmgzsyl.html",placement:"top"}},[e("el-link",{attrs:{type:"danger",href:"https://data.eastmoney.com/cjsj/zmgzsyl.html"}},[t._v("中美国债收益率-来自东方财富")])],1),t._v(" "),e("el-tooltip",{attrs:{content:"https://cn.investing.com/economic-calendar/chinese-gdp-461",placement:"top"}},[e("el-link",{attrs:{type:"danger",href:"https://cn.investing.com/economic-calendar/chinese-gdp-461"}},[t._v("gdp值-来自英为财情\n          ")])],1)],1)])])],1)},i=[]},jmNI:function(t,e,a){(e=a("JPst")(!1)).push([t.i,".kline[data-v-697a1399]{padding:0px;width:100%}.kline .main[data-v-697a1399]{background-color:#353a47;padding:10px}.kline .box-card[data-v-697a1399]{margin-right:0px;margin-bottom:20px}\n",""]),t.exports=e}}]);
//# sourceMappingURL=56.84846c9b1419933f4593.js.map