<template>
  <div class="sectionBox">
    <!-- <article class="top">
      <div class="head flex-c">
        <h2 class="flex-item">版块预测-》</h2>
        <h5 @click="toMore">查看更多走势图</h5>
      </div>
      <postion></postion>
    </article> -->
    <article class="bottom">
      <el-card class="box-card color2">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="当前情况" name="1">
            <div class="flex-c content1">
              <!-- <img src="../../assets/img/bg1.png" style="width: 220px" /> -->

              <div class="leverage_box flex-c">
                <div class="">
                  <h2>加杠杆的仓位</h2>
                  <div class="box">
                    <span> 50% </span>
                  </div>
                </div>
                <div class="">
                  <h5>十分危险，相当于10万的杠杆</h5>
                  <div class="box1">
                    <ul>
                      <li>10%=安全一点点</li>
                    </ul>
                    <h4>是不是适合买入</h4>
                    <ul>
                      <li>10%=4月份</li>
                    </ul>
                  </div>
                </div>
              </div>

              <proposal1></proposal1>
              <!-- <proportion3></proportion3> -->
              <property></property>
              <!-- <property2></property2> -->




            </div>
            <histogramFund v-if="activeName == 1" ref="tableBox_section" :thame="'dark'" :name="'_tableBox_section'"
              :link="''" :title="title2" :listData="dataList3" :timeData="timeDate" :width1="width_all"
              :markLine="markLine" :height1="'650px'" :markPoint="markPoint2" :areaStyle="areaStyle1"
              :visualMap="visualMap2" value="">
            </histogramFund>
            <weekMoonTable v-if="weekMoonTable_data.length > 0" :weekMoonTable_data="weekMoonTable_data"></weekMoonTable>

      

          </el-tab-pane>
          <el-tab-pane label="收益分析" name="2">
            <tableBox></tableBox>
            <tableBox1></tableBox1>
          </el-tab-pane>
          <el-tab-pane label="板块收益月份排名" name="3">
            <div class="img-r">
              <img src="https://vip.cfi.cn/cfibase_cache_image/ts_web_ad_rotation_pic_size950.png" />
            </div>
          </el-tab-pane>
          <el-tab-pane label="重点版块预测" name="4">
            <dateBox2></dateBox2>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </article>
  </div>
</template>
<script>
import {
  szzs_url,
  szzsUrl
} from "../../lib/api/api_url.js";
import * as XLSX from 'xlsx';
import axios from "axios";
import excelUtil from "./../../person/js/excelUtil.js"
import vacation from "./../../person/json/vacation.json"
import szjson from "../item/index1/json/sz.json";
import bugson from "../item/index1/json/bug.json";
import {
  getAjax
} from "../../assets/common.js";
import histogramFund from "../fuCommon/histogramFund.vue";
import weekMoonTable from "../../person/views/components/weekMoonTable.vue";
import {
  my_financial,
  all_daily_profit,
  daily_profit
}
  from "../../person/url_name/excel/dingding.js";

