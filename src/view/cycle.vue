<template>
  <div class="cycle">
    <section class="echarts1" id="echarts3"></section>
  </div>
</template>
<script>
import $ from "jquery";

import { initChip } from "./main/test2";
export default {
  created() {
    this.$nextTick(() => {
      this.init1();
    });

    initChip();
  },
  methods: {
    init1() {
      let myChart = echarts.init(document.getElementById("echarts3"));
      var option;

      option = {
        title: {
          text: "未来一周气温变化",
          subtext: "纯属虚构",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["最高气温", "最低气温"],
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,

            end: 50,
          },
          {
            start: 0,
            end: 10,
            handleIcon:
              "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
            handleSize: "80%",
            handleStyle: {
              color: "#fff",
              shadowBlur: 3,
              shadowColor: "rgba(0, 0, 0, 0.6)",
              shadowOffsetX: 2,
              shadowOffsetY: 2,
            },
          },
        ],
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            dataView: { readOnly: false },
            magicType: { type: ["line", "bar"] },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "周一",
            "周二",
            "周三",
            "周四",
            "周五",
            "周六",
            "周日",
            "周二",
            "周三",
            "周四",
            "周五",
            "周六",
            "周日",
          ],
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value} °C",
          },
        },
        series: [
          {
            name: "最高气温",
            type: "line",
            data: [11, 11, 15, 13, 12, 13, 10, 11, 15, 13, 12, 13, 10],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" },
              ],
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }],
            },
          },
          {
            name: "最低气温",
            type: "line",
            data: [1, -2, 2, 5, 3, 2, 0, -3, 2, 5, 3, 2, 0],
            markPoint: {
              data: [{ name: "周最低", value: -2, xAxis: 1, yAxis: -1.5 }],
            },
            markLine: {
              data: [
                { type: "average", name: "平均值" },
                [
                  {
                    symbol: "none",
                    x: "90%",
                    yAxis: "max",
                  },
                  {
                    symbol: "circle",
                    label: {
                      position: "start",
                      formatter: "最大值",
                    },
                    type: "max",
                    name: "最高点",
                  },
                ],
              ],
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },
};
</script>
<style scoped lang="scss">
.plateEcharts {
  align-items: unset;
}
.echarts1 {
  height: 600px;
  width: 600px;
}
.operation {
  width: 200px;
}
</style>
