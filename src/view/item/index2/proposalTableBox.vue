<template>
  <div class="tableBox1">
    <el-table
      :data="tableData.slice(-5)"
      stripe
      border
      style="width: 100%"
      @header-click="headerC"
      :default-sort="{ prop: 'timestamp', order: 'descending' }"
      v-if="table_type"
    >
      <el-table-column prop="timestamp" fixed="left" label="时间">
      </el-table-column>

      <el-table-column
        prop="limit_down_count"
        fixed="left"
        label="市场真实热度"
      >
        <template #default="{ row }">
          <p :style="{ color: colorDeal(parseInt(row.market_temperature), 1) }">
            {{ parseInt(row.market_temperature) }}%
          </p>
        </template>
      </el-table-column>
      <el-table-column prop="rise_count" fixed="left" label="涨跌对比">
        <template #default="{ row }">
          <div class="flex-c">
            <p style="color: rgb(233, 64, 65)">
              {{ row.rise_count }}
            </p>
            :
            <p style="color: rgb(5, 166, 135)">
              {{ row.fall_count }}
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="limit_up_count" fixed="left" label="涨跌停对比">
        <template #default="{ row }">
          <div class="flex-c">
            <p style="color: rgb(233, 64, 65)">
              {{ row.limit_up_count }}
            </p>
            :
            <p style="color: rgb(5, 166, 135)">
              {{ row.limit_down_count }}
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        width="150"
        prop="yesterday_limit_up_avg_pcp"
        fixed="left"
        label="昨日涨停今日表现"
      >
        <template #default="{ row }">
          {{ (row.yesterday_limit_up_avg_pcp * 100).toFixed(2) }}%
        </template>
      </el-table-column>
      <el-table-column prop="limit_up_broken_ratio" fixed="left" label="炸板率">
        <template #default="{ row }">
          {{ parseInt(row.limit_up_broken_ratio * 100) }}%
        </template>
      </el-table-column>
    </el-table>

    <!--    <el-button class="el-icon-rank btn1" @click="table_type = !table_type">查看列表</el-button> -->
    <histogramFund
      v-if="ifDia"
      ref="proposalTableBox"
      :name="'_proposalTableBox'"
      :link="''"
      :title="title2"
      :listData="dataList3"
      :timeData="timeDate"
      :width1="'700px'"
      :markLine="markLine"
      :markPoint="markPoint2"
      :height1="'500px'"
      value=""
      :areaStyle="areaStyle1"
      :thame="'dark'"
    >
    </histogramFund>
    <!-- <histogramDialog
      ref="histogramDialog2"
      :name="'_proposal1'"
      :link="''"
      :dialogVisible="dialogVisible1"
      :title="title4"
      :title1="title4_2"
      :title2="'上证指数'"
      :listData="listData4"
      :listData1="listData4_1"
      :timeData="timeData4"
      :width1="'1400px'"
      :height1="'800px'"
      value=""
    >
    </histogramDialog> -->
  </div>
</template>

<script>
import histogramDialog from "../../common/histogramDialog.vue";

