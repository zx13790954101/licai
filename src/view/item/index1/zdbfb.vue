<template>
  <div class="zdbfb">
    <header v-if="data_list != null">
      涨跌分布
      <span
        class="f-w-b"
        :style="{
          color: data_list.up_down_dis.average_rise > 0 ? '#e94041' : '#05a687',
        }"
      >
        （涨跌中位数：
        {{
          (parseFloat(data_list.up_down_dis.average_rise) * 100).toFixed(2)
        }}%)
      </span>
    </header>
    <div id="zdbfb" class="box"></div>
    <footer class="flex-c" v-if="data_list != null">
      <div class="item flex-c">
        上涨
        <span style="color: #de0422">{{ data_list.up_down_dis.rise_num }} </span
        >家
      </div>
      <div class="item flex-c">
        平盘
        <span style="color: #666"> {{ data_list.up_down_dis.flat_num }}</span
        >家
      </div>
      <div class="item flex-c">
        停牌
        <span style="color: #666">{{ data_list.up_down_dis.suspend_num }} </span
        >家
      </div>
      <div class="item flex-c">
        下跌
        <span style="color: #52c2a3"> {{ data_list.up_down_dis.fall_num }}</span
        >家
      </div>
      <div class="item flex-c">
        市场活跃度
        <span style="color: #de0422"> {{ active_num }}%</span>
      </div>
    </footer>

    <footer class="flex-c footer2" v-if="data_list != null">
      <div
        class="item flex-c"
        v-for="(item, index) in data_list.index_quote"
        :key="index"
      >
        {{ item.secu_name }}
        <span
          style="color: #de0422"
          :style="{
            color: item.change > 0 ? 'rgb(222, 4, 34)' : 'rgb(82, 194, 163)',
          }"
        >
          {{ item.last_px.toFixed(2) }}
          {{ (parseFloat(item.change) * 100).toFixed(2) }}%
        </span>
      </div>
    </footer>
  </div>
</template>
<script>
//https://www.cls.cn/quotation
//数据取财联社
export default {
  data() {
    return {
      data_list: null,
      active_num: 0,
    };
  },
  components: {},
  created() {
    this.getData();
  },
  mounted() {},
  methods: {
    //获取财联社的看盘消息
    getData() {
      var that = this;
      this.$axios
        .get(
          "https://x-quote.cls.cn/quote/index/home?app=CailianpressWeb&os=web&sv=7.7.5"
        )
        .then((res) => {
          that.data_list = res.data.data;
          that.active_num = parseInt(
            (that.data_list.up_down_dis.rise_num /
              (that.data_list.up_down_dis.rise_num +
                that.data_list.up_down_dis.flat_num +
                that.data_list.up_down_dis.suspend_num +
                that.data_list.up_down_dis.fall_num)) *
              100
          );
          that.$nextTick(() => {
            // that.init1();
          });
        });
    },
    init1() {
      var obj1 = this.data_list.up_down_dis;
      let myChart = echarts.init(document.getElementById("zdbfb"));

      var data_y = [
        obj1.up_num,
        obj1.up_10,
        obj1.up_8,
        obj1.up_6,
        obj1.up_4,
        obj1.up_2,
        obj1.flat_num,
        obj1.down_2,
        obj1.down_4,
        obj1.down_6,
        obj1.down_8,
        obj1.down_10,
        obj1.down_num,
      ];
      var data_x = [
        "涨停",
        "+10%",
        "+8%",
        "+6%",
        "+4%",
        "+2%",
        "+0%",
        "-2%",
        "-4%",
        "-6%",
        "-8%",
        "-10%",
        "跌停",
      ];
      var option;

      option = {
        grid: {
          x: 40,
          x1: 0,
          y: 20,
          y1: 0,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              show: false,
            },
            data: data_x,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            type: "bar",
            barGap: 0,
            emphasis: {
              focus: "series",
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  let ty = params.value;
                  if (params.dataIndex < 6) {
                    return "#de0422";
                  } else if (params.dataIndex == 6) {
                    return "#e6e6e6";
                  } else {
                    return "#52c2a3";
                  }
                },
                label: {
                  show: true,
                  position: "top",
                },
              },
            },
            data: data_y,
          },
        ],
      };
      option && myChart.setOption(option);
    },
  },
};
</script>
<style scoped lang="scss">
.zdbfb {
  #zdbfb {
    // height: 200px;
    // width: 600px;
  }

  header {
    font-weight: 600;
    margin: 15px 0px;
    font-size: 16px;
    letter-spacing: 1px;
    span {
      color: #de0422;
    }
  }

  footer {
    position: relative;
    // margin-top: -30px;
    width: 100%;

    div {
      justify-content: center;
      justify-items: center;
      align-items: center;
      align-content: center;
      background-color: #f4f5fa;
      padding: 5px 0px;
      margin-right: 5px;
      font-weight: 600;
      border-radius: 3px;
      text-align: center;
      flex: 1;
      font-size: 14px;

      span {
        margin-left: 5px;
      }
    }

    div:nth-of-type(5) {
      margin-right: 0px;
    }
  }
  .footer2 {
    word-break: break-all;
    flex-wrap: wrap;
    div {
      width: 32.1%;
      flex: none;
      margin-top: 10px;
      margin-right: 10px;
    }
    div:nth-of-type(6) {
      margin-right: 0px;
    }
    div:nth-of-type(3) {
      margin-right: 0px;
    }
    div:nth-of-type(5) {
      margin-right: 10px;
    }
  }
}
</style>
