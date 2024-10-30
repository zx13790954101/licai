<template>
  <div class="head_nav">
    <div class="tab-nav">
      <p>
        补充这个月的和这个星期的涨跌幅是多少，按照百分比来计算，数据取中证指数。这样子可以对比出那个版块
      </p>
      <el-row>
        <el-button
          @click="toBtn1(item.num)"
          type="primary"
          plain
          size="medium"
          v-for="(item, index) in btn_array"
          :key="index"
          :class="input_name1 == item.num ? 'active' : ''"
        >
          {{ item.name }}({{ item.tip }}){{ item.num }}
        </el-button>
      </el-row>
      <nav class="flex-c">
        <div class="bar flex-c">
          <div class="flex-c">
            <el-input
              v-model="input_name1"
              placeholder="请输入权重股"
              size="medium"
            ></el-input>
            <!-- <el-input
            v-model="input_name2"
            placeholder="请输入龙头"
            size="medium"
          ></el-input>
          <el-input
            v-model="input_name3"
            placeholder="请输入板块"
            size="medium"
          ></el-input> -->
            <!-- <el-input
            v-model="input_name4"
            placeholder="请输入个股"
            size="medium"
          ></el-input> -->
            <span class="ge"></span>
            <el-input
              v-model="input_name6"
              placeholder="请输入截止日期"
              size="medium"
            ></el-input>
            <span class="ge"></span>
            <el-input
              v-model="input_name7"
              placeholder="请输入买入日期"
              size="medium"
            ></el-input>
            <span class="ge"></span>
            <el-button @click="toBtn(1)" size="medium" round
              >确定提交
            </el-button>
          </div>

          <div>
            <el-input
              class="active_input"
              v-model="input_name5"
              placeholder="请输入关键事件日期"
              size="medium"
            ></el-input>
            <span class="ge"></span>
            <el-button @click="toBtn(2)" size="medium" round
              >确定提交
            </el-button>
          </div>
        </div>
      </nav>
    </div>

    <section class="box flex-c box_color">
      <div class="main flex-item item_box2">
        <h3>当前价格:</h3>
        <p
          v-for="(item, index) in testtext2"
          :key="index"
          :class="item.active ? 'active' : ''"
        >
          {{ item.name }}: <span>{{ item.num }}</span>

          <span
            :class="
              item.num - testtext2[calculate_array_active].num > 0
                ? 'active1'
                : 'active2'
            "
          >
            {{
              item.active
                ? ""
                : (
                    ((item.num - testtext2[calculate_array_active].num) /
                      testtext2[calculate_array_active].num) *
                    100
                  ).toFixed(2) + "%"
            }}
          </span>
        </p>
      </div>
      <div class="main2 flex-item item_box2">
        <h3>持有价格:</h3>
        <p v-for="(item, index) in position_array" :key="index">
          {{ item.name }}
          <span>
            {{ item.num }}
          </span>
          <span :class="item.type != '卖出' ? 'active1' : 'active2'">
            {{ item.type }}
          </span>
        </p>
      </div>

      <div class="main flex-item item_box2">
        <h3>新闻分析:</h3>
        <p
          v-for="(item, index) in testtext3"
          :key="index"
          :class="item.active ? 'active' : ''"
        >
          {{ item.name }}: <span>{{ item.num }}%</span>
        </p>
        <h4>
          <a
            :href="'http://stockpage.10jqka.com.cn/' + input_name1 + '/news/'"
            target="_blank"
          >
            同花顺信息中心2
          </a>
        </h4>
        <h4>
          <a
            :href="'https://xueqiu.com/k?q=' + this_name + '#/timeline'"
            target="_blank"
          >
            雪球社区
          </a>
        </h4>
        <h4>
          <a
            :href="'http://guba.eastmoney.com/list,' + input_name1 + '.html'"
            target="_blank"
          >
            东方财富的股吧
          </a>
        </h4>
        <h4>
          <a
            :href="
              'https://www.cls.cn/searchPage?keyword=' +
              this_name +
              '&type=telegram'
            "
            target="_blank"
          >
            财联社
          </a>
        </h4>
      </div>
    </section>
  </div>
