<template>
  <div class="market">
      <histogramFund
        ref="analysis"
        :name="'_analysis'"
        :link="''"
        :title="title4"
        :listData="dataList"
        :timeData="dataList[0].time"
        :width1="'1400px'"
        :height1="'800px'"
        value=""
      ></histogramFund>
  </div>
</template>
<script>
import $ from "jquery";
import Section from "./section.vue";
import histogramFund from "../../fuCommon/histogramFund.vue";
import { getAjax } from "../../../assets/common.js";
export default {
  data() {
    return {
      data_list: [],
      listData4: null,
      listData4_1: null,
      timeData4: null,
      title4: "",
      num1: 100,
      dataList: [],
    };
  },
  components: { Section, histogramFund },
  created() {
   //https://yun.ccxe.com.cn/indices/qli
  },
  methods: {
    toBtn() {
      let that = this;

      let array1 =
        that.input_name1 != ""
          ? getAjax(that.urlDeal(that.input_name1)).responseJSON.data
          : "";
      let array2 =
        that.input_name2 != ""
          ? getAjax(that.urlDeal(that.input_name2)).responseJSON.data
          : "";
      let array3 =
        that.input_name3 != ""
          ? getAjax(that.urlDeal(that.input_name3)).responseJSON.data
          : "";
      let array4 =
        that.input_name4 != ""
          ? getAjax(that.urlDeal(that.input_name4)).responseJSON.data
          : "";

      let szzs = getAjax(
        "https://push2his.eastmoney.com/api/qt/stock/kline/get?secid=1.000001&fields1=f1,f2,f3,f4,f5&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&lmt=58&klt=101&fqt=1&end=30000101"
      ).responseJSON.data;
      let array_all = [array1, array2, array3, array4, szzs];
      let array_end = [];
      array_all.forEach((Element, index) => {
        if (Element != "") {
          //  array_all.push(that.dealData(Element.klines, 2, Element.name));
          that.dataList.push(that.dealData(Element.klines, 2, Element.name));
        }
      });
    },
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
    urlDeal(url) {
      let num1 = url.indexOf("002") == -1 ? 1 : 0;

      return (
        "https://push2his.eastmoney.com/api/qt/stock/kline/get?secid=" +
        num1 +
        "." +
        url +
        "&fields1=f1,f2,f3,f4,f5&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&lmt=58&klt=101&fqt=1&end=30000101"
      );
    },
  },
};
</script>
<style scoped lang="scss">
.market {
  margin: 20px 40px;
}
</style>
