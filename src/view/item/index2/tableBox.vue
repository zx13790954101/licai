<template>
  <div class="tableBox1">
    <!-- <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="title" fixed="left" label="名称">
      </el-table-column>
      <el-table-column prop="inflow" label="净流入" style="color: red">
      </el-table-column>

      <el-table-column prop="inflow2" label="6.2流入"> </el-table-column>
      <el-table-column prop="inflow3" label="6.1流入"> </el-table-column>
    </el-table> -->
    <btnStausGroup
      :allTime="timeDate"
      :funData="funData"
      :dataList="btndataList"
    >
    </btnStausGroup>
    <histogramFund
      ref="tableBox1"
      :name="'_tableBox1'"
      :link="''"
      :title="title2"
      :listData="dataList3"
      :timeData="timeDate"
      :width1="width_all"
      :markPoint="markPoint2"
      :markLine="markLine"
      :height1="'500px'"
      value=""
      :type_echarts="type_echarts"
      :areaStyle="areaStyle1"
      :thame="'dark'"
    >
    </histogramFund>
    <!-- <el-card class="box-card">
      <div class="flex-c">
        <div class="flex-item">
          <div class="flex-c">
            <el-button type="warning" plain>在近期高点的情况下，资金量下跌就要跑了</el-button>
            <el-button type="warning" plain> 如果突破就可以继续进去</el-button>
          </div>
        </div>
      </div>
    </el-card> -->
  </div>
</template>

<script>
import { getAjax, orchesData } from "../../../assets/common.js";
import {
  szzs_url,
  bszj_day_url,
  bszj_url,
  zlzj_url,
  zlzj_day_url,
} from "./url/api_url.js";
import btnStausGroup from "../../../../components/polyline/btnStausGroup.vue";
import szjson from "../../../lib/json/sz.json";
import histogramFund from "../../fuCommon/histogramFund.vue";

import nxzjjson from "./json/nxzj.json";
import bszjjson from "./json/bszj.json";

