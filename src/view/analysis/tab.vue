<template>
  <section class="main">
    <ul>
      <li v-for="(item, index) in data_list" :key="index">
        <div class="item_box"></div>
      </li>
    </ul>

    <el-tabs type="border-card">
      <el-tab-pane label="K线图走势图">
        <histogramFund
          ref="analysis"
          :thame="'light'"
          :name="'_analysis'"
          :link="''"
          :title="title4"
          :listData="dataList"
          :timeData="dataList[0].time"
          :markLine="markLine"
          :markPoint="markPoint2"
          :width1="'1400px'"
          :height1="'500px'"
          value=""
        ></histogramFund>
      </el-tab-pane>
      <el-tab-pane label="涨跌幅">
        <histogramFund
          ref="analysis1"
          :thame="'dark'"
          :name="'_analysis1'"
          :link="''"
          :title="title2"
          :listData="dataList2"
          :timeData="dataList[0].time"
          :width1="'1400px'"
          :markLine="markLine"
          :height1="'500px'"
          value=""
        >
        </histogramFund>
        <el-card class="box-card">
          <el-row :gutter="20">
            <el-col :span="8">
              <span> 换手率的分析观点 </span>
              <el-divider></el-divider>
              <p>底部的换手率的量增加就证明短期可以买入</p>
            </el-col>
          </el-row>
        </el-card>
      </el-tab-pane>

      <el-tab-pane label="主力资金流入图">
        <histogramFund
          ref="analysis2"
          :thame="'dark'"
          :name="'_analysis2'"
          :link="''"
          :title="title2"
          :listData="dataList3"
          :timeData="dataList3[0].time"
          :width1="'1400px'"
          :markLine="markLine"
          :height1="'500px'"
          value=""
        >
        </histogramFund>
      </el-tab-pane>
      <el-tab-pane label="每个月涨跌幅">
        <div class="tableList">
          <el-table
            :data="datalist_table2"
            class="table-box"
            :cell-style="cellStyle"
            style="width: 100%"
            center
          >
            <el-table-column prop="name" label="年份" center> </el-table-column>

            <el-table-column
              prop="name"
              v-for="(item, index) in 12"
              :key="index"
              :label="index + 1 + '月份'"
              center
            >
              <template #default="{ row }">
                <div v-if="row.array[index]">
                  <p :class="row.array[index] > 0 ? 'active1' : 'active2'">
                    {{ row.array[index] }}%
                  </p>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="机构参与度">
        <histogramFund
          ref="zlikp"
          :thame="'dark'"
          :name="'_zlikp'"
          :link="''"
          :title="title4"
          :listData="zlkp_list"
          :timeData="zlkp_time"
          :markLine="zlkp_markLine"
          :markPoint="markPoint3"
          :width1="'1400px'"
          :height1="'500px'"
          value=""
        ></histogramFund>
      </el-tab-pane>
    </el-tabs>

    <div class="flex-c iframe-box"></div>
  </section>
