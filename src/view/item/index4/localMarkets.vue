<template>
  <div class="localMarkets">
    <section class="main" v-for="(item2, index2) in dataList" :key="index2">
      <div class="flex-c head">
        <!-- <h3 class="flex-item">{{ dataTitle[index2].title }}</h3> -->
        <b target="_blank0 " @click="openDialog2(index2)">
          查看折线图-更多股市指数(来自{{ dataTitle[index2].tip }})
        </b>
      </div>
      <!-- <ul>
        <li @click="openDialog(item)" v-for="(item, index) in item2" :key="index"
          :class="item.array[item.array.length - 1] > 0 ? 'active' : ''">
          <div class="box">
            <b class="flex-item">
              {{ item.name }}
            </b>
            <h5>( {{ item.time[item.time.length - 1] }})</h5>
            <span class="big"> {{ item.array[item.array.length - 1] }}% </span>
            <h4>
              今日数值：<strong> {{ item.num[item.num.length - 1] }}</strong>
            </h4>
            <h4 v-if="item.name">
              最近半月涨跌幅：<strong style="display: block" :style="{ color: item.all_num > 0 ? '#ea5454' : '' }">
                {{ item.all_num }}%</strong>
            </h4>
            <div class="mask_box" v-if="dealType(item.name, index2, index) == 1">
              闭盘
            </div>
          </div>
        </li>
      </ul> -->
    </section>

    <!--    <section>
      <div class="flex-c">
        <span class="flex-item"> </span>
        <span @click="openDialog()"> 更多 </span>
      </div>
    </section> -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="90%"
      :before-close="handleClose"
    >
      <histogramFund
        ref="histogramDialog4"
        :name="'_histogramDialog4'"
        :link="''"
        :title="title4"
        :listData="dataList[0]"
        :timeData="dataList[0][0].time"
        :width1="'1200px'"
        :height1="'800px'"
        value=""
      >
      </histogramFund>
    </el-dialog>

    <el-dialog
      title="弹出框"
      :visible.sync="dialogVisible2"
      width="30%"
      :before-close="handleClose2"
    >
      <a
        href="http://vip.stock.finance.sina.com.cn/q/view/vCffex_Positions_ykfx.php"
      >
        机构持仓情况
      </a>
      <a href="https://finance.sina.com.cn/futures/quotes/CL.shtml">
        原油走势图
      </a>
    </el-dialog>
  </div>
