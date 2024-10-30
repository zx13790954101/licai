<template>
  <div class="histogram index3_histogram">
    <!--    <nav class="flex-c" v-show="head">
      <span class="flex-item">
        {{ title }}
      </span>
      <button @click="openWin()">查看数据来源</button>
    </nav> -->
    <div
      :id="'histogram' + name"
      :style="{ height: height1, width: width2 }"
      class="histogram_box"
    ></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      datalist1: null,
      width2: "100%",
    };
  },
  created() {},
  props: {
    name: String,
    timeData: Array,
    markLine: Array,
    markArea: Array,
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
    areaStyle: Array,
  },
  components: {},
  mounted() {
    var that = this;
    this.$nextTick(() => {
      that.width2 =
        document.querySelector(".index3_histogram").offsetWidth + "px";
      that.init1();
    });
  },
  watch: {
    listData: {
      immediate: true,
      deep: true,
      handler(val) {
        //console.log("handler", val);
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
      let dataset1 = [];

      this.listData.forEach((Element, index) => {
        let item1 = {
          name: Element.name,
          type: "line",
          yAxisIndex: index,
          data: Element.num,
        };

        // series1.push(item1);

        let item2 = {
          type: "value",
          scale: true,
        };
        yAxis1.push(item2);
        let item3 = {
          type: "category",
          boundaryGap: false,
          axisTick: {
            show: false,
          },
          data: Element.time,
        };
        xAxis1.push(item3);
        series1.push({
          type: "line",
          name: Element.name,
          datasetIndex: index,
          yAxisIndex: index,
          areaStyle:
            this.areaStyle != undefined ? this.areaStyle[index] : undefined,
          emphasis: {
            focus: "series",
          },
          markArea:
            this.markArea != undefined
              ? {
                  data: this.markArea,
                }
              : undefined,
          markLine:
            this.markLine != undefined ? this.markLine[index] : undefined,

          // symbolSize: this.timeData.length > Element.num ? 20 : 1,
        });
        let item4 = [];

        Element.time.forEach((Element2, index2) => {
          let item5 = [Element2, Element.num[index2]];
          item4.push(item5);
        });

        dataset1.push({
          source: item4,
        });
      });

      var option = {
        dataZoom: [
          {
            textStyle: {
              color: "#8392A5",
            },
            handleIcon:
              "path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
            dataBackground: {
              areaStyle: {
                color: "#8392A5",
              },
              lineStyle: {
                opacity: 0.8,
                color: "#8392A5",
              },
            },
            brushSelect: true,
          },
          {
            type: "inside",
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
            var obj = {
              top: 10,
            };
            obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 30;
            return obj;
          },
          // formatter: "{a} <br/>{b} : {c}",
        },
        dataset: dataset1,
        xAxis: {
          type: "category",
        },
        grid: {
          y: 0,
          top: 40,
          // bottom: "20",
          left: 50,
          right: this.listData.length > 1 ? 100 : 10,
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
    width: 100%;
    height: 320px;
  }
}
</style>
