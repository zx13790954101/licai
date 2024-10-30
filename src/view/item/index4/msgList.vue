<template>
  <div class="msgList">
    <header>
      <swiper :options="swiperTopOptions" ref="swiperSection" class="section_swiper">
        <swiper-slide class="swiper-slide" v-for="(item, index) in titleData" :key="index">
          <div class="dato">
            <b>
              {{ item }}
            </b>
          </div>
        </swiper-slide>
        <div class="swiper-button-prev swiper-button-prev1" slot="button-prev">
          < </div>
            <div class="swiper-button-next swiper-button-next1" slot="button-next">
              >
            </div>
      </swiper>
    </header>

    <section>
      <el-table :data="tableData" class="table-box" style="width: 100%" height="auto" center>
        <el-table-column prop="name" label="名称">
          <template v-slot:default="{ row }">
            <b>{{ row.name }}</b>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="date" label="数据影响" width="160">
          <template v-slot:default="{ row }">
            <p @click="toLink(row.index)">公布值>预期值=利空澳元</p>
          </template>
        </el-table-column> -->
        <el-table-column prop="date" width="110" label="最新公布日期">
          <template v-slot:default="{ row }">
            <p>
              {{ row.date }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="value" label="今值">
          <template v-slot:default="{ row }">
            <p>
              {{ row.value }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="value1" label="预测值">
          <template v-slot:default="{ row }">
            <p>
              {{ row.value1 }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="date1" width="110" label="上期公布时间">
          <template v-slot:default="{ row }">
            <p>
              {{ row.date1 }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="value2" label="数值">
          <template v-slot:default="{ row }">
            <p>
              {{ row.value2 }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="value3" label="预测值">
          <template v-slot:default="{ row }">
            <p>
              {{ row.value3 }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="value4" label="前值">
          <template v-slot:default="{ row }">
            <p>
              {{ row.value4 }}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="rate" label="频率"> </el-table-column>
        <el-table-column prop="value3" label="更多" width="90">
          <template v-slot:default="{ row }">
            <button @click="toLink(row.link1)">查看更多</button>
            <button @click="toLink(row.details)">查看详情</button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <nav class="flex-c">
      <span class="flex-item">重要的财经新闻 </span>
      <span class="more"> 更多</span>
    </nav>
  </div>
</template>
<script>
  //希望列表页
  import "swiper/swiper-bundle.css";
  import {
    swiper,
    swiperSlide
  } from "vue-awesome-swiper";
  import us_data from "./us_data";
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
          slidesPerView: 'auto',
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
    mounted() {},
    methods: {
      toLink(index) {
        window.open(index, "top");
      },
    },
  };
</script>
<style lang="scss">
  .msgList {
    .table-box {}

    button {
      color: #1890ff;
      background: #e8f4ff;
      border-color: #a3d3ff;
      margin: 5px 0px;
      padding: 2px 5px;
      border-radius: 0px;
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

    .swiper-slide {
      padding: 5px 10px;
      text-align: center;
      width: auto;
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
      padding: 0px 10px;
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
      background: #fff0f0;

      div {
        height: 100%;
        line-height: inherit;
      }
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
  }
</style>
