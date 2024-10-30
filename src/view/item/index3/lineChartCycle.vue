<template>
  <div class="lineChartCycle">
    <!-- <el-tabs>
      <el-tab-pane label="战争"></el-tab-pane>
      <el-tab-pane label="采购"></el-tab-pane>
      <el-tab-pane label="会议"></el-tab-pane>
      <el-tab-pane label="冲突"></el-tab-pane>
    </el-tabs>

    <div class="tab-nav">
      <ul>
        <li :class="active == 0 ? 'active' : ''" @click="active == 0">军事</li>
      </ul>
    </div> -->
    <histogramFund v-if="dataList3.length > 0" :name="'_cycle_table'" :link="''" :title="title2" :listData="dataList3"
      :timeData="timeDate" :width1="width_all" :head="head1" :markLine="markLine" :markArea="markArea1"
      :height1="'500px'" value="">
    </histogramFund>
  </div>
</template>
<script>
  import cyclejson from "./assets/cycle.json";
  import histogramFund from "./histogramFund.vue";
  export default {
    data() {
      return {
        head1: false,
        tabPosition: "left",
        active: 0,
        timeDate: [],
        dataList3: [],
        width_all: "800px",
        dataList: [],
        title2: "上证指数",
        markLine: [],
        tableData: [],
        markArea1: [],
      };
    },
    components: {
      histogramFund,
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        this.dataList3.push({
          name: "上证指数",
          time: cyclejson.all.time,
          num: cyclejson.all.data,
          array: cyclejson.all.data,
        });
        this.markArea1 = this.dealMarkArea(cyclejson.cycle.markArea_data);
        this.timeDate = cyclejson.all.time;
      },
      dealMarkArea(data) {
        let array1 = [];
        let color1 = [
          "rgba(255, 173, 177, 0.3)",
          "rgba(255, 0, 0, 0.3)",
          "rgba(255,193,7,0.3)",
          "rgba(24,166,137,0.3)",
        ];
        data.forEach((element, index) => {
          let item1 = [{
              name: element.name,
              xAxis: element.xAxis[0],
              itemStyle: {
                color: color1[element.type],
              },
            },
            {
              xAxis: element.xAxis[1],
            },
          ];
          array1.push(item1);
        });
        return array1;
      },
    },
  };
</script>
<style scoped lang="scss">
  .lineChartCycle {
    margin: 0px 0px;

    .tab-nav {
      background-color: white;
      border-radius: 5px;
      padding: 10px;
      min-height: 100px;
      width: 100%;

      li {
        color: #666;
        font-size: 14px;
        letter-spacing: 1px;
      }
    }
  }
</style>
