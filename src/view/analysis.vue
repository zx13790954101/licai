<template>
  <div class="analysis">
    <!-- <header class="">
      <div class="head1 flex-c">
        <span class="flex-item">{{ this_name }}</span>
        <span @click="toDetail()"> 查看详情 </span>
      </div>
    </header> -->
    <el-dialog title="" :visible.sync="dialogTableVisible">
      <newCondition></newCondition>
    </el-dialog>
    <section
      class="left-nav"
      :class="left_active?'left_active':''"
    >
      <div class="left-main flex-c">
        <div class="left-box">
          <div class="flex-c">
          <button @click="left_active = !left_active" class="left_btn">
            {{ left_active ? "关闭" : "打开" }}
          </button>
           <button @click="toBtn(1)" class="left_btn"
              >确定提交
            </button>
            </div>
          <div class="bar">
            <div class="flex-c">
              <el-input
                v-model="input_name1"
                placeholder="请输入权重股"
                size="medium"
              ></el-input>
              <span class="ge"></span>

              <el-input
                v-model="zzzs_input_num"
                placeholder="请输入中证指数"
                size="medium"
              ></el-input>
              <span class="ge"></span>

              <!-- <el-input
                v-model="input_name6"
                placeholder="请输入截止日期"
                size="medium"
              ></el-input> -->
              <span class="ge"></span>
              <el-input
                v-model="input_name7"
                placeholder="请输入买入日期"
                size="medium"
              ></el-input>
              <span class="ge"></span>
            </div>
            <!-- <div>
              <el-input
                class="active_input"
                v-model="input_name5"
                placeholder="请输入关键事件日期(功能待定)"
                size="medium"
              ></el-input>
              <span class="ge"></span>
              <el-button @click="toBtn(2)" size="medium" round
                >确定提交
              </el-button>
            </div> -->
          </div>
          <div class="flex-c">

        
          <ul>
            <li
              v-for="(item, index) in btn_array"
              :key="index"
              :class="active_index == index ? 'active' : ''"
              class="title-item flex-c"
              @click="toBtn1(item.num, index)"
            >
              <div class="tba-nav">
                {{ item.name }}({{ item.tip }})
                <p>
                  {{ item.num }}
                </p>
              </div>
              <div class="dropdown-box">
                <div
                  class="new"
                  :class="
                    btn_array3[index].position > btn_array3[index].all_position
                      ? 'exceed'
                      : 'full'
                  "
                >
                  {{ dealMoney(btn_array3[index].position) }}/
                  {{ dealMoney(btn_array3[index].all_position) }}
                </div>
                <div class="bar_box">
                  <span :style="{ width: btn_array3[index].total_funds }">
                    {{ btn_array3[index].total_funds }}
                  </span>
                </div>
              </div>

              <div class="right_box" :class="'active' + btn_array3[index].type">
                <span>
                  {{
                    switchAction(btn_array3[index].type) +
                    btn_array3[index].riseFall +
                    "%"
                  }}
                </span>
              </div>
            </li>
          </ul>

         <personalStatus>
         </personalStatus>  </div>
           
        </div>
      </div>
      <!-- <el-menu
        default-active="1-4-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        :default-active="active_index + 1"
      >uii
        <el-menu-item
          :index="index + 1"
          v-for="(item, index) in btn_array"
          :key="index"
        >
          <i class="el-icon-menu"></i>
          <div slot="title" class="title-item">
            <div class="" @click="toBtn1(item.num, index)">
              {{ item.name }}({{ item.tip }}){{ item.num }}
            </div>
          </div>
        </el-menu-item>
      </el-menu>

      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group> -->
    </section>
    <div class="main">
      <div class="tab-nav">
        <!-- <el-dropdown>
          <div class="el-dropdown-link btn_array">
            <span>
              {{ btn_array[active_index].name }}({{
                btn_array[active_index].tip
              }}){{ btn_array[active_index].num }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>

            <div class="dropdown-box">
              <div
                class="new"
                :class="
                  btn_array3[active_index].position >
                  btn_array3[active_index].all_position
                    ? 'exceed'
                    : 'full'
                "
              >
                {{ dealMoney(btn_array3[active_index].position) }}/
                {{ dealMoney(btn_array3[active_index].all_position) }}
              </div>
              <div class="bar_box">
                <span :style="{ width: btn_array3[active_index].total_funds }">
                  {{ btn_array3[active_index].total_funds }}
                </span>
              </div>
            </div>

            <div
              class="right_box"
              :class="'active' + btn_array3[active_index].type"
            >
              <span>
                {{
                  switchAction(btn_array3[active_index].type) +
                  btn_array3[active_index].riseFall +
                  "%"
                }}
              </span>
            </div>


          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, index) in btn_array" :key="index">
              <div class="" @click="toBtn1(item.num, index)">
                {{ item.name }}({{ item.tip }}){{ item.num }}
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown> -->

        <!-- <el-button-group>
        <el-button
          @click="toBtn1(item.num,index)"
          type="primary"
          plain
          size="medium"
          style="width: 210px"
          v-for="(item, index) in btn_array"
          :key="index"
          :class="input_name1 == item.num ? 'active' : ''"
        >
          {{ item.name }}({{ item.tip }}){{ item.num }}
        </el-button>
      </el-button-group>
      <ul class="btn_array">
        <li v-for="(item, index) in btn_array3" :key="index">
          <div
            class="new"
            :class="item.position > item.all_position ? 'exceed' : 'full'"
          >
            {{ dealMoney(item.position) }}/ {{ dealMoney(item.all_position) }}
          </div>
          <div class="bar_box">
            <span :style="{ width: item.total_funds }">
              {{ item.total_funds }}
            </span>
          </div>
        </li>
      </ul> -->

        <!-- <nav class="flex-c">
          <div class="bar flex-c">
            <div class="flex-c">
              <el-input
                v-model="input_name1"
                placeholder="请输入权重股"
                size="medium"
              ></el-input>
              <span class="ge"></span>

              <el-input
                v-model="zzzs_input_num"
                placeholder="请输入中证指数"
                size="medium"
              ></el-input>
              <span class="ge"></span>

              <el-input
                v-model="input_name6"
                placeholder="请输入截止日期"
                size="medium"
              ></el-input> -
              <span class="ge"></span>
              <el-input
                v-model="input_name7"
                placeholder="请输入买入日期"
                size="medium"
              ></el-input>
              <span class="ge"></span>
              <el-button @click="toBtn(1)" size="medium" round
                >确定提交
              </el-button>
            </div>

            <div>
              <el-input
                class="active_input"
                v-model="input_name5"
                placeholder="请输入关键事件日期(功能待定)"
                size="medium"
              ></el-input>
              <span class="ge"></span>
              <el-button @click="toBtn(2)" size="medium" round
                >确定提交
              </el-button>
            </div>
          </div>
        </nav> -->
      </div>

      <!-- <calculateStopLossBox
      v-if="calculateStopLoss1 != null"
      :calculateStopLossData="calculateStopLoss1"
      :this_name="this_name"
      :input_name1="input_name1"
    >
    </calculateStopLossBox> -->

      <analysisTab
        ref="analysisTab"
        v-if="viewType"
        :input_name1="input_name1"
        :input_name6="input_name6"
        :zzzs_input_num="zzzs_input_num"
        :array_all="array_all"
        :main_datalist_table="main_datalist_table"
        :main_markline="main_markline"
        :testtext2="testtext2"
        :calculate_array_active="calculate_array_active"
      >
      </analysisTab>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import Section from "./section.vue";
