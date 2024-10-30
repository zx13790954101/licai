<template>
  <div class="calculateMainForce">
    <p>主力占比</p>
    <btnStausGroup
      :allTime="timeList"
      :funData="funData"
      :dataList="btndataList"
    >
    </btnStausGroup>

    <histogramFund
      v-if="dataList.length > 0"
      :ref="'calculateMainForce'"
      :thame="'dark'"
      :name="class_name"
      :link="''"
      :title="this_name"
      :listData="dataList"
      :timeData="timeList"
      :areaStyle="areaStyle2"
      :markPoint="markPoint2"
      :width1="'1400px'"
      :height1="'700px'"
      :dataZoomStart="'0'"
      value=""
    >
    </histogramFund>
  </div>
</template>
<script>
import histogramFund from "../histogramFund.vue";
import initCaculate from "../js/calculateStopLoss";
import distributionChips from "../js/distributionChips";
import { setMarkLine } from "../setMarkLine.js";
import { dealPoint } from "../common/util.js";
import { initMaxMinSection, initMaxMinLarge } from "../js/initMaxMin30.js";
import { deal30Loss } from "../js/dealCalculateStopLoss.js";
import btnStausGroup from "../../../../components/polyline/btnStausGroup.vue";
import { urlDeal6, dealData } from "../getUrl";
import { getAjax } from "../../../assets/common.js";
export default {
  data() {
    return {
      dataList: [],
      markline2: [],
      calculateStopLoss_data: null,
      markPoint2: null,
      // areaStyle2: [],
      btndataList: [],
      funData: [],
      legend1: undefined,
      timeList: [],
      areaStyle2: [{}],
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
    btnStausGroup,
  },
  created() {
    this.initData();
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
      console.log("this.markPoint2", this.markPoint2);
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
      console.log("end_data", end_data);
    },
    //处理返回来的数据
    dealStausPoint(deal_data) {
      let that = this;
      //处理数据
      let select_data = that.dataList;

      that.dataList = [];
      that.markPoint2 = null;
      console.log("deal_data", deal_data);
      setTimeout(() => {
        that.dataList = select_data;
        that.markPoint2 = deal_data;
      }, 1000);
    },

    dealFflow(input_name1) {
      let that = this;
      let data1 = urlDeal6(input_name1 + "", 150);

      data1 = getAjax(data1).responseJSON.data;
      if (data1 == null) {
        return;
      }
      data1 = data1.klines;
      //0=时间   1=净额  6=占比
      let time1 = dealData(data1, 2, "时间", 11);
      let num1 = dealData(data1, 4, "主力净额", 1);
      let money1 = dealData(data1, 5, "主力占比", 6);

      let this_time = new Date().getHours();
      this_time = parseFloat(this_time + "." + this_minutes);

      let this_minutes = new Date().getMinutes();

      if (this_time <= 15) {
        if (this_time >= 9.3) {
          let end_data = getAjax(urlDeal6(input_name1 + "", 150, 2))
            .responseJSON.data.diff[0];

          num1.num.push((end_data.f62 / 100000000).toFixed(2));
          money1.num.push(end_data.f184);
          time1.time.push(
            that.props_dataList.time[that.props_dataList.time.length - 1]
          );
          time1.num.push(
            that.props_dataList.num[that.props_dataList.time.length - 1]
          );
        } else {
        }
      }
      this.timeList = time1.time;
      this.dataList.push({
        num: this.props_dataList.num.slice(-num1.num.length),
        name: "数值",
      });
      this.dataList.push({
        num: num1.num,
        name: "主力净额",
        type_echarts: "bar",
        itemStyle: 2,
      });
      this.dataList.push({
        num: money1.num,
        name: "主力占比",
      });
      this.funData = [
        this.dataList[0].num,
        this.dataList[1].num,
        this.dataList[2].num,
      ];
      this.btndataList = [
        {
          name: this.dataList[0].name,
          state: 1,
          color: "#4992ff",
        },
        {
          name: this.dataList[1].name,
          state: 2,
          color: "#7cffb2",
        },
        {
          name: this.dataList[2].name,
          state: 1,
          color: "#fddd60",
        },
      ];
    },
    initData() {
      let that = this;
      distributionChips.dealData();

      this.dealFflow(this.input_name1);
      return;
      //计算
      let calculateStopLoss = initCaculate.calculateStopLoss2(
        [{ klines: this.props_dataList.klines }],
        this.props_dataList.klines,
        null,
        "",
        this.props_dataList.time
      );

      this.dealFflow(this.input_name1);

      this.areaStyle2 = [{}];
      this.calculateStopLoss_data = calculateStopLoss;
      this.diyDealLink(deal30Loss(calculateStopLoss), this.props_dataList.time);

      that.dataList.push({
        num: that.props_dataList.num,
        name: that.props_dataList.name,
      });

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
      that.legend1 = {
        selected: {
          // 通过selected的图例选中状态来控制你要显示的个数
          this_name: true,
          止损位: true,
          支撑位: true,
          近30日支撑位: true,
          近30日最高价: true,
          近30日最低价: true,
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