import histogramFund from "../../fuCommon/histogramFund.vue";
import $ from "jquery";
import { calculateStopLoss2 } from "../../fuCommon/getUrl";
import propsalTable from "./json/propsal_table.json";
export default {
  data() {
    return {
      this_url:
        "https://flash-api.xuangubao.cn/api/market_indicator/line?fields=limit_up_count,limit_down_count,market_temperature,limit_up_broken_count,limit_up_broken_ratio,rise_count,fall_count,yesterday_limit_up_avg_pcp&date=",
      timeDate: [],
      nameData: ["主力", "主力", "主力", "主力", "主力", "主力"],
      tableData: [],
      listData4: null,
      listData4_1: null,
      timeData4: null,
      num1: 0,
      title4: "",
      title4_1: "",
      title4_2: "",
      dialogVisible1: false,
      title3: "",
      dataList3: [],
      dataList: [],
      title2: "上证指数",
      markLine: [],
      ifDia: false,
      table_type: false,
      xz_num: -30,
      data_time: "2023-03-09",
      markPoint2: null,
      areaStyle1: [],
      array_end: null,
    };
  },
  created() {
    var that = this;
    let time1 = this.endDialog();

    sessionStorage.setItem("changeTime", JSON.stringify(time1));

    console.log("time1", time1);
    time1.forEach((element, index) => {
      that.getSection(element, index);
    });
    this.tableData = propsalTable.concat(this.tableData);

    that.dealSectionData();
  },
  mounted() {},
  components: {
    histogramDialog,
    histogramFund,
  },

  //没完成
  methods: {
    //设置标记点
    //上证指数数值，判断的数值，时间   ,涨停树对比，昨日涨停今日表现

    setMarkPoint(num_data, data22, time1, down_list, ztjrbx) {
      let array1 = [];
      let type1 = ["买进", "卖出", "持有", "加仓", "等待"];
      data22.forEach((item, index) => {
        let num_item = data22[index] - data22[index - 1];
        let num_data_item = num_data[index] - num_data[index - 1];
        let down_list_item = down_list[index] - down_list[index - 1];
        let num_ztjrbx = ztjrbx[index] - ztjrbx[index - 1];
        if (index == 0) return;
        if (num_data[index] == undefined) return;
        //股价
        if (num_data_item < 0) {
          if (down_list[index - 1] - down_list[index - 2] > 45) {
            let item1 = {
              name: "买卖操作逻辑",
              value: type1[0],
              xAxis: time1[index],
              yAxis: parseFloat(item),
            };
            array1.push(item1);
          }

          if (down_list_item < 0) {
            if (num_item < 10) {
              if (num_data_item > -10) {
                if (down_list[index - 1] - down_list[index - 2] < 0) {
                  if (data22[index - 1] - data22[index - 2] > 0) {
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
          } else {
            if (down_list[index - 1] - down_list[index - 2] > 0) {
              if (down_list[index - 2] - down_list[index - 3] > 0) {
                if (num_item < 0) {
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
          //跌停对比数量
          if (down_list_item > 0) {
            if (num_item <= 0) {
              // let down_list_item2 = down_list[index - 1] - down_list[index - 2];
              if (down_list_item > 4) {
                if (num_data_item < 3.5) {
                  if (-num_item / data22[index - 1] > 0.5) {
                    if (
                      parseInt(data22[index - 1] - data22[index - 2]) < 1000
                    ) {
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
            } else {
              if (down_list[index - 1] - down_list[index - 2] > 0) {
                if (data22[index - 1] - data22[index - 2]) {
                  if (data22[index - 1] - data22[index - 2] > 0) {
                    if (data22[index - 2] - data22[index - 3] < 0) {
                      if (data22[index - 3] - data22[index - 4] < 0) {
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
          } else {
            if (num_item >= 0) {
              if (down_list_item > -40) {
                if (num_data_item > 8) {
                  if (num_item / data22[index - 1] > 0.51) {
                    if (down_list[index - 1] - down_list[index - 2] > 2) {
                      if (num_data[index - 1] - num_data[index - 2] < 0) {
                        if (data22[index - 1] - data22[index - 2] < 0) {
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
    headerC(row) {
      // this.dialogVisible1 = true;
      // this.title4 = row.label;
      // this.title4_2 = row.label;
      setTimeout(() => {
        this.endDialog(row.property);
      }, 400);
    },
    colorDeal(num, type) {
      if (type == 1) {
        if (num > 55) {
          return "rgb(233, 64, 65)";
        } else if (num < 40) {
          return "rgb(5, 166, 135)";
        } else {
          return "";
        }
      }
    },
    splitData(data, num) {
      let array1 = [];
      data.klines.forEach((item, index) => {
        if (index > data.klines.length - num) {
          array1.push(item.split(",")[8]);
        }
      });
      return array1;
    },
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
    //获取版块的列表
    async getSection(time, index) {
      var that = this;
      var url1 = that.this_url + time;
      let data2 = that.getAjax(url1);
      let data1 = data2[data2.length - 1];
      data1.timestamp = this.dateFormat(
        "YYYY-mm-dd",
        new Date(data1.timestamp * 1000)
      );
      that.tableData.push(data1);
      that.num1 = that.num1 + 1;

      // if (that.num1 == that.timeDate.length) {
      //   that.endDialog();
      // }
    },
    dealSectionData() {
      let that = this;
      let scrd = [];
      let zddb = [];
      let ztdb = [];
      let ztjrbx = [];
      let zbl = [];
      let rise_list = [];
      let fall_list = [];
      let down_list = [];

      that.tableData.forEach((element, index) => {
        scrd.push(parseInt(element.market_temperature));
        zddb.push(
          (
            element.rise_count /
            (element.rise_count + element.fall_count)
          ).toFixed(2)
        );
        rise_list.push(element.rise_count);
        fall_list.push(element.fall_count);
        let item1 =
          parseInt(element.limit_up_count) / parseInt(element.limit_down_count);

        down_list.push(element.limit_down_count);
        ztdb.push((item1 == Infinity ? 0 : item1).toFixed(2));
        ztjrbx.push((element.yesterday_limit_up_avg_pcp * 100).toFixed(2));
        zbl.push(parseInt(element.limit_up_broken_ratio * 100));
      });

      // that.dataList3.push({
      //   name: "市场真实热度",
      //   num: scrd,
      //   time: that.timeDate,
      //   array: scrd,
      //   type_echarts: "bar",
      // });
      let calculateStopLoss = calculateStopLoss2(
        [
          {
            klines: this.array_end.klines,
          },
        ],
        this.array_end.klines,
        null,
        "",
        that.dataList3[0].time
      );

      that.dataList3.push({
        name: "涨的数量",
        num: rise_list.slice(-504),
        time: that.timeDate,
        array: rise_list.slice(-504),
        type_echarts: "bar",
      });
      that.dataList3.push({
        name: "涨跌停对比",
        num: down_list.slice(-504),
        time: that.timeDate,
        array: down_list.slice(-504),
        // type_echarts: "bar",
        // type_echarts: "bar",
      });
      that.dataList3.push({
        name: "市场真实热度",
        num: scrd.slice(-504),
        time: that.timeDate,
        array: scrd,
      });

      // that.dataList3.push({
      //   num: calculateStopLoss.deal_data2.zsw_array.reverse(),
      //   name: "止损位",
      //   yAxisIndex: false,
      // });
      // that.dataList3.push({
      //   num: calculateStopLoss.deal_data2.zcw_array.reverse(),
      //   name: "支撑位",
      //   yAxisIndex: false,
      // });
      // that.dataList3.push({
      //   num: calculateStopLoss.deal_data2.zcw3.reverse(),
      //   name: "近30日支撑位",
      //   yAxisIndex: false,
      // });
      // that.dataList3.push({
      //   num: calculateStopLoss.deal_data2.max_num1.reverse(),
      //   name: "近30日最高价",
      //   yAxisIndex: false,
      // });
      // console.log("array", calculateStopLoss);
      // that.dataList3.push({
      //   name: "昨日涨停今日表现折线图",
      //   num: ztjrbx,
      //   time: that.timeDate,
      //   array: ztjrbx,
      // });
      //模拟提升操作逻辑补充

      let object1_1 = this.setMarkPoint(
        this.dataList3[0].num,
        rise_list.slice(-504),
        that.timeDate,
        down_list.slice(-504),
        ztjrbx
      );

      let setDayMarkPoint1 = setDayMarkPoint(
        [this.dataList3[0].num, rise_list.slice(-504), down_list.slice(-504)],
        [1, 0, 1],
        that.timeDate
      );

      setDayMarkPoint1 =
        setDayMarkPoint1.length > 0 ? setDayMarkPoint1 : object1_1;

      this.markPoint2 = setDayMarkPoint1;

      // that.dataList3.push({
      //   name: "昨日涨停今日表现",
      //   num: ztjrbx,
      //   time: that.timeDate,
      //   array: ztjrbx,
      //   type_echarts: "bar",
      //   itemStyle: 2,
      // });
      // that.dataList3.push({
      //   name: "炸板率",
      //   num: zbl,
      //   time: that.timeDate,
      //   array: zbl,
      //   type_echarts: "bar",
      // });

      this.areaStyle1 = [{}, null, null];
      setTimeout(function () {
        that.ifDia = true;
      }, 1000);
    },
    endDialog(name1) {
      var that = this;
      let array1 = that.getAjax(this.url1("1.000001", 504));
      let array2 = that.dealData2(array1.klines, 2, array1.name, 2);
      this.array_end = array1;
      // var array1 = [];
      // that.tableData.forEach((element, index) => {
      //   if (name1 == "yesterday_limit_up_avg_pcp") {
      //     array1.push((element[name1] * 100).toFixed(2));
      //   } else if (name1 == '"limit_up_broken_ratio"') {
      //     array1.push(parseInt(element[name1] * 100));
      //   } else {
      //     array1.push(parseInt(element[name1]));
      //   }
      // });
      that.dataList3.push(array2);
      that.timeDate = array2.time;

      return array2.time2;

      // that.listData4_1 = jrqz;

      // console.log(that.$refs.histogramDialog2);
      // that.$refs.histogramDialog2.init1();
    },
    dealData2(data2, type, name, num) {
      let that = this;
      let array2 = [];
      let time1 = [];
      let num1 = [];
      let time2 = [];
      let xz_num = this.xz_num;
      data2.forEach((element2, index2) => {
        let element2_item =
          element2.length == 1 ? element2 : element2.split(",");
        time1.push(element2_item[0]);
        num1.push(element2_item[num]);
        if (this.data_time < element2_item[0]) {
          time2.push(element2_item[0]);
        }
      });
      let num2 = propsalTable.length;
      let object1 = {
        name: name,
        num: num1.slice(-(num2 + time2.length)),
        time: time1.slice(-(num2 + time2.length)),
        array: array2,
        time2: time2,
      };
      return object1;
    },
    url1(num1, num2) {
      //修改数据流量
      return (
        "https://push2his.eastmoney.com/api/qt/stock/kline/get?secid=" +
        num1 +
        "&fields1=f1,f2,f3,f4,f5&fields2=f51,f52,f53,f54,f55,f56,f57,f58,f59,f60,f61&lmt=" +
        num2 +
        "&klt=101&fqt=1&end=30000101"
      );
    },
    getAjax(url) {
      var htmlobj = $.ajax({
        url: url,
        async: false,
      });
      return htmlobj.responseJSON.data;
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

  .el-table td.el-table__cell div {
    color: #333333;
    font-weight: 600;
  }

  .btn1 {
    position: absolute;
    right: 0%;
    top: 0%;
  }
}
</style>
