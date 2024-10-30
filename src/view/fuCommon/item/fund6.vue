<template>
  <div class="fund1">
    <calculateHistogram
      v-if="fund3_data != null"
      :props_dataList="fund3_data"
      :input_name1="input_name"
      :this_name="this_name"
      :class_name="'_fund3'"
      :markLine="index_markline2"
    >
    </calculateHistogram>
  </div>
</template>
<script>
import { getAjax } from "../../../assets/common.js";
import cyclejson from "../json/cycle.json";
import { dealDateKline } from "../../../lib/js/dealKline.js";
import histogramFund from "../histogramFund.vue";
import histogram from "../../item/index3/histogram.vue";
import indexFun from "../js/indexFun.js";
import { dealDataLine } from "../common/util.js";
import tableBox from "../common/tableBox.vue";
import calculateStopLossBox from "../common/calculateStopLoss.vue";
import decrease from "../common/decrease/decrease.vue";
import calculateHistogram from "../common/calculateHistogram.vue";
import dateTableHis from "./dateTableHis.vue";
import decreaseHistogram from "../common/decreaseHistogram.vue";

export default {
  data() {
    return {
      title5: null,
      areaStyle1: [],
      //中证指数
      title4: "",
      inflow_data: [],
      //第二个
      index_markline2: [],
      //数据
      this_name: "中证指数",
      calculateStopLoss1: null,
      day_data_array: null,
      month_data_array: null,
      week_data_array: null,
      fund3_data: null,
    };
  },
  created() {
    this.initData();
  },
  props: {
    //  初始化数据
    input_name: {
      type: String,
      default: null,
    },
    zzzs_input_num: {
      type: String,
      default: null,
    },
    main_datalist_table: {
      type: Object,
      default: null,
    },
  },
  components: {
    histogramFund,
    histogram,
    tableBox,
    calculateStopLossBox,
    decrease,
    calculateHistogram,
    dateTableHis,
    decreaseHistogram,
  },
  mounted() {},
  watch: {},
  methods: {
    //跳转到
    toBtnBoard() {
      sessionStorage.setItem(
        "section_data",
        JSON.stringify(this.day_data_array.num.slice(-130))
      );
      sessionStorage.setItem(
        "section_time",
        JSON.stringify(this.day_data_array.time.slice(-130))
      );
      this.$router.push("/limitBoard");
    },
    initDateInput() {
      let url = this.input_name;
      let num1 =
        url.indexOf("002") != -1
          ? 0
          : url.indexOf("300") != -1
          ? 0
          : url.indexOf("000") != -1
          ? 0
          : 1;
      if (url.indexOf("600") != -1) {
        num1 = 1;
      }
      const szzs_url =
        "https://push2his.eastmoney.com/api/qt/stock/kline/get?secid=" +
        num1 +
        "." +
        url +
        "&fields1=f1,f2,f3,f4,f5&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&lmt=890&klt=101&fqt=1&end=30000101";

      let szzs = getAjax(szzs_url);
      szzs = szzs.responseJSON.data;
      if (szzs.length < 449) {
      }
      //处理数据 w
      let kline_data = dealDataLine(szzs.klines.slice(-849), 2, szzs.name, 2);

      let klinedata = dealDateKline(kline_data, cyclejson.cycle.markArea_data);
      return klinedata;
    },

    //初始化的数据
    initData() {
      let that = this;
      //一周的数据
      let select_num =
        this.zzzs_input_num != "" ? this.zzzs_input_num : this.input_name;
      //获取月的数据
      this.datalist_table = [];
      let klinedata = this.initDateInput();

      // this.listData5 = klinedata[0];
      //设置变色-设置eharts的局部变色
      // this.areaStyle3 = [null, null, null, null, {}];
      // this.timeData5 = klinedata[1];
      // this.markArea5 = klinedata[2];
      //回去2数据
      let indexfun1 = indexFun.initDataShares(this.input_name);
      this.fund3_data = {
        klines: indexfun1.all_klines,
        name: indexfun1.name,
        time: indexfun1.time,
        num: indexfun1.num,
        array: indexfun1.array,
      };
    },
  },
};
</script>
<style scoped lang="scss">
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

.active1 {
  float: right;
  color: red;
}

.active2 {
  color: green;
}
.toBtnBoard {
  display: block;
  padding: 5px;
  background-color: wheat;
  width: 100%;
  font-size: 24px;
}
</style>