export default {
  data() {
    return {
      timeDate: [],
      dataList3: [],
      width_all: "800px",
      dataList: [],
      title2: "上证指数",
      markLine: [],
      score1: 40,
      activeName: "1",
      percentage: 10,
      areaStyle1: [],
      visualMap2: null,
      legend2:null,
      colors: [{
        color: "#f56c6c",
        percentage: 20,
      },
      {
        color: "#e6a23c",
        percentage: 40,
      },
      {
        color: "#5cb87a",
        percentage: 60,
      },
      {
        color: "#1989fa",
        percentage: 80,
      },
      {
        color: "#6f7ad3",
        percentage: 100,
      },
      ],
      markPoint2: [],
      weekMoonTable_data: []
    };
  },
  components: {
    swiperPlate: () => import("./swiperPlate.vue"),
    proposal1: () => import("./proposal1.vue"),
    dateBox2: () => import("./dateBox2.vue"),
    analysis: () => import("../item/index/analysis.vue"),
    property: () => import("../item/index1/property.vue"),
    property2: () => import("../item/index1/property2.vue"),
    proportion3: () => import("../item/index1/proportion3.vue"),
    tableBox: () => import("../item/index/tableBox.vue"),
    tableBox1: () => import("../item/index/tableBox1.vue"),

    postion: () => import("../item/index1/postion.vue"),
    histogramFund,
    weekMoonTable,
  },
  created() {
    let that = this;
    let szzs = getAjax(szzsUrl(908));
    szzs = szzs.responseJSON.data;


    let end_num = -szjson.all_data.length;

    szzs = this.dealData(szzs.klines, 2, szzs.name, 2);


    let date_sz_time = szzs.time.findIndex((item) => {
      return item === "2021-10-08"
    })
    date_sz_time = szzs.time.length - date_sz_time;

    this.timeDate = szzs.time.slice(-date_sz_time);

    excelUtil.dealPersonData().then(res => {
      let all_data = [];//总额度涨跌幅
      for (let i =0; i <res[0].length ; i++) {
        all_data.push(parseInt(res[0][i].num));
      }
      let data1 = [];
      for (let i =0; i <res[1].length ; i++) {
        data1.push(res[1][i].num);
      }
      const all_financial = [];
      const rish_data = [];
      const weekMoonTable_data1 = [];
      const all_rish_data = []; // 总的涨跌幅比例
   
      let data1_time=this.timeDate.slice(0, all_data.length);

      res[2].forEach(item => {
        const this_time = item.time.trim();
        const if_time = data1_time.indexOf(this_time);

        if (if_time !== -1) {
          const num = parseInt(item.num, 10);
          const ratio = (parseFloat(data1[if_time]) / num) * 100;
          const formattedRatio = parseFloat(ratio.toFixed(2));

          rish_data.push(formattedRatio);
          all_financial.push(num);
          weekMoonTable_data1.push({ num: formattedRatio, time: this_time });

          if (all_data[if_time] !== undefined) {
            const allDataValue = parseFloat(all_data[if_time]);
            const allRishRatio = allDataValue / (num + Math.floor(Math.abs(allDataValue)));
            all_rish_data.push((allRishRatio*100).toFixed(2));
          }
        }
      });
      this.weekMoonTable_data = weekMoonTable_data1
      let szjson1 = {
        all_data: all_data,
        data: data1,
        all_financia: all_financial,
        rish_data: rish_data,
        all_rish_data: all_rish_data
      }
      this.initData(szzs, szjson1, -all_data.length, date_sz_time)
      this.$nextTick(() => {
        that.markPoint2 = that.setMarkPoint(that.dataList3[0].num, that.timeDate);
      });
      //  this.initData(szzs,szjson,end_num,date_sz_time)
    })

  },
  mounted() {

  },
  methods: {
    dateFormat(fmt, date) {
      let ret;
      const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString(), // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
          );
        }
      }
      return fmt;
    },
    async allDailyProfit() {
      let info = null;
      let that = this;
      try {
        info = await excelUtil.getExcelData(all_daily_profit);
        that.getDailyProfit(info)
      } catch (error) {
        // 处理错误
        console.error('1111Error fetching data:', error);
      }

    },
    async getDailyProfit(frist_info) {
      let info = null;
      try {
        info = await excelUtil.getExcelData(daily_profit);
      } catch (error) {
        // 处理错误
        console.error('1111Error fetching data:', error);
      }
    },
    initData(szzs, szjson, end_num, date_sz_time) {
      this.dataList3.push({
        array: [],
        num: szjson.all_data,
        name: "总额度涨跌值",
        time: [],
      });
      this.dataList3.push({
        array: [],
        num: szjson.all_rish_data.slice(-date_sz_time),
        name: "总的资金涨跌比例走势图",
        time: [],
      })
      
      this.dataList3.push({
        array: [],
        num: szjson.data.slice(end_num),
        name: "我的每日涨跌幅",
        time: [],
      });
      this.dataList3.push({
        array: [],
        num: szzs.num.slice(-date_sz_time),
        name: "上证指数",
        time: [],
      })
      this.dataList3.push({
        array: [],
        num: szjson.rish_data.slice(-date_sz_time),
        name: "涨跌幅值",
        type_echarts: "bar",
        itemStyle: 2,
        time: [],
      })




      this.dataList3.push({
        array: [],
        num: szjson.all_financia.slice(-date_sz_time),
        name: "资金走势图",
        time: [],
      })


      let updown = this.dealUpDown(szjson.data.slice(end_num));

      //this.dataList3.push(updown[0]);
      // this.dataList3.push(updown[1]);


      let new_array1 = [{
        name: "危险位置",
        num: -10000,
      },
      {
        name: "止损位",
        num: 0,
      },
      ];
      this.areaStyle1 = [{}, null, null, null];
      // console.log("markline", this.dealmarkLine(new_array1,this.timeDate))

      this.markLine = this.dealmarkLine(new_array1, this.timeDate);

      let array3_num = szjson.data.slice(end_num);
      var maxVal = Math.max.apply(null, array3_num);
      this.visualMap2 = [{
        show: false,
        pieces: [{
          gt: 0,
          lte: 0,
          color: "#e72243",
        },
        {
          gt: -10000,
          lte: maxVal,
          color: "#26D4AD",
        },
        ],
        outOfRange: {
          color: "#26D4AD",
        },
      },];


    },
    async loadXLSX() {
      try {
        const response = await fetch('/yfd_mr_mchu.xlsx'); // 相对于根路径
        if (!response.ok) throw new Error('Network response was not ok');
        const arrayBuffer = await response.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(buffer, {
          type: 'buffer'
        });
        const sheetName = workbook.SheetNames[0];
        this.data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
      } catch (error) {
        console.error('Error loading or parsing the XLSX file:', error);
      }
    },
    //处理每日涨跌幅的百分百
    //工具本钱的初始化的是多少
    dealUpDown(data1) {
      let end_array = [];
      let end_data = 0;
      let end_array1 = [];
      let num_all = 200000;//总的金额
      data1.forEach((Element, index) => {
        let this_num = parseFloat(Element);
        let deal_data = (this_num / num_all) * 100;
        end_data = end_data + deal_data;
        end_array.push(parseFloat(deal_data.toFixed(3)));
        end_array1.push(parseFloat(end_data.toFixed(3)));
      });
      return [{
        name: "涨跌百分比",
        num: end_array,
        type_echarts: "bar",
        itemStyle: 2,
      },
      {
        name: "累计的涨跌幅",
        num: end_array1,
      },
      ];
    },
    //上证指数数值，判断的数值，时间
    setMarkPoint(num_data, this_time) {
      let array1 = [];
      let type1 = ["买进", "卖出", "持有", "加仓", "等待"];
      let bug_json = bugson.data[0].data;
      vacation.vacation.forEach((item, index) => {
        var item1 = null;
        item1 = {
          name: "买卖操作逻辑",
          value: "+" + item.holiday_name,
          xAxis: item.date,
          yAxis: num_data[this_time.indexOf(item.date)],
          itemStyle: {
            color: "red",
          },
        };
        array1.push(item1);
        // if (item.name == "买入") {
        //   item1 = {
        //     name: "买卖操作逻辑",
        //     value: "+" + item.buy,
        //     xAxis: item.time,
        //     yAxis: num_data[this_time.indexOf(item.time)],
        //   };
        //   array1.push(item1);
        // } else {
        //   item1 = {
        //     name: "买卖操作逻辑",
        //     value: "-" + item.buy,
        //     xAxis: item.time,
        //     yAxis: num_data[this_time.indexOf(item.time)],
        //     itemStyle: {
        //       color: "red",
        //     },
        //   };
        //   array1.push(item1);
        // }
      });
      return [
        {
          data: array1,
        }, {},
      ];
    },
    //设置折线图的判断线的
    dealmarkLine(new_array1_DATA, time1) {
      let that = this;
      let new_array1 = new_array1_DATA;
      let new_array2 = [];
      new_array1.forEach((item, index) => {
        let item1 = {
          name: item.name + "(" + item.num + ")",
          yAxis: item.num,
          // 单独配置每条线的样式
          lineStyle: {
            width: 2,
            color: item.active ? "red" : "#ffffff",
          },
          label: {
            // padding: [-13, -20, 15, -45],
            formatter: item.name + "(" + item.num + ")",
          },
        };
        new_array2.push(item1);
      });

      return [{
        itemStyle: {
          normal: {
            lineStyle: {
              type: "dashed",
              // 这儿设置的颜色是公共配置，如需单独配置，请在data里配置
              // color: '#000',
            },
            label: {
              show: true,
              position: "end",
            },
          },
        },
        data: new_array2,
      },];
    },
    dealmarkLine2(data2, this_time) {
      let that = this;
      //设置支撑位的位置
      let new_array1 = [{
        name: "支撑位",
        value2: 2886.36,
      },];
      let new_array2 = [];
      new_array1.forEach((item, index) => {
        let start_num = this_time[this_time.length - 1];
        let item1 = [{
          coord: [this_time[0], item.value2],
          symbol: "circle",
          name: item.name + "(" + item.value2 + ")",
          symbolSize: 6,
        },
        {
          symbolSize: 6,
          name: item.name,
          label: {
            position: "end",
          },
          coord: [start_num, item.value2],
          symbol: "arrow",
        },
        ];
        new_array2.push(item1);
      });
      this.markLine = [{
        data: new_array2,
        lineStyle: {
          width: 3,
          color: "#ffffff",
        },
      },];
    },
    toMore() {
      let routeData = this.$router.resolve({
        path: "/section",
      });
      window.open(routeData.href, "_blank");
    },
    dealData(data2, type, name, num) {
      let num2 = 100;
      let that = this;
      let array2 = [];
      let time1 = [];
      let num1 = [];
      data2.forEach((element2, index2) => {
        if (index2 <= data2.length) {
          if (type == 1) {
            array2.push(element2[6].toFixed(2));
            time1.push(dateFormat("YYYY-mm-dd", new Date(element2[9] * 1000)));
            num1.push(element2[1]);
          } else if (type == 2) {
            array2.push(element2.split(",")[8]);
            time1.push(element2.split(",")[0]);

            if (num == 6) {
              num1.push(
                (parseInt(element2.split(",")[num]) / 10000000).toFixed(2)
              );
            } else {
              num1.push(element2.split(",")[num]);
            }
          } else if (type == 3) {
            num1.push((element2.split(",")[num] / 100000000).toFixed(2));
          }
        }
      });

      let object1 = {
        name: name,
        num: num1,
        time: time1,
        array: array2,
      };
      return object1;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    move1(num) {
      console.log(num);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    init1() {
      let data_array = [{
        value: 1048,
        name: "K线图",
      },
      {
        value: 735,
        name: "资金面",
      },
      {
        value: 580,
        name: "政策面",
      },
      {
        value: 484,
        name: "供需关系",
      },
      {
        value: 300,
        name: "信心",
      },
      {
        value: 300,
        name: "业绩",
      },
      {
        value: 300,
        name: "业绩",
      },
      ];
      let myChart = echarts.init(document.getElementById("echarts_section"));
      var option;
      option = {
        title: {
          text: "版块的名字和持有最大理由",
          subtext: "详情",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },

        series: [{
          name: "Access From",
          type: "pie",
          radius: "50%",
          data: data_array,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },],
      };
      option && myChart.setOption(option);
    },
  },
};