import histogramFund from "./fuCommon/histogramFund.vue";
import classification from "./fuCommon/classification.vue";
import tableListBox from "./fuCommon/tableList.vue";

import personalStatus from "./fuCommon/tableList.vue";
import {
  switchUrlDeal,
  dealData,
  urlDeal,
  btn_array2,
  dealFundCode,
} from "./fuCommon/getUrl";

import {
  initMaxMin30,
  deal30Loss,
  dealSeatType,
} from "./fuCommon/js/dealCalculateStopLoss.js";

import { initAmount } from "./fuCommon/circulationAmount";
import operate from "./fuCommon/js/operate";
import analysisTab from "./fuCommon/tab.vue";
import calculateStopLossBox from "./fuCommon/common/calculateStopLoss.vue";
import newCondition from "./analysis/newCondition.vue";
export default {
  data() {
    return {
      // 设置页面机构
      viewType: false,
      array_all: [],
      main_datalist_table: [],
      datalist_table: [],
      datalist_table2: [],
      btn_array: [],
      flag: false,
      input_name1: "",
      //中证指数参数
      zzzs_input_num: "",
      input_name3: "",
      input_name4: "",
      input_name6: "",
      //买入点
      input_name5: "",
      //买入时间
      input_name7: "",
      data_list: [],
      num1: 200,
      dataList: [],
      this_name: "",
      start_time: null,
      end_time: null,
      testtext2: [],
      testarray: null,
      testarray2: null,
      testtime: null,
      testtime2: null,
      testarray3: null,
      testarray4: null,
      array1: "",
      calculateStopLoss1: null,

      ths_comtent: null,
      ths_comtent1: null,
      main_markline: [],
      calculate_array_active: 0,
      //位置数组，判断是不是跌破支撑位
      position_array: [],
      //当前数值
      this_num_data: 0,
      btn_array3: [],
      active_index: 7,
      isCollapse: true,
      left_active: false,
      dialogTableVisible: false,
    };
  },
  components: {
    Section,
    histogramFund,
    tableListBox,
    classification,
    analysisTab,
    calculateStopLossBox,
    newCondition,
    personalStatus
  },
  created() {
    this.input_name1 = "300750";
    // this.input_name5 = 43.75;
    this.btn_array = btn_array2;

    this.btn_array3 = operate.btn_array2;
    // window.open(
    //   "https://www.iwencai.com/stockpick/search?typed=1&preParams=&ts=1&f=1&qs=index_rewrite&selfsectsn=&querytype=stock&searchfilter=&tid=stockpick&w=%E4%B8%AD%E5%9B%BD%E5%B9%B3%E5%AE%89",
    //   "_blank"
    // );
    this.toBtn();
    //推荐资金代码
    //https://push2.eastmoney.com/api/qt/stock/fflow/kline/get?lmt=0&klt=1&fields1=f1%2Cf2%2Cf3%2Cf7&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61%2Cf62%2Cf63%2Cf64%2Cf65&secid=1.601318
    //https://push2his.eastmoney.com/api/qt/stock/fflow/daykline/get?lmt=0&klt=101&fields1=f1%2Cf2%2Cf3%2Cf7&fields2=f51%2Cf52%2Cf53%2Cf54%2Cf55%2Cf56%2Cf57%2Cf58%2Cf59%2Cf60%2Cf61%2Cf62%2Cf63%2Cf64%2Cf65&secid=1.601318
  },
  mounted() {
    //$("#dfcf_iframe").contents().find("#topgg").hide();
    // console.log("dfcf_iframe", $("#dfcf_iframe"));
  },
  methods: {
    //设置指定行、列、具体单元格颜色
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 8 && columnIndex === 8) {
        //指定坐标rowIndex ：行，columnIndex ：列
        return ""; //rgb(105,0,7)
      } else {
        return "";
      }
    },
    getAjax2(url) {
      if (url == "") {
        return "";
      } else {
        var htmlobj = $.ajax({
          url: url,
          async: false,
        });

      
        return htmlobj.responseJSON.data;
      }
    },
    toBtn1(num, index) {
      
      this.input_name1 = num;
      this.active_index = index;
      
      this.toBtn(1);
    },
    //处理
    switchAction(num) {
      switch (num) {
        //待定
        case 0:
          return "待定";
          break;
        //横盘中0.5-1
        case 1:
          return "横盘中0.5到-1";
          break;
        //盈利
        case 2:
          return "盈利";
          break;
        //亏损
        case 3:
          return "亏损";
          break;

        default:
          break;
      }
    },
    dealMoney(data) {
      let end_name = data;
      if (data < 1000) {
        end_name = (data / 100).toFixed(1) + "百";
      } else if (data < 10000) {
        end_name = (data / 1000).toFixed(1) + "千";
      } else if (data < 100000) {
        end_name = (data / 10000).toFixed(1) + "万";
      }
      return end_name;
    },
    //点击查看详情
    toDetail() {},
    //处理时间
    dealTime(data, time) {
      let data1 = [];
      let time1 = [];
      var index1 = 0;
      for (let i = 1; i < 13; i++) {
        let num1 = i < 10 ? "-0" + i : "-" + i;
        let time_item =
          time[index1] == undefined ? "" : time[index1].slice(4, 7) + "";

        if (time_item == num1) {
          data1.push(data[index1]);
          index1 = index1 + 1;
        } else {
          data1.push("--");
        }
      }
      return data1;
    },
    //设置月份
    dealMoth(dataList) {
      let item1 = [];
      let time1 = null;
      let time2 = [];
      let array1 = [];

      dataList.time.forEach((element, index) => {
        if (time1 == element.slice(0, 4)) {
          item1.push(dataList.array[index]);
          time2.push(element.slice(0, 7));
          if (index + 1 == dataList.time.length) {
            array1.push({
              name: time1,
              array: this.dealTime(item1, time2),
              time: time2,
            });
          }
        } else {
          if (time1 !== null) {
            array1.push({
              name: time1,
              array: this.dealTime(item1, time2),
              time: time2,
            });
          }

          item1 = [];
          time1 = null;
          time1 = element.slice(0, 4);
          time2 = [];
          time2.push(element.slice(0, 7));
          item1.push(dataList.array[index]);
        }
      });

      this.datalist_table2 = array1;
    },
    dealAmount(data2) {
      let item1 = [];
      data2.klines.forEach((element2, index2) => {
        let element2_item =
          element2.length == 1 ? element2 : element2.split(",");
        var item2 = {
          open: parseFloat(element2_item[1]),
          close: parseFloat(element2_item[2]),
          low: parseFloat(element2_item[4]),
          high: parseFloat(element2_item[3]),
          amount: parseInt(element2_item[5]),
        };
        item1.push(item2);
      });

      let num1 =
        this.input_name1.indexOf("002") != -1
          ? 0
          : this.input_name1.indexOf("300") != -1
          ? 0
          : this.input_name1.indexOf("000") != -1
          ? 0
          : 1;
      let array1 = this.getAjax2(
        "https://push2his.eastmoney.com/api/qt/stock/get?fltt=2&invt=2&volt=2&fields=f117&secid=" +
          num1 +
          "." +
          this.input_name1
      );
      initAmount(item1, parseInt(parseInt(array1.f117) / 10000000));
    },

    toBtn(index) {
      let that = this;

      if (index == 2) {
        return;
      }

      that.viewType = false;
      that.array_all = [];
      that.this_name = "";
      let array1 = this.getAjax2(switchUrlDeal(1, that.input_name1, 1));

      let array2 = this.getAjax2(switchUrlDeal(1, that.zzzs_input_num, 1));

      // console.log("array2array2array2", array2);

      let array3 = this.getAjax2(switchUrlDeal(1, that.input_name3, 1));
      let array4 = this.getAjax2(switchUrlDeal(1, that.input_name4, 1));
      //获取月的数据
      this.datalist_table = dealData(
        this.getAjax2(urlDeal(that.input_name1, 3)).klines,
        2,
        "月数据",
        2
      );
      this.dealMoth(this.datalist_table);

      let szzs = this.getAjax2(switchUrlDeal(10, ""));

      let array5 = this.getAjax2(
        switchUrlDeal(6, that.input_name1),
        this.num1
      ).klines;

      let array6 = this.getAjax2(switchUrlDeal(7, that.input_name1)).klines;
      //周末
      let array7 = this.getAjax2(urlDeal(that.input_name1, 2)).klines;

      //  let array7_fun = urlDeal(dealFundCode(that.input_name1), 2);

      this.array_all = [
        array1,
        array2,
        array3,
        array4,
        szzs,
        array5,
        array6,
        array7,
      ];

      this.main_datalist_table = this.datalist_table;

      array5.splice(0, 2);
      if (
        parseInt(new Date().getHours()) >= 9 &&
        parseInt(new Date().getHours()) <= 15
      ) {
        array5.push(array6.slice(-1)[0]);
      }

      let array_all = [array1, array2, array3, array4, szzs];
      this.this_name = array1.name;

      if (index) {
        console.log("that.$refs.analysisTab=", that.$refs.analysisTab);
        //that.$refs.analysisTab.toBtn();
      }

      setTimeout(function () {
        //   that.dealAmount(array1);
      }, 2000);

      setTimeout(function () {
        that.viewType = true;
      }, 2500);
    },
    //box数据
    boxData(this_num, calculateStopLoss, pressure) {
      let that = this;
      let zsw = parseFloat(calculateStopLoss.max_data_array * 0.95).toFixed(2);
      let zsw1 = parseFloat(calculateStopLoss.max_data_array * 0.925).toFixed(
        2
      );

      let zsw2 = parseFloat(calculateStopLoss.max_data_array * 0.9).toFixed(2);

      let zcw = parseFloat(
        (calculateStopLoss.max_data_array - calculateStopLoss.min_data_array) *
          0.618 +
          parseFloat(calculateStopLoss.min_data_array)
      ).toFixed(2);

      //获取买入日期
      if (that.input_name7 != "") {
        that.input_name5 =
          calculateStopLoss.this_data_num[
            calculateStopLoss.this_data.indexOf(that.input_name7)
          ];
      }
      let max_num1 = Math.max(...calculateStopLoss.max_data_num.slice(-29));
      let min_num1 = Math.min(...calculateStopLoss.min_data_num.slice(-29));
      let zcw3 = (max_num1 - min_num1) * 0.618 + min_num1;
      //设置

      this.position_array = dealSeatType(
        JSON.parse(JSON.stringify(calculateStopLoss))
      );

      this.this_num_data =
        calculateStopLoss.this_data_num[
          calculateStopLoss.this_data_num.length - 1
        ];
      this.testtext2 = deal30Loss(
        JSON.parse(JSON.stringify(calculateStopLoss))
      );

      this.main_markline = this.testtext2;
      this.testtext2.forEach((element, index) => {
        if (element.active) {
          that.calculate_array_active = index;
        }
      });
    },
    //列表数据
    tableList(array7, array_end) {
      let that = this;
      //周
      let test1_num1 = -10;
      that.testarray = dealData(array7, 2, "涨跌幅", 8).num.slice(test1_num1);
      that.testarray3 = dealData(array7, 2, "震幅", 7).num.slice(test1_num1);
      that.testtime = dealData(array7, 2, "涨跌幅时间", 8).time.slice(
        test1_num1
      );
      that.testtime2 = dealData(array_end, 2, "涨跌幅时间", 8).time.slice(
        test1_num1
      );
      that.testarray2 = dealData(array_end, 2, "涨跌幅", 8).num.slice(
        test1_num1
      );
      that.testarray4 = dealData(array_end, 2, "震幅", 7).num.slice(test1_num1);
      that.array1 = [
        "最大涨幅",
        "最大跌幅",
        "平均涨跌幅",

        Math.max(...that.testarray),
        Math.min(...that.testarray),

        (
          that.testarray.reduce(function (num1, num2) {
            return parseFloat(num1) + parseFloat(num2);
          }) / parseInt(test1_num1)
        ).toFixed(2),
        Math.max(...that.testarray3),
        Math.min(...that.testarray3),
        (
          that.testarray3.reduce(function (num1, num2) {
            return parseFloat(num1) + parseFloat(num2);
          }) / parseInt(test1_num1)
        ).toFixed(2),
        Math.max(...that.testarray2),
        Math.min(...that.testarray2),
        (
          that.testarray2.reduce(function (num1, num2) {
            return parseFloat(num1) + parseFloat(num2);
          }) / parseInt(test1_num1)
        ).toFixed(2),
        Math.max(...that.testarray4),
        Math.min(...that.testarray4),
        (
          that.testarray4.reduce(function (num1, num2) {
            return parseFloat(num1) + parseFloat(num2);
          }) / parseInt(test1_num1)
        ).toFixed(2),
      ];
    },
    defaultNum(url) {
      if (url.indexOf("002")) {
      } else if (url.indexOf("002")) {
      }
    },
  },
};
</script>
<style scoped lang="scss">
ul{
    border-top: 1px solid #ffa600;
}
.title-item {
  display: flex;
  color: white;
  /* border-bottom: 1px solid #ffa600; */
  .tba-nav {
    width: 120px;
    background-color: #7c7c7c;
    position: relative;
    overflow: hidden;
    padding: 5px;
    text-align: center;
  }

  .right_box {
    background-color: darkgrey;
    padding: 10px;
  }
  p {
    font-weight: 400;
    font-size: 14px;
    margin-top: 5px;
  }
}
.title-item.active {
  background-color: #ffffff;
  .tba-nav {
    border-left: 4px solid #ff5722;
    border-right: 4px solid #ff5722;
    background-color: #444444;
    font-weight: 600;
  }
}
.left_btn {
  width: 60px;
  height: 40px;
  margin-right: 10px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 280px;
  min-height: 400px;
}
.tab-nav {
  .active {
    background-color: #ff5722;
    color: white;
    border-color: #ff5722;
  }
}