</template>
<script>
import $ from "jquery";
import histogramFund from "./histogramFund.vue";
import { getAjax } from "../../../assets/common.js";
import { jshares_url, stock_url, futures_url, currency_url } from "./name.js";
import Section from "../../section.vue";
//世界各地版块情况
export default {
  data() {
    return {
      listData4: null,
      listData4_1: null,
      timeData4: null,
      num1: 0,
      title4: "",
      title4_1: "",
      title4_2: "",
      dialogVisible: false,
      dialogVisible2: false,
      dataMsg: [[]],
      dataTitle: [
        {
          title: "全球股市",
          url: "https://cn.investing.com/indices/indices-futures",
          tip: "英领",
        },
        {
          title: "股指期货",
          url: "http://quote.eastmoney.com/center/qqzs.html",
          tip: "东方财富网",
        },

        {
          title: "大宗商品",
          url: "",
          tip: "东方财富网",
        },
        // {
        //   title: "大宗商品",
        //   url: "",
        //   tip: "东方财富网",
        // },
      ],
      dataList: [],
      //全球股市指数
      shares_data_list: [],
      //股指期货
      stock_data_list: [],
      //期货指数
      futures_data_list: [],
      currency_data_list: [],
      //K线图的数量
      num1: 59, //设置数量
      title2: [
        "富时中国a50",
        "恒生指数期货",
        "纳斯达克100指",
        "英国100期货",
        "日经225期货",
      ],
      // 开盘时间
      openingTime: [
        [
          [9.2, 15],
          [9.15, 16.15],
          [21.3, 4.0],
          [4.3, 23],
          [8, 14],
        ],
        [],
        [],
      ],
    };
  },
  components: {
    histogramFund,
    Section,
  },
  created() {
    let that = this;

    let this_time = new Date().getHours() + 1;
    var if_time = 0;
    if (this_time >= 10) {
      if (this_time <= 14) {
        if_time = 1;
      }
    }
    if ((if_time = 1)) {
      stock_url.forEach((element, index) => {
        const data1 = getAjax(element);
        let array1 = Object.values(data1.responseJSON.data.candle)[0].lines;
        that.stock_data_list.push(that.dealData(array1, 1, that.title2[index]));
      });
      that.$emit("transfer", that.stock_data_list[1]);
      that.dataList.push(that.stock_data_list);
    } else if ((if_time = 0)) {
      //指数走势图
      jshares_url.forEach((element) => {
        let array1 = getAjax(element).responseJSON.data;
        that.shares_data_list.push(
          that.dealData(array1.klines, 2, array1.name)
        );
      });
      that.dataList.push(that.shares_data_list);
    }

    // futures_url.forEach((element) => {
    //   let array1 = getAjax(element).responseJSON.data;

    //   that.futures_data_list.push(that.dealData(array1.klines, 2, array1.name));
    // });

    //that.dataList.push(that.futures_data_list);
  },

  mounted() {},
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
    dealData(data2, type, name) {
      let that = this;
      let array2 = [];
      let time1 = [];
      let num1 = [];
      data2.forEach((element2, index2) => {
        if (type == 1) {
          array2.push(element2[6].toFixed(2));
          time1.push(
            that.dateFormat("YYYY-mm-dd", new Date(element2[9] * 1000))
          );
          num1.push(element2[1]);
        } else if (type == 2) {
          array2.push(element2.split(",")[8]);
          time1.push(element2.split(",")[0]);
          num1.push(element2.split(",")[2]);
        }
      });
      let array45 = array2.slice(array2.length - 30, array2.length);

      let sum = array45.reduce((x, y) => Number(x) + Number(y));
      let object1 = {
        name: name,
        num: num1,
        time: time1,
        array: array2,
        all_num: sum.toFixed(2),
      };
      return object1;
    },

    dealType(name, index1, index2) {
      const this_time = new Date();
      let type_this = parseFloat(
        this_time.getHours() + "." + this_time.getMinutes()
      );
      let this2 = this.openingTime[index1]
        ? this.openingTime[index1][index2]
        : undefined;

      if (this2) {
        if (type_this >= parseFloat(this2[0])) {
          if (type_this <= parseFloat(this2[1])) {
          } else {
            return 1;
          }
        } else {
          return 1;
        }
      } else {
        return null;
      }
    },
    openDialog(item) {
      if (item.name.indexOf("黄金") != -1) {
        window.open("https://rili.jin10.com/day/2022-07-21");
      }
      console.log("open", item.name);
    },

    openDialog2(index) {
      if (index == 0) {
        this.dialogVisible = true;
      } else {
        this.dialogVisible2 = true;
      }
    },
    handleClose2(done) {
      done();
      this.dialogVisible2 = false;
    },
    handleClose(done) {
      done();
      this.dialogVisible = false;
    },
  },
};
</script>
<style scoped lang="scss">
.localMarkets {
  .main {
  }

  h3 {
    color: white;
    margin-bottom: 5px;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 1px;
  }

  .head {
    margin-bottom: 10px;

    b {
      color: #ffffff;
      border-bottom: 1px solid #ffffff;
    }
  }

  ul {
    display: flex;
    margin-bottom: 10px;
    margin-right: -15px;
    position: relative;

    li {
      width: 150px;
      margin-right: 15px;

      .box {
        background-image: linear-gradient(#78f3db, #ffffff);
        color: #05a687;
        padding: 8px 5px;
        position: relative;
        border-radius: 5px;
        text-align: center;

        h6 {
          color: #fccece;
          text-align: center;
          position: relative;
          font-weight: 400;
          margin: 0px 0px 5px 0px;
          display: flex;
        }

        span {
          width: 40px;
          color: #000000;
          font-size: 12px;
          text-align: center;
        }

        .big {
          font-size: 26px;
          font-weight: 600;
          color: #05a687;
          flex: 1;
          position: relative;
          margin-top: 0px;
        }

        a {
          color: #ffffff;
        }

        h5 {
          font-size: 12px;
          font-weight: 400;
          position: relative;
          transform: scale(0.75);
          margin-top: -5px;
          margin-bottom: -5px;
          color: #333;
        }

        b {
          text-align: center;
          letter-spacing: 1px;
          font-weight: 600;
          letter-spacing: 2px;
          color: #333;
        }

        h4 {
          position: relative;
          margin: 0px 0px;
          font-weight: 400;
          color: #333;

          strong {
            color: #05a687;
          }
        }

        .mask_box {
          height: 100%;
          width: 100%;
          position: absolute;
          top: 0px;
          left: 0px;
          background-color: #6a6a6a6e;
          display: flex;
          justify-content: center;
          justify-self: center;
          font-size: 28px;
          color: #333;
          align-items: center;
        }
      }
    }

    li.active .box {
      background-image: linear-gradient(#f7b0b0, #ffffff);
      color: #ea5454;

      h5 {
      }

      .big {
        color: #ea5454;
      }

      strong {
        color: #ea5454;
      }
    }
  }
}
</style>
