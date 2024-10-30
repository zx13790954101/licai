<template>
  <div class="limitBoard">
    <div>
      <p>点击之后的 数据错误，在tobtn方法里</p>
    </div>
    <h1>
      {{section_name}}
    </h1>
    <div id="simpleSquare"></div>
    <div class="btn_array">
      <button @click="active_type = 1">涨停板的股票排名</button>
      <button @click="active_type = 2">北向资金买的版块</button>
    </div>

    <section class="line_box" v-if="dataList.length > 0">
      <p>折线图数值有问题</p>
      <histogramFund
        ref="analysis"
        :thame="'light'"
        :name="'_limitBoard'"
        :link="''"
        :title="title4"
        :listData="dataList"
        :timeData="dataList[0].time"
        :width1="'1400px'"
        :height1="'500px'"
      ></histogramFund>
    </section>
    <section class="section_box box" v-if="active_type == 2">
      <ul class="head flex-c">
        <li class="f1"></li>
        <li class="f1"></li>
        <li class="f2">北向资金今日增持估计</li>
        <li class="f2">北向资金今日持股</li>
        <li class="f3">今日增持最大行业</li>
        <li class="f3">今日增持最大股</li>
      </ul>
      <ul class="flex-c">
        <li>
          <span>日期</span>
        </li>
        <li>
          <span>沪深300涨跌幅</span>
        </li>
        <li>
          <span>市值</span>
        </li>
        <li>
          <span>占全市场比</span>
        </li>
        <li>
          <span>市值</span>
        </li>
        <li>
          <span>占全市场比</span>
        </li>
        <li>
          <span>市值增持</span>
        </li>
        <li>
          <span>占板块增加 </span>
        </li>
        <li>
          <span>占全市场比增加 </span>
        </li>
        <li>
          <span>市值增持</span>
        </li>
        <li>
          <span>股数增加 </span>
        </li>
        <li>
          <span>占股比增加</span>
        </li>
      </ul>
    </section>

    <section
      v-for="(item, index) in data_array2"
      :key="index"
      class="box box2"
      v-if="active_type == 2"
    >
      <ul class="flex-c">
        <li
          v-for="(item2, index2) in item"
          :key="index2"
          @click="toBtn2(item2)"
          :class="item2 == active_name2 ? 'active1' : ''"
        >
          <span>{{ dealNum(index2, item2) }}</span>
        </li>
      </ul>
    </section>

    <section
      v-for="(item, index) in time_array"
      :key="index"
      v-if="type1"
      class="box"
    >
      <h3>
        {{ item }}
        <span
          @click="toDate(new Date(item).getDay())"
          :class="new Date(item).getDay() == this_date ? 'active1' : ''"
          >-星期{{ new Date(item).getDay() + data_array[index][0].time }}
        </span>
      </h3>
      <ul>
        <li
          v-for="(item2, index2) in data_array[index]"
          :key="index2"
          @click="toBtn(item2.name)"
          :class="item2.name == active_name ? 'active1' : ''"
        >
          <span>{{ item2.name }}</span>
          <span class="num">{{ item2.array.length }}</span>
        </li>
      </ul>
    </section>
  </div>
