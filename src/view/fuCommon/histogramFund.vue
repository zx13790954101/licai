<template>
  <div class="histogram" :class="'histogram' + name">
    <!-- <nav class="flex-c nav1" v-show="head">
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
import $ from "jquery";
export default {
  data() {
    return {
      datalist1: null,
      width2: "1400px",
    };
  },
  created() {},
  props: {
    visualMap: Array,
    name: String,
    timeData: Array,
    markLine: Array,
    areaStyle: Array,
    markPoint: null,
    listData: Array,
    title: String,
    link: String,
    height1: String,
    width1: String,
    typeline: String,
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
    dataZoomStart: String,
    //选择的标签
    legend1: Object,
  },
  components: {},
  mounted() {
    var that = this;
    this.$nextTick(() => {
      that.width2 =
        document.querySelector(".histogram" + that.name).offsetWidth + "px";

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
                      return "#f72c5b";
                    } else {
                      return "#7cffb2";
                    }
                  },
                },
              };
        //设置新的折线图的列表
        if (itemStyle2 == "") {
          if (Element.linestylecolor != undefined) {
            itemStyle2 = Element.linestylecolor;
          }
        }
        let item1 = {
          name: Element.name,
          type: Element.type_echarts ? "bar" : "line",
          yAxisIndex: Element.yAxisIndex != undefined ? 0 : index,
          data: Element.num,

          areaStyle:
            this.areaStyle != undefined ? this.areaStyle[index] : undefined,
          markLine:
            this.markLine != undefined ? this.markLine[index] : undefined,
          markPoint:
            this.markPoint != undefined ? this.markPoint[index] : undefined,
          itemStyle: itemStyle2,
          visualMap:
            this.visualMap != undefined ? this.visualMap[index] : undefined,
        };

        if (this.typeline == 1) {
          item1.yAxisIndex = null;
        }

        if (Element.type && Element.type == "category") {
          var arr7 = Array.from(
            Array(that.timeData.length - 1),
            (v, k) => null
          );
          item1 = {
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            itemStyle: {
              color: "#f4433605",
            },
            emphasis: {
              focus: "series",
            },
            data: arr7.concat([Element.yAxis[2]]),
          };
          series1.push(item1);
          item1 = {
            type: "bar",
            stack: "total",
            label: {
              show: true,
              formatter:
                (
                  ((Element.yAxis[1] - Element.yAxis[2]).toFixed(2) /
                    Element.yAxis[1]) *
                  100
                ).toFixed(2) + "%",
            },
            itemStyle: {
              color: "#4caf50",
            },
            emphasis: {
              focus: "series",
            },
            data: arr7.concat([
              (Element.yAxis[1] - Element.yAxis[2]).toFixed(2),
            ]),
          };
          series1.push(item1);

          item1 = {
            type: "bar",
            stack: "total",
            label: {
              show: true,
              formatter:
                (
                  ((Element.yAxis[0] - Element.yAxis[1]).toFixed(2) /
                    Element.yAxis[1]) *
                  100
                ).toFixed(2) + "%",
            },
            itemStyle: {
              color: "#f44336",
            },
            emphasis: {
              focus: "series",
            },
            data: arr7.concat([
              (Element.yAxis[0] - Element.yAxis[1]).toFixed(2),
            ]),
          };
          series1.push(item1);

          //  console.log("Element.yAxis", Element.yAxis);
        } else {
          series1.push(item1);
        }

        let item2 = {
          type: "value",
          scale: true,
          position: index == 0 ? "left" : "right",
          alignTicks: true,
          // offset: this.listData.length > 1 ? 80 : 0,
          axisLine: {
            show: true,
          },
        };

        if (Element.type && Element.type == "category") {
          item2 = {
            type: "value",
          };
        }
        if (Element.setmin == 0) {
          item2.min = Element.setmin;
          item2.max = Element.setmax;
        }
        yAxis1.push(item2);
        let item3 = {
          type: "category",
          boundaryGap: false,
          axisTick: {
            show: false,
          },
          data: that.timeData,
          //设置网格
          splitLine: {
            show: true,
            lineStyle: {
              //width: 0.5, // 设置网格线的长短
              //color: "#e0dede",
              // type: "dashed",
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
            start: this.dataZoomStart==undefined?90:this.dataZoomStart,
            end: 100,
          },
          {
            type: "inside",
            start: this.dataZoomStart == undefined ? 90 : this.dataZoomStart,
            end: 100 ,
          },
        ],
        toolbox: {
          //框选计算工具栏
          show: true,
          feature: {
            brush: {
              show: true,
              title: {
                lineX: "框选计算",
                clear: "关闭框选",
              },
            },
            saveAsImage: { show: true },
          },
          top: 0,
          right: 15,
          itemSize: 20, //工具栏 icon 的大小
        },
        legend: this.legend1 != undefined ? this.legend1 : {},
        // color: ["#61a0a8", "#cc0000"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
          brush: {
            type: ["lineX", "clear"],
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
        brush: {
          toolbox: ["lineX", "clear"],
          xAxisIndex: 0,
          brushStyle: {
            borderWidth: 1,
            color: "rgba(120,140,180,0.2)",
            borderColor: "rgba(120,140,180,0.8)",
          },
        },
        xAxis: xAxis1[0],
        grid: {
          // x: 100,
          // x1: 0,
          // y: 50,
          // y1: 0,
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
        //显示框
        // myChart.dispatchAction({
        //   type: "brush",
        //   areas: [
        //     {
        //       brushType: "lineX",
        //       coordRange: ["2023-02-03", "2023-03-15"],
        //       xAxisIndex: 0,
        //     },
        //   ],
        // });
        // 点击框选 brushEnd、brushSelected
        // 点击框选 brushEnd、brushSelected
        myChart.on("brushSelected", function (params) {
          if (params.batch.length < 1 || params.batch[0].areas.length < 1) {
            $("#brushData").html("");
            return;
          }
          var range = params.batch[0].areas[0].coordRange; //根据坐标获取选中区域数据
          range[range.length - 1] = range[range.length - 1] + 1;
          var brushed = [],
            nameData = [],
            sumData = [],
            meanData = [];
          var brushComponent = params.batch[0];
          for (var sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
            var name = brushComponent.selected[sIdx].seriesName;
            var values = myChart.getOption().series[sIdx].data.slice(...range);
            var timeData = xAxis1[0].data.slice(...range);
            var timeRange = "";
            if (values.length < 1 || timeData.length < 1) {
              return;
            }
            if (timeData.length === 1) {
              timeRange = timeData[0];
            } else {
              let start_num = timeData.findIndex((item) => {
                return item === timeData[0];
              });
              let end_num = timeData.findIndex((item) => {
                return item === timeData[timeData.length - 1];
              });
              timeRange =
                timeData[0] +
                "至" +
                timeData[timeData.length - 1] +
                "\n" +
                (end_num - start_num) +
                "天";
            }
            var sum = that.SumNum(values) ? that.SumNum(values) : 0;
            if (name == "每日涨跌") {
              sum = that.dealInfow(values);
            }

            var mean = that.AverageNum(values) ? that.AverageNum(values) : 0;
            sumData.push(sum);
            meanData.push(mean);
            nameData.push(name);
            var temp = `${name}:日均值:${mean.toFixed(0)}，涨跌幅：${sum} \n\n`;
            brushed.push(temp);
          }

          var text = brushed.join("");
          var brushInfo = timeRange + "\n" + text;
          $("#brushData").html(brushInfo);

          myChart.setOption({
            title: {
              backgroundColor: "#333",
              text: brushInfo,
              bottom: 0,
              right: "10%",
              width: 100,
              textStyle: {
                fontSize: 12,
                color: "#fff",
              },
            },
          });
        });
      }
    },
    dealInfow(data) {
      let item1 = [];
      let item2 = [];
      let item3 = [];

      data.forEach((element, index) => {
        if (data.length - 1 != index) {
          if (element >= 0) {
            item1.push(element);
          } else {
            item2.push(element);
          }
          item3.push(element);
        }
      });
      let sum = eval(item3.join("+"));
      sum = sum / item3.length;
      return (
        "平均值:" +
        sum.toFixed(2) +
        "涨:" +
        item1.length +
        "天" +
        "跌" +
        item2.length +
        "天"
      );
    },
    //均值
    AverageNum(arr) {
      let sum = eval(arr.join("+"));
      let svg = ((sum / arr.length) * 100) / 100;
      return svg;
    },
    //求和
    SumNum(arr) {
      let sum =
        ((parseFloat(arr[arr.length - 4]) - parseFloat(arr[0])) / arr[0]) * 100;

      return sum.toFixed(2);
    },
  },
};
</script>
<style scoped lang="scss">
.histogram {
  width: 100%;
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