</template>
<script>
import {
  switchUrlDeal,
  calculateStopLoss2,
  dealData,
  urlDeal9,
  urlDeal8,
  urlDeal7,
  urlDeal6,
  urlDeal5,
  urlDeal2,
  urlDeal12,
  urlDeal11,
  urlDeal,
  btn_array2,
} from "../fuCommon/getUrl";
import $ from "jquery";
import { getAjax } from "../../assets/common.js";
import { initAmount } from "../fuCommon/circulationAmount";
import histogramFund from "../fuCommon/histogramFund.vue";
export default {
  data() {
    return {
      datalist_table: [],
      datalist_table2: [],
      btn_array: [],
      data_list: [],
      data_list: [],
      markLine: [],

      markPoint2: [],
      listData4: null,
      listData4_1: null,
      timeData4: null,
      title4: "",
      num1: 300,
      dataList: [],
      this_name: "",
      title2: "",
      dataList2: [],
      title3: "",
      dataList3: [],
      array1: "",
      calculateStopLoss1: null,

      ths_comtent: null,
      ths_comtent1: null,
      zlkp_time: [],
      zlkp_markLine: [],
      markPoint3: [],
      zlkp_list: [],
    };
  },
  components: {
    histogramFund,
  },
  created() {
    this.toBtn();
  },

  props: {
    array_all: Array,
    array5: Array,
    klineData: Object,
    input_name1: String,
    input_name6: String,
    //列表的代码
    main_datalist_table: Object,
  },
  mounted() {
    this.$nextTick(() => {});
  },
  methods: {
    //设置指定行、列、具体单元格颜色
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 8 && columnIndex === 8) {
        //指定坐标rowIndex ：行，columnIndex ：列
        return "background-color:#d1d1d1"; //rgb(105,0,7)
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
    dealData2(data2, type, name, num, type2, num3) {
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
        type_echarts: type2 == undefined ? undefined : "bar",
        itemStyle: num3 == undefined ? undefined : 2,
      };
      return object1;
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
    toBtn() {
      let that = this;
      that.this_name = "";
      let array1 = this.array_all[0];
      let array2 = this.array_all[1];
      let array3 = this.array_all[2];
      let array4 = this.array_all[3];
      //获取月的数据
      this.datalist_table = this.dealMoth(this.main_datalist_table);
      let szzs = this.array_all[4];

      let array5 = this.array_all[5];
      let array6 = this.array_all[6];
      //周末
      let array7 = this.array_all[7];

      array5.splice(0, 2);
      if (
        parseInt(new Date().getHours()) >= 9 &&
        parseInt(new Date().getHours()) <= 15
      ) {
        array5.push(array6.slice(-1)[0]);
      }

      let array_all = [array1, array2, array3, array4, szzs];

      setTimeout(function () {
        that.dealAmount(array1);
      }, 2000);

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

      that.this_name = "";
      that.dataList = [];
      that.dataList2 = [];
      that.dataList3 = [];
      let array_end = [];
      that.flag = false;
      array_all.forEach((Element, index) => {
        if (Element != "") {
          //  array_all.push(that.dealData(Element.klines, 2, Element.name));

          that.dataList.push(dealData(Element.klines, 2, Element.name, 2));

          if (that.this_name == "") {
            that.dataList2.push(dealData(Element.klines, 2, Element.name, 2));
            that.dataList2.push(
              dealData(Element.klines, 2, "涨跌幅", 8, "bar", 2)
            );
            // that.dataList2.push(dealData(Element.klines, 2, "震幅", 7, "bar"));
            // that.dataList2.push(
            //   dealData(Element.klines, 2, "成交额(亿)", 6, "bar")
            // );
            that.dataList2.push(
              dealData(Element.klines, 2, "换手率", 10, "bar")
            );

            that.this_name = Element.name;

            let kline22 = dealData(Element.klines, 2, Element.name, 2);
            let kline33 = that.dealData2(
              array5,
              2,
              "中单净流入(亿)",
              3,
              "bar",
              2
            );
            console.log("kline33", kline33);

            alert("ssss");
            that.dataList3.push({
              array: kline22.array.slice(-kline33.time.length),
              name: kline22.name,
              num: kline22.num.slice(-kline33.time.length),
              time: kline22.time.slice(-kline33.time.length),
            });
            array_end = Element.klines;
            // that.dataList3.push(that.dealData2(array5, 2, "主力净流入(亿)", 1));
            that.dataList3.push(kline33);
          }
        }
      });

      let calculateStopLoss = calculateStopLoss2(
        array_all,
        array_end,
        that.dataList3[0],
        this.input_name6,
        that.dataList[0].time
      );
      that.dataList.push({
        num: calculateStopLoss.ma5,
        name: "MA5",
        yAxisIndex: false,
      });
      that.dataList.push({
        num: calculateStopLoss.ma10,
        name: "MA10",
        yAxisIndex: false,
      });
      that.dataList.push({
        num: calculateStopLoss.ma20,
        name: "MA20",
        yAxisIndex: false,
      });
      that.dataList.push({
        num: calculateStopLoss.ma30,
        name: "MA30",
        yAxisIndex: false,
      });
      that.dataList.push({
        num: calculateStopLoss.ma60,
        name: "MA60",
        yAxisIndex: false,
      });

      console.log("that.datalist", that.dataList);
      this.calculateStopLoss1 = calculateStopLoss;
      that.$emit("transfer", this.calculateStopLoss1);

      //this.dealEachrt(pressure);
      this.initReport();
    },
    //机构参与度
    initReport() {
      this.zlkp_time = [];
      this.zlkp_list = [];
      let r_data = this.dealReportName(
        getAjax(urlDeal12(this.input_name1)).responseJSON.result.data
      );

      this.zlkp_time = r_data.time.reverse();
      this.zlkp_list.push({
        name: this.dataList[0].name,
        num: this.dataList[0].num.slice(-r_data.cbjg_1.length),
      });
      this.zlkp_list.push({
        name: "每日主力价位",
        num: r_data.cbjg_1.reverse(),
      });
      // this.zlkp_list.push({
      //   name: "20主力价位",
      //   num: r_data.cbjg_20.reverse(),
      // });
      // this.zlkp_list.push({
      //   name: "60主力价位",
      //   num: r_data.cbjg_60.reverse(),
      // });
      this.zlkp_list.push({
        name: "机构参与度",
        num: r_data.jgcyd.reverse(),
        type_echarts: "bar",
      });
    },
  },
};
</script>
<style scoped lang="scss">
.active1 {
  float: right;
  color: red;
}

.active2 {
  float: right;
  color: green;
}
</style>