</template>
<script>
// import { SVG } from "@svgdotjs/svg.js";
import axios from "axios";
import limit_time from "../lib/json/limit_time.json";
import limitboard from "../lib/json/limitboard.json";
import histogramFund from "./fuCommon/histogramFund.vue";
import $ from "jquery";
export default {
  data() {
    return {
      active_type: 1,
      time_array3: [],
      this_time: null,
      this_date: null,
      data_array: [],
      time_array: [],
      active_name: null,
      data_array2: [],
      time_array2: [],
      active_name2: null,

      type1: false,
      title4: "",
      dataList: [],
      num_index: 0,
      end_num2: 2,
      section_name: "",
    };
  },
  created() {
    var that = this;
    this.time_array = [];
    if (sessionStorage.getItem("section_time")) {
      this.time_array = JSON.parse(sessionStorage.getItem("section_time"));
      this.section_name= JSON.parse(sessionStorage.getItem("section_name"));
    }

    let time_array2 = this.time_array.length;
    //判断位置
    if (
      new Date(this.time_array[time_array2 - 1]).getTime() >
      new Date(limit_time[limit_time.length - 1]).getTime()
    ) {
      //设置开始循环的代码

      let time_index = this.time_array.findIndex((item) => {
        return item === "2023-06-02";
      });

      let end_num = this.time_array.length - time_index - 1;
      end_num = this.time_array.slice(-end_num);

      console.log("end_num2", this.time_array);
      this.end_num2 = end_num;

      end_num.forEach((element, index) => {
        that.getSection(element, index);
        if (end_num.length == index + 1) {
          that.$nextTick(() => {});
        }
      });
    } else {
      that.time_array = limit_time;
      that.data_array = limitboard;
      that.type1 = true;
    }
  },
  components: {
    histogramFund,
  },
  mounted() {
    // let shapeModel = SVG().addTo("#simpleSquare").size("100%", "50px");
    // var line1 = [[0, 0, 20, 20, 40, 0, 50, 40]];
    // shapeModel.polyline(line1).stroke({ width: 2, color: "#6488B7" });
    // shapeModel.fill("none");
    this.getBxzjData();
  },
  methods: {
    dealNum(num, data) {
      switch (num) {
        case 0:
          return data.slice(0, 10);
          break;
        case 1:
          return data.toFixed(2) + "%";
          break;
        case 2:
          return (data / 100000000).toFixed(2) + "亿";
          break;
        case 3:
          return (data * 1000).toFixed(2);
          break;
        case 4:
          return (data / 1000000000000).toFixed(2) + "亿";
          break;
        case 5:
          return (data * 100).toFixed(2) + "%";
          break;
        default:
          return data;
          break;
      }
    },
    toDate(name) {
      if (name == this.this_date) {
        this.this_date = null;
      } else {
        this.this_date = name;
      }
    },
    toBtn(name) {
      let this_array = this.data_array;
      console.log("this_array", this_array);
      // this_array.sort(function (a, b) {
      //   return new Date(a[0].time) < new Date(b[0].time) ? -1 : 1;
      // });

      let end_array = [];
      this_array.forEach((item, index) => {
        let type = 1;
        item.forEach((item2, index2) => {
          if (item2.name == name) {
            end_array.push(item2.array.length);
            type = 2;
          }
        });
        if (type == 1) {
          end_array.push(0);
        }
      });
      console.log("this.data_array;=", this_array);

      this.dataList.push({
        array: end_array,
        num: end_array,
        time: this.time_array,
        name: "涨停与跌停数",
      });
      this.dataList.push({
        array: JSON.parse(sessionStorage.getItem("section_data")).slice(
          -this.time_array.length
        ),
        num: JSON.parse(sessionStorage.getItem("section_data")).slice(
          -this.time_array.length
        ),
        time: this.time_array,
        name: "当前的数值",
      });
      if (name == this.active_name) {
        this.active_name = null;
      } else {
        this.active_name = name;
      }
    },
    toBtn2(name) {
      if (name == this.active_name2) {
        this.active_name2 = null;
      } else {
        this.active_name2 = name;
      }
    },
    //获取北向资金的买的版块和
    getBxzjData() {
      var that = this;
      var url1 =
        "https://datacenter-web.eastmoney.com/api/data/v1/get?sortColumns=HOLD_DATE&sortTypes=-1&pageSize=50&pageNumber=1&columns=ALL&source=WEB&client=WEB&reportName=RPT_MUTUAL_MARKET_STA";
      var that = this;
      this.$axios.get(url1).then((res) => {
        let this_data = res.data.result.data;
        console.log(res);
        this_data.forEach((item, index) => {
          var time_item = [
            item.HOLD_DATE,
            item.CHANGE_RATE,
            item.ADD_MARKET_CAP,
            item.ADD_MARKET_RATE,
            item.HOLD_MARKET_CAP,
            item.HOLD_MARKET_RATE,
          ];
          that.time_array2.push(time_item);
          var data_item = [
            item.HOLD_DATE,
            item.CHANGE_RATE,
            item.ADD_MARKET_CAP,
            item.ADD_MARKET_RATE,
            item.HOLD_MARKET_CAP,
            item.HOLD_MARKET_RATE,
            item.ADD_MARKET_BNAME,
            item.BOARD_RATE_BNAME,
            item.MARKET_RATE_BNAME,
            item.ADD_MARKET_MNAME,
            item.ADD_SHARES_MNAME,
            item.MARKET_RATE_BNAME,
          ];
          that.data_array2.push(data_item);
        });
      });
    },
    //获取版块涨停的全部股
    async getThigh(time, data1, index) {
      var time1 = new Date(time);
      var month1 =
        parseInt(time1.getMonth()) > 8
          ? parseInt(time1.getMonth()) + 1
          : "0" + (parseInt(time1.getMonth()) + 1);
      var date1 =
        parseInt(time1.getDate()) > 9
          ? parseInt(time1.getDate())
          : "0" + parseInt(time1.getDate());
      var url1 =
        "https://flash-api.xuangubao.cn/api/surge_stock/stocks?date=" +
        time1.getFullYear() +
        month1 +
        date1 +
        "&normal=true&uplimit=true";
      var that = this;
      await this.$axios.get(url1).then((res) => {
    
        var this_array = res.data.data.items;
          

      
        var all_num = [];
        data1.forEach((element, index) => {
          var item2 = {
            id: element.id,
            name: element.name,
            array: [],
            time: time,
          };
          var item2_arrat = [];

          if (this_array != null) {
            this_array.forEach((item, index1) => {
              if (item["8"][0].id == element.id) {
                item2_arrat.push(item)
              } else if (item["8"][1] && item["8"][1].id == element.id) {
                item2_arrat.push(item)
              }
            })
          } else {
              console.log("xuangubao", res)
          }
          item2.array = item2_arrat;
          all_num.push(item2);
        });

        this.num_index = this.num_index + 1;

        var array1 = that.data_array;
        array1.push(all_num);
        if (this.num_index == this.end_num2.length) {
          array1.sort(function (a, b) {
            return new Date(a[0].time) - new Date(b[0].time);
          });

          array1 = limitboard.concat(array1);
          that.data_array = array1.slice(-that.time_array.length);
          that.type1 = true;
        }

        //   that.data_array = that.data_array.push(all_num);
      });
    },
    getAjax(url) {
      var htmlobj = $.ajax({
        url: url,
        async: false,
      });
      return htmlobj.responseJSON.data;
    },
    //获取版块的列表
    async getSection(time, index) {
      var that = this;
      var time1 = parseInt(new Date(time).getTime()) / 1000;
      var url1 =
        "https://flash-api.xuangubao.cn/api/surge_stock/plates?date=" + time1;
      var that = this;
      let data1 = await this.getAjax(url1);
      that.getThigh(time, data1.items, index);
    },
  },
};
</script>
<style scoped lang="scss">
.limitBoard {
  padding: 0px 30px;

  .box {
    position: relative;

    h3 {
      margin: 10px 0px;
    }

    ul {
      li {
        background-color: white;
        border: 1px solid #333333;
        padding: 2px 5px;
        margin-right: 10px;
        margin-bottom: 5px;
        display: inline-block;
        color: #000000;
      }

      .num {
        color: red;
        font-weight: 600;
      }
    }

    .active1 {
      background-color: #ff5722;
      color: white;

      .num {
        color: #000000;
        font-weight: 600;
      }
    }
  }

  .box2 {
    ul {
      li {
        margin: 0px;
        border-right: 0px;
        border-bottom: 0px;
        width: 100px;
      }
    }
  }

  .section_box {
    width: 1200px;

    ul {
      li {
        margin: 0px;
        border-right: 0px;
        border-bottom: 0px;
        width: 100px;
        height: 23px;
      }
    }

    .head {
      .f2 {
        width: 200px;
      }

      .f3 {
        width: 300px;
      }
    }
  }
}
</style>