</template>
<script>
import { dealData, btn_array2 } from "./getUrl";
export default {
  data() {
    return {
      // 设置页面机构
      // viewType: false,
      // array_all: [],
      // main_datalist_table: [],
      datalist_table: [],
      // datalist_table2: [],
      btn_array: [],
      // flag: false,
      input_name1: "",
      input_name2: "",
      input_name3: "",
      input_name4: "",
      input_name6: "",
      //买入点
      input_name5: "",
      //买入时间
      input_name7: "",
      // data_list: [],

      num1: 200,
      // dataList: [],
      this_name: "",

      // start_time: null,
      // end_time: null,
      testtext1: "",
      testtext2: [],
      testtext3: "",
      testtext4: "",
      testarray: null,
      testarray2: null,
      testtime: null,
      testtime2: null,
      testarray3: null,
      testarray4: null,
      testarray5: null,
      array1: "",
      // calculateStopLoss1: null,

      ths_comtent: null,
      // ths_comtent1: null,
      // zlkp_time: [],
      // zlkp_markLine: [],
      // markPoint3: [],
      // zlkp_list: [],
      // main_markline: [],
      calculate_array_active: 0,
      //位置数组，判断是不是跌破支撑位
      position_array: [],
    };
  },
  props: {
    //选择的代码号
    select_input: String,
    parent_testtext2: Array,
  },
  components: {},
  created() {
    this.input_name1 = "603259";
    this.btn_array = btn_array2;
  },
  mounted() {},
  methods: {
    toBtn1(num) {
      this.input_name1 = num;
    },
    //box数据
    boxData(this_num, calculateStopLoss, pressure) {
      let that = this;
      let zsw = parseFloat(calculateStopLoss.max_data_array * 0.95).toFixed(2);
      let zsw1 = parseFloat(calculateStopLoss.max_data_array * 0.925).toFixed(
        2
      );

      let zsw2 = parseFloat(calculateStopLoss.max_data_array * 0.9).toFixed(2);

      let zcw = parseFloat(
        (calculateStopLoss.max_data_array - calculateStopLoss.min_data_array) *
          0.618 +
          parseFloat(calculateStopLoss.min_data_array)
      ).toFixed(2);

      //获取买入日期
      if (that.input_name7 != "") {
        that.input_name5 =
          calculateStopLoss.this_data_num[
            calculateStopLoss.this_data.indexOf(that.input_name7)
          ];
      }
      // this.testtext3 = [
      //   {
      //     name: "当前收益",
      //     num: (
      //       ((this_num - that.input_name5) / that.input_name5) *
      //       100
      //     ).toFixed(2),
      //   },
      //   {
      //     name: "买入价到压力位的涨跌幅",
      //     num: (
      //       ((pressure.pressure - that.input_name5) / that.input_name5) *
      //       100
      //     ).toFixed(2),
      //   },
      //   {
      //     name: "买入价到支撑位的涨跌幅",
      //     num: (
      //       ((pressure.support - that.input_name5) / that.input_name5) *
      //       100
      //     ).toFixed(2),
      //   },
      // ];

      // this.testtext4 = [{
      //   name: "当前股价",
      //   num: this.input_name5,
      // }, ];
      let max_num1 = Math.max(...calculateStopLoss.max_data_num.slice(-30));
      let min_num1 = Math.min(...calculateStopLoss.min_data_num.slice(-30));
      let zcw3 = (max_num1 - min_num1) * 0.618 + min_num1;

      //设置

      let zcw_array_num = calculateStopLoss.deal_data2.zcw_array.slice(-1);
      zcw_array_num = parseFloat(zcw_array_num[0]);
      let zcw_type =
        calculateStopLoss.this_data_num[
          calculateStopLoss.this_data_num.length - 1
        ] -
          zcw_array_num >
        0
          ? "值得持有"
          : "卖出";
      console.log("aa", zcw_array_num);
      this.position_array = [
        {
          name: "支撑位是不是被突破",
          type: zcw_type,
          num: zcw_array_num,
        },
      ];

      this.testtext2 = [
        // {
        //   name: "最大值平均值",
        //   num: calculateStopLoss.max_data_array,
        // },
        // {
        //   name: "20个工作日最小值平均值",
        //   num: calculateStopLoss.min_data_array,
        // },
        // {
        //   name: "收盘价平均值",
        //   num: calculateStopLoss.this_data_array,
        // },
        // {
        //   name: "ma5",
        //   num: calculateStopLoss.ma5[calculateStopLoss.ma5.length - 1],
        // },
        // {
        //   name: "ma10",
        //   num: calculateStopLoss.ma10[calculateStopLoss.ma10.length - 1],
        // },
        // {
        //   name: "ma20",
        //   num: calculateStopLoss.ma20[calculateStopLoss.ma20.length - 1],
        // },s
        // {
        //   name: "ma30",
        //   num: calculateStopLoss.ma30[calculateStopLoss.ma30.length - 1],
        // },
        // {
        //   name: "ma60",
        //   num: calculateStopLoss.ma60[calculateStopLoss.ma60.length - 1],
        // },
        // {
        //   name: "止损位(获利在15%以下)",
        //   num: zsw,
        // },
        // {
        //   name: "止损位(获利在15%-25%)",
        //   num: zsw1,
        // },
        // {
        //   name: "止损位(获利在25%以上)",
        //   num: zsw2,
        // },
        // {
        //   name: "支撑位",
        //   num: zcw,
        // },
        {
          name: "当前价",
          num: calculateStopLoss.this_data_num[
            calculateStopLoss.this_data_num.length - 1
          ],
          active: "active1",
        },
        {
          name: "近30日最高价",
          num: max_num1,
        },
        {
          name: "近30日最低价",
          num: min_num1,
        },
        // {
        //   name: "近30日支撑位",
        //   num: zcw3.toFixed(2),
        // },
      ];

      this.testtext2 = this.testtext2
        .sort(function (a, b) {
          return a.num - b.num;
        })
        .reverse();
      this.main_markline = this.testtext2;
      this.testtext2.forEach((element, index) => {
        if (element.active) {
          that.calculate_array_active = index;
        }
      });

      console.log("  this.testtext2", this.testtext2);
    },
    //列表数据
    tableList(array7, array_end) {
      let that = this;
      //周
      let test1_num1 = -10;
      that.testarray = dealData(array7, 2, "涨跌幅", 8).num.slice(test1_num1);
      that.testarray3 = dealData(array7, 2, "震幅", 7).num.slice(test1_num1);
      that.testtime = dealData(array7, 2, "涨跌幅时间", 8).time.slice(
        test1_num1
      );
      that.testtime2 = dealData(array_end, 2, "涨跌幅时间", 8).time.slice(
        test1_num1
      );
      that.testarray2 = dealData(array_end, 2, "涨跌幅", 8).num.slice(
        test1_num1
      );
      that.testarray4 = dealData(array_end, 2, "震幅", 7).num.slice(test1_num1);
      that.array1 = [
        "最大涨幅",
        "最大跌幅",
        "平均涨跌幅",

        Math.max(...that.testarray),
        Math.min(...that.testarray),
        (
          that.testarray.reduce(function (num1, num2) {
            return parseFloat(num1) + parseFloat(num2);
          }) / parseInt(test1_num1)
        ).toFixed(2),
        Math.max(...that.testarray3),
        Math.min(...that.testarray3),
        (
          that.testarray3.reduce(function (num1, num2) {
            return parseFloat(num1) + parseFloat(num2);
          }) / parseInt(test1_num1)
        ).toFixed(2),
        Math.max(...that.testarray2),
        Math.min(...that.testarray2),
        (
          that.testarray2.reduce(function (num1, num2) {
            return parseFloat(num1) + parseFloat(num2);
          }) / parseInt(test1_num1)
        ).toFixed(2),
        Math.max(...that.testarray4),
        Math.min(...that.testarray4),
        (
          that.testarray4.reduce(function (num1, num2) {
            return parseFloat(num1) + parseFloat(num2);
          }) / parseInt(test1_num1)
        ).toFixed(2),
      ];
    },
    defaultNum(url) {
      if (url.indexOf("002")) {
      } else if (url.indexOf("002")) {
      }
    },
  },
};
</script>
<style scoped lang="scss">
.tab-nav {
  padding: 20px 20px 0px 20px;
  background-color: #ffffff;

  .active {
    background-color: #ff5722;
    color: white;
    border-color: #ff5722;
  }
}

