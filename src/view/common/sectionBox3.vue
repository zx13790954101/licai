<template>
  <div class="sectionBox3">
    <article class="bottom flex-c">
      <el-tabs
        type="border-card"
        v-model="activeName"
        class="box-card flex-item"
      >
        <el-tab-pane label="沪深300" name="1">
          <kline v-if="activeName == '1'" :array1="array1"></kline>
        </el-tab-pane>

        <el-tab-pane label="大盘与经济数据" name="2">
          <kline1 v-if="activeName == '2'" :array1="array1"></kline1>
        </el-tab-pane>

        <el-tab-pane label="做空和做多的对比" name="3">
          <kline2 v-if="activeName == '3'" :array1="array1"></kline2>
        </el-tab-pane>
        <!-- <el-tab-pane label="经济数据" name="4">
          <msgList v-if="activeName == '4'" :array1="array1"></msgList>
        </el-tab-pane>
        <el-tab-pane label="经济数据来源地址" name="5">
          <ul>
           
            <li>
              <a href="https://legulegu.com/stockdata/hs300-ttm-lyr">
                沪深300市盈率走势图(乐咕乐咕)
              </a>
            </li>
            <li>
              <a href="https://data.eastmoney.com/cjsj/zmgzsyl.html">
                沪中美国债收益率对比图
              </a>
            </li>

            <li>
              <a href="https://www.macroview.club/data?code=cn_cpi">
                cpi与ppi
              </a>
            </li>

            <li>
              <a href="http://value500.com/CSI300.asp"> 沪深300估值之股债比 </a>
            </li>
          </ul>
        </el-tab-pane> -->
        <el-tab-pane label="模拟经济数据" name="6">
          <lineChartCycle
            v-if="activeName == '6'"
            class="flex-item"
          ></lineChartCycle>
        </el-tab-pane>
      </el-tabs>
    </article>

    <section class="top_banner"></section>
  </div>
</template>
<script>
import initGdpCpi from "../../assets/js/gdpcpi_init";
import Section from "../section.vue";
import { getAjax } from "./../../assets/common.js";
export default {
  data() {
    return {
      activeName: "2",
      array1: null,
    };
  },
  components: {
    radarChart: () => import("./radarChart.vue"),
    core: () => import("../item/index3/core.vue"),
    // property: () => import("../item/index3/property.vue"),
    msgList: () => import("../item/index3/msgList.vue"),
    kline: () => import("../item/index3/kline.vue"),
    kline1: () => import("../item/index3/kline1.vue"),
    kline2: () => import("../item/index3/kline2.vue"),
    lineChartCycle: () => import("../item/index3/lineChartCycle.vue"),
  },
  created() {
    this.array1 = getAjax(this.url1("1.000001")).responseJSON.data;
  },
  mounted() {},
  methods: {
    url1(num1, num2) {
      return (
        "https://push2his.eastmoney.com/api/qt/stock/kline/get?secid=" +
        num1 +
        "&fields1=f1,f2,f3,f4,f5&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&lmt=1658&klt=101&fqt=1&end=30000101"
      );
    },
  },
};
</script>
<style scoped lang="scss">
.sectionBox3 {
  background-color: #ffffff6b;
  padding: 10px;
  border-radius: 10px;

  .box-card {
    margin-right: 20px;
  }

  .dark {
    background-color: #ffffff;

    padding: 20px 0px;
  }

  article {
    margin-bottom: 10px;

    .item {
      width: 500px;
      height: 280px;
      margin-left: 20px;
    }
  }

  .head-img {
    width: 300px;
    height: auto;
  }
}
</style>
