<template>
  <div class="histogram">
    <nav class="flex-c" v-show="head">
      <span class="flex-item">
        {{ title }}
      </span>
      <button @click="openWin()">查看数据来源</button>
    </nav>
    <div
      :id="'histogram' + name"
      :style="{ height: height1, width: width1 }"
      class="histogram_box"
    ></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      datalist1: null,
    };
  },
  created() {},
  props: {
    name: String,
    timeData: Array,
    listData: Array,
    title: String,
    link: String,
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
  mounted() {
    var that = this;

    this.$nextTick(() => {
      that.init1();
    });
  },
  watch: {
    listData: {
      immediate: true,
      deep: true,
      handler(val) {
        console.log("val", val);
        // this.init1();
      },
    },
  },
  methods: {
    openWin() {
      window.open(this.link, "top");
    },
    init1() {
      var that = this;
      var chartDom = document.getElementById("histogram" + this.name);
      var myChart = echarts.init(chartDom);

      var series1 = [];
      let yAxis1 = [];
      let xAxis1 = [];
      this.listData.forEach((Element, index) => {
        let item1 = {
          name: Element.name,
          type: "line",
          yAxisIndex: index,
          data: Element.num,
        };
        series1.push(item1);

        let item2 = {
          type: "value",
          scale: true,
          name: Element.name,
          show: true,
        };
        yAxis1.push(item2);
        let item3 = {
          type: "category",
          boundaryGap: false,
          axisTick: { show: false },
          data: that.timeData,
        };
        xAxis1.push(item3);
      });
      var option = {
        dataZoom: [
          {
            show: that.dataZoom,
            start: 100,
            end: 0,
          },
        ],
        legend: {},
        // color: ["#61a0a8", "#cc0000"],
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
        xAxis: xAxis1[0],
        grid: {
          // x: 0,
          // x1: 0,
          // y: 20,
          // y1: 0,
          // bottom: "20",
          // left: "50",
        },
        yAxis: yAxis1,
        series: series1,
      };

      if (option && typeof option === "object") {
        myChart.setOption(option, true);
      }
    },
  },
};
</script>
<style scoped lang="scss">
.histogram {
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
}
</style>
