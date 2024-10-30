<template>
  <div class="proposal1">
    <h5>
      <span>100%</span>
    </h5>
    <h2>市场温度计</h2>
    <div ref="hygrometer" id="myChartWhater"></div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import "echarts-liquidfill";
export default {
  data() {
    return {
      position: 0.9,
      position_date: [
        {
          date: "2022-5-17 ",
          date1: "至今",
          num: 0.6,
        },
      ],
    };
  },
  created() {},
  mounted() {
    this.drawLiquidfill();
  },
  methods: {
    drawLiquidfill() {
      var that = this;
      var color_array = [
        { offset: 0, color: ["#303130"] },
        { offset: 1, color: ["#303133"] },
      ];
      if (that.position >= 0.9) {
        color_array = [
          { offset: 0, color: ["#e89090"] },
          {
            offset: 1,
            color: ["#ff3f44"], // 100% 处的颜色
          },
        ];
      } else if (that.position >= 0.6) {
        color_array = [
          { offset: 0, color: ["#ffbb2d"] },
          { offset: 1, color: ["#ffbb4d"] },
        ];
      } else if (that.position >= 0.3) {
        color_array = [
          {
            offset: 0,
            color: ["#08cb1f"], // 50% 处的颜色
          },
          {
            offset: 1,
            color: ["#08cb8f"], // 50% 处的颜色
          },
        ];
      }

      var chart = echarts.init(document.getElementById("myChartWhater"));
      var option = {
        series: [
          {
            name: "睡了",
            type: "liquidFill",
            center: ["50%", "50%"], // 布局位置
            radius: "120px", // 半径大小
            data: [that.position],
            label: {
              normal: {
                color: "#27e5f1",
                insideColor: "#fff",
                textStyle: {
                  fontSize: 30,
                  fontWeight: "bold",
                },
              },
            },
            color: [
              {
                type: "linear",
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: color_array,
                // [
                //   {
                //     offset: 0,
                //     color: ["#303133"], // 0% 处的颜色
                //   },
                //   {
                //     offset: 0.3,
                //     color: ["#08cb8f"], // 50% 处的颜色
                //   },
                //   {
                //     offset: 0.6,
                //     color: ["#ffbb4d"], // 100% 处的颜色
                //   },
                //   {
                //     offset: 1,
                //     color: ["#ff3f44"], // 100% 处的颜色
                //   },
                // ]

                global: false, // 缺省为 false
              },
            ], //设置颜色系列
            outline: {
              show: true,
              borderDistance: 1, // 轮廓间距
              itemStyle: {
                borderColor: "#00000082", // 轮廓颜色
                borderWidth: 0, // 轮廓大小
                shadowBlur: "none", // 轮廓阴影
              },
            },
          },
        ],
      };
      chart.setOption(option);
    },
  },
};
</script>
<style scoped lang="scss">
.proposal1 {
  text-align: center;
  background-color: #ffffff;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 #0000001a;
  #myChartWhater {
    width: 130px;
    height: 130px;
  }
  h2 {
    margin-bottom: 5px;
    letter-spacing: 1px;
  }
  h5 {
    font-weight: 400;
    letter-spacing: 1px;
    span {
      color: #ea5454;
    }
  }
}
</style>
