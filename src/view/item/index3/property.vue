<template>
  <div class="property">
    <div id="property" class="box"></div>
  </div>
</template>
<script>
//资产布局
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
      let myChart = echarts.init(document.getElementById("property"), "dark");
      var option;
      option = {
        grid: {
          x: 0,
          x2: 0,
          y: 0,
          y2: 0,
        },
        color: ["#ee6666", "#5470c6", "#fac858", "#91cc75"],
        center: ["30%", "50%"],
        // title: {
        //   text: "",
        //   subtext: "",
        //   left: "left",
        //   top: "50",
        // },
        tooltip: {
          trigger: "item",
        },
        legend: {
          left: "center",
          data: ["科技", "金融", "资源", "消费"],
        },
        series: [
          {
            grid: {
              x: 0,
              x2: 0,
              y: 0,
              y2: 0,
            },
            name: "Access From",
            type: "pie",
            selectedMode: "single",
            radius: [0, "70%"],
            label: {
              position: "inner",
              fontSize: 16,
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: 40,
                name: "现金",
              },
              {
                value: 20,
                name: "股票",
              },
              {
                value: 10,
                name: "债券",
                selected: true,
              },
              {
                value: 30,
                name: "实业",
              },
            ],
          },
          {
            grid: {
              x: 0,
              x2: 0,
              y: 0,
              y2: 0,
            },
            name: "Access From",
            type: "pie",
            radius: ["75%", "80%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 2,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              formatter: function (a) {
                // console.log(a);
                var a1 = a.data.name;
                var b1 = a.data.tip;
                return "{name|" + a1 + "}\n{time|" + b1 + "}";
              },
              backgroundColor: "#F6F8FC",
              borderColor: "#8C8D8E",
              borderWidth: 1,
              borderRadius: 2,
              rich: {
                time: {
                  fontSize: 10,
                  color: "#999",
                },
              },
            },
            data: [
              {
                value: 40,
                name: "科技",
                tip: "半导体,新能源",
              },
              {
                value: 20,
                name: "消费",
                tip: "白酒，医疗",
              },
              {
                value: 10,
                name: "金融",
                tip: "银行，保险",
              },
              {
                value: 30,
                name: "资源",
                tip: "煤炭，钢铁",
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
.property {
  margin-right: 20px;
  #property {
    height: 320px;
    width: 400px;
  }
}
</style>
