<template>
  <div class="calculateHistogram">
    <calculateStopLossBox
      v-if="calculateStopLoss_data != null"
      :calculateStopLossData="calculateStopLoss_data"
      :this_name="this_name"
      :input_name1="input_name1"
    >
    </calculateStopLossBox>

    <btnStausGroup
      :allTime="props_dataList.time"
      :funData="funData"
      :dataList="btndataList"
      :zdfData="calculateStopLoss_data.zdf_data_num"
    >
    </btnStausGroup>
    <histogramFund
      v-if="markPoint2 != null"
      :ref="class_name"
      :thame="'light'"
      :name="class_name"
      :link="''"
      :title="this_name"
      :listData="dataList"
      :timeData="props_dataList.time"
      :markLine="markline2"
      :markPoint="markPoint2"
      :areaStyle="areaStyle2"
      :width1="'1400px'"
      :height1="'700px'"
      :legend1="legend1"
      value=""
    >
    </histogramFund>

    <calculateMainForce
      :props_dataList="props_dataList"
      :input_name1="input_name1"
      :this_name="this_name"
      :markLine="markLine"
    >
    </calculateMainForce>
  </div>
</template>
<script>
import calculateStopLossBox from "./calculateStopLoss.vue";
import calculateMainForce from "./calculateMainForce.vue";
import histogramFund from "../histogramFund.vue";
import initCaculate from "../js/calculateStopLoss";
import distributionChips from "../js/distributionChips";
import { setMarkLine } from "../setMarkLine.js";
import { dealPoint } from "../common/util.js";
import { initMaxMinSection, initMaxMinLarge } from "../js/initMaxMin30.js";
import { deal30Loss } from "../js/dealCalculateStopLoss.js";
import btnStausGroup from "../../../../components/polyline/btnStausGroup.vue";
export default {
  data() {
    return {
      dataList: [],
      markline2: [],
      calculateStopLoss_data: null,
      markPoint2: null,
      areaStyle2: [],
      btndataList: [],
      funData: [],
      legend1: undefined,
    };
  },
  created() {},
  props: {
    props_dataList: {
      type: Object,
      default: null,
    },
    props_time: {
      type: Array,
      default: null,
    },
    class_name: {
      type: String,
      default: null,
    },
    line_list: {
      type: Array,
      default: null,
    },
    areaStyle_num: {
      type: Number,
      default: null,
    },
    this_name: {
      type: String,
      default: null,
    },
    input_name1: {
      type: String,
      default: null,
    },
    //point 的状态1=大盘
    pointState: {
      type: String,
      default: null,
    },
    markLine: {
      type: Array,
      default: null,
    },
  },
  components: {
    histogramFund,
    calculateStopLossBox,
    btnStausGroup,
    calculateMainForce,
  },
  created() {
    this.initData();
    console.log("input_name1", this.input_name1);
  },
  mounted() {},
  watch: {},
  methods: {
    setWGmarkLine() {
      let that = this;
      let min_num1 = Math.min(
        ...that.calculateStopLoss_data.min_data_num.slice(-30)
      );
      let testtext2 = [
        {
          name: "近30日最低价",
          num: min_num1,
        },
      ];
      testtext2 = testtext2
        .sort(function (a, b) {
          return a.num - b.num;
        })
        .reverse();

      that.markline2 = setMarkLine(testtext2, that.props_dataList.time);
      //初始化指针
      let initMax_data = null;
      if (this.pointState == "1") {
        initMax_data = initMaxMinLarge(
          JSON.parse(JSON.stringify(this.calculateStopLoss_data))
        );
      } else {
        initMax_data = initMaxMinSection(
          JSON.parse(JSON.stringify(this.calculateStopLoss_data))
        );
      }

      this.markPoint2 = [
        {},
        {},
        {},
        {
          data: dealPoint(initMax_data.appraise_30_num_level.num, 0),
        },
        {
          data: dealPoint(initMax_data.max_num_level_item30.num, 1),
        },
        {
          data: dealPoint(initMax_data.min_num_level_item30.num, 0),
        },
      ];
    },
    diyDealLink(line, time) {
      let markLine1 = setMarkLine(line, time);
      let end_data = {
        yAxis: [
          markLine1[0].data[0].yAxis,
          markLine1[0].data[1].yAxis,
          markLine1[0].data[2].yAxis,
        ],
        xAxis: [time.slice(-1)],
        name: "",
        type: "category",
        yAxisIndex: false,
      };
    },
    //处理返回来的数据
    dealStausPoint(deal_data) {
      let that = this;
      //处理数据
      let select_data = that.dataList;

      that.dataList = [];
      that.markPoint2 = null;
      setTimeout(() => {
        that.dataList = select_data;
        that.markPoint2 = deal_data;
      }, 1000);
    },
    initData() {
      let that = this;
      distributionChips.dealData();
      //计算
      let calculateStopLoss = initCaculate.calculateStopLoss2(
        [{ klines: this.props_dataList.klines }],
        this.props_dataList.klines,
        null,
        "",
        this.props_dataList.time
      );
      this.areaStyle2 = [{}];
      this.calculateStopLoss_data = calculateStopLoss;
      this.diyDealLink(deal30Loss(calculateStopLoss), this.props_dataList.time);
    
      that.dataList.push({
        num: that.props_dataList.num,
        name: that.props_dataList.name,
      });
   
     console.log('calculateStopLoss',calculateStopLoss)
      that.dataList.push({
        num: calculateStopLoss.deal_data2.zsw_array.reverse(),
        name: "止损位",
        yAxisIndex: false,
      });
      that.dataList.push({
        num: calculateStopLoss.deal_data2.zcw_array.reverse(),
        name: "支撑位",
        yAxisIndex: false,
      });
      that.dataList.push({
        num: calculateStopLoss.deal_data2.zcw3.reverse(),
        name: "近30日支撑位",
        yAxisIndex: false,
      });

      that.dataList.push({
        num: calculateStopLoss.deal_data2.max_num1.reverse(),
        name: "近30日最高价",
        yAxisIndex: false,
      });
      that.dataList.push({
        num: calculateStopLoss.deal_data2.min_num1.reverse(),
        name: "近30日最低价",
        yAxisIndex: false,
      });
       that.dataList.push({
        num: calculateStopLoss.zdf_data_array,
        name: "累计涨跌幅",
      });
      that.dataList.push({
        num: calculateStopLoss.zdf_data_num,
        name: "当前涨跌幅",
        type_echarts: "bar",
        itemStyle: 2,
      });

      that.legend1 = {
        selected: {
          // 通过selected的图例选中状态来控制你要显示的个数
          this_name: true,
          止损位: true,
          支撑位: true,
          近30日支撑位: true,
          近30日最高价: false,
          近30日最低价: false,
        },
      };
      // that.dataList.push({
      //   num: calculateStopLoss.deal_data2.this_max.reverse(),
      //   name: "近30日当前值最大值",
      //   yAxisIndex: false,
      // });
      // that.dataList.push({
      //   num: calculateStopLoss.deal_data2.zdf_max_array.reverse(),
      //   name: "止损跌幅",
      // });
      that.setWGmarkLine();
      this.funData = [
        this.dataList[0].num,
        this.dataList[3].num,
        this.dataList[4].num,
        this.dataList[5].num,
      ];
      this.btndataList = [
        {
          name: this.dataList[0].name,
          state: 1,
          color: "#4992ff",
        },
        {
          name: this.dataList[3].name,
          state: 3,
          color: "#7cffb2",
        },
        {
          name: this.dataList[4].name,
          state: 3,
          color: "#fddd60",
        },
        {
          name: this.dataList[5].name,
          state: 3,
          color: "#ff6e76",
        },
      ];
    },
  },
};
</script>
<style scoped lang="scss">
.calculateHistogram {
}
</style>
