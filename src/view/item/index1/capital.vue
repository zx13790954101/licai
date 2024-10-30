<template>
  <div class="capital">
    <div id="capital" class="box"></div>
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
      //深色模式 dark
      let myChart = echarts.init(document.getElementById("capital"), "dark");
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
        // position: app.config.position,
        distance: app.config.distance,
        // align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        // rotate: app.config.rotate,
        formatter: "{c}  {name|{a}}",
        fontSize: 10,
        rich: {
          name: {
            fontSize: 10,
          },
        },
      };

      option = {
        //设置中间位置
        grid: {
          x: 40,
          x2: 20,
          y: 40,
          y2: 30,
        },
        title: [
          {
            text: "单位是万",
            left: 0,

            textStyle: {
              fontSize: 10,
              fontWeight: "normal",
            },
          },
        ],
        color: ["#f00", "#090"],
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
            axisLabel: {
              textStyle: {
                fontSize: 10,
                fontWeight: "600",
              },
            },
            data: ["沪深两市", "北向资金", "主力"],
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              textStyle: {
                fontSize: 12,
                fontWeight: "600",
              },
            },
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
.capital {
  #capital {
    height: 250px;
    width: 250px;
  }
}
</style>