</script>
<style lang="scss">
.icon1 {
  font-size: 25px;
  font-weight: 600;
  box-shadow: 0 2px 12px 0px rgba(0, 0, 0, 0.1);
  padding: 15px 2px;
  border-radius: 4px;
  margin-left: 20px;
}

.img-r {
  img {
    width: 100%;
    height: auto;
  }
}
</style>
<style scoped lang="scss">
.demo-Circle-custom {
  & h1 {
    color: #3f414d;
    font-size: 26px;
    font-weight: normal;
  }

  & p {
    color: #657180;
    font-size: 12px;
    margin: 5px 0 5px;
    font-weight: 600;
  }

  & span {
    display: block;
    padding: 10px 0px;
    color: #657180;
    font-size: 12px;

    &:before {
      content: "";
      display: block;
      width: 50px;
      height: 1px;
      margin: 0 auto;
      background: #e0e3e6;
      position: relative;
      top: -15px;
    }
  }
}

// & span i {
//   font-style: normal;
//   color: #3f414d;
// }

.rcle-custom {
  h1 {
    font-size: 20px;
  }
}

.color1 {
  background-color: #e7f3ff;
}

.color2 {
  background-color: #eff3f8;
}

.content1 {
  margin: 0px 0px 0px 0px;
  justify-content: center;
}

