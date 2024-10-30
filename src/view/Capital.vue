<template>
  <div class="Capital">
    <h1>数据中心</h1>
    <div class="main">
      <szzs></szzs>

      <section class="top flex-c">
        <el-card class="box-card">
          <mainForce></mainForce>
        </el-card>
        <el-card class="box-card">
          <histogram
            v-if="listData != null"
            :name="'_bxzj'"
            :title="'北上资金'"
            :link="'https://data.eastmoney.com/hsgtcg/gzcglist.html?t2=101&t3=1'"
            :listData="listData"
            :timeData="timeData"
          ></histogram>
        </el-card>
      </section>
      <section class="bottom flex-c">
        <el-card class="box-card">
          <histogram
            v-if="listData2 != null"
            :name="'_gpzh'"
            :title="'股票账户新增'"
            :link="'https://data.eastmoney.com/cjsj/yzgptjnew.html'"
            :title1="title2"
            :title2="title2_1"
            :listData="listData2"
            :listData1="listData2_1"
            :timeData="timeData2"
          ></histogram>
        </el-card>
        <el-card class="box-card">
          <histogram
            v-if="listData1 != null"
            :name="'_rzrq'"
            :title="'融资融券数据全览'"
            :link="'https://data.eastmoney.com/rzrq/'"
            :title1="title1"
            :title2="title1_1"
            :listData="listData1"
            :listData1="listData1_1"
            :timeData="timeData1"
            value="融资余额若长期增长时表示投资者心态偏向买方,市场人气旺盛属强势市场,反之则属弱势市场。融资余额指投资者每日融资买进与归还借款间的差额的累积。一方面,余额越大,说明看好的人越多。因为融资融券都是需要成本的,有这么多的人看好才会花成本去买入。融资融券的数据的分析步骤"
          ></histogram>
        </el-card>
      </section>

      <section>
        <el-card class="box-card">
          <histogram
            v-if="listData4 != null"
            :name="'_bszjszzs'"
            :title="'北上资金和上证指数'"
            :link="'https://data.eastmoney.com/hsgtcg/gzcglist.html?t2=101&t3=1'"
            :title1="title4"
            :title2="title4_1"
            :listData="listData4"
            :listData1="listData4_1"
            :timeData="timeData4"
            :width1="'1200px'"
            :height1="'500px'"
            value=""
          ></histogram>
        </el-card>
      </section>
    </div>
  </div>
</template>
<script>
import { orchesData } from "./../assets/common.js";
import histogram from "./common/histogram.vue";
import {
  getBxzjData,
  getRzrqData,
  getGpzhData,
  getReportNameBszj,
} from "./../lib/api/dfcf.js";
export default {
  data() {
    return {
      timeData: null,
      listData: null,
      listData1: null,
      listData1_1: null,
      timeData1: null,
      title1: null,
      title1_1: null,
      listData2: null,
      listData2_1: null,
      timeData2: null,
      title2: null,
      title2_1: null,
      listData3: null,
      listData3_1: null,
      timeData3: null,
      title3: null,
      title3_1: null,
      urlList: [
        {
          url: "https://data.eastmoney.com/cjsj/yzgptjnew.html",
          title: "股票账户统计一览",
        },
      ],
      listData4: null,
      listData4_1: null,
      timeData4: null,
      title4: null,
      title4_1: null,
    };
  },
  created() {
    var that = this;

    getReportNameBszj(function (res) {
      that.title4 = "北上资金";
      that.title4_1 = "上证指数";
      that.listData4 = orchesData(res, "NETBUY").reverse();
      that.listData4_1 = orchesData(res, "INDEX_PRICE").reverse();
      that.timeData4 = orchesData(res, "TRADE_DATE", "time").reverse();
      console.log(res);
    });
    getBxzjData(function (res) {
      that.timeData = orchesData(res, "TRADE_DATE", "time").reverse();
      that.listData = orchesData(res, "NETBUY").reverse();
    });
    getRzrqData(function (res) {
      that.title1 = "融资(亿)";
      that.title1_1 = "融券(100万)";
      that.listData1 = orchesData(res, "RZJME", "num", 100000000).reverse();
      that.listData1_1 = orchesData(res, "RQJMG", "num", 1000000).reverse();
      that.timeData1 = orchesData(res, "DIM_DATE", "time").reverse();
    });
    getGpzhData(function (res) {
      that.title2 = "万户";
      that.title2_1 = "上证指数";
      that.listData2 = orchesData(res, "ADD_INVESTOR").reverse();
      that.listData2_1 = orchesData(res, "CLOSE_PRICE").reverse();
      that.timeData2 = orchesData(res, "STATISTICS_DATE", "time").reverse();
    });
  },
  mounted() {},
  components: {
    histogram,
    mainForce: () => import("./item/capital/mainForce.vue"),
    szzs: () => import("./item/capital/szzs.vue"),
  },
  methods: {},
};
</script>
<style scoped lang="scss">
.Capital {
  padding: 10px;
  min-height: 100vh;
  width: 100%;
  .main {
    background-color: #353a47;
    padding: 10px;
  }
  .box-card {
    margin-right: 20px;
    margin-bottom: 20px;
  }
}
</style>
