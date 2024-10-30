<template>
  <div class="radarChart">
    <section class="main">
      <div ref="radarChart" id="radarChart"></div>
    </section>
  </div>
</template>

<script>
//雷达图文件夹
export default {
  data() {
    return {};
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      var chart = echarts.init(document.getElementById("radarChart"), "dark");
      var option = {
        radar: [
          {
            indicator: [
              {
                text: "运输单位",
              },
              {
                text: "销售单位",
              },
              {
                text: "使用单位",
              },
              {
                text: "生产单位",
              },
              {
                text: "处置单位",
              },
              {
                text: "储存单位",
              },
            ],
            center: ["46%", "50%"], // 位置
            radius: 150, //大小
            startAngle: 90,
            splitNumber: 4,
            //    shape: 'circle',
            name: {
              formatter: "{value}",
              textStyle: {
                color: "aqua", // 文字颜色
              },
            },
            // splitArea: {
            //     areaStyle: {
            //         color: ['rgba(114, 172, 209, 0.1)',
            //             'rgba(114, 172, 209, 0.1)', 'rgba(114, 172, 209, 0.1)',
            //             'rgba(114, 172, 209, 0.1)', 'rgba(114, 172, 209, 0.1)'
            //         ], //圆环颜色
            //         shadowColor: 'aqua', // 圆颜色
            //         shadowBlur: 10
            //     }
            // },
            // axisLine: {
            //     lineStyle: {
            //         color: 'aqua' // 分割线
            //     }
            // },
            // splitLine: {
            //     lineStyle: {
            //         color: 'aqua' //圆线
            //     }
            // }
          },
        ],
        series: [
          {
            name: "雷达图",
            type: "radar",
            itemStyle: {
              emphasis: {
                // color: 各异,
                lineStyle: {
                  width: 4,
                },
              },
            },
            data: [
              {
                value: [5678, 3678, -6781, 1678, 1780, 3671],
                areaStyle: {
                  normal: {
                    color: "rgba(0, 255, 255, 0.8)", // 选择区域颜色
                  },
                },
              },
              {
                value: [2678, 1678, 2781, 1678, 2780, 3671],
                areaStyle: {
                  normal: {
                    color: "rgba(153, 209, 246, 1)", // 选择区域颜色
                  },
                },
              },
            ],
          },
        ],
      };
      chart.setOption(option);
    },
  },
};
</script>

<style scoped lang="scss">
.radarChart {
  #radarChart {
    width: 500px;
    height: 400px;
  }
}
</style>
