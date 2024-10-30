<template>
  <section class="main">
    <ul>
      <li
        v-for="(item, index) in data_list"
        :key="index"
      >
        <div class="item_box"></div>
      </li>
    </ul>
    <el-tabs
      type="border-card"
      v-model="activeTab"
      v-if="dataList.length > 0"
    >
      <el-tab-pane
        label="K线图走势图"
        name="0"
      >
        <fundTap1
          v-if="activeTab == '0'"
          :testtext2="testtext2"
          :calculate_array_active="calculate_array_active"
          :dataList="dataList"
          :calculateStopLoss1="calculateStopLoss1"
          :input_name1="input_name1"
          :fund1_data="fund1_data"
          :this_name="this_name"
          :zzzs_input_num="zzzs_input_num"
        >
        </fundTap1>
      </el-tab-pane>
      <el-tab-pane
        label="涨跌幅"
        name="1"
      >
        <fundTap2
          v-if="activeTab == '1'"
          :dataList2="dataList2"
          :dataList="dataList"
          :zjlrsj_list="zjlrsj_list"
          :input_name1="input_name1"
          :dataList_ma5="dataList_ma5"
          :ma5_markPoint3="ma5_markPoint3"
          :zjlrsj_markPoint="zjlrsj_markPoint3"
          :this_name="this_name"
        >
        </fundTap2>
      </el-tab-pane>
      <el-tab-pane
        label="中证指数涨跌幅"
        name="2"
      >
        <fundTap3
          :input_name="input_name1"
          :main_datalist_table="main_datalist_table"
          v-if="activeTab == '2'"
        >
        </fundTap3>
      </el-tab-pane>
      <el-tab-pane
        label="中证指数"
        name="3"
      >
        <fundTap6
          :input_name="input_name1"
          :main_datalist_table="main_datalist_table"
          v-if="activeTab == '3'"
        >
        </fundTap6>
      </el-tab-pane>
      <el-tab-pane
        label="时间周期涨跌幅"
        name="4"
      >
        <fundTap4
          :input_name="input_name1"
          v-if="activeTab == '4'"
        > </fundTap4>
      </el-tab-pane>
      <el-tab-pane
        label="超级机构流入数据"
        name="5"
      >
        <fundTap5
          :input_name1="input_name1"
          v-if="activeTab == '5'"
          :this_name="this_name"
        >
        </fundTap5>
      </el-tab-pane>
    </el-tabs>

    <div class="flex-c iframe-box"></div>
  </section>
