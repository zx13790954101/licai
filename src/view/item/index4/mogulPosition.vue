<template>
  <div class="mogulPosition">
    <!-- <nav class="flex-c">
      <span class="flex-item">
        {{ title }}
      </span>
      <button @click="openWin()">查看数据来源</button>
    </nav> -->
    <div :id="'mogulPosition' + name" class="mogul_box"></div>
  </div>
</template>
<script>
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
    listData: Array,
    listData1: Array,
    title: String,
    link: String,
    title1: String,
    title2: String,
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
      window.open(this.link);
    },
    init1() {
      var that = this;
      var chartDom = document.getElementById("mogulPosition" + this.name);
      var myChart = echarts.init(chartDom);

      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // Use axis to trigger tooltip
            type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
          },
        },
        grid: {
          // left: "3%",
          // right: "4%",
          // bottom: "3%",
          x: 0,
          x1: 0,
          y: 0,
          y1: 0,
          containLabel: true,
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        },
        series: [
          {
            name: "Direct",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [320, 302, 301, 334, 390],
          },
          {
            name: "Mail Ad",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90],
          },
          {
            name: "Affiliate Ad",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [220, 182, 191, 234, 290],
          },
          {
            name: "Video Ad",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [150, 212, 201, 154, 190],
          },
          {
            name: "Search Engine",
            type: "bar",
            stack: "total",
            label: {
              show: true,
            },
            emphasis: {
              focus: "series",
            },
            data: [820, 832, 901, 934, 1290],
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
.mogulPosition {
  nav {
    background-color: #555;
    padding: 10px;
    color: white;
    font-size: 16px;
    font-weight: 600;
    button {
      background-color: #f5deb300;
      color: white;
      font-size: 14px;
      border: 0px;
      padding: 2px;
      border-radius: 2px;
      border-bottom: 1px solid white;
    }
  }
  .mogul_box {
    width: 350px;
    height: 200px;
  }
}
</style>
