<template>
  <div class="calculateStopLoss">
    <div class="main flex-c item_box3">
      <h4>分享咨询网站:</h4>
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

    <section class="box flex-c box_color">
      <div class="main flex-item item_box2">
        <h3>最高值和最低值的百分比:</h3>
        <div class="flex flex1">
          <div class="flex-item">
            <div
              v-for="(item, index) in testtext2"
              :key="index"
              class="p flex-c"
              :class="item.active ? 'active' : ''"
            >
              <div class="flex-item">
                {{ item.name }}: <span>{{ item.num }}</span>
                <div v-if="!item.active">
                  <!-- 时间:{{ item.time }}  -->
                  ( 已经过{{ item.seat }}天)
                </div>
              </div>
              <span :class="item.num - active_num < 0 ? 'active1' : 'active2'">
                {{
                  item.active
                    ? ""
                    : (((item.num - active_num) / active_num) * 100).toFixed(
                        2
                      ) + "%"
                }}
              </span>
            </div>
          </div>
          <div class="item_box3 flex-item" style="width: 100px; flex: none">
            <div
              v-for="(item, index) in testtext2"
              :key="index"
              class="flex-c"
              :class="dealTest(item, null, 3)"
              :style="{
                height: dealTest(item, testtext2, 2),
              }"
            >
              <div
                class="item-box"
                :style="{ position: item.active ? 'absolute' : '' }"
              >
                <span
                  :class="item.num - active_num > 0 ? 'active3' : 'active4'"
                >
                  {{ dealTest(item, testtext2, 1, index) }}
                </span>
              </div>
            </div>
          </div>
          <div class="box4">
            <p>
              {{ dealNumText(this_active_num) }}
            </p>
          </div>
        </div>
      </div>
      <div class="main2 flex-item item_box2">
        <h3>支撑位和止损位的状态:</h3>
        <p
          v-for="(item, index) in position_array"
          :key="index"
          :class="item.active ? 'active' : ''"
        >
          {{ item.name }}
          <span
            :class="item.number < 0 ? 'active1' : 'active2'"
            v-if="!item.active"
          >
            距离 ({{ item.number }})%
          </span>
          <span> {{ item.num }} </span>

          <span
            :class="this_num_data - item.num > 0 ? 'active1' : 'active2'"
            :style="{
              color: item.type.indexOf('上升') == -1 ? '#4caf50' : 'red',
            }"
          >
            {{ item.type }}
          </span>
        </p>
      </div>

      <!-- <div class="flex-item" v-if="period_array.length > 0">
        <h3 class="text4">{{ text3 }}</h3>
        <p
          style="opacity: 0.9"
          v-for="(item, index) in period_array"
          :key="index"
          class="flex-c"
          :class="item.active ? 'active' : ''"
        >
          <span>
            {{ item.name }}
          </span>
          {{ item.num.start_time + "至:" + item.num.end_time }}
          <span class="flex-item text-active" style="text-align: right">
            {{ "周期:" + item.num.period }}天
          </span>
        </p>
      </div> -->
    </section>
  </div>
