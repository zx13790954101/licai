<template>
  <div class="histogramDialog">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="90%"
      :before-close="handleClose"
    >
      <nav class="flex-c" v-show="head">
        <span class="flex-item">
          {{ title }}
        </span>
        <button @click="openWin()">查看数据来源</button>
      </nav>
      <div
        :id="'histogramDialog' + name"
        :style="{ height: height1, width: width1 }"
        class="histogram_box"
      ></div>
    </el-dialog>
    <!-- <button class="el-icon-rank btn" @click="toOpen"></button> -->
  </div>
</template>
<script>
import { orchesData } from "../../assets/common.js";
export default {
  data() {
    return {
      datalist1: null,
    };
  },
  created() {},
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    name: String,
    timeData: Array,
    listData: Array,
    listData1: Array,
    title: String,
    link: String,
    title1: String,
    title2: String,
    height1: String,
    width1: String,
    head: {
      type: Boolean,
      default: true,
    },
    dataZoom: {
      type: Boolean,
      default: true,
    },
  },
  components: {},
  mounted() {},
  watch: {
    listData: {
      deep: true,
      handler(val) {
        this.init1();
      },
    },
  },
  methods: {
    toOpen() {
      var that = this;
      this.dialogVisible = true;
      this.$nextTick(() => {
        that.init1();
      });
    },
    handleClose(done) {
      this.$parent.dialogVisible1 = false;
    },
    openWin() {
      window.open(this.link, "top");
    },
    init1() {
      var that = this;
      var chartDom = document.getElementById("histogramDialog" + this.name);
      var myChart = echarts.init(chartDom);
      console.log("val11", that.listData);
      var option = {
        dataZoom: [
          {
            show: that.dataZoom,
            start: 0,
            end: 100,
          },
        ],
        legend: {},
        color: ["#cc0000", "#61a0a8"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
          position: function (pos, params, el, elRect, size) {
            var obj = { top: 10 };
            obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 30;
            return obj;
          },
          // formatter: "{a} <br/>{b} : {c}",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisTick: { show: false },
          data: that.timeData,
        },

        grid: {
          x: 0,
          x1: 0,
          y: 20,
          y1: 0,
          bottom: "20",
          left: "50",
        },
        yAxis: [
          {
            type: "value",
            scale: true,
          },
          {
            type: "value",
            scale: true,
          },
        ],
        series: [
          {
            name: that.title1,
            type: "line",

            yAxisIndex: 0,
            data: that.listData,
          },
          {
            name: that.title2,
            type: "line",
            yAxisIndex: 1,

            data: that.listData1,
          },
        ],
      };

      if (option && typeof option === "object") {
        myChart.setOption(option, true);
      }
    },
  },
};
</script>
<style scoped lang="scss">
.histogramDialog {
  nav {
    background-color: #555;
    padding: 2px 10px;
    color: white;
    font-size: 12px;
    font-weight: 600;
    button {
      background-color: #f5deb300;
      color: white;
      font-size: 12px;
      border: 0px;
      padding: 2px;
      border-radius: 2px;
      border-bottom: 1px solid white;
    }
  }
  .histogram_box {
    width: 500px;
    height: 320px;
  }
  .btn {
    font-size: 35px;
    position: relative;
    transform: rotate(60deg);
    float: right;
  }
}
</style>
