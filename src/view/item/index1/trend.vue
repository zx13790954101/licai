<template>
  <div class="trend">
    <div id="trend" class="box"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {},
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.init1();
    });
  },
  methods: {
    init1() {
      let myChart = echarts.init(document.getElementById("trend"));
      var option;
      app.config = {
        rotate: 90,
        align: "left",
        verticalAlign: "middle",
        position: "insideBottom",
        distance: 15,
        onChange: function () {
          const labelOption = {
            rotate: app.config.rotate,
            align: app.config.align,
            verticalAlign: app.config.verticalAlign,
            position: app.config.position,
            distance: app.config.distance,
          };
          myChart.setOption({
            series: [
              {
                label: labelOption,
              },
              {
                label: labelOption,
              },
              {
                label: labelOption,
              },
              {
                label: labelOption,
              },
            ],
          });
        },
      };
      const labelOption = {
        show: true,
        position: app.config.position,
        distance: app.config.distance,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        rotate: app.config.rotate,
        formatter: "{c}  {name|{a}}",
        fontSize: 10,
        rich: {
          name: {},
        },
      };

      option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: ["买入", "卖出"],
        },

        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: ["沪深两市", "北向资金", "主力"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "买入",
            type: "bar",
            barGap: 0,
            label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: [32, 33, 30],
          },
          {
            name: "卖出",
            type: "bar",
            label: labelOption,
            emphasis: {
              focus: "series",
            },
            data: [22, 18, 19],
          },
        ],
      };
      option && myChart.setOption(option);
    },
  },
};
</script>
<style scoped lang="scss">
.trend {
  #trend {
    height: 270px;
    width: 300px;
  }
}
</style>