header {
  background-color: #444444;
  padding: 10px 20px;
}

.head1 {
  color: white;

  span {
    font-weight: 600;
    font-size: 28px;
    letter-spacing: 2px;
  }
}

.head_nav {
  background-color: #444444;
  padding: 20px 30px;

  .active1 {
    color: #ff3d00;
    font-size: 14px;
    font-weight: 600;
  }

  .active2 {
    color: green;
    font-size: 14px;
    font-weight: 600;
  }

  .iframe-box {
    iframe {
      height: 100vh;
    }
  }

  .box {
    //  margin: 20px 0px;

    // border-left: 1px solid;
    // border-bottom: 1px solid;
    ul {
      display: flex;
      margin: 0px 0px 0px 0px;
      border-left: 1px solid #a7a7a7;
      border-bottom: 1px solid #a7a7a7;

      li {
        width: 100px;
        flex: 1;
        padding: 5px;
        border-right: 1px solid #a7a7a7;
        border-top: 1px solid #a7a7a7;
        font-size: 16px;
        text-align: center;
        color: #d9d9d9;
      }
    }
  }

  .bar > div {
    margin-right: 10px;
    // width: 100%;
    display: flex;
    .active_input {
    }
    .flex-item {
      word-wrap: normal;
      display: flex;
    }
  }
  .bar {
    width: 100%;
    justify-content: space-between;
    .flex-c {
      background-color: #444444;
      padding: 5px;
      justify-content: space-evenly;
    }
    .ge {
      width: 40px;
    }
  }
  .box_color {
    background-color: black;
    color: white;
    padding: 20px;
    background-color: #607d8b;
    border: 20px solid;

    P {
      border-color: white;
      letter-spacing: 1px;
      padding: 5px 10px;
      background-color: white;
      margin-bottom: 0px;
      color: #333333;
    }

    .active {
      border-color: #ff9800;
      border-width: 4px;
      color: white;
      background-color: #ff3d00;
    }

    span {
      font-size: 14px;
    }

    .active1 {
      float: right;
      color: red;
    }

    .active2 {
      float: right;
      color: green;
    }
  }

  .main1 {
  }

  nav {
    margin-top: 20px;
  }

  p {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 10px;
    border: 1px solid black;
    padding: 5px;
  }

  .box {
    align-items: baseline;

    ul {
      .act2 {
        color: green;
        font-weight: 600;
      }

      .act1 {
        color: red;
        font-weight: 600;
      }
    }

    .item_box2 {
      width: 33.33%;
      padding-right: 40px;

      h3 {
        font-size: 18px;
      }

      h4 {
        background-color: white;
        padding: 5px 10px;

        a {
          font-size: 16px;
          color: #333333;
        }
      }
    }
  }

  b {
    font-size: 16px;
  }

  .array-list {
    padding: 10px 20px 20px 20px;
    background-color: white;
    margin-bottom: 20px;

    span {
      a {
        font-size: 18px;
      }
    }
  }
}
</style>
