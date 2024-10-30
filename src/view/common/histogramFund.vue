<template>
  <div class="histogram">
    <nav class="flex-c" v-show="head">
      <span class="flex-item">
        {{ title }}
      </span>
      <button @click="openWin()">查看数据来源</button>
    </nav>
    <div :id="'histogram' + name" :style="{ height: height1, width: width1 }" class="histogram_box"></div>
  </div>
</template>
<script>
  import {
    orchesData
  } from "../../assets/common.js";
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
      timeData2: Array,
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
    mounted() {
      var that = this;
      this.$nextTick(() => {
        that.init1();
      });
    },
    methods: {

      openWin() {
        window.open(this.link, "top");
      },
      init1() {
        var that = this;
        var chartDom = document.getElementById("histogram" + this.name);
        var myChart = echarts.init(chartDom);

        var option = {
          dataZoom: [{
            show: that.dataZoom,
            start: 90,
            end: 100,
          }, ],
          legend: {},
          color: ["#61a0a8", "#cc0000"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
            },
            position: function(pos, params, el, elRect, size) {
              var obj = {
                top: 10
              };
              obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 30;
              return obj;
            },
            // formatter: "{a} <br/>{b} : {c}",
          },
          xAxis: [{
              type: "category",
              boundaryGap: false,
              axisTick: {
                show: false
              },
              data: that.timeData,
            },
            // {
            //   type: "category",
            //   boundaryGap: false,
            //   data: that.timeData2,
            // },
          ],

          grid: {
            x: 0,
            x1: 0,
            y: 20,
            y1: 0,
            bottom: "20",
            left: "50",
          },
          yAxis: [{
              type: "value",
              scale: true,
            },
            {
              type: "value",
              min: 0, //取0为最小刻度
              max: 24, //取100为最大刻度
            },
          ],
          series: [{
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
