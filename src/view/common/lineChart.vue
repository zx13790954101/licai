<template>
  <div class="main_lineChart">
    <div id="line1" class="lineChart" :style="{ width: width_all }"></div>
  </div>
</template>
<script>
import $ from "jquery";
import { getAjax } from "./../../assets/common.js";
import line from "../../assets/kline/kline1.js";
import line2 from "../../assets/kline/kline2.js";
export default {
  data() {
    return {
      daterange: "",
      region: "",
      //K线图的数量
      num1: 401,
      width_all: "",
    };
  },
  created() {},
  components: {},
  mounted() {
    let array1 = getAjax(this.url1("100.NDX")).responseJSON.data;
    let array2 = getAjax(this.url1("100.UDI")).responseJSON.data;

    let array3 = getAjax(
      "https://bank.fx678.com/interface/indexData?bank=FED&limit=120"
    ).responseJSON.data;

    array1 = this.dealData(array1.klines, 2, array1.name);
    array2 = this.dealData(array2.klines, 2, array2.name);
    let data_array3 = array3.slice(0, 13);

    array3 = this.dealData2(
      array1.time,
      this.dealTime(data_array3).reverse(),
      data_array3.reverse()
    );
    this.width_all =
      document.querySelector(".main_lineChart").offsetWidth + "px";
    let all_array = [
      array1,
      array2,
      {
        num: array3,
        name: "美联储利率",
        time: array1.time,
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
    dealData(data2, type, name) {
      let that = this;
      let array2 = [];
      let time1 = [];
      let num1 = [];
      data2.forEach((element2, index2) => {
        if (index2 > data2.length - that.num1) {
          if (type == 1) {
            array2.push(element2[6].toFixed(2));
            time1.push(
              that.dateFormat("YYYY-mm-dd", new Date(element2[9] * 1000))
            );
            num1.push(element2[1]);
          } else if (type == 2) {
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
      };
      return object1;
    },
    dealTime(data) {
      let array_data = data.map((element) => {
        return element.PUBLISH_TIME.slice(0, 10);
      });

      return array_data;
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
    url1(num1, num2) {
      return (
        "https://push2his.eastmoney.com/api/qt/stock/kline/get?secid=" +
        num1 +
        "&fields1=f1,f2,f3,f4,f5&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&lmt=400&klt=101&fqt=1&end=30000101"
      );
    },
  },
};
</script>
<style scoped lang="scss">
.lineChart {
  height: 400px;
  margin: 0 auto;
}
</style>
