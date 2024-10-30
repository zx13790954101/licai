<template>
  <div class="analysis">
    <headNav></headNav>
    <analysisTab
      ref="analysisTab"
      v-if="viewType"
      :input_name1="input_name1"
      :input_name6="input_name6"
      :array_all="array_all"
      :main_datalist_table="main_datalist_table"
      @transfer="getData1"
      :main_markline="main_markline"
      :testtext2="testtext2"
      :calculate_array_active="calculate_array_active"
    >
    </analysisTab>
    <div class="flex-c array-list">
      <span class="flex-item">
        <a :href="urlDeal3(input_name1)" target="_blank"> 同花顺 </a>
      </span>
      <span class="flex-item">
        <a :href="urlDeal4(input_name1)" target="_blank"> 东方财富 </a>
      </span>
      <span class="flex-item">
        <a :href="urlDeal5(input_name1)" target="_blank"> 千股千评持股判断 </a>
      </span>
      <span class="flex-item">
        <a :href="urlDeal6(input_name1)" target="_blank"> 同花顺个股分析 </a>
      </span>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import Section from "./section.vue";
import histogramFund from "./fuCommon/histogramFund.vue";
import classification from "./fuCommon/classification.vue";
import tableListBox from "./fuCommon/tableList.vue";
import headNav from "./fuCommon/headNav.vue";
import {
  switchUrlDeal,
  dealData,
  urlDeal2,
  urlDeal,
  btn_array2,
} from "./fuCommon/getUrl";
import { initAmount } from "./fuCommon/circulationAmount";
import analysisTab from "./fuCommon/tab.vue";
import { getAjax } from "./../assets/common.js";
export default {
  data() {
    return {
      // 设置页面机构
      viewType: false,
      array_all: [],
      main_datalist_table: [],
      datalist_table: [],
      datalist_table2: [],
      btn_array: [],
      flag: false,
      input_name1: "",
      input_name2: "",
      input_name3: "",
      input_name4: "",
      input_name6: "",
      //买入点
      input_name5: "",
      //买入时间
      input_name7: "",
      data_list: [],

      num1: 200,
      dataList: [],
      this_name: "",

      start_time: null,
      end_time: null,
      testtext1: "",
      testtext2: [],
      testtext3: "",
      testtext4: "",
      testarray: null,
      testarray2: null,
      testtime: null,
      testtime2: null,
      testarray3: null,
      testarray4: null,
      testarray5: null,
      array1: "",
      calculateStopLoss1: null,

      ths_comtent: null,
      ths_comtent1: null,
      zlkp_time: [],
      zlkp_markLine: [],
      markPoint3: [],
      zlkp_list: [],
      main_markline: [],
      calculate_array_active: 0,
      //位置数组，判断是不是跌破支撑位
      position_array: [],
    };
  },
  components: {
    Section,
    histogramFund,
    tableListBox,
    classification,
    analysisTab,
    headNav,
  },
  created() {
    this.input_name1 = "603259";
    // this.input_name5 = 43.75;
    this.btn_array = btn_array2;
    // window.open(
    //   "https://www.iwencai.com/stockpick/search?typed=1&preParams=&ts=1&f=1&qs=index_rewrite&selfsectsn=&querytype=stock&searchfilter=&tid=stockpick&w=%E4%B8%AD%E5%9B%BD%E5%B9%B3%E5%AE%89",
    //   "_blank"
    // );
    this.toBtn();
    //推荐资金代码
    //https://push2.eastmoney.com/api/qt/stock/fflow/kline/get?lmt=0&klt=1&fields1=f1%2Cf2%2Cf3%2Cf7&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61%2Cf62%2Cf63%2Cf64%2Cf65&secid=1.601318
    //https://push2his.eastmoney.com/api/qt/stock/fflow/daykline/get?lmt=0&klt=101&fields1=f1%2Cf2%2Cf3%2Cf7&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61%2Cf62%2Cf63%2Cf64%2Cf65&secid=1.601318
  },
  mounted() {
    //$("#dfcf_iframe").contents().find("#topgg").hide();
    // console.log("dfcf_iframe", $("#dfcf_iframe"));
  },
  methods: {
    //设置指定行、列、具体单元格颜色
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 8 && columnIndex === 8) {
        //指定坐标rowIndex ：行，columnIndex ：列
        return ""; //rgb(105,0,7)
      } else {
        return "";
      }
    },
    dealReportName(text1) {
      let cbjg_1 = [];
      let cbjg_20 = [];
      let cbjg_60 = [];
      let jgcyd = [];
      let zlkp = [];
      let time = [];
      text1.forEach((element, index) => {
        cbjg_1.push(element.PRIME_COST.toFixed(2));
        cbjg_20.push(element.PRIME_COST_20DAYS.toFixed(2));
        cbjg_60.push(element.PRIME_COST_60DAYS.toFixed(2));
        jgcyd.push((element.ORG_PARTICIPATE * 100).toFixed(2));
        zlkp.push(element.PARTICIPATE_TYPE_CN);
        time.push(element.TRADE_DATE.slice(0, 10));
      });
      return {
        cbjg_1,
        cbjg_20,
        cbjg_60,
        jgcyd,
        zlkp,
        time,
      };
    },
    urlDeal6(url) {
      return "http://doctor.10jqka.com.cn/" + url + "/";
    },
    urlDeal5(url) {
      return "http://qgqp.shdjt.com/gpdm.asp?gpdm=" + url;
    },
    urlDeal3(url) {
      return (
        "https://www.iwencai.com/stockpick/search?typed=1&preParams=&ts=1&f=1&qs=index_rewrite&selfsectsn=&querytype=stock&searchfilter=&tid=stockpick&w=" +
        url
      );
    },
    urlDeal4(url) {
      return (
        "https://data.eastmoney.com/stockcomment/stock/" + url + ".html#zlkp"
      );
    },
    getAjax2(url) {
      if (url == "") {
        return "";
      } else {
        var htmlobj = $.ajax({
          url: url,
          async: false,
        });
        return htmlobj.responseJSON.data;
      }
    },
    toBtn1(num) {
      this.input_name1 = num;
    },
    //点击查看详情
    toDetail() {},
    //处理时间
    dealTime(data, time) {
      let data1 = [];
      let time1 = [];
      var index1 = 0;
      for (let i = 1; i < 13; i++) {
        let num1 = i < 10 ? "-0" + i : "-" + i;
        let time_item =
          time[index1] == undefined ? "" : time[index1].slice(4, 7) + "";

        if (time_item == num1) {
          data1.push(data[index1]);
          index1 = index1 + 1;
        } else {
          data1.push("--");
        }
      }
      return data1;
    },
    //设置月份
    dealMoth(dataList) {
      let item1 = [];
      let time1 = null;
      let time2 = [];
      let array1 = [];

      dataList.time.forEach((element, index) => {
        if (time1 == element.slice(0, 4)) {
          item1.push(dataList.array[index]);
          time2.push(element.slice(0, 7));
          if (index + 1 == dataList.time.length) {
            array1.push({
              name: time1,
              array: this.dealTime(item1, time2),
              time: time2,
            });
          }
        } else {
          if (time1 !== null) {
            array1.push({
              name: time1,
              array: this.dealTime(item1, time2),
              time: time2,
            });
          }

          item1 = [];
          time1 = null;
          time1 = element.slice(0, 4);
          time2 = [];
          time2.push(element.slice(0, 7));
          item1.push(dataList.array[index]);
        }
      });

      this.datalist_table2 = array1;
    },
    dealAmount(data2) {
      let item1 = [];
      data2.klines.forEach((element2, index2) => {
        let element2_item =
          element2.length == 1 ? element2 : element2.split(",");
        var item2 = {
          open: parseFloat(element2_item[1]),
          close: parseFloat(element2_item[2]),
          low: parseFloat(element2_item[4]),
          high: parseFloat(element2_item[3]),
          amount: parseInt(element2_item[5]),
        };
        item1.push(item2);
      });

      let num1 =
        this.input_name1.indexOf("002") != -1
          ? 0
          : this.input_name1.indexOf("300") != -1
          ? 0
          : this.input_name1.indexOf("000") != -1
          ? 0
          : 1;
      let array1 = this.getAjax2(
        "https://push2his.eastmoney.com/api/qt/stock/get?fltt=2&invt=2&volt=2&fields=f117&secid=" +
          num1 +
          "." +
          this.input_name1
      );
      initAmount(item1, parseInt(parseInt(array1.f117) / 10000000));
    },

    getData1(calculateStopLoss12) {
      let that = this;
      let pressure = this.getPressure();
      let calculateStopLoss = calculateStopLoss12;

      let this_num =
        calculateStopLoss.min_data_num[
          calculateStopLoss.min_data_num.length - 1
        ];

      this.calculateStopLoss1 = calculateStopLoss;
      //止损位
      this.boxData(this_num, calculateStopLoss, pressure);

      this.tableList(this.array_all[7], calculateStopLoss.array_end);
      //this.dealEachrt(pressure);

      //获取东方财富的判断
      //关闭持有价格判断
      //   let getstock = getAjax(urlDeal9(that.input_name1)).responseJSON.ApiResults;
      //   this.ths_comtent1 = getstock.qsyp.dianping[0].Comment + "<br>";

      // +
      //   getstock.qsyp.BIAS[0].Comment +
      //   "<br>" +
      //   getstock.qsyp.BOLL[0].Comment +
      //   "<br>" +
      //   getstock.qsyp.KDJ[0].Comment +
      //   "<br>" +
      //   getstock.qsyp.MACD[0].Comment;
    },
    toBtn(index) {
      let that = this;

      if (index == 2) {
        return;
      }

      that.viewType = false;
      that.array_all = [];
      that.this_name = "";
      let array1 = this.getAjax2(switchUrlDeal(1, that.input_name1, 1));

      let array2 = this.getAjax2(switchUrlDeal(1, that.input_name2, 1));
      let array3 = this.getAjax2(switchUrlDeal(1, that.input_name3, 1));
      let array4 = this.getAjax2(switchUrlDeal(1, that.input_name4, 1));
      //获取月的数据
      this.datalist_table = dealData(
        this.getAjax2(urlDeal(that.input_name1, 3)).klines,
        2,
        "月数据",
        2
      );
      this.dealMoth(this.datalist_table);

      let szzs = this.getAjax2(switchUrlDeal(10, ""));

      let array5 = this.getAjax2(
        switchUrlDeal(6, that.input_name1),
        this.num1
      ).klines;

      let array6 = this.getAjax2(switchUrlDeal(7, that.input_name1)).klines;
      //周末
      let array7 = this.getAjax2(urlDeal(that.input_name1, 2)).klines;
      this.array_all = [
        array1,
        array2,
        array3,
        array4,
        szzs,
        array5,
        array6,
        array7,
      ];

      this.main_datalist_table = this.datalist_table;

      array5.splice(0, 2);
      if (
        parseInt(new Date().getHours()) >= 9 &&
        parseInt(new Date().getHours()) <= 15
      ) {
        array5.push(array6.slice(-1)[0]);
      }

      let array_all = [array1, array2, array3, array4, szzs];

      this.this_name = array1.name;

      console.log("this_name,当前的数据名称=", this.this_name);
      if (index) {
        this.$refs.analysisTab.toBtn();
      }

      setTimeout(function () {
        //   that.dealAmount(array1);
      }, 2000);

      setTimeout(function () {
        that.viewType = true;
      }, 2500);
    },
    //box数据
    boxData(this_num, calculateStopLoss, pressure) {
      let that = this;
      let zsw = parseFloat(calculateStopLoss.max_data_array * 0.95).toFixed(2);
      let zsw1 = parseFloat(calculateStopLoss.max_data_array * 0.925).toFixed(
        2
      );

      let zsw2 = parseFloat(calculateStopLoss.max_data_array * 0.9).toFixed(2);

      let zcw = parseFloat(
        (calculateStopLoss.max_data_array - calculateStopLoss.min_data_array) *
          0.618 +
          parseFloat(calculateStopLoss.min_data_array)
      ).toFixed(2);

      //获取买入日期
      if (that.input_name7 != "") {
        that.input_name5 =
          calculateStopLoss.this_data_num[
            calculateStopLoss.this_data.indexOf(that.input_name7)
          ];
      }
      // this.testtext3 = [
      //   {
      //     name: "当前收益",
      //     num: (
      //       ((this_num - that.input_name5) / that.input_name5) *
      //       100
      //     ).toFixed(2),
      //   },
      //   {
      //     name: "买入价到压力位的涨跌幅",
      //     num: (
      //       ((pressure.pressure - that.input_name5) / that.input_name5) *
      //       100
      //     ).toFixed(2),
      //   },
      //   {
      //     name: "买入价到支撑位的涨跌幅",
      //     num: (
      //       ((pressure.support - that.input_name5) / that.input_name5) *
      //       100
      //     ).toFixed(2),
      //   },
      // ];

      // this.testtext4 = [{
      //   name: "当前股价",
      //   num: this.input_name5,
      // }, ];
      let max_num1 = Math.max(...calculateStopLoss.max_data_num.slice(-30));
      let min_num1 = Math.min(...calculateStopLoss.min_data_num.slice(-30));
      let zcw3 = (max_num1 - min_num1) * 0.618 + min_num1;

      //设置

      let zcw_array_num = calculateStopLoss.deal_data2.zcw_array.slice(-1);
      zcw_array_num = parseFloat(zcw_array_num[0]);
      let zcw_type =
        calculateStopLoss.this_data_num[
          calculateStopLoss.this_data_num.length - 1
        ] -
          zcw_array_num >
        0
          ? "值得持有"
          : "卖出";
      console.log("aa", zcw_array_num);
      this.position_array = [
        {
          name: "支撑位是不是被突破",
          type: zcw_type,
          num: zcw_array_num,
        },
      ];

      this.testtext2 = [
        // {
        //   name: "最大值平均值",
        //   num: calculateStopLoss.max_data_array,
        // },
        // {
        //   name: "20个工作日最小值平均值",
        //   num: calculateStopLoss.min_data_array,
        // },
        // {
        //   name: "收盘价平均值",
        //   num: calculateStopLoss.this_data_array,
        // },
        // {
        //   name: "ma5",
        //   num: calculateStopLoss.ma5[calculateStopLoss.ma5.length - 1],
        // },
        // {
        //   name: "ma10",
        //   num: calculateStopLoss.ma10[calculateStopLoss.ma10.length - 1],
        // },
        // {
        //   name: "ma20",
        //   num: calculateStopLoss.ma20[calculateStopLoss.ma20.length - 1],
        // },s
        // {
        //   name: "ma30",
        //   num: calculateStopLoss.ma30[calculateStopLoss.ma30.length - 1],
        // },
        // {
        //   name: "ma60",
        //   num: calculateStopLoss.ma60[calculateStopLoss.ma60.length - 1],
        // },
        // {
        //   name: "止损位(获利在15%以下)",
        //   num: zsw,
        // },
        // {
        //   name: "止损位(获利在15%-25%)",
        //   num: zsw1,
        // },
        // {
        //   name: "止损位(获利在25%以上)",
        //   num: zsw2,
        // },
        // {
        //   name: "支撑位",
        //   num: zcw,
        // },
        {
          name: "当前价",
          num: calculateStopLoss.this_data_num[
            calculateStopLoss.this_data_num.length - 1
          ],
          active: "active1",
        },
        {
          name: "近30日最高价",
          num: max_num1,
        },
        {
          name: "近30日最低价",
          num: min_num1,
        },
        // {
        //   name: "近30日支撑位",
        //   num: zcw3.toFixed(2),
        // },
      ];

      this.testtext2 = this.testtext2
        .sort(function (a, b) {
          return a.num - b.num;
        })
        .reverse();
      this.main_markline = this.testtext2;
      this.testtext2.forEach((element, index) => {
        if (element.active) {
          that.calculate_array_active = index;
        }
      });

      console.log("  this.testtext2", this.testtext2);
    },
    //列表数据
    tableList(array7, array_end) {
      let that = this;
      //周
      let test1_num1 = -10;
      that.testarray = dealData(array7, 2, "涨跌幅", 8).num.slice(test1_num1);
      that.testarray3 = dealData(array7, 2, "震幅", 7).num.slice(test1_num1);
      that.testtime = dealData(array7, 2, "涨跌幅时间", 8).time.slice(
        test1_num1
      );
      that.testtime2 = dealData(array_end, 2, "涨跌幅时间", 8).time.slice(
        test1_num1
      );
      that.testarray2 = dealData(array_end, 2, "涨跌幅", 8).num.slice(
        test1_num1
      );
      that.testarray4 = dealData(array_end, 2, "震幅", 7).num.slice(test1_num1);
      that.array1 = [
        "最大涨幅",
        "最大跌幅",
        "平均涨跌幅",

        Math.max(...that.testarray),
        Math.min(...that.testarray),
        (
          that.testarray.reduce(function (num1, num2) {
            return parseFloat(num1) + parseFloat(num2);
          }) / parseInt(test1_num1)
        ).toFixed(2),
        Math.max(...that.testarray3),
        Math.min(...that.testarray3),
        (
          that.testarray3.reduce(function (num1, num2) {
            return parseFloat(num1) + parseFloat(num2);
          }) / parseInt(test1_num1)
        ).toFixed(2),
        Math.max(...that.testarray2),
        Math.min(...that.testarray2),
        (
          that.testarray2.reduce(function (num1, num2) {
            return parseFloat(num1) + parseFloat(num2);
          }) / parseInt(test1_num1)
        ).toFixed(2),
        Math.max(...that.testarray4),
        Math.min(...that.testarray4),
        (
          that.testarray4.reduce(function (num1, num2) {
            return parseFloat(num1) + parseFloat(num2);
          }) / parseInt(test1_num1)
        ).toFixed(2),
      ];
    },
    dealData2(data2, type, name, num) {
      let that = this;
      let array2 = [];
      let time1 = [];
      let num1 = [];

      data2.forEach((element2, index2) => {
        let element2_item =
          element2.length == 1 ? element2 : element2.split(",");
        if (index2 > data2.length - that.num1) {
          if (type == 1) {
          } else if (type == 2) {
            time1.push(element2_item[0]);
            if (num == 1) {
              num1.push((parseInt(element2_item[num]) / 10000000).toFixed(2));
            } else if (num == 3) {
              num1.push((parseInt(element2_item[num]) / 10000000).toFixed(2));
            } else {
              num1.push(element2_item[num]);
            }
          }
        }
      });
      let object1 = {
        name: name,
        num: num1,
        time: time1,
        array: array2,
      };
      return object1;
    },
    //同花顺的财问的回去压力位
    getPressure() {
      //关闭数据人口
      return;
      let that = this;
      let end_data = getAjax(urlDeal2(that.input_name1));

      if (end_data.status == 403) {
        window.open(
          "https://www.iwencai.com/stockpick/search?typed=1&preParams=&ts=1&f=1&qs=index_rewrite&selfsectsn=&querytype=stock&searchfilter=&tid=stockpick&w=" +
            that.this_name,
          "_blank"
        );
        window.location.reload();
        return;
      } else {
        if (end_data.responseJSON.data) {
          end_data = end_data.responseJSON.data.data;
        } else {
          return null;
        }
      }

      this.ths_comtent = end_data.result.comment;
      // 该股距离上方压力位（47.19元）还有 + 1.24 % 的上涨空间，距离上方的止盈位（46.9元）还有 + 0.62 % 的上涨空间；距离下方的止损位（41.64元）有 - 10.66 % 的下跌空间，
      // 距离下方的支撑位（41.61元）有 - 10.73 % 的下跌空间；上涨空间小于下跌空间，持股的投资者建议注意及时止盈，锁定收益；持币的投资者在此位置不建议建仓，避免在高位套牢的风险。
      let get_data = {
        pressure: end_data.result.pressure,
        stopProfitDiffPer: end_data.result.stopProfitDiffPer.toFixed(2),
        stopProfit: end_data.result.stopProfit,
        stopLoss: end_data.result.stopLoss,
        stopLossDiffPer: end_data.result.stopLossDiffPer.toFixed(2),
        support: end_data.result.support,
        pressureDiffPer: end_data.result.pressureDiffPer.toFixed(2),
      };
      this.testtext1 = end_data.result.comment;
      return get_data;
    },
    defaultNum(url) {
      if (url.indexOf("002")) {
      } else if (url.indexOf("002")) {
      }
    },
  },
};
</script>
<style scoped lang="scss">
.tab-nav {
  padding: 20px 20px 0px 20px;
  background-color: #ffffff;

  .active {
    background-color: #ff5722;
    color: white;
    border-color: #ff5722;
  }
}