export default {
  data() {
    return {
      type_echarts: "bar",
      timeDate: [],
      dataList3: [],
      width_all: "800px",
      dataList: [],
      title2: "上证指数",
      markLine: [],
      markPoint2: [],
      tableData: [],
      //北上资金的数据的时间节点
      time_data_num: 0,
      areaStyle1: [],
      btndataList: [],
      funData: [],
    };
  },
  created() {
    this.init();
  },
  mounted() {
    this.width_all = document.querySelector(".tableBox1").offsetWidth + "px";
  },
  components: {
    histogramFund,
    btnStausGroup,
  },
  methods: {
    //处理返回来的数据
    dealStausPoint(deal_data) {
      let that = this;
      //处理数据
      let select_data = that.dataList3;
      //  let select_data2 = that.dataList4;
      that.dataList3 = [];
      //   that.dataList4 = [];
      setTimeout(() => {
        that.dataList3 = select_data;
        that.markPoint2 = deal_data;
        //that.dataList4 = select_data2;
        //    that.markPoint3 = deal_data;
      }, 1000);
    },
    //上证指数数值，判断的数值，时间
    setMarkPoint(num_data, data22, data33, time1) {
      let array1 = [];
      let type1 = ["买进", "卖出", "持有", "加仓", "等待"];
      data22.forEach((item, index) => {
        //北上资金
        let num_item = parseFloat(data22[index] - data22[index - 1]);
        //上证指数
        let num_data_item = parseFloat(num_data[index] - num_data[index - 1]);
        let num_data33_item = parseFloat(data33[index] - data33[index - 1]);

        if (num_data_item < 0) {
          if (index != 0) {
            //涨跌幅小于0.7的数值
            if (num_data33_item > 0) {
              if (item < 0) {
                if (num_data33_item > 20) {
                  if (data22[index - 1] > 0) {
                    if (num_data[index - 1] - num_data[index - 2] < 0) {
                      if (data33[index - 1] - data33[index - 2] < 0) {
                        let item1 = {
                          name: "买卖操作逻辑",
                          value: type1[0],
                          xAxis: time1[index],
                          yAxis: parseFloat(item),
                        };
                        array1.push(item1);
                      }
                    }
                  } else {
                    if (num_item > 0) {
                      let item1 = {
                        name: "买卖操作逻辑",
                        value: type1[0],
                        xAxis: time1[index],
                        yAxis: parseFloat(item),
                      };
                      array1.push(item1);
                    }
                  }
                }
              }
            } else {
              if (item < 0) {
                if (data33[index] < 0) {
                  if (num_data[index - 1] - num_data[index - 2] > 0) {
                    let item1 = {
                      name: "买卖操作逻辑",
                      value: type1[0],
                      xAxis: time1[index],
                      yAxis: parseFloat(item),
                    };
                    array1.push(item1);
                  }
                }
              }
            }
          }
        } else {
          if (index != 0) {
            let end_data22 = num_data33_item / Math.abs(data33[index - 1]);
            if (data33[index] < 30 && data33[index] > -30) {
              if (item >= 0) {
                let item1 = {
                  name: "买卖操作逻辑",
                  value: type1[1],
                  xAxis: time1[index],
                  yAxis: parseFloat(item),
                  itemStyle: {
                    color: "red",
                  },
                };
                array1.push(item1);
              }
            }

            if (item < 1 && item > -50) {
              if (num_data33_item < 0) {
                if (data22[index - 1] > 0) {
                  if (data22[index - 2] < 0) {
                    let item1 = {
                      name: "买卖操作逻辑",
                      value: type1[1],
                      xAxis: time1[index],
                      yAxis: parseFloat(item),
                      itemStyle: {
                        color: "red",
                      },
                    };
                    array1.push(item1);
                  }
                }
              }
            }
          }
        }
      });

      return [
        {},
        {
          data: array1,
        },
      ];
    },
    //计算数据的结构
    dealData(data2, type, name, num) {
      let num2 = 100;
      let that = this;
      let array2 = [];
      let time1 = [];
      let num1 = [];
      data2.forEach((element2, index2) => {
        if (type == 1) {
          array2.push(element2[6].toFixed(2));

          let deal_time = dateFormat(
            "YYYY-mm-dd",
            new Date(element2[9] * 1000)
          );
          if (deal_time == "2022-08-31") {
            console.log("北上资金的时间节点的位置", index2);
          }
          time1.push(deal_time);
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
      });

      let object1 = {
        name: name,
        num: num1,
        time: time1,
        array: array2,
      };
      return object1;
    },
    //设置线
    setMarkLine() {
      let that = this;
      let new_array1 = [
        {
          name: "支撑位",
          value2: 2886.36,
        },
        {
          name: "0值",
          value2: 0,
        },
      ];
      let new_array2 = [];
      new_array1.forEach((item, index) => {
        let start_num =
          that.dataList3[0].time[that.dataList3[0].time.length - 1];
        // let item1 = [
        //   {
        //     coord: [that.dataList3[0].time[0], item.value2],
        //     symbol: "circle",
        //     name: item.name + "(" + item.value2 + ")",
        //     symbolSize: 6,
        //   },
        //   {
        //     symbolSize: 6,
        //     name: item.name,
        //     label: {
        //       position: "end",
        //     },
        //     coord: [start_num, item.value2],
        //     symbol: "arrow",
        //   },
        // ];
        let item1 = {
          name: item.name + "(" + item.value2 + ")",
          yAxis: item.value2,
          // 单独配置每条线的样式
          lineStyle: {
            width: 2,
            color: item.active ? "red" : "#ffffff",
          },
          label: {
            // padding: [-13, -20, 15, -45],
            formatter: item.name + "(" + item.value2 + ")",
          },
        };
        new_array2.push(item1);
      });
      console.log("new_array2", new_array2);
      this.markLine = [
        {
          data: [new_array2[0]],
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
        },
        {},
        {
          data: [new_array2[1]],
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
        },
      ];
    },
    //处理北上资金的数据
    dealBszj(data) {
      return data.map((item) => {
        return item.fields.val;
      });
    },
    //主力资金解析：
    dealZlzj(data, type) {
      let array1 = [];
      let array2 = [];
      let array3 = [];
      let array4 = [];
      let array5 = [];
      data.forEach((item, index) => {
        let r0_in_out = item.r0_in - item.r0_out;
        let r1_in_out = item.r1_in - item.r1_out;
        array5.push(
          ((parseFloat(r0_in_out) + parseFloat(r1_in_out)) / 100000000).toFixed(
            2
          )
        );
        array1.push(parseFloat(r0_in_out / 100000000).toFixed(2));
        array2.push(parseFloat(r1_in_out / 100000000).toFixed(2));
        array3.push(
          parseFloat((item.r2_in - item.r2_out) / 100000000).toFixed(2)
        );
        array4.push(
          parseFloat((item.r3_in - item.r3_out) / 100000000).toFixed(2)
        );
      });

      return {
        zljlr: array5.reverse(), //主力净流入
        tddlr: array1.reverse(), //特大单流入
        ddlr: array2.reverse(), //大单流入
        zdlr: array3.reverse(), //中单流入
        xdlr: array4.reverse(), //小单流入
      };
    },
    init() {
      let szzs = getAjax(szzs_url);
      szzs = szzs.responseJSON.data;
      let end_num = -600;
      szzs = this.dealData(szzs.klines, 2, szzs.name, 2);
      this.timeDate = szzs.time.slice(end_num);
      this.dataList3.push({
        array: [],
        num: szzs.num.slice(end_num),
        name: "上证指数",
        time: this.timeDate,
      });
      let bszj = getAjax(
        'https://datacenter-web.eastmoney.com/api/data/v1/get?reportName=RPT_NORTH_NETBUY&columns=TRADE_DATE,NETBUY,HNETBUY,SNETBUY,DATE_TYPE_CODE,INDEX_PRICE&quoteColumns=&filter=(DATE_TYPE_CODE="001")&pageNumber=1&pageSize=650&sortTypes=-1&sortColumns=TRADE_DATE&source=WEB&client=WEB'
      );
      let this_time = new Date().getHours();
      //获取分钟
      let this_minutes = new Date().getMinutes();
      // let this_time = orchesData(
      //   bszj.responseJSON.result.data,
      //   "TRADE_DATE",
      //   "time"
      // ).reverse();
      //主力资金
      let data2222 = this.dealZlzj(
        getAjax(
          "https://stock.sina.com.cn/stock/api/openapi.php/TouziService.getHistoryFlow?page=1&num=650&orderby=zd&ordertype=desc"
        ).responseJSON.result.data.data
      );

      let zlzj = getAjax(zlzj_url);

      bszj = orchesData(
        JSON.parse(bszj.responseText).result.data,
        "NETBUY"
      ).reverse();

      zlzj = zlzj.responseJSON.data;
      zlzj = this.dealData(zlzj.klines, 3, zlzj.name, 1);
      this_time = parseFloat(this_time + "." + this_minutes);
      if (this_time <= 15) {
        if (this_time >= 9.3) {
          let bszj_day = getAjax(bszj_day_url);
          bszj_day = bszj_day.responseJSON.data;

          bszj_day = (
            bszj_day.hk2sh.dayNetAmtIn / 10000 +
            bszj_day.hk2sz.dayNetAmtIn / 10000
          ).toFixed(2);

          let zlzj_day = getAjax(zlzj_day_url).responseJSON.data;

          zlzj_day = this.dealData(zlzj_day.klines, 3, zlzj_day.name, 1);

          bszj.push(parseFloat(bszj_day));
          zlzj.num.push(zlzj_day.num.slice(-1)[0]);
          data2222.zljlr.push(zlzj_day.num.slice(-1)[0]);
        }
      }
      var data1 = szjson.all_data;
      // this.dataList3.push({
      //   array: [],
      //   num: data1.reverse().slice(end_num),
      //   name: "我的每日涨跌幅",
      //   time: [],
      // });
      let dealBszj22 = this.dealBszj(bszjjson.data).reverse();
      let index_num1 =
        this.timeDate.length - this.timeDate.indexOf("2022-08-31") - 1;

      dealBszj22 = dealBszj22.concat(bszj.slice(-index_num1));
      // this.dataList3.push({
      //   array: [],
      //   num: dealBszj22.slice(end_num),
      //   name: "北上资金",
      //   time: [],
      // });

      this.dataList3.push({
        array: [],
        num: dealBszj22.slice(end_num),
        name: "北上资金量",
        time: [],
        type_echarts: "bar",
        itemStyle: 2,
      });
      // let item1122 = zlzj.num.slice(-1)[0];
      // let end_zlzj = data2222.zljlr;
      // end_zlzj = end_zlzj.push(item1122);
      this.dataList3.push({
        array: [],
        num: data2222.zljlr.slice(end_num),
        name: "主力资金",
        time: [],
        // itemStyle: 2,
        // type_echarts: "bar",
      });

      //添加代码
      this.funData = [
        this.dataList3[0].num,
        this.dataList3[1].num,
        this.dataList3[2].num,
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
      ];
      //模拟提升操作逻辑补充

      let object1_1 = this.setMarkPoint(
        szzs.num.slice(end_num),
        dealBszj22.slice(end_num),
        data2222.zljlr.slice(end_num),
        this.timeDate
      );

      let setDayMarkPoint1 = setDayMarkPoint(
        [
          szzs.num.slice(end_num),
          dealBszj22.slice(end_num),
          data2222.zljlr.slice(end_num),
        ],
        [1, 0, 1],
        this.timeDate
      );
      setDayMarkPoint1 =
        setDayMarkPoint1.length > 0 ? setDayMarkPoint1 : object1_1;

      this.markPoint2 = setDayMarkPoint1;

      this.setMarkLine();

      this.areaStyle1 = [
        {
          opacity: 0.5,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(0, 221, 255)",
            },
            {
              offset: 1,
              color: "rgb(77, 119, 255)",
            },
          ]),
        },
      ];
    },
  },
};
</script>
<style lang="scss">
.tableBox1 {
  margin-top: 5px;
  width: 100%;
  nav {
    span {
      padding: 5px 10px;
    }

    .active {
      color: #ff5722;
      font-weight: 600;
      font-size: 16px;
    }
  }
}
</style>
