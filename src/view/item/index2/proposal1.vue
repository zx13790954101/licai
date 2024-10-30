<template>
  <div class="proposal1" v-if="tableData != null">
    <div class="tab-bar flex-c">
      <h2 class="flex-item" @click="toLink">
        今日市场温度计({{ tableData.date }})
      </h2>
      <span class="" @click="toFp">点击复盘</span>
    </div>

    <ul>
      <li class="item flex-c">
        <section>
          <div class="thermome" @click="toLink2()">
            <section class="thermometerMarket" id="thermometerMarket"></section>
          </div>

          <!-- <div class="flex-c bar-box">
            <span class="bar1"> 1662 </span>
            <span class="bar2"> 100 </span>
            <span class="bar3"> 2222 </span>
          </div> -->
          <!-- <div class="flex-c bar-box">
            <span
              class="bar1"
              :style="{
                width:
                  (tableData.up_num * 100) /
                    (tableData.up_num + tableData.up_open_num) +
                  '%',
              }"
            >
            </span>
            <span
              class="bar3"
              :style="{
                width:
                  (tableData.up_open_num * 100) /
                    (tableData.up_num + tableData.up_open_num) +
                  '%',
              }"
            >
            </span>
          </div> -->

          <div class="title">
            <span>涨停 {{ tableData.up_num }}</span> vs
            <span>跌停 {{ tableData.up_open_num }}</span>

            <div></div>
          </div>
        </section>
        <section class="f2">
          <!-- <div
            :style="{ color: tableData.up_ratio > 0 ? '#e94041' : '#05a687' }"
          >
            <span> 封板成功率 </span>
            {{ (tableData.up_ratio * 100).toFixed(2) }}%
          </div>
          <div
            :style="{
              color: tableData.performance > 0 ? '#e94041' : '#05a687',
            }"
          >
            <span> 昨日涨停今表现 </span>
            {{ (tableData.performance * 100).toFixed(2) }}%
          </div>
          <div
            :style="{
              color: tableData.up_open_ratio > 0 ? '#e94041' : '#05a687',
            }"
          >
            <span> 高开效 </span>
            {{ (tableData.up_open_ratio * 100).toFixed(2) }}%
          </div> -->
        </section>
        <section class="flex-item">
          <proportion4></proportion4>
        </section>
      </li>

      <li class="item" style="text-align: center">
        <a href="https://www.funddb.cn/tool/fear">
          恐惧贪婪指数表(韭菜儿，代表市场指数)
        </a>
        <!-- <zdbfb></zdbfb> -->
        <!-- <el-button @click="tabletype = true">查看上证指数走势图概率</el-button>
        <proposalTableBox v-if="tabletype"> </proposalTableBox> -->
      </li>
    </ul>
  </div>
</template>
<script>
import * as echarts from "echarts";
import "echarts-liquidfill";
import { getEmotionOptions } from "./../../../lib/api/index2.js";

export default {
  data() {
    return {
      tabletype: false,
      tableData: null,
    };
  },
  created() {},
  components: {
    zdbfb: () => import("../index1/zdbfb.vue"),
    proportion4: () => import("../index2/proportion4.vue"),
    proposalTableBox: () => import("./proposalTableBox.vue"),
  },
  mounted() {
    var that = this;
    getEmotionOptions(function (res) {
      console.log("res", res.data.data);
      that.tableData = res.data.data;
      that.$nextTick(() => {
        that.init1();
      });
    });
  },
  methods: {
    toFp() {
      window.open("http://stock.10jqka.com.cn/fupan/", "top");
    },
    toLink() {
      window.open("http://stock.10jqka.com.cn/wenduji/", "top");
    },
    toLink2() {
      window.open("http://stock.10jqka.com.cn/wenduji/", "top");
    },
    init1() {
      let myChart = echarts.init(document.getElementById("thermometerMarket"));
      var option;
      var that = this;
      option = {
        grid: {
          x: 0,
          x2: 0,
          y: 0,
          y2: 0,
          left: 0,
        },
        title: {
          text: "",
          fontSize: 12,
        },
        series: [
          {
            radius: "100%",
            width: "100%",
            height: "auto",
            type: "gauge",
            startAngle: 190,
            endAngle: -10,
            min: 0,
            max: 100,
            splitNumber: 4,
            axisLine: {
              lineStyle: {
                width: 15,
                color: [
                  [0.33, "#05a687"],
                  [0.663, "#58D9F9"],
                  [1, "#e94041"],
                ],
              },
            },
            pointer: {
              icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
              length: "25%",
              width: 4,
              offsetCenter: [0, "-25%"],
              itemStyle: {
                color: "auto",
              },
            },
            axisTick: {
              length: 0,
              distance: 1,
              lineStyle: {
                color: "auto",
                width: 1,
              },
            },
            splitLine: {
              length: 0,
              distance: 0,
              lineStyle: {
                color: "auto",
                width: 2,
              },
            },
            axisLabel: {
              fontSize: 14,
              color: "auto",
              distance: 22,
              formatter: function (value) {
                return value;
              },
            },
            title: {
              offsetCenter: [0, "-25%"],
              fontSize: 20,
            },
            detail: {
              fontSize: 26,
              offsetCenter: [0, "5%"],
              valueAnimation: true,
              formatter: function (value) {
                return value + "分";
              },
              color: "auto",
            },
            data: [
              {
                value: parseInt(that.tableData.market_degree * 100),
                name: "",
              },
            ],
          },
        ],
      };
      option && myChart.setOption(option);
    },
  },
};
</script>
<style scoped lang="scss">
.proposal1 {
  width: 100%;
}

.thermome {
  position: relative;
  width: 170px;
  overflow: hidden;
  height: 150px;
  margin: 0 auto;
  margin-bottom: -50px;
}

.thermometerMarket {
  height: 150px;
  width: 170px;
  position: relative;
}

.item {
}

section {
  color: rgb(0, 0, 0);
}

section.f2 {
  margin-left: 10px;

  div {
    border-bottom: 1px solid #e6e7ea;
    padding: 3px 0px;
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 10px;

    span {
      color: #565656;
    }
  }
}

.title {
  font-size: 14px;
  color: #707070;
  text-align: center;
  font-weight: 600;
  margin: 5px 0px;

  span {
    color: #e94041;
  }

  span:nth-of-type(2) {
    color: #05a687;
  }
}

.tab-bar {
  position: relative;
  margin-top: -10px;

  span {
    background-color: #333333;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    color: white;
    line-height: 50px;
    font-weight: 600;
  }
}

.bar-box {
  width: 80%;
  border-radius: 6px;
  overflow: hidden;
  vertical-align: middle;
  color: white;
  margin: 0 auto;
  margin-top: 10px;
  font-size: 12px;
  height: 16px;
  line-height: 16px;

  span {
    text-align: center;
  }

  .bar1 {
    background-color: #e94041;
    width: 40%;
    height: 16px;
  }

  .bar2 {
    background-color: #707070;
    height: 16px;
  }

  .bar3 {
    background-color: #05a687;
    flex: 1;
    height: 16px;
  }
}
</style>
