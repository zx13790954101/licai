<template>
  <div class="sectionBox4">
    <article class="top dark flex-c">
      <div class="box-card flex-item">
        <core></core>
      </div>
      <div class="box-card dark1">
        <localMarkets @transfer="getData1"></localMarkets>
      </div>
    </article>
    <article class="bottom flex-c">
      <el-tabs type="border-card" v-model="activeName" class="flex-item">
        <el-tab-pane label="美股走势图" name="1">
          <main1 v-if="activeName == '1'"></main1>
          <lineChart v-if="activeName == '1'"> </lineChart>
        </el-tab-pane>

        <el-tab-pane label="腾讯控股" name="2">
          <btnStausGroup
            v-if="activeName == '2'"
            :allTime="timeDate"
            :funData="funData"
            :dataList="btndataList"
          >
          </btnStausGroup>
          <histogramFund
            v-if="activeName == '2'"
            ref="tableBox_section"
            :name="'_tableBox_section'"
            :link="''"
            :title="title2"
            :listData="dataList3"
            :timeData="timeDate"
            :width1="width_all"
            :markLine="markLine"
            :markPoint="markPoint2"
            :height1="'750px'"
            value=""
          >
          </histogramFund>
        </el-tab-pane>
        <el-tab-pane label="恒生科技" name="3">
          <calculateHistogram
            v-if="activeName == '3'"
            :props_dataList="hskj_data"
            :input_name1="'124.HSTECH'"
            :this_name="'恒生科技'"
            :class_name="'_hskjHis'"
          >
          </calculateHistogram>
          <!-- <histogramFund
            v-if="activeName == '3'"
            ref="tableBox_section3"
            :name="'_tableBox_section3'"
            :link="''"
            :title="title2"
            :listData="dataList_hskj"
            :timeData="timeDate2"
            :markPoint="hskj_markpoint2"
            :areaStyle="hskj_areaStyle2"
            :height1="'750px'"
            value=""
          >
          </histogramFund> -->

          <histogramFund
            ref="tableBox_section2"
            :name="'_tableBox_section2'"
            v-if="activeName == '3'"
            :link="''"
            :title="title2"
            :listData="dataList4"
            :timeData="timeDate2"
            :markPoint="markPoint3"
            :height1="'750px'"
            value=""
          >
          </histogramFund>

          <decreaseHistogram
            v-if="activeName == '3'"
            :day_data_array="day_data_array"
            :indexfun1="day_data_array"
          >
          </decreaseHistogram>
        </el-tab-pane>
        <el-tab-pane label="数据预报" name="4">
          <msgList v-if="activeName == '3'"></msgList>
        </el-tab-pane>
      </el-tabs>
    </article>
  </div>
