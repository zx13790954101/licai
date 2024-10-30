<template>
  <div class="kline kline1">
    <histogram
      ref="kline33"
      :name="'_kline33'"
      :link="'https://data.eastmoney.com/hsgtcg/gzcglist.html?t2=101&t3=1'"
      :title="title4"
      :thame="'dark'"
      :listData="listData4"
      :timeData="timeData4"
      :areaStyle="areaStyle1"
      :width1="width_all"
      :height1="'700px'"
      v-if="width_all != null"
      value=""
    ></histogram>

    <el-card class="box-card">
      <div class="flex-c">
        <div class="flex-item">
          <span>
            对应的链接地址
            <el-link type="danger" href="https://www.macroview.club/data"
              >对应的cpi与ppi的数据地址</el-link
            >
          </span>
          <el-divider></el-divider>
          <el-tooltip
            content="https://data.eastmoney.com/cjsj/zmgzsyl.html"
            placement="top"
          >
            <el-link
              type="danger"
              href="https://data.eastmoney.com/cjsj/zmgzsyl.html"
              >中美国债收益率-来自东方财富</el-link
            >
          </el-tooltip>
          <el-tooltip
            content="https://cn.investing.com/economic-calendar/chinese-gdp-461"
            placement="top"
          >
            <el-link
              type="danger"
              href="https://cn.investing.com/economic-calendar/chinese-gdp-461"
              >gdp值-来自英为财情
            </el-link>
          </el-tooltip>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import { orchesData } from "../../../assets/common.js";
