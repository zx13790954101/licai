<template>
  <div class="proportion">
    <div id="proportion" class="box"></div>
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
        let myChart = echarts.init(document.getElementById("proportion"));
        var option;
        option = {
          grid: {
            x: 0,
            x2: 0,
            y: 0,
            y2: 0,
          },
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
          // legend: {
          //   left: "center",
          //   data: ["科技", "金融", "资源", "消费"],
          // },
          series: [{



              grid: {
                x: 0,
                x2: 0,
                y: 0,
                y2: 0,
              },
              name: "Access From",
              type: "pie",
              selectedMode: "single",
              radius: [0, "40%"],
              label: {
                position: "inner",
                fontSize: 12,
              },
              labelLine: {
                show: false,
              },
              data: [{
                  value: 33.33,
                  name: "拉伸",
                },
                {
                  value: 33.33,
                  name: "震荡",
                },
                {
                  value: 33.33,
                  name: "下跌",
                  selected: true,
                },
                {
                  value: 33.33,
                  name: "筑底",
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
              radius: ["50%", "65%"],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 2,
                borderColor: "#fff",
                borderWidth: 2,
              },
              label: {
                formatter: function(a) {
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
              data: [{
                  value: 40,
                  name: "科技",
                  tip: "半导体,新能源，光伏，车",
                },
                {
                  value: 20,
                  name: "消费",
                  tip: "白酒，医疗，消费，猪",
                },
                {
                  value: 10,
                  name: "金融",
                  tip: "银行，保险，证券",
                },
                {
                  value: 30,
                  name: "资源",
                  tip: "煤炭，钢铁，有色金属",
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
  .proportion {
    #proportion {
      height: 200px;
      width: 450px;
    }
  }
</style>