header {
  background-color: #444444;
  padding: 10px 20px;
}

.head1 {
  color: white;

  span {
    font-weight: 600;
    font-size: 28px;
    letter-spacing: 2px;
  }
}

.analysis {
  background-color: #444444;
  padding: 20px 30px;

  .active1 {
    color: #ff3d00;
    font-size: 14px;
    font-weight: 600;
  }

  .active2 {
    color: green;
    font-size: 14px;
    font-weight: 600;
  }

  .iframe-box {
    iframe {
      height: 100vh;
    }
  }

  .box {
    //  margin: 20px 0px;

    // border-left: 1px solid;
    // border-bottom: 1px solid;
    ul {
      display: flex;
      margin: 0px 0px 0px 0px;
      border-left: 1px solid #a7a7a7;
      border-bottom: 1px solid #a7a7a7;

      li {
        width: 100px;
        flex: 1;
        padding: 5px;
        border-right: 1px solid #a7a7a7;
        border-top: 1px solid #a7a7a7;
        font-size: 16px;
        text-align: center;
        color: #d9d9d9;
      }
    }
  }

  .bar > div {
    margin-right: 10px;
    // width: 100%;
    display: flex;
    .active_input {
    }
    .flex-item {
      word-wrap: normal;
      display: flex;
    }
  }
  .bar {
    width: 100%;
    justify-content: space-between;
    .flex-c {
      background-color: #444444;
      padding: 5px;
      justify-content: space-evenly;
    }
    .ge {
      width: 40px;
    }
  }
  .box_color {
    background-color: black;
    color: white;
    padding: 20px;
    background-color: #607d8b;
    border: 20px solid;

    P {
      border-color: white;
      letter-spacing: 1px;
      padding: 5px 10px;
      background-color: white;
      margin-bottom: 0px;
      color: #333333;
    }

    .active {
      border-color: #ff9800;
      border-width: 4px;
      color: white;
      background-color: #ff3d00;
    }

    span {
      font-size: 14px;
    }

    .active1 {
      float: right;
      color: red;
    }

    .active2 {
      float: right;
      color: green;
    }
  }

  .main1 {
  }

  nav {
    margin-top: 20px;
  }

  p {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 10px;
    border: 1px solid black;
    padding: 5px;
  }

  .box {
    align-items: baseline;

    ul {
      .act2 {
        color: green;
        font-weight: 600;
      }

      .act1 {
        color: red;
        font-weight: 600;
      }
    }

    .item_box2 {
      width: 33.33%;
      padding-right: 40px;

      h3 {
        font-size: 18px;
      }

      h4 {
        background-color: white;
        padding: 5px 10px;

        a {
          font-size: 16px;
          color: #333333;
        }
      }
    }
  }

  b {
    font-size: 16px;
  }

  .array-list {
    padding: 10px 20px 20px 20px;
    background-color: white;
    margin-bottom: 20px;

    span {
      a {
        font-size: 18px;
      }
    }
  }
}
</style>