</template>
<script>
import {
  initMaxMin30,
  deal30Loss,
  dealSeatType,
} from "../js/dealCalculateStopLoss.js";
export default {
  data() {
    return {
      testtext2: [],
      position_array: [],
      calculate_array_active: 0,
      //当前数值
      this_num_data: 0,
      active_num: 0,
      period_array: [],
      this_active_num: null,
      text3: "",
    };
  },
  created() {
    this.initData();
  },
  props: {
    input_name1: {
      type: String,
      default: true,
    },
    this_name: {
      type: String,
      default: true,
    },
    //初始化数据
    calculateStopLossData: {
      type: Object,
      default: true,
    },
  },
  computed: {
    dealTest: function () {
      return function (item, testtext2, type, index) {
        if (type == 1) {
          if (index == 0) {
            this.this_active_num = (
              ((item.num - this.active_num) /
                (testtext2[0].num - testtext2[2].num)) *
              100
            ).toFixed(1);
          }
          return item.active
            ? ""
            : (
                ((item.num - this.active_num) /
                  (testtext2[0].num - testtext2[2].num)) *
                100
              ).toFixed(1) + "%";
        } else if (type == 2) {
          return item.active
            ? ""
            : Math.abs(
                (
                  ((item.num - this.active_num) /
                    (testtext2[0].num - testtext2[2].num)) *
                  100
                ).toFixed(2)
              ) + "%";
        } else if (type == 3) {
          return item.active
            ? "active"
            : item.num - this.active_num > 0
            ? "active11"
            : "active22";
        }
      };
    },
    dealNumText: function () {
      // return function (value) {
      //   if (value < 5) {
      //     return "减仓一层";
      //   } else if (value < 20) {
      //     return "持有";
      //   } else if (value < 50) {
      //     return "持有";
      //   } else {
      //     return "注意";
      //   }
      // };

      return function (value) {
        console.log("value", value);
        if (value > 97) {
          return "需要观查一天再进去";
        } else {
          return "无提示";
        }
      };
    },
  },
  components: {},
  mounted() {},
  watch: {},
  methods: {
    //初始化数据
    initData() {
      let that = this;
      let calculateStopLoss = this.calculateStopLossData;
      
      console.log("calculateStopLoss",calculateStopLoss)
      
      calculateStopLoss = JSON.parse(JSON.stringify(calculateStopLoss));
      this.position_array = dealSeatType(calculateStopLoss);
      this.testtext2 = deal30Loss(calculateStopLoss);
      this.testtext2.forEach((element, index) => {
        if (element.active) {
          that.calculate_array_active = index;
        }
      });
      this.active_num = this.testtext2[this.calculate_array_active].num;

      let init_data2 = initMaxMin30(calculateStopLoss).period_30_data2;

      if (this.position_array[0].type == "上升趋势") {
        this.text3 = "周期在最大值放假就要跑";
      } else {
        this.text3 = "下跌周期要大于最大值";
      }
      this.period_array = init_data2;
    },
  },
};
</script>
<style scoped lang="scss">
.flex1 {
  height: 220px;
  position: relative;
}
.box_color {
  background-color: black;
  color: white;
  padding: 10px 20px;
  background-color: #444444;
  border: 0px solid;
  border-bottom-width: 0px;
  border-top-width: 0px;
  align-items: baseline;
  p,
  .p {
    border-color: white;
    letter-spacing: 1px;
    padding: 10px 10px;
    background-color: white;
    margin-bottom: 0px;
    color: #333333;
    font-weight: 600;
    font-size: 14px;
    // height: 100%;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // background-color: #ffc4b2;
  }

  .item-box {
    margin: 0 auto;
    text-align: center;
    line-height: 18px;
  }
  .active {
    border-color: #000000;
    border: 4px solid #e73d07;
    color: #333333;
    background-color: #ff9800;
    position: relative;
    padding: 10px 5px;
    border: 4px dashed #ff0202;
    background-color: #ffc4b2;
    font-size: 20px;
    span {
      font-size: 20px;
    }
    .item-box {
      left: 50%;
      transform: translateX(-50%);
    }
    h5 {
      color: #333333;
    }
  }

  span {
    font-size: 14px;
  }
  .active3 {
    font-size: 20px;
    font-weight: 600;
  }
  .active1 {
    float: right;
    color: red;
  }
  .active4 {
    font-size: 20px;
    font-weight: 600;
  }
  .active2 {
    float: right;
    color: green;
  }
}
h5 {
  color: white;
}
.item_box2 {
  width: 33.33%;
  padding-right: 20px;

  h3 {
    font-size: 14px;
    margin-bottom: 0px;
  }

  h4 {
    background-color: #ff9800;
    padding: 0px 20px;
    font-size: 14px;
    a {
      font-size: 12px;
      color: #333333;
    }
  }
}
.item_box3 {
  width: 100%;
  border-top: 1px solid;
  border-left: 1px solid;
  border-right: 1px solid;
  border-bottom: 1px solid;
  box-sizing: content-box;
  overflow: hidden;
}
.text4 {
  font-size: 20px;
  background-color: white;
  color: red;
  padding: 10px;
}
.box4 {
  position: absolute;
  z-index: 2;
  left: 0px;
  width: 100%;
  height: 100%;
  p {
    height: 100%;
    display: flex;
    justify-items: flex-start;
    align-items: center;
    background-color: #00000063;
    color: white;
    font-weight: 600;
    font-size: 24px;
    justify-content: flex-end;
    width: 100%;
  }
}
.active11 {
  background-color: red;
  color: #ffffff;
}

.active22 {
  background-color: #4caf50;
  color: #ffffff;
}
.active3 {
  font-size: 20px;
  font-weight: 600;
}
span.text-active {
  color: red;

  font-size: 24px !important;
}
.item_box3 {
  .flex-c {
    padding: 0px 10px;
  }
  .active {
  }
  h4 {
    background-color: white;
    padding: 5px 10px;
    border-right: 1px double #333333;
    a {
      font-size: 12px;
      color: #333333;
    }
  }
}
</style>