.full {
}

header {
  padding: 10px 20px;
}
.left-nav {
  transition: all 0.2s linear;
  width: 130px;
  .left-main{
        height: 100vh;
    .left-box{
      height:100%
    }
  }
}
.left_active{
      position: fixed;
    top: 0px;
    z-index: 3;
    background: linear-gradient(to right, rgb(0, 0, 0), rgba(26, 26, 26, 0.28));
    width: 100%;
    min-height: 100%;
        overflow-y: auto;
}
.dropdown-box {
  overflow: hidden;
  width: 220px;
  color: white;
  margin-left: 10px;
  padding: 10px;
      /* border-left: 1px solid #ffa703; */
  .full {
  }
  .new {
    text-align: center;
    font-weight: 600;
    font-size: 20px;
    background-color: #ffffff21;
  }
  .exceed {
    background-color: red;
  }
}
.right_box {
}

.right_box.active3 {
  background-color: #4caf50;
  padding: 10px;
  margin-left: 10px;
  color: white;
  font-weight: 600;
  border-radius: 5px;
}
.bar_box {
  width: 100%;

  background-color: #b3b3b375;

  span {
    background-color: #f44336;
    display: inline-block;
    text-align: center;
    font-weight: 600;
    font-size: 20px;
  }
}
.tab-nav {
  .btn_array {
    display: flex;
    align-items: center;
    background-color: #ffffff;
    padding: 10px 15px;
    border-radius: 20px;
    .new {
      text-align: center;
      font-weight: 600;
      font-size: 20px;
    }

    span {
      font-size: 24px;
      font-weight: 600;
    }

    li {
      width: 209px;
      box-sizing: border-box;
      border: 1px solid #515a6e;
    }
  }
}