.el-button+.el-button {
  margin-left: 0px;
  margin-top: 10px;
  display: block;
}

.head {
  background: #895fa7;
  padding: 0px 10px;
  border: 0px dashed #dda4eb;
  // margin: 5px 0px 5px 0px;
  box-shadow: 0px 0px 0px 0px #58436a;
  color: white;
}

.sectionBox {
  background-color: #ffffffba;
  padding: 15px;
  border-radius: 15px;

  .swiper-box {
    position: relative;
    overflow: hidden;
  }

  article {
    margin-bottom: 0px;
  }

  .bottom {
    //  border-top: 1px solid #e1e1e1;
    padding: 0px 0px;
    margin-bottom: 0px;
  }

  .box-card {
    margin-left: 0px;
  }

  .icon1 {
    font-size: 25px;
    font-weight: 600;
    box-shadow: 0 2px 12px 0px rgba(0, 0, 0, 0.1);
    padding: 15px 2px;
    border-radius: 4px;
    margin-left: 20px;
  }

  .section1 {
    width: 300px;
    height: 300px;
  }
}

.leverage_box {
  text-align: center;
  margin: 0px 20px;
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 #0000001a;

  h2 {}

  .box {
    margin: 10px auto;
    border-radius: 10px;
    height: 140px;
    background-color: #e2e2e2;
    position: relative;
    overflow: hidden;
    display: inline-block;
    display: flex;
    width: 60px;
    align-items: end;

    span {
      height: 50%;
      background: linear-gradient(#f31a1a, #fd4e4e, #e99797);
      display: inline-block;
      border-radius: 15px;
      width: 100%;
      font-size: 24px;
      font-weight: 600;
      color: #ffffff;
      box-shadow: 0 2px 12px 0 #0000001a;
      border: 1px solid #0000001a;
    }
  }
}
</style>