import histogram from "../../fuCommon/histogramFund.vue";
import { getAjax } from "../../../assets/common.js";
import jjData from "./jj_data";
import url_name from "./url_name";
import { getReportNameBszj } from "../../../lib/api/dfcf.js";
export default {
  data() {
    return {
      urlList: [
        {
          url: "https://data.eastmoney.com/cjsj/yzgptjnew.html",
          title: "股票账户统计一览",
        },
      ],
      listData4: null,
      areaStyle1: [],
      timeData4: null,
      title4: null,
      title4_1: null,
      width_all: null,
      //来自蛋卷基金的数据
      hushen300_pe:
        "https://danjuanapp.com/djapi/index_eva/pe_history/SH000300?day=all",
    };
  },
  props: {
    array1: Object,
  },
  created() {
    //做空
    //

    var that = this;
    let array1 = this.array1;
    
    let array2 = that.dealData2(array1.klines, 2, array1.name, 2);

    let array5 = getAjax(this.url1("107.FXP")).responseJSON.data;

    //新建列表页
    let array3 = that.dealData2(array5.klines, 2, array5.name, 2);

    let array6 = getAjax(this.url1("107.XPP")).responseJSON.data;

    let array7 = that.dealData2(array6.klines, 2, array6.name, 2);

    that.title4 = "上证指数";
    let time_all = jjData.cpi.time;
    // time_all[0] = array2.time[1];
    // time_all[time_all.length - 1] = array2.time[array2.time.length - 1];
    let cpi_data = JSON.parse( getAjax(url_name.cpi).responseText).result.data;
    let ppi_data = JSON.parse(getAjax(url_name.ppi).responseText).result.data;
    let cpi_time = this.dealData5(cpi_data).time.reverse();
    let ppi_time = this.dealData6(ppi_data).time.reverse();
    let lili_data = JSON.parse(getAjax(url_name.liliFun("758", 1)).responseText).result
      .data;
    let lili_data2 = JSON.parse(getAjax(url_name.liliFun("758", 2)).responseText).result
      .data;
    // cpi_time[0] = array2.time[1];
    // cpi_time[cpi_time.length - 1] = array2.time[array2.time.length - 1];
    // ppi_time[0] = array2.time[1];
    // ppi_time[ppi_time.length - 1] = array2.time[array2.time.length - 1];

    let lili_all = that
      .dealData4(lili_data, 2)
      .cn.concat(that.dealData4(lili_data2, 2).cn);

    lili_all = lili_all.slice(0, array2.time.length);

    let hushen300_pe = this.dealData7(
      getAjax(this.hushen300_pe).responseJSON.data.index_eva_pe_growths
    );

    // let url_rmb =
    //   "http://hq.cnindex.com.cn/market/market/getIndexDailyData?indexCode=CNYX&startDate=2019-12-26&endDate=" +
    //   this.dateFormat("YYYY-mm-dd", new Date());

    // let rmb_data = getAjax(url_rmb).responseJSON.data.data;

    // rmb_data = rmb_data.map((item) => {
    //   return item[1];
    // });
    console.log("array5", array5)
    let rmb_data_num = array3.num;
    array2.num = array2.num.slice(-array3.num.length);
    array2.time = array2.time.slice(-array3.num.length);

    this.areaStyle1 = [null, {}, null];
    
  
    let array4 = [
      // array2,
      // {
      //   num: array2.num,
      //   name: "上证指数",
      //   yAxisIndex: 0,
      //   time: array2.time,
      // },
      {
        name: "二倍做空FTSE中国50指数",
        num: array3.num.slice(-array2.time.length),
        time: array2.time,
         yAxisIndex:1,
        linestylecolor: {
          normal: {
            lineStyle: {
              color: "#4caf50",
            },
          },
        },
      },
      {
        name: "二倍做多FTSE中国50指数",
        num: array7.num.slice(-array2.time.length),
        yAxisIndex:1,
        time: array2.time,
        linestylecolor: {
          normal: {
            lineStyle: {
              color: "#f44336",
            },
          },
        },
      },
  
      // {
      //   num: jjData.gdp.data.reverse(),
      //   name: "gdp",
      //   time: jjData.gdp.time.reverse(),
      // },
      // {
      //   num: jjData.ppi.data.reverse(),
      //   name: "ppi",
      //   time: jjData.ppi.time.reverse(),
      // },
      // {
      //   num: jjData.cpi.data.reverse(),
      //   name: "cpi",
      //   time: time_all.reverse(),
      // },
    ];

    that.listData4 = array4;
    that.timeData4 = array2.time;
  },
  mounted() {
    this.width_all = document.querySelector(".kline1").offsetWidth + "px";
  },
  components: {
    histogram,
  },
  methods: {
    url1(num1, num2) {
      return (
        "https://push2his.eastmoney.com/api/qt/stock/kline/get?secid=" +
        num1 +
        "&fields1=f1,f2,f3,f4,f5&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&lmt=1078&klt=101&fqt=1&end=30000101"
      );
    },
    dateFormat(fmt, date) {
      let ret;
      const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString(), // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
          );
        }
      }
      return fmt;
    },
    dealData7(data5, num) {
      let that = this;
      let num1 = [];
      let data1 = [];
      let data2 = [];
      let data3 = [];
      data5.forEach((element2, index2) => {
        data1.push(element2.pe.toFixed(2));
        data2.push(this.dateFormat("YYYY-mm-dd", new Date(element2.ts)));
      });
      return {
        pe: data1,
        time: data2,
      };
    },
    dealData6(data5, num) {
      let that = this;
      let num1 = [];
      let data1 = [];
      let data2 = [];
      let data3 = [];
      data5.forEach((element2, index2) => {
        data1.push(element2.BASE);
        data2.push(element2.BASE_SAME);
        data3.push(element2.REPORT_DATE.slice(0, 10));
      });
      return {
        dy: data1,
        hb: data2,
        time: data3,
      };
    },
    dealData5(data5, num) {
      let that = this;
      let num1 = [];
      let data1 = [];
      let data2 = [];
      let data3 = [];
      data5.forEach((element2, index2) => {
        data1.push(element2.NATIONAL_SAME);
        data2.push(element2.NATIONAL_SEQUENTIAL);
        data3.push(element2.REPORT_DATE.slice(0, 10));
      });
      return {
        tb: data1,
        hb: data2,
        time: data3,
      };
    },
    dealData4(data5, num) {
      let that = this;
      let data1 = [];
      let data1_time = [];
      let data2 = [];
      let data2_time = [];
      data5.forEach((element2, index2) => {
        if (element2.EMM00166466 != null) {
          data1.push(element2.EMM00166466.toFixed(2));
          data1_time.push(element2.SOLAR_DATE.slice(0, 10));
        }
        if (element2.EMG00001310 != null) {
          data2.push(element2.EMG00001310.toFixed(2));
          data2_time.push(element2.SOLAR_DATE.slice(0, 10));
        }
      });
      return {
        cn: data1,
        us: data2,
        time1: data1_time,
        time2: data1_time,
      };
    },
    dealData2(data2, type, name, num) {
      let that = this;
      let array2 = [];
      let time1 = [];
      let num1 = [];

      data2.forEach((element2, index2) => {
        let element2_item =
          element2.length == 1 ? element2 : element2.split(",");
        time1.push(element2_item[0]);
        num1.push(element2_item[num]);
      });

      let object1 = {
        name: name,
        num: num1,
        time: time1,
        array: array2,
      };
      return object1;
    },

    dealData(time, time1, data1) {
      let array1 = [];
      let num1 = 0;
      time.forEach((element, index) => {
        if (time1.indexOf(element) != -1) {
          array1.push(parseFloat(data1[time1.indexOf(element)]));
          num1 = parseFloat(data1[time1.indexOf(element)]);
        } else {
          array1.push(num1);
        }
      });

      return array1;
    },
  },
};
</script>
<style scoped lang="scss">
.kline {
  padding: 0px;
  width: 100%;

  .main {
    background-color: #353a47;
    padding: 10px;
  }

  .box-card {
    margin-right: 0px;
    margin-bottom: 20px;
  }
}
</style>
