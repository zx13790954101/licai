<template>
  <div class="proportion3">
    <div id="proportion3" class="box"></div>
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
      let myChart = echarts.init(document.getElementById("proportion3"));
      var option;
      option = {
        grid: {
          x: 0,
          x2: 0,
          y: 0,
          y2: 0,
        },
        center: ["30%", "32%"],
        // title: {
        //   text: "",
        //   subtext: "",
        //   left: "left",
        //   top: "50",
        // },
        tooltip: {
          trigger: "item",
        },

        series: [
          {
            grid: {
              x: 0,
              x2: 0,
              y: 0,
              y2: 0,
            },
            startAngle: 45,
            name: "Access From",
            type: "pie",
            selectedMode: "single",
            radius: ["10%", "45%"],
            label: {
              position: "inner",
              fontSize: 14,
            },
            itemStyle: {
              borderRadius: 1,
              borderColor: "#fff",
              borderWidth: 3,
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: 33.33,
                name: "买入",
                itemStyle: {
                  normal: {
                    color: "#4c5351",
                  },
                },
              },
              {
                value: 33.33,
                name: "持有",
                itemStyle: {
                  normal: {
                    color: "#4c5351",
                  },
                },
              },
              {
                value: 33.33,
                name: "卖出",
                selected: true,
                itemStyle: {
                  normal: {
                    color: "rgb(233, 64, 65)",
                  },
                },
              },
              {
                value: 33.33,
                name: "观望",
                itemStyle: {
                  normal: {
                    color: "#4c5351",
                  },
                },
              },
            ],
          },
          {
            startAngle: 90,
            grid: {
              x: 0,
              x2: 0,
              y: 0,
              y2: 0,
            },
            name: "Access From",
            type: "pie",
            radius: ["50%", "63%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 1,
              borderColor: "#fff",
              borderWidth: 10,
            },
            label: {
              fontSize: 14,
              // formatter: function (a) {
              //   var a1 = a.data.name;
              //   var b1 = a.data.tip;
              //   return "{name|" + a1 + "}\n{time|" + b1 + "}";
              // },
              // backgroundColor: "#F6F8FC",
              // borderColor: "#8C8D8E",
              // borderWidth: 1,
              // borderRadius: 2,
              // rich: {
              //   time: {
              //     fontSize: 10,
              //     color: "#999",
              //   },
              // },
            },
            data: [
              {
                value: 40,
                name: "基本面",
                itemStyle: {
                  normal: {
                    color: "#4c5351",
                  },
                },
              },
              {
                value: 40,
                name: "主力持有",
                itemStyle: {
                  normal: {
                    color: "#4c5351",
                  },
                },
              },
              {
                value: 40,
                name: "基本面",
                itemStyle: {
                  normal: {
                    color: "#4c5351",
                  },
                },
              },
              {
                value: 40,
                name: "题材概念",
                itemStyle: {
                  normal: {
                    color: "#4c5351",
                  },
                },
              },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
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
.proportion3 {
  margin: 0px 20px;

  #proportion3 {
    height: 200px;
    width: 300px;
  }
}
</style>
