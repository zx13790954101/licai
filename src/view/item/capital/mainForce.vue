<template>
  <div class="mainForce">
    <header class="flex-c">
      <span class="flex-item">主力资金 <b>单位为 亿</b> </span>
      <span>
        <button @click="dialogVisible3 = true">更多</button>
      </span>
    </header>
    <div id="mainForce" class="mainForce_box"></div>
    <el-dialog
      title="参考更多数据列表"
      :visible.sync="dialogVisible3"
      width="55%"
      :before-close="handleClose"
      class="dialog3"
    >
      <div class="main">
        <a href="https://data.eastmoney.com/zjlx/dpzjlx.html">
          东方财富的数据中心-大盘资金流向历史数据(沪深两市)
        </a>
      </div>
    </el-dialog>
  </div>
</template>
<script>
//https://data.eastmoney.com/zjlx/dpzjlx.html
//主力数据来源，
export default {
  data() {
    return {
      dialogVisible3: false,
      date_list: [],
      buying_data: [],
      df_data: [],
    };
  },
  created() {
    this.getData();
  },
  components: {},
  mounted() {
    this.$nextTick(() => {
      this.getData();
    });
  },
  methods: {
    handleClose() {
      this.dialogVisible3 = false;
    },
    getData() {
      var url1 =
        "https://push2his.eastmoney.com/api/qt/stock/fflow/daykline/get?lmt=0&klt=101&fields1=f1%2Cf2%2Cf3%2Cf7&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61%2Cf62%2Cf63%2Cf64%2Cf65&ut=b2884a393a59ad64002292a3e90d46a5&secid=1.000001&secid2=0.399001&_=1652341456899";
      var that = this;
      this.$axios.get(url1).then((res) => {
        var list = res.data.data.klines;
        //时间
        var date_list = [];
        //主力买入量
        var buying_data = [];
        //主力买入量
        var df_data = [];
        list.forEach((item, index) => {
          const item1 = item.split(",");
          date_list.push(item1[0]);
          buying_data.push(item1[1] / 100000000);
          df_data.push(item1[6]);
        });
        this.date_list = date_list;
        this.buying_data = buying_data;
        this.df_data = df_data;
        this.$nextTick(() => {
          this.init1();
        });
      });
    },
    init1() {
      var chartDom = document.getElementById("mainForce");
      var myChart = echarts.init(chartDom);
      var option = {
        dataZoom: [
          {
            show: true,
            start: 100,
            end: 80,
          },
        ],
        color: ["#cc0000", "#61a0a8"],
        // title: {
        //   text: "主力资金",
        //   left: "left",
        // },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.date_list,
        },
        // grid: {
        //   x: 0,
        //   x1: 0,
        //   y: 0,
        //   y1:0
        // },
        // grid: {
        //   left: '0%',
        //   right: '0%',
        //   bottom: '0%',
        //   containLabel: true
        // },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "主力资金",
            type: "line",
            data: this.buying_data,
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
header {
  width: 100%;
  padding: 0px 10px;
  span {
    font-size: 16px;
    font-weight: 600;
    b {
      color: red;
    }
  }
}
.main {
  background-color: #565656;
  padding: 20px;
}
.mainForce_box {
  width: 500px;
  height: 320px;
}
</style>
