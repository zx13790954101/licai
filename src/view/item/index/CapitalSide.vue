<template>
  <div class="CapitalSide">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="日常消息(选股宝)" name="first">
        <histogram
          v-if="listData != null"
          :name="'_bjzj'"
          :head="head_type"
          :dataZoom="dataZoom"
          :title="'白酒主力资金流动'"
          :link="'https://data.eastmoney.com/bkzj/BK0477.html'"
          :listData="listData"
          :timeData="timeData"
          :height1="'180px'"
        ></histogram>
        <!-- <nav class="flex-c">
      <span class="flex-item"> </span>
      <span @click="more"> 更多 </span>
    </nav> -->
        <tableList></tableList>
      </el-tab-pane>
      <el-tab-pane label="股吧" name="second">
        <div class="flex-c">
          <a href="http://guba.eastmoney.com/list,bk0896.html" target="_blank"
            >白酒吧(来自东方财富网)</a
          >
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { orchesData } from "../../../assets/common.js";
import histogram from "../../common/histogram.vue";
import { getBaijiuCapitalSection } from "../../../lib/api/dfcf.js";
// 资金面
export default {
  data() {
    return {
      activeName: "first",
      active_num: 0,
      head_type: true,
      dataZoom: false,
      active_num: 0,
      timeData: null,
      listData: null,
    };
  },
  components: {
    histogram,
    tableList: () => import("./tableList.vue"),
  },
  created() {
    var that = this;
    getBaijiuCapitalSection(function (res) {
      that.timeData = res.map((item) => {
        let array = item.split(",");
        return array[0];
      });
      console.log(that.timeData);
      that.listData = res.map((item) => {
        let array = item.split(",");
        return array[1] / 100000000;
      });
    });
  },
  mounted() {},
  methods: {
    handleClick(tab, event) {
      //   console.log(tab, event);
    },
    more() {},
  },
};
</script>
<style lang="scss">
.el-card__body {
  padding: 10px;
}
.el-timeline-item {
  padding-bottom: 10px;
}
</style>
<style scoped lang="scss">
.CapitalSide {
  background-color: white;
  padding: 10px;

  margin-left: 20px;
  nav {
    padding: 10px 0px;
  }

  .box1 {
    overflow-y: auto;
    position: relative;
    height: 350px;
    margin-right: 20px;
    padding-right: 10px;
    min-width: 200px;
    padding-left: 20px;
  }
  h4 {
    font-size: 12px;
  }

  p {
    font-size: 12px;
  }
  .box2 {
    overflow-y: auto;
    position: relative;
    height: 350px;
    background-color: #242323;
    padding: 10px 10px;
    a {
      color: white;
    }
  }
}
</style>
