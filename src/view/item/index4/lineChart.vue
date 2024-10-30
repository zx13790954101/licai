<template>
  <div class="main_lineChart">
    <calculateHistogram
      v-if="nsdk_data != null"
      :props_dataList="nsdk_data"
      :input_name1="'100.NDX'"
      :this_name="'纳斯达克指数'"
      :class_name="'_nsdkHis'"
    >
    </calculateHistogram>

    <div id="line1" class="lineChart" :style="{ width: width_all }"></div>

    <decreaseHistogram
      v-if="day_data_array != null"
      :day_data_array="day_data_array"
      :indexfun1="day_data_array"
    >
    </decreaseHistogram>
  </div>
</template>

<script>
import $ from "jquery";
import calculateHistogram from "../../fuCommon/common/calculateHistogram.vue";
import { getAjax } from "../../../assets/common.js";
import line2 from "./js/kline2.js";
import indexFun from "./../../fuCommon/js/indexFun.js";
import decreaseHistogram from "../../fuCommon/common/decreaseHistogram.vue";
export default {
  data() {
    return {
      daterange: "",
      region: "",
      //K线图的数量
      num1: 401,
      width_all: "",
      nsdk_data: null,
      day_data_array: null,
    };
  },
  created() {},
  components: {
    calculateHistogram,
    decreaseHistogram,
  },
  mounted() {
    let indexfun1 = indexFun.initDataShares("NDX");

    this.day_data_array = JSON.parse(JSON.stringify(indexfun1));

    let array1 = getAjax(this.url1("100.NDX", 3000)).responseJSON.data;
    let array2 = getAjax(this.url1("100.UDI", 3000)).responseJSON.data;

    let array3 = getAjax(
      "https://bank.fx678.com/interface/indexData?bank=FED&limit=120"
    ).responseJSON.data;

    let array1_zdf = this.dealData(array1.klines, 2, "涨跌幅", 8, "bar", 2);

    let nsdk_data1 = this.dealData(array1.klines, 2, array1.name, 2);

    this.nsdk_data = {
      klines: array1.klines,
      name: array1.name,
      time: nsdk_data1.time,
      num: nsdk_data1.num,
      array: nsdk_data1.array,
    };

    let array1_cje = this.dealData(array1.klines, 2, "成交额(亿)", 5);
    array1 = this.dealData(array1.klines, 2, array1.name);
    array2 = this.dealData(array2.klines, 2, array2.name);

    let data_array3 = array3.slice(0, 91);

    array3 = this.dealData6(data_array3);
    this.width_all =
      document.querySelector(".main_lineChart").offsetWidth + "px";

    let all_array = [
      array1,
      array1_zdf,
      array1_cje,
      array2,
      {
        num: array3.data,
        name: "美联储利率",
        time: array3.time,
      },
    ];
    this.$nextTick(() => {
      setTimeout(function () {
        // line.line();
        line2.initEchart("line1", all_array, all_array[0].time, true);
      }, 2000);
    });
  },
  methods: {
    onSubmit() {},
    dealData(data2, type, name, num, type2, num3) {
      let that = this;
      let array2 = [];
      let time1 = [];
      let num1 = [];
      data2.forEach((element2, index2) => {
        if (type == 1) {
          array2.push(element2[6].toFixed(2));
          time1.push(
            that.dateFormat("YYYY-mm-dd", new Date(element2[9] * 1000))
          );
          num1.push(element2[1]);
        } else if (type == 2) {
          if (num) {
            array2.push(parseFloat(element2.split(",")[num]));
            time1.push(element2.split(",")[0]);
            if (num == 5) {
              num1.push(
                (parseFloat(element2.split(",")[num]) / 100000000).toFixed(2)
              );
            } else {
              num1.push(parseFloat(element2.split(",")[num]));
            }
          } else {
            array2.push(element2.split(",")[8]);
            time1.push(element2.split(",")[0]);
            num1.push(element2.split(",")[2]);
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
    dealTime(data) {
      let array_data = data.map((element) => {
        return element.PUBLISH_TIME.slice(0, 10);
      });

      return array_data;
    },

    dealData6(data5, num) {
      let that = this;
      let data2 = [];
      let data3 = [];
      data5.forEach((element2, index2) => {
        data2.push(parseFloat(element2.ACTUAL_PRICE));
        data3.push(element2.PUBLISH_TIME.slice(0, 10));
      });
      return {
        data: data2,
        time: data3,
      };
    },
    //处理数据
    dealData2(time, time1, data1) {
      let array1 = [];
      let num1 = 0;
      time.forEach((element, index) => {
        if (time1.indexOf(element) != -1) {
          array1.push(parseFloat(data1[time1.indexOf(element)].ACTUAL_PRICE));
          num1 = parseFloat(data1[time1.indexOf(element)].ACTUAL_PRICE);
        } else {
          array1.push(num1);
        }
      });

      return array1;
    },
    //长度,纳斯达克的长度
    url1(num1, num2) {
      return (
        "https://push2his.eastmoney.com/api/qt/stock/kline/get?secid=" +
        num1 +
        "&fields1=f1,f2,f3,f4,f5&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&lmt=" +
        num2 +
        "&klt=101&fqt=1&end=30000101"
      );
    },
  },
};
</script>
<style scoped lang="scss">
.lineChart {
  height: 750px;
  margin: 0 auto;
}
</style>