</template>
<script>
import { getAjax } from "../../assets/common.js";
import histogramFund from "../fuCommon/histogramFund.vue";
import { setMarkPoint, setMarkPoint2 } from "../item/index4/setMarkPoint.js";
import btnStausGroup from "../../../components/polyline/btnStausGroup.vue";
import initCaculate from "../fuCommon/js/calculateStopLoss";
import { initMaxMin30 } from "../fuCommon/js/dealCalculateStopLoss.js";
import { dealPoint } from "../fuCommon/common/util.js";
import calculateHistogram from "../fuCommon/common/calculateHistogram.vue";
import decreaseHistogram from "../fuCommon/common/decreaseHistogram.vue";
import indexFun from "../fuCommon/js/indexFun.js";
export default {
  data() {
    return {
      activeName: "1",
      timeDate: [],
      dataList3: [],
      width_all: "800px",
      dataList: [],
      title2: "上证指数",
      markLine: [],
      markPoint2: null,
      markPoint3: null,
      dataList_hskj: [],
      dataList_hskl_time: [],
      hskj_markpoint2: [],
      hskj_areaStyle2: [],
      title3: "恒生科技",
      dataList4: [],
      timeDate2: [],
      //搜索按钮的
      funData: [],
      //按钮
      btndataList: [],
      hskj_data: null,
      txgf_data: null,
      day_data_array: null,
    };
  },
  components: {
    lineChart: () => import("../item/index4/lineChart.vue"),
    speed: () => import("../item/index4/speed.vue"),
    msgList: () => import("../item/index4/msgList.vue"),
    main1: () => import("../item/index4/main.vue"),
    localMarkets: () => import("../item/index4/localMarkets.vue"),
    core: () => import("../item/index4/core.vue"),
    btnStausGroup,
    histogramFund,
    calculateHistogram,
    decreaseHistogram,
  },
  created() {},
  mounted() {},
  methods: {
    //处理返回来的数据
    dealStausPoint(deal_data) {
      let that = this;
      //处理数据
      let select_data = that.dataList3;
      //  let select_data2 = that.dataList4;
      that.dataList3 = [];
      //   that.dataList4 = [];

      console.log("deal_data", deal_data);
      setTimeout(() => {
        that.dataList3 = select_data;
        that.markPoint2 = deal_data;
        //that.dataList4 = select_data2;
        //    that.markPoint3 = deal_data;
      }, 1000);
    },
    dealData(data2, type, name, num, type2, num3) {
      let num2 = 100;
      let that = this;
      let array2 = [];
      let time1 = [];
      let num1 = [];
      data2.forEach((element2, index2) => {
        if (type == 1) {
          array2.push(element2[6].toFixed(2));
          time1.push(dateFormat("YYYY-mm-dd", new Date(element2[9] * 1000)));
          num1.push(element2[1]);
        } else if (type == 2) {
          array2.push(parseFloat(element2.split(",")[8]));
          time1.push(element2.split(",")[0]);

          if (num == 6) {
            num1.push(
              (parseInt(element2.split(",")[num]) / 10000000).toFixed(2)
            );
          } else {
            num1.push(parseFloat(element2.split(",")[num]));
          }
        } else if (type == 3) {
          num1.push((element2.split(",")[num] / 100000000).toFixed(2));
        }
      });

      let object1 = {
        name: name,
        num: num1,
        time: time1,
        array: array2,
        type_echarts: type2 == undefined ? undefined : "bar",
        itemStyle: num3 == undefined ? undefined : 2,
      };
      return object1;
    },
    dealData2(name, data2, type, type2, num3) {
      let num2 = 100;
      let that = this;
      let array2 = [];
      let time1 = [];
      let num1 = [];
      data2.forEach((element2, index2) => {
        array2.push(parseFloat((element2.split(",")[1] / 10000).toFixed(2)));
        time1.push(element2.split(",")[0]);
        num1.push(parseFloat((element2.split(",")[1] / 10000).toFixed(2)));
      });

      let object1 = {
        name: name,
        num: num1,
        time: time1,
        array: array2,
        type_echarts: type2 == undefined ? undefined : "bar",
        itemStyle: num3 == undefined ? undefined : 2,
      };
      return object1;
    },
    getData1(msg) {
      //lmt=  设置长度值
      let that = this;
      //恒生科技etf
      let hskj_data = getAjax(
        "https://push2his.eastmoney.com/api/qt/stock/kline/get?secid=124.HSTECH&fields1=f1,f2,f3,f4,f5&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&lmt=500&klt=101&fqt=1&end=30000101"
      ).responseJSON.data;

      let indexfun1 = indexFun.initDataShares("HSTECH");
      this.day_data_array = JSON.parse(JSON.stringify(indexfun1));

      let data1 = getAjax(
        "https://push2his.eastmoney.com/api/qt/stock/kline/get?secid=124.VHSI&fields1=f1,f2,f3,f4,f5&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61" +
          "&lmt=500&klt=101&fqt=1&end=30000101"
      ).responseJSON.data;

      data1 = this.dealData(data1.klines, 2, data1.name, 2);

      let data2 = getAjax(
        "https://push2his.eastmoney.com/api/qt/stock/kline/get?secid=116.00700&fields1=f1,f2,f3,f4,f5&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&lmt=500&klt=101&fqt=1&end=30000101"
      ).responseJSON.data;
      let data3 = this.dealData(data2.klines, 2, data2.name, 2);
      let data_zdf = this.dealData(data2.klines, 2, "涨跌幅", 8, "bar", 2);
      let data_cje = this.dealData(data2.klines, 2, "成交额(亿)", 6);

      //https://data.eastmoney.com/hsgtcg/lz.html?t2=101&t3=1 --数据来源
      let nxzj_data = getAjax(
        "https://push2his.eastmoney.com/api/qt/kamt.kline/get?fields1=f2,f4,f6&fields2=f51,f52&klt=101&lmt=500"
      ).responseJSON.data;
      nxzj_data = nxzj_data.n2s;
      let nxzj_data1 = this.dealData2("南向资金", nxzj_data, "n2s");

      // nxzj_data1.num = nxzj_data1.num.reverse();
      // nxzj_data1.num = nxzj_data1.num.slice(-499);
      // nxzj_data1.num.push(21.85);
      // nxzj_data1.array.push(21.85);
      //this.dataList3.push(data1);
      // this.dataList3.push(msg);
      this.dataList3.push(data3);
      this.dataList3.push(data_zdf);
      this.dataList3.push(data_cje);
      this.dataList3.push(nxzj_data1);

      //添加代码
      this.funData = [
        this.dataList3[0].num,
        this.dataList3[1].num,
        this.dataList3[2].num,
        this.dataList3[3].num,
      ];
      this.btndataList = [
        {
          name: this.dataList3[0].name,
          state: 1,
          color: "#4992ff",
        },
        {
          name: this.dataList3[1].name,
          state: 2,
          color: "#7cffb2",
        },
        {
          name: this.dataList3[2].name,
          state: 1,
          color: "#fddd60",
        },
        {
          name: this.dataList3[3].name,
          state: 1,
          color: "#ff6e76",
        },
      ];
      this.timeDate = data1.time;
      let setDayMarkPoint1 = setDayMarkPoint(
        [data3.num, data_zdf.num, data_cje.num, nxzj_data1.num],
        [1, 0, 1, 1],
        that.timeDate
      );
      let object1_1 = setMarkPoint(
        data3.num,
        data_zdf.num,
        data_cje.num,
        nxzj_data1.num,
        this.timeDate
      );
      setDayMarkPoint1 =
        setDayMarkPoint1.length > 0 ? setDayMarkPoint1 : object1_1;
      this.markPoint2 = setDayMarkPoint1;

      that.txgf_data = {
        klines: data2.klines,
        name: data2.name,
        time: data3.time,
        num: data3.num,
        array: data3.array,
      };
      console.log("txgf_data", that.txgf_data);

      let hskj_data3 = this.dealData(hskj_data.klines, 2, hskj_data.name, 2);

      this.hskj_data = {
        klines: hskj_data.klines,
        name: hskj_data.name,
        time: hskj_data3.time,
        num: hskj_data3.num,
        array: hskj_data3.array,
      };

      let hskj_data_zdf = this.dealData(
        hskj_data.klines,
        2,
        "涨跌幅",
        8,
        "bar",
        2
      );

      let calculateStopLoss = initCaculate.calculateStopLoss2(
        [
          {
            klines: hskj_data.klines,
          },
        ],
        hskj_data.klines,
        null,
        "",
        hskj_data3.time
      );
      that.dataList_hskj.push({
        num: hskj_data3.num,
        name: hskj_data.name,
      });

      that.dataList_hskj.push({
        num: calculateStopLoss.deal_data2.zsw_array.reverse(),
        name: "止损位",
        yAxisIndex: false,
      });
      that.dataList_hskj.push({
        num: calculateStopLoss.deal_data2.zcw_array.reverse(),
        name: "支撑位",
        yAxisIndex: false,
      });
      that.dataList_hskj.push({
        num: calculateStopLoss.deal_data2.zcw3.reverse(),
        name: "近30日支撑位",
        yAxisIndex: false,
      });

      that.dataList_hskj.push({
        num: calculateStopLoss.deal_data2.max_num1.reverse(),
        name: "近30日最高价",
        yAxisIndex: false,
      });
      that.dataList_hskj.push({
        num: calculateStopLoss.deal_data2.min_num1.reverse(),
        name: "近30日最低价",
        yAxisIndex: false,
      });
      let initMax_data = initMaxMin30(
        JSON.parse(JSON.stringify(calculateStopLoss))
      );

      this.hskj_markpoint2 = [
        {},
        {},
        {},
        {},
        {
          data: dealPoint(initMax_data.max_num_level_item30.num, 1),
        },
        {
          data: dealPoint(initMax_data.min_num_level_item30.num, 0),
        },
      ];
      //设置大小
      that.hskj_areaStyle2 = [{}, null, null, null, null];

      let hskj_data_cje = this.dealData(hskj_data.klines, 2, "成交额(亿)", 6);
      this.dataList4.push(hskj_data3);
      this.timeDate2 = hskj_data3.time;
      this.dataList4.push(hskj_data_zdf);
      this.dataList4.push(hskj_data_cje);
      this.dataList4.push(nxzj_data1);
      let setDayMarkPoint2 = setDayMarkPoint(
        [hskj_data3.num, hskj_data_zdf.num, hskj_data_cje.num, nxzj_data1.num],
        [1, 0, 1, 1],
        that.timeDate2
      );
      let object1_2 = setMarkPoint2(
        hskj_data3.num,
        hskj_data_zdf.num,
        hskj_data_cje.num,
        nxzj_data1.num,
        this.timeDate2
      );
      setDayMarkPoint2 =
        setDayMarkPoint2.length > 0 ? setDayMarkPoint2 : object1_2;
      this.markPoint3 = setDayMarkPoint2;
    },
  },
};
</script>
<style scoped lang="scss">
.sectionBox4 {
  background-color: white;
  padding: 20px 10px;
  border-radius: 10px;

  .box-card {
    padding: 0px 20px;
  }

  .dark {
    background-color: #353a47;
  }

  .dark1 {
    background-color: #353a47;
  }
}
</style>
