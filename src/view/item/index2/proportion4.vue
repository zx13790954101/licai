<template>
  <div class="proportion4">
    <div id="proportion4" class="box"></div>
    <!-- <ul class="box">
      <li class="flex-c" v-for="(item, index) in data_list" :key="index">
        <b class="flex-item"> {{ item.title }}</b>
        <span> {{ item.tip }}</span>
        {{ item.type }}
      </li>
    </ul> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      data_list: [
        {
          title: "主力",
          tip: "急速逃离",
          type: "利空+1",
        },
        {
          title: "K线图",
          tip: "",
          type: "利空+1",
        },
        {
          title: "消息",
          tip: "",
          type: "利空+1",
        },
        {
          title: "外围",
          tip: "",
          type: "利空+1",
        },
      ],
    };
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
      let myChart = echarts.init(document.getElementById("proportion4"));
      var option;
      option = {
        grid: {
          x: -50,
          x2: 0,
          y: 0,
          y2: 0,
          top: 0,
        },
        center: ["30%", "40%"],
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
              top: 0,
            },
            startAngle: 45,
            name: "Access From",
            type: "pie",
            selectedMode: "single",
            radius: ["0%", "55%"],
            label: {
              position: "inner",
              fontSize: 14,
            },
            itemStyle: {
              borderRadius: 1,
              borderColor: "#fff",
              borderWidth: 0,
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
                    color: "#ffffff",
                  },
                },
              },
              {
                value: 33.33,
                name: "持有",
                itemStyle: {
                  normal: {
                    color: "#ffffff",
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
                    color: "#ffffff",
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
            radius: ["65%", "72%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 1,
              borderColor: "#fff",
              borderWidth: 5,
            },
            label: {
              fontSize: 14,
            },
            data: [
              {
                value: 40,
                name: "K线(+1)",
                itemStyle: {
                  normal: {
                    color: "#4c5351",
                  },
                },
              },
              {
                value: 40,
                name: "主力(-1)",
                itemStyle: {
                  normal: {
                    color: "#4c5351",
                  },
                },
              },
              {
                value: 40,
                name: "消息(-1)",
                itemStyle: {
                  normal: {
                    color: "#4c5351",
                  },
                },
              },
              {
                value: 40,
                name: "外盘(-1)",
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
.proportion4 {
  position: relative;
  margin-top: -20px;
  #proportion4 {
    height: 200px;
    width: 290px;
    margin: 0 auto;
  }
  ul {
    position: relative;
    margin-top: -20px;
    padding-left: 10px;
    li {
      margin-bottom: 5px;
      font-size: 16px;
      font-weight: 600;
      letter-spacing: 2px;
      border-bottom: 2px solid #e6e7ea;
      b {
      }
      span {
        color: #ff9800;
      }
    }
  }
}
</style>
