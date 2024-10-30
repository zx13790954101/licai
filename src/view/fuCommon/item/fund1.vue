<template>
  <div class="fund1">
    <calculateHistogram
      v-if="fund1_data != null"
      :props_dataList="fund1_data"
      :input_name1="input_name1"
      :this_name="this_name"
      :class_name="'_fund1'"
    >
    </calculateHistogram>

    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-link
            type="danger"
            href="http://www.minishuju.com/stocks/601318/pe/"
          >中国平安(sh601318) 近1000交易日静态PE数据
          </el-link>
        </el-col>
        <el-col :span="8">
          <el-link
            type="danger"
            href="https://www.yuncaijing.com/quote/sh601318_hmoney.html"
          >历史资金数据</el-link>
        </el-col>
        <el-col :span="8">
          <el-link
            type="danger"
            href="http://vip.stock.finance.sina.com.cn/moneyflow/#!ssfx!sh601318"
          >资金流向
          </el-link>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
// import { initMaxMin30 } from "../js/dealCalculateStopLoss.js";
import calculateHistogram from "../common/calculateHistogram.vue"

export default {
  data () {
    return {
      data_list: [],
      markLine: [],
      markPoint2: [],
      title4: "",
      num1: 361,
      areaStyle1: [],
    }
  },
  created () { },
  props: {
    calculateStopLoss1: {
      type: Object,
    },
    this_name: {
      type: String,
      default: null,
    },
    //  初始化数据
    input_name1: {
      type: String,
      default: null,
    },
    dataList: {
      type: Array,
    },
    testtext2: {
      type: Array,
    },
    calculate_array_active: {
      type: Number,
    },
    fund1_data: {
      type: Object,
      default: null,
    },
  },
  components: {
    calculateHistogram,
  },
  mounted () {
    console.log("input_name1", this.input_name1)
    console.log("this_name", this.this_name)
    //初始化指针
    // let initMax_data = initMaxMin30(
    //   JSON.parse(JSON.stringify(this.calculateStopLoss1))
    // );
    // let average = [];
    // let average_item = 0;
    // initMax_data.period_30_max_num_level.num.forEach((element, index) => {
    //   average_item = element.period + average_item;
    //   average.push(element.period);
    // });
    // let average_num =
    //   average_item / initMax_data.period_30_max_num_level.num.length;
    // let max_num = Math.max(...average);
    // console.log("平均周期值", average_num);
    // console.log("最大周期值", max_num);
  },
  watch: {},
  methods: {},
};
</script>
<style scoped lang="scss">
.item_box2 {
  padding: 0px 20px 40px 20px;
  .flex-c {
    padding: 0px 10px;
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
.active11 {
  background-color: red;
  color: #ffffff;
}

.active22 {
  background-color: green;
  color: #ffffff;
}
</style>
