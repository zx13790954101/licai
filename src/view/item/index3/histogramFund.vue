<template>
  <div class="histogram">
    <nav class="flex-c nav1" v-show="head">
      <span class="flex-item">
        {{ title }}
      </span>
      <button @click="openWin()">查看数据来源</button>
    </nav>
    <div
      :id="'histogram' + name"
      :style="{ height: height1, width: width2 }"
      class="histogram_box"
    ></div>
  </div>
</template>
<script>
import { stringify } from "querystring";

export default {
  data() {
    return {
      datalist1: null,
      width2: "0px",
    };
  },
  created() {},
  props: {
    name: String,
    timeData: Array,
    markLine: Array,
    markArea: Array,
    markPoint: Array,
    listData: Array,
    title: String,
    link: String,
    height1: String,
    width1: String,
    thame: String,
    type_echarts: String,
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
      that.width2 = document.querySelector(".histogram").offsetWidth + "px";
      console.log("width2", this.width2);
      setTimeout(function () {
        that.init1();
      }, 1000);
    });
  },
  watch: {
    listData: {
      immediate: true,
      deep: true,
      handler(val) {
        setTimeout(() => {
          this.init1();
        }, 2000);
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
      let thame2 = this.thame != undefined ? this.thame : "light";
      var myChart = echarts.init(chartDom, thame2);

      var series1 = [];
      let yAxis1 = [];
      let xAxis1 = [];

      this.listData.forEach((Element, index) => {
        let itemStyle2 =
          Element.itemStyle == undefined
            ? ""
            : {
                normal: {
                  color: function (params) {
                    var index_color = params.value;
                    if (index_color > 0) {
                      return "#7cffb2";
                    } else {
                      return "#f72c5b";
                    }
                  },
                },
              };
        console.log("Element.linestylecolor", Element.linestylecolor);
        let item1 = {
          name: Element.name,
          type: Element.type_echarts ? "bar" : "line",
          yAxisIndex: Element.yAxisIndex != undefined ? 0 : index,
          data: Element.num,
          // markPoint: {
          //   data: [
          //     { type: "max", name: "最大值" },
          //     { type: "min", name: "最小值" },
          //   ],
          // },
          symbolSize: 3, //一定要加这个字段才能显示
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: "top",
                fontSize: 9,
              },
              lineStyle: {
                width: 3, // 设置虚线宽度
                type: "dotted", // 虚线'dotted' 实线'solid'
                color:
                  Element.linestylecolor != undefined
                    ? ""
                    : Element.linestylecolor,
              },
            },
          },

          markArea:
            this.markArea != undefined
              ? {
                  data: this.markArea,
                }
              : undefined,
          // markLine:
          //   this.markLine != undefined ? this.markLine[index] : undefined,
          // markPoint:
          //   this.markPoint != undefined ? this.markPoint[index] : undefined,
        };

        series1.push(item1);

        let item2 = {
          type: "value",
          scale: true,
          position: index == 0 ? "left" : "right",
          alignTicks: true,
          offset: this.listData.length == 2 ? 80 : 0,
          axisLine: {
            show: true,
          },
        };
        yAxis1.push(item2);
        let item3 = {
          type: "category",
          boundaryGap: false,
          axisTick: {
            show: false,
          },
          data: that.timeData,
          //设置字体的长度和显示问题

          axisLabel: {
            //x轴文字的配置
            show: true,
            interval: 0, //使x轴文字显示全
            textStyle: {
              color: "#333333",
            },
            formatter: function (params) {
              var newParamsName = "";
              var paramsNameNumber = params.length;
              var provideNumber = 5; //一行显示几个字
              var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
              if (paramsNameNumber > provideNumber) {
                for (var p = 0; p < rowNumber; p++) {
                  var tempStr = "";
                  var start = p * provideNumber;
                  var end = start + provideNumber;
                  if (p == rowNumber - 1) {
                    tempStr = params.substring(start, paramsNameNumber);
                  } else {
                    tempStr = params.substring(start, end) + "\n";
                  }
                  newParamsName += tempStr;
                }
              } else {
                newParamsName = params;
              }
              return newParamsName;
            },
          },
        };
        xAxis1.push(item3);
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
        xAxis: xAxis1[0],
        grid: {
          // x: 100,
          // x1: 0,
          // y: 50,
          // y1: 0,
          top: 40,
          bottom: 90,
          left: 60,
          right: this.listData.length > 1 ? 150 : 60,
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
