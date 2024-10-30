<template>
  <div class="dateTableHis">
    <tableBox
      :datalist_table2="datalist_table2"
      v-if="datalist_table2.length > 0"
      :type="'1'"
    ></tableBox>

    <el-collapse accordion>
      <el-collapse-item>
        <template slot="title">
          {{ week_title }}
        </template>
        <tableBox
          :datalist_table2="indexfun2_week"
          v-if="indexfun2_week.length > 0"
        ></tableBox>
        <el-button-group>
          <el-button type="primary" @click="toclickData(1)">日数据</el-button>
          <el-button type="primary" @click="toclickData(2)">周数据</el-button>
          <el-button type="primary" @click="toclickData(3)">月数据</el-button>
        </el-button-group>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import cyclejson from "../json/cycle.json";
import { dealDateKline } from "../../../lib/js/dealKline.js";
import fund3Js from "./fund3.js";
import indexFun from "../js/indexFun.js";
import tableBox from "../common/tableBox.vue";
import { dealDataLine } from "../common/util.js";
import { dealData } from "../getUrl";
export default {
  data() {
    return {
      title5: "",
      listData5: null,
      timeData5: null,
      markLine5: [],
      markArea5: [],
      areaStyle3: [],
      day_data_array: null,
      month_data_array: null,
      week_data_array: null,
      datalist_table2: [],
      indexfun2_week: [],
      day_list_data: null,
      day_time_data: null,
      week_title: "",
    };
  },
  created() {
    this.initData();
  },
  props: {
    indexfun1: {
      type: Object,
      default: null,
    },
    input_name: {
      type: String,
      default: null,
    },
    zzzs_input_num: {
      type: String,
      default: null,
    },
  },
  components: {
    tableBox,
  },
  mounted() {},
  watch: {},
  methods: {
    dealArrayData(data) {
      let z_data = [];
      let f_data = [];
    
      data.forEach((element, index) => {
        if (element > 0) {
          z_data.push(element);
        } else {
          f_data.push(element);
        }
      });
      let averageZ;
      if (z_data.length==0) {
           averageZ=0
      } else {
           averageZ = z_data.reduce((a, b) => a + b) / z_data.length
      }
    
      let averageF = f_data.reduce((a, b) => a + b) / f_data.length;
      return {
        averageZ: averageZ.toFixed(2),
        averageF: averageF.toFixed(2),
        max: Math.max(...z_data),
        min: Math.min(...f_data),
        this_data: data[data.length - 1],
        title:
          "平均跌幅" +
          averageZ.toFixed(2) +
          "平均涨幅" +
          averageF.toFixed(2) +
          "最大值" +
          Math.max(...z_data) +
          "最小值" +
          Math.min(...f_data) +
          "当前值" +
          data[data.length - 1],
      };
    },

    initData() {
      let that = this;

      let indexfun2 = indexFun.initDataShares(this.input_name, 2);
         console.log("indexfun2",indexfun2);
      this.indexfun2_week = fund3Js.dealWeek(indexfun2);
         console.log(" this.indexfun2_week",this.indexfun2_week);
      
      this.week_title = this.dealArrayData(
        this.indexfun2_week[that.indexfun2_week.length - 1].num_item.slice(-15)
      ).title;
      //获取的周末的数值
      this.week_data_array = JSON.parse(JSON.stringify(indexfun2));
   
      //获取月的数据
      this.datalist_table = [];

      let month_data = indexFun.initDataShares(this.input_name, 3);
      this.month_data_array = month_data;

      that.datalist_table2 = fund3Js.dealMoth(month_data);
   

      console.log(" this.datalist_table2",this.datalist_table2);

      that.listData5 = [];

      this.day_data_array = JSON.parse(JSON.stringify(this.indexfun1));

      let kline_data2 = dealDataLine(
        this.indexfun1.all_klines,
        2,
        this.indexfun1.name,
        2
      );
      let dealdata2 = dealData(
        that.indexfun1.all_klines,
        2,
        that.indexfun1.name,
        0
      );
      that.day_list_data = dealdata2.num;

      that.day_time_data = dealdata2.time;
      let klinedata2 = dealDateKline(
        kline_data2,
        cyclejson.cycle.markArea_data
      );

      this.listData5 = klinedata2[0];
      //设置变色-设置eharts的局部变色
      this.areaStyle3 = [ null, null, null, {}];
      this.timeData5 = klinedata2[1];
      this.markArea5 = klinedata2[2];
    },
    toclickData(index1) {
      let that = this;
      let indexfun1;
      that.listData5 = null;
      setTimeout(function () {
        if (index1 == 3) {
          indexfun1 = that.month_data_array;
        } else if (index1 == 2) {
          indexfun1 = that.week_data_array;
        } else {
          indexfun1 = that.day_data_array;
        }

        let kline_data2 = dealDataLine(
          indexfun1.all_klines,
          2,
          indexfun1.name,
          2
        );
        let klinedata2 = dealDateKline(
          kline_data2,
          cyclejson.cycle.markArea_data
        );

        that.listData5 = klinedata2[0];
        that.areaStyle3 = [null, null, null, null, {}];
        that.timeData5 = klinedata2[1];
        that.markArea5 = klinedata2[2];
      }, 1000);
    },
  },
};
</script>
<style scoped lang="scss">
button {
  border: 2px solid #333333;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 2px;
  background-color: wheat;
}
</style>
