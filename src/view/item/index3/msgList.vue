<template>
  <div class="msgList">
    <header>
      <swiper
        :options="swiperTopOptions"
        ref="swiperSection"
        class="section_swiper"
      >
        <swiper-slide
          class="swiper-slide"
          v-for="(item, index) in titleData"
          :key="index"
        >
          <div class="dato">
            <b>
              {{ item }}
            </b>
          </div>
        </swiper-slide>
        <div class="swiper-button-prev swiper-button-prev1" slot="button-prev">
          <
        </div>
        <div class="swiper-button-next swiper-button-next1" slot="button-next">
          >
        </div>
      </swiper>
    </header>

    <section>
      <el-table
        :data="tableData"
        class="table-box"
        style="width: 100%"
        height="auto"
        :row-class-name="tableRowClassName"
        :cell-class-name="tableRowClassName1"
      >
        <el-table-column prop="name" label="名称" align="center" width="150">
          <template v-slot:default="{ row }">
            <b>{{ row.name }}</b>
          </template>
        </el-table-column>
        <el-table-column prop="date" width="110" label="最新公布日期">
          <template v-slot:default="{ row }">
            <p>
              {{ row.date }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="value"
          label="今值"
          class="active1"
          width="100"
          align="center"
        >
          <template v-slot:default="{ row }">
            <p
              :class="
                  parseFloat(row.value) >= parseFloat(row.value1)
                    ? 'active1'
                    : 'active2',
              "
            >
              {{ row.value }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="value1" label="预测值" width="80">
          <template v-slot:default="{ row }">
            <p>
              {{ row.value1 }}
            </p>
          </template>
        </el-table-column>

        <el-table-column prop="date1" width="110" label="上期时间">
          <template v-slot:default="{ row }">
            <p>
              {{ row.date1 }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="value2" label="数值" width="60">
          <template v-slot:default="{ row }">
            <p>
              {{ row.value2 }}
            </p>
          </template>
        </el-table-column>

        <el-table-column prop="value3" label="预测值" width="70">
          <template v-slot:default="{ row }">
            <p>
              {{ row.value3 }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="value4" label="当天大盘涨跌" width="70">
          <template v-slot:default="{ row }">
            <p>
              {{ row.num1 }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="value4" label="5日大盘涨跌" width="70">
          <template v-slot:default="{ row }">
            <p>
              {{ row.num2 }}
            </p>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="date1" label="同期时间">
          <template v-slot:default="{ row }">
            <p>
              {{ row.date2 }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="value2" label="数值" width="60">
          <template v-slot:default="{ row }">
            <p>
              {{ row.value4 }}
            </p>
          </template>
        </el-table-column>

        <el-table-column prop="value3" label="预测值" width="60">
          <template v-slot:default="{ row }">
            <p>
              {{ row.value5 }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="value4" label="当天大盘涨跌" width="70">
          <template v-slot:default="{ row }">
            <p>
              {{ row.num3 }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="value4" label="5日大盘涨跌" width="70">
          <template v-slot:default="{ row }">
            <p>
              {{ row.num4 }}
            </p>
          </template>
        </el-table-column> -->
        <el-table-column prop="rate" label="频率"> </el-table-column>
        <el-table-column prop="value3" label="更多" align="center">
          <template v-slot:default="{ row }">
            <button @click="toLink(row.link)">解析</button>
          </template>
        </el-table-column>
        <el-table-column prop="value3" label="更多" width="165" align="center">
          <template v-slot:default="{ row }">
            <el-tooltip :content="row.link1" placement="bottom" effect="light">
              <button @click="toLink(row.link1)">英为财情/发布日期</button>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="value3" label="更多" width="150" align="center">
          <template v-slot:default="{ row }">
            <button @click="toLink(row.details)">查看折线图详情</button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <nav class="flex-c">
      <span class="flex-item">
        <a href="https://www.sodocs.net/doc/2e15784816.html" target="_blank">
          经济数据公布时间表
        </a>
      </span>
      <span class="flex-item">
        <a href="http://www.cinic.org.cn/xw/tjsj/" target="_blank">
          统计数据
        </a></span
      >
    </nav>
  </div>
</template>
<script>
//希望列表页
import "swiper/swiper-bundle.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import us_data from "./cn_data";
export default {
  data() {
    return {
      name: "",
      titleData: ["全部", "利率", "cpi", "失业率", "gdp", "通胀", "m1", "m2"],
      tableData: [],
      swiperTopOptions: {
        spaceBetween: 0,
        prevButton: ".swiper-button-prev", //上一张
        nextButton: ".swiper-button-next", //下一张
        // initialSlide: 0, //设置页面的起始页
        slidesPerView: "auto",
        observer: true,
        observeParents: true,
        // 滑动速度
        speed: 2000,
        // 显示分页
        lazyLoading: true,
      },
    };
  },
  components: {
    swiper,
    swiperSlide,
  },
  created() {
    this.tableData = us_data.list;
  },
  props: {
    array1: Object,
  },
  mounted() {
    this.getSyi("2022-07-26");
  },
  methods: {
    tableRowClassName1({ row, rowIndex }) {
      return "";
    },
    //获取大盘收益
    getSyi(date) {
      let array2 = this.dealData2(this.array1.klines, 2, this.array1.name, 2);

      let num1 = array2.time.indexOf(date);

      let num_all = array2.array.splice(num1, 5).reduce(function (num1, num2) {
        return parseFloat(num1) + parseFloat(num2);
      });
      console.log("11", num_all.toFixed(2));
    },
    dealData2(data2, type, name, num) {
      let that = this;
      let array2 = [];
      let time1 = [];
      let num1 = [];

      data2.forEach((element2, index2) => {
        let element2_item =
          element2.length == 1 ? element2 : element2.split(",");
        time1.push(element2_item[0]);
        num1.push(element2_item[num]);
        array2.push(element2_item[8]);
      });
      let object1 = {
        name: name,
        num: num1,
        time: time1,
        array: array2,
      };
      return object1;
    },
    tableRowClassName({ row, rowIndex }) {
      let this_time = new Date();
      let new_time = new Date(row.date);
      if (this_time.getTime() + 86400000 > new_time.getTime()) {
        if (this_time.getTime() - 46400000 <= new_time.getTime()) {
          return "active";
        }
      }

      return "";
    },
    toLink(index) {
      window.open(index, "_blank");
    },
  },
};
</script>
<style lang="scss">
.msgList {
  .table-box {
  }

  button {
    color: #ffffff;
    background: #ff5722;
    margin: 2px 0px;
    padding: 5px 8px;
    border-radius: 0px;
    letter-spacing: 1px;
    font-size: 14px;
    border-radius: 5px;
    margin: 10px 0px;
  }

  .swiper-button-prev1,
  .swiper-button-next1 {
    position: absolute;
    top: 50%;
    right: 0px;
    left: auto;
    display: inline-block;
    height: 40px;
    width: 20px;
    background-color: #d2e3ff;
    border: 1px solid #d2e3ff;
    font-size: 18px;
    color: #333333;
    text-align: center;
    font-weight: 600;
    line-height: inherit;
    display: flex;
  }

  .swiper-button-prev1 {
    right: auto;
    left: 0px;
  }

  b {
    font-weight: 600;
  }

  .active1 {
    color: #ea5454;
    font-size: 18px;
    font-weight: 600;
    position: relative;
  }

  .active2 {
    font-size: 18px;
    font-weight: 600;
    color: #05a687;
    position: relative;
  }

  .swiper-slide {
    padding: 5px 10px;
    text-align: center;
    width: auto;

    b {
      padding: 10px 15px;
    }
  }

  .swiper-slide-active {
    .item {
      background-color: #f44336;
      color: white;
    }

    .dato {
      background: #ffffff;
      color: #334c98;
      border: 1px solid #334c98;
    }
  }

  .dato {
    background: #edf2ff;
    border: 1px solid #d2e3ff;
    color: #444444;
  }

  .item {
    text-align: center;

    padding: 5px 0px;
    margin: 0px 10px;
    background-color: #b4b0a8;
  }

  .section_swiper {
    position: relative;
    padding: 5px 30px;
  }

  .swiper-button-prev:after,
  .swiper-button-next:after {
    content: "";
  }

  nav {
    margin: 10px auto;
    span {
      a {
        border-bottom: 1px solid blue;
        padding: 5px 20px;
      }
    }
  }

  .el-table {
    border: 1px solid #c1d6f7;
  }

  .el-table thead th {
    border-right: 1px solid #c1d6f7;
    border-top: 1px solid #c1d6f7;
    border-bottom: 1px solid #c1d6f7;
    background: #d2e3ff;
    color: #333333;
  }

  .el-table td {
    border-right: 1px solid #c1d6f7;
    border-bottom: 1px solid #c1d6f7;
  }

  .el-table td.el-table__cell {
    padding: 0px 0px;
    background: #ffffff;

    div {
      height: 100%;
      line-height: inherit;
    }
  }

  .el-table tr.active td {
    background-color: #ffeded;
  }

  .el-table td.el-table_1_column_1 {
    background: #ffffff;
  }

  .el-table td.el-table_1_column_9 {
    background: #ffffff;
  }

  .el-table td.el-table_1_column_10 {
    background: #ffffff;
  }

  .more {
    background: #627bc7;
    border: 1px solid #516cbc;
    color: white;
    padding: 5px 10px;
  }

  .el-table td.el-table__cell:nth-child(5),
  .el-table td.el-table__cell:nth-child(6),
  .el-table td.el-table__cell:nth-child(7),
  .el-table td.el-table__cell:nth-child(8),
  .el-table td.el-table__cell:nth-child(9),
  .el-table td.el-table__cell:nth-child(10) {
    background-color: wheat;
  }
}
</style>