</template>
<script>
import { dealData, urlDeal12 } from "../fuCommon/getUrl"
import initCaculate from "./js/calculateStopLoss"
import { dealBigCapital, dealTime } from "./dealData.js"
// import { setRise, setCapital, setWlstock } from "./js/setMarkPoint/setMarkPoint.js";
import $ from "jquery"
// import { getAjax } from "../../assets/common.js";
import { initAmount } from "../fuCommon/circulationAmount"
import histogramFund from "../fuCommon/histogramFund.vue"
import histogram from "../item/index3/histogram.vue"
import btnStausGroup from "../../../components/polyline/btnStausGroup.vue"
import fundTap6 from "./item/fund6.vue"
import fundTap5 from "./item/fund5.vue"
import fundTap4 from "./item/fund4.vue"
import fundTap3 from "./item/fund3.vue"
import fundTap2 from "./item/fund2.vue"
import fundTap1 from "./item/fund1.vue"
export default {
  data () {
    return {
      wlstock_list: [],
      wlstock_time: [],
      wlstock_point: [],
      zjlrsj_list: [],
      zjlrsj_time: [],
      datalist_table: [],
      datalist_table2: [],
      btn_array: [],
      data_list: [],
      data_list: [],
      markLine1: [],
      markLine: [],
      markPoint2: [],
      listData4: null,
      listData4_1: null,
      timeData4: null,
      title4: "",
      num1: 361,
      dataList: [],
      this_name: "",
      title2: "",
      dataList2: [],
      title3: "",
      dataList3: [],
      array1: "",
      calculateStopLoss1: null,
      activeTab: "0",
      ths_comtent: null,
      ths_comtent1: null,
      zlkp_time: [],
      zlkp_markLine: [],
      zjlrsj_markPoint3: [],
      zjlrsj_markPoint4: [],
      zlkp_list: [],
      listData5: null,
      timeData5: null,
      title5: null,
      //ma5，ma10的页面 的代码
      dataList_ma5: [],
      ma5_markPoint3: [],
      fund1_data: null,
    }
  },
  components: {
    histogramFund,
    histogram,
    btnStausGroup,
    fundTap6,
    fundTap5,
    fundTap4,
    fundTap3,
    fundTap1,
    fundTap2,
  },
  created () {
    this.toBtn()
        
  },

  props: {
    array_all: Array,
    array5: Array,
    klineData: Object,
    input_name1: String,
    input_name6: String,
    //列表的代码
    main_datalist_table: Object,
    //止损位的位置数据
    main_markline: Array,
    testtext2: Array,
    calculate_array_active: Number,
    zzzs_input_num: String,
  },
  mounted () {
    this.$nextTick(() => { })
  },
  methods: {
    //处理返回来的数据
    dealStausPoint (deal_data) {
      let that = this
      //处理数据
      let select_data = that.dataList2
      let select_data2 = that.dataList_ma5
      that.dataList2 = []
      that.dataList_ma5 = []
      setTimeout(() => {
        that.dataList2 = select_data
        that.zjlrsj_markPoint3 = deal_data
        // that.dataList_ma5 = select_data2;
        // that.ma5_markPoint3 = deal_data;
      }, 1000)
    },

    dealFun () { },
    //设置指定行、列、具体单元格颜色
    cellStyle ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === new Date().getMonth() + 1) {
        //指定坐标rowIndex ：行，columnIndex ：列
        return "background-color:#d1d1d1" //rgb(105,0,7)
      } else {
        return ""
      }
    },
    dealReportName (text1) {
      let cbjg_1 = []
      let cbjg_20 = []
      let cbjg_60 = []
      let jgcyd = []
      let zlkp = []
      let time = []
      text1.forEach((element, index) => {
        cbjg_1.push(element.PRIME_COST.toFixed(2))
        cbjg_20.push(element.PRIME_COST_20DAYS.toFixed(2))
        cbjg_60.push(element.PRIME_COST_60DAYS.toFixed(2))
        jgcyd.push((element.ORG_PARTICIPATE * 100).toFixed(2))
        zlkp.push(element.PARTICIPATE_TYPE_CN)
        time.push(element.TRADE_DATE.slice(0, 10))
      })
      return {
        cbjg_1,
        cbjg_20,
        cbjg_60,
        jgcyd,
        zlkp,
        time,
      }
    },
    dealAmount (data2) {
      let item1 = []
      data2.klines.forEach((element2, index2) => {
        let element2_item =
          element2.length == 1 ? element2 : element2.split(",")
        var item2 = {
          open: parseFloat(element2_item[1]),
          close: parseFloat(element2_item[2]),
          low: parseFloat(element2_item[4]),
          high: parseFloat(element2_item[3]),
          amount: parseInt(element2_item[5]),
        }
        item1.push(item2)
      })
      let num1 =
        this.input_name1.indexOf("002") != -1
          ? 0
          : this.input_name1.indexOf("300") != -1
            ? 0
            : this.input_name1.indexOf("000") != -1
              ? 0
              : 1
      let array1 = this.getAjax2(
        "https://push2his.eastmoney.com/api/qt/stock/get?fltt=2&invt=2&volt=2&fields=f117&secid=" +
        num1 +
        "." +
        this.input_name1
      )

      initAmount(item1, parseInt(parseInt(array1.f117) / 10000000))
    },
    dealData2 (data2, type, name, num, type2, num3) {
      let num2 = 1458
      let that = this
      let array2 = []
      let time1 = []
      let num1 = []
      data2.forEach((element2, index2) => {
        // if (index2 > data2.length - num2) {
        if (type == 1) {
          array2.push(parseFloat(element2[6].toFixed(2)))
          time1.push(dateFormat("YYYY-mm-dd", new Date(element2[9] * 1000)))
          num1.push(parseFloat(element2[1]))
        } else if (type == 2) {
          array2.push(parseFloat(element2.split(",")[8]))
          time1.push(element2.split(",")[0])

          if (num == 6) {
            num1.push(
              (parseInt(element2.split(",")[num]) / 100000000).toFixed(2)
            )
          } else {
            num1.push(parseFloat(element2.split(",")[num]))
          }
        }
        // }
      })
      let object1 = {
        name: name,
        num: num1,
        time: time1,
        array: array2,
        type_echarts: type2 == undefined ? undefined : "bar",
        itemStyle: num3 == undefined ? undefined : 2,
      }
      return object1
    },
    getAjax2 (url) {
      if (url == "") {
        return ""
      } else {
        var htmlobj = $.ajax({
          url: url,
          async: false,
        })
        return htmlobj.responseJSON.data
      }
    },
    toBtn () {
      let that = this
      that.this_name = ""
      let array1 = this.array_all[0]
      let array2 = this.array_all[1]
      let array3 = this.array_all[2]
      let array4 = this.array_all[3]

      let szzs = this.array_all[4]

      let array5 = this.array_all[5]

      array5.splice(0, 2)
      if (
        parseInt(new Date().getHours()) >= 9 &&
        parseInt(new Date().getHours()) <= 15
      ) {
        // 暂时关闭 当前的资金买入数据的
        // array5.push(array6.slice(-1)[0]);
      }

      let array_all = [array1, array2, array3, array4, szzs]

      setTimeout(function () {
        that.dealAmount(array1)
      }, 2000)

      // 时间0
      // 开盘1
      // 收盘2
      // 最高3
      // 最低4
      // 成交量5
      // 成交额6
      // 震幅7
      // 涨跌幅8
      // 涨跌额9
      // 换手率10

      that.this_name = ""
      that.dataList = []
      that.listData5 = []
      that.dataList2 = []
      that.dataList3 = []
      let array_end = []
      that.flag = false
      let mrzdf_klines = null
      array_all.forEach((Element, index) => {
        if (Element != "") {
          let datalist111 = dealData(Element.klines, 2, Element.name, 2)
          that.dataList.push(datalist111)

          if (that.this_name == "") {
            that.dataList2.push(datalist111)
            //数值导入
            that.dataList_ma5.push(datalist111)
            // mrzdf_klines = dealData(
            //   Element.klines,
            //   2,
            //   "每日涨跌幅",
            //   8,
            //   "bar",
            //   2
            // );
            that.dataList2.push(dealData(Element.klines, 2, "成交额(亿)", 6))

            that.this_name = Element.name

            // let kline22 = datalist111;
            // let kline33 = that.dealData2(
            //   array5,
            //   2,
            //   "中单净流入(亿)",
            //   3,
            //   "bar",
            //   2
            // );
            // that.dataList3.push({
            //   array: kline22.array.slice(-kline33.time.length),
            //   name: kline22.name,
            //   num: kline22.num.slice(-kline33.time.length),
            //   time: kline22.time.slice(-kline33.time.length),
            // });
            // that.dataList3.push(kline33);
            array_end = Element.klines
          }
        }
      })
      //处理数据
      localStorage.setItem(
        "this_data_array",
        JSON.stringify(that.dataList[0].num.slice(-180))
      )
      let calculateStopLoss = initCaculate.calculateStopLoss2(
        array_all,
        array_end,
        null,
        this.input_name6,
        that.dataList[0].time
      )

      this.fund1_data = {
        klines: array_all[0].klines,
        name: array1.name,
        time: that.dataList[0].time,
        num: that.dataList[0].num,
        array: that.dataList[0].array,
      }

      this.calculateStopLoss1 = calculateStopLoss

      //this.dealEachrt(pressure);
      //this.initReport();
      setTimeout(function () {
        //取消K线图的
        // that.markLine1 = setMarkLine(that.main_markline, that.dataList[0].time);
        // that.dataList.push({
        //   yAxis: [
        //     that.markLine1[0].data[0].yAxis,
        //     that.markLine1[0].data[1].yAxis,
        //     that.markLine1[0].data[2].yAxis,
        //   ],
        //   xAxis: [that.dataList[0].time.slice(-1)],
        //   name: "",
        //   type: "category",
        //   yAxisIndex: false,
        // });
      }, 100)

      let dealBigCapital22 = dealBigCapital(this.input_name1)
      this.zjlrsj_list = dealBigCapital22.sina_data
      //that.dataList2.push(mrzdf_klines );
      this.zjlrsj_time = dealBigCapital22.sina_data[0].time
    },
  },
};
</script>
<style scoped lang="scss">
.active1 {
  color: red;
}

.active2 {
  color: green;
}

.active3 {
  // color: red;
  padding-left: 0px;
  font-weight: 600;
  font-size: 26px;
}

.active4 {
  float: right;
  // color: green;
  padding-left: 0px;
  font-weight: 600;
  font-size: 26px;
}

.active11 {
  background-color: red;
  color: #ffffff;
}

.active22 {
  background-color: green;
  color: #ffffff;
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
}

.item_box2 {
  padding: 0px 20px 40px 20px;

  .flex-c {
    padding: 0px 10px;
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
</style>
