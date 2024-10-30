<template>
  <div class="property2">
    <div id="property3" class="box"></div>
  </div>
</template>
<script>
//资产布局
export default {
  data() {
    return {
      dataList: [
        {
          value: 50,
          name: "股票",
        },
        {
          value: 20,
          name: "债券",
        },
        {
          value: 70,
          name: "实业",
        },
        ,
        {
          value: 10,
          name: "现金",
        },
      ],
      //数据内部
      dataList1: [
        {
          value: 50,
          name: "20",
        },
        {
          value: 20,
          name: "20",
          itemStyle: {
            normal: {
              color: "green",
            },
          },
        },
        {
          value: 70,
          name: "70",
        },
        ,
        {
          value: 10,
          name: "10",
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
      var that = this;
      var all_num = 0;
      that.dataList1.forEach((item) => {
        all_num = all_num + item.value;
      });
      that.dataList1.forEach((item) => {
        item.name = parseInt((parseInt(item.name) * 100) / all_num) + "%";
      });
      let myChart = echarts.init(document.getElementById("property3"));
      var option;
      option = {
        grid: {
          x: 0,
          x2: 0,
          y: 60,
          y2: 0,
          top: "20%",
        },
        title: [
          {
            text: "目前投资类型比例",
            left: 80,
            top: 10,
          },
        ],
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
        series: [
          {
            grid: {
              x: 0,
              x2: 0,
              y: 10,
              y2: 0,
            },
            name: "目前仓位",
            type: "pie",
            selectedMode: "single",
            radius: [0, "60%"],
            label: {
              position: "inner",
              fontSize: 14,
            },
            center: ["50%", "60%"],
            labelLine: {
              show: false,
            },
            data: that.dataList1,
          },
          {
            center: ["50%", "60%"],
            grid: {
              x: 0,
              x2: 0,
              y: 0,
              y2: 0,
            },
            name: "目前仓位",
            type: "pie",
            radius: ["60%", "60%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 2,
              borderColor: "#fff",
              borderWidth: 4,
            },
            label: {
              fontSize: 16,
              // formatter: function (a) {
              //   // console.log(a);
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
            data: that.dataList,
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
.property2 {
  margin-left: 20px;
  #property3 {
    height: 220px;
    width: 340px;
  }
}
</style>