.head1 {
  color: white;

  span {
    font-weight: 600;
    font-size: 28px;
    letter-spacing: 2px;
  }
}

.analysis {
  background-color: #444444;
  padding: 20px 20px;
  display: flex;
  .main {
    background-color: white;
    border-radius: 20px;
    overflow: hidden;
    position: relative;
    margin-left: 10px;
    flex: 1;
  }

  .active1 {
    color: #ff3d00;
    font-size: 14px;
    font-weight: 600;
  }

  .active2 {
    color: green;
    font-size: 14px;
    font-weight: 600;
  }

  .iframe-box {
    iframe {
      height: 100vh;
    }
  }

  .box {
    //  margin: 20px 0px;

    // border-left: 1px solid;
    // border-bottom: 1px solid;
    ul {
      display: flex;
      margin: 0px 0px 0px 0px;
      border-left: 1px solid #a7a7a7;
      border-bottom: 1px solid #a7a7a7;

      li {
        width: 100px;
        flex: 1;
        padding: 5px;
        border-right: 1px solid #a7a7a7;
        border-top: 1px solid #a7a7a7;
        font-size: 16px;
        text-align: center;
        color: #d9d9d9;
      }
    }
  }

  .bar > div {
    margin-right: 10px;
    // width: 100%;
    display: flex;

    .active_input {
    }

    .flex-item {
      word-wrap: normal;
      display: flex;
    }
  }

  .bar {
    width: 450px;
    justify-content: space-between;

    .flex-c {
      padding: 5px 5px 5px 0px;
      justify-content: space-evenly;
    }

    .ge {
      width: 40px;
    }
  }

  .main1 {
  }

  nav {
    margin-top: 20px;
  }

  p {
    font-weight: 400;
    font-size: 14px;
    margin-top: 5px;
  }

  .box {
    align-items: baseline;

    ul {
      .act2 {
        color: green;
        font-weight: 600;
      }

      .act1 {
        color: red;
        font-weight: 600;
      }
    }
  }

  b {
    font-size: 16px;
  }

  .array-list {
    padding: 10px 20px 20px 20px;
    background-color: white;
    margin-bottom: 20px;

    span {
      a {
        font-size: 18px;
      }
    }
  }
}
</style>
